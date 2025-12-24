import asyncio
import base64
from hashlib import pbkdf2_hmac
import secrets
from typing import Optional
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from sqlmodel.ext.asyncio.session import AsyncSession

from .models import User, get_user_permissions_from_db
from config.database import get_session
import config.settings as settings

from concurrent.futures import ThreadPoolExecutor


ITERATIONS = settings.ITERATIONS

execute = ThreadPoolExecutor()

def hash_password_sync(password: str):
    salt = secrets.token_bytes(16)
    hash_bytes = pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt,
        ITERATIONS
    )
    return {
        "salt": base64.b64encode(salt).decode(),
        "hash": base64.b64encode(hash_bytes).decode(),
    }

async def hash_password_async(password: str) -> bytes:
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(execute, hash_password_sync, password)


def verify_password(password: str, salt_b64: str, hash_b64: str) -> bool:
    salt = base64.b64decode(salt_b64)
    stored_hash = base64.b64decode(hash_b64)

    new_hash = pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt,
        ITERATIONS
    )

    return secrets.compare_digest(new_hash, stored_hash)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: AsyncSession = Depends(get_session),
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


async def create_access_token(user: User, session: AsyncSession = Depends(get_session), expires_minutes: Optional[int] = None) -> str:
    permissions = await get_user_permissions_from_db(user, session)
    payload = {
        "sub": str(user.id),
        "email": user.email,
        "permissions": permissions,
        "is_admin": user.is_admin,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    }

    return jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)


async def create_refresh_token(user_id: int):
    expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_EXPIRE_DAYS)
    payload = {
        "sub": str(user_id),
        "exp": expire,
        "type": "refresh"
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
