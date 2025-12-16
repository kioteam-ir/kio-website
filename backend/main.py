from fastapi import APIRouter, Depends, FastAPI, status, HTTPException
from contextlib import asynccontextmanager
import secrets

from sqlmodel import select, or_
from sqlmodel.ext.asyncio.session import AsyncSession

from apps.db import drop_data, get_session, init_db
from apps.db import User
from apps.models import UserCreate
from utils.accounts import get_password_hash


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await drop_data()

app = FastAPI(lifespan=lifespan)

class AccountsView:
    router = APIRouter(prefix="/api/accounts", tags=["accounts"])

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
        password = get_password_hash(user.password)
        user.password = password["hash"]
        user.salt = password["salt"]
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email and Phone number already exists"
            )
        db_user = User(**user.model_dump())
        session.add(db_user)
        await session.commit()
        return db_user
        

    @router.get("/{account_id}")
    def get_account(account_id: int):

        return {"msg": f"details of {account_id}"}


accounts_view = AccountsView()
app.include_router(accounts_view.router)
