from models import User
from schemas import UserCreate, UserRead

from utils import get_current_user, hash_password_async

from sqlmodel import select, or_
from sqlmodel.ext.asyncio.session import AsyncSession

from fastapi import APIRouter, Depends, status, HTTPException

from config.database import get_session


class FrontAccountsView:
    router = APIRouter(prefix="/api/front/accounts", tags=["front-accounts"])

    @router.post("/", response_model=UserRead)
    async def create_account(
        user: UserCreate, session: AsyncSession = Depends(get_session)
    ):
        if user.phone_number is not None:
            stmt = select(User).where(
                or_(User.email == user.email, User.phone_number == user.phone_number)
            )
        else:
            stmt = select(User).where(User.email == user.email)

        result = await session.exec(stmt)
        existing_user = result.first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email and Phone number already exists",
            )

        password = await hash_password_async(user.password)
        user.password = password["hash"]

        db_user = User(**user.model_dump())
        db_user.salt = password["salt"]
        session.add(db_user)
        await session.commit()
        return db_user

    @router.get("/{account_id}")
    async def get_account(
        user_id: int,
        session: AsyncSession = Depends(get_session),
        check_user: User = Depends(get_current_user),
    ):
        stmt = select(User).where(
            (User.id == user_id) & ((User.id == check_user.id) | (check_user.is_admin))
        )
        if not stmt:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this data",
            )

        user = await session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user


class AdminAccountsView:
    router = APIRouter(prefix="/api/admin/accounts", tags=["admin-accounts"])

    @router.get("/")
    async def list_accounts(session: AsyncSession = Depends(get_session)):
        users = await session.exec(select(User))
        await session.close()
        return {"result": users.all()}

    @router.get("/{account_id}")
    async def get_account(
        user_id: int,
        session: AsyncSession = Depends(get_session),
        check_user: User = Depends(get_current_user),
    ):
        stmt = select(User).where(
            (User.id == user_id) & ((User.id == check_user.id) | (check_user.is_admin))
        )
        if not stmt:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this data",
            )

        user = await session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user
