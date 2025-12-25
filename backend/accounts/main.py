from fastapi import Depends, FastAPI, HTTPException
from contextlib import asynccontextmanager

from jose import JWTError, jwt
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from models import User
from schemas import LoginRequest, UserCreate
from utils import create_access_token, create_refresh_token, verify_password
from routes import FrontAccountsView, AdminAccountsView

from config import settings
from config.database import get_session, init_db

from crudadmin import CRUDAdmin


admin = CRUDAdmin(
    session=get_session,
    mount_path="/api/admin",
    SECRET_KEY=settings.SECRET_KEY,
    initial_admin={
        "username": "yasin",
        "password": "ya.1384.1214"
    }
)

admin.add_view(
    model=User,
    create_schema=UserCreate,
    update_schema=UserCreate,
    allowed_actions={"view", "create", "update", "delete"}
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    await admin.initialize()
    yield

app = FastAPI(lifespan=lifespan)


@app.post("/login")
async def login(login_data: LoginRequest,session: AsyncSession = Depends(get_session)):
    stmt = select(User).where(User.email == login_data.email)
    user = (await session.exec(stmt)).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(login_data.password, user.salt, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = await create_access_token(user)
    refresh_token = await create_refresh_token(user.id)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


@app.post("/refresh")
async def refresh_token(refresh_token: str, session: AsyncSession = Depends(get_session)):
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, settings.ALGORITHM)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user_id = int(payload["sub"])
    stmt = select(User).where(User.id == user_id)
    user = (await session.exec(stmt)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    access_token = await create_access_token(user, session)
    new_refresh_token = await create_refresh_token(user.id)

    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }


front_accounts_view = FrontAccountsView()
admin_accounts_view = AdminAccountsView()
app.include_router(admin_accounts_view.router)
app.include_router(front_accounts_view.router)
app.mount("/api/admin", admin.app)
