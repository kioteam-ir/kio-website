from fastapi import APIRouter, Depends, FastAPI, status, HTTPException
from contextlib import asynccontextmanager

from sqlmodel import select, or_
from sqlmodel.ext.asyncio.session import AsyncSession

from apps.db import get_session, init_db
from apps.db import User
from apps.models import LoginRequest, UserCreate
from utils.accounts import create_access_token, create_refresh_token, get_current_user, hash_password_async, verify_password


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

class AccountsView:
    router = APIRouter(prefix="/api/accounts", tags=["accounts"])

    @router.post("/login")
    async def login(
        login_data: LoginRequest,
        session: AsyncSession = Depends(get_session)
    ):
        
        stmt = select(User).where(User.email == login_data.email)
        user = (await session.exec(stmt)).first()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        if not verify_password(login_data.password, user.salt, user.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        access_token = create_access_token({"sub": str(user.id)})
        refresh_token = create_refresh_token(user.id)
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }

    @router.get("/")
    async def list_accounts(session: AsyncSession = Depends(get_session)):
        users = await session.exec(select(User))
        await session.close()
        return {"result": users.all()}
    
    @router.post("/")
    async def create_account(user: UserCreate, session: AsyncSession = Depends(get_session)):
        if user.phone_number is not None:
            stmt = select(User).where(or_(User.email == user.email, User.phone_number == user.phone_number))
        else:    
            stmt = select(User).where(User.email == user.email)

        result = await session.exec(stmt)
        existing_user = result.first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email and Phone number already exists"
            )
        
        password = await hash_password_async(user.password)
        user.password = password["hash"]
        user.salt = password["salt"]

        db_user = User(**user.model_dump())
        session.add(db_user)
        await session.commit()
        return db_user
        

    @router.get("/{account_id}")
    async def get_account(user_id: int, session: AsyncSession = Depends(get_session), check_user: User = Depends(get_current_user)):
        stmt = select(User).where(
            (User.id == user_id) &
            ((User.id == check_user.id) | (check_user.is_admin))
        )
        if not stmt:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this data"
            )

        user = await session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user

accounts_view = AccountsView()
app.include_router(accounts_view.router)
