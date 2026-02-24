import asyncio
import base64
from hashlib import pbkdf2_hmac
import secrets
from typing import Dict, Optional
from jose import jwt
from datetime import datetime, timedelta, timezone

from sqlmodel.ext.asyncio.session import AsyncSession

from models import User, get_user_permissions_from_db
from config.configs import settings as settings
from concurrent.futures import ThreadPoolExecutor


ITERATIONS = settings.ITERATIONS
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM

execute = ThreadPoolExecutor()

def hash_password_sync(password: str):
    salt = secrets.token_bytes(16)
    hash_bytes = pbkdf2_hmac("sha256", password.encode(), salt, ITERATIONS)
    return {
        "salt": base64.b64encode(salt).decode(),
        "hash": base64.b64encode(hash_bytes).decode(),
    }


async def hash_password_async(password: str) -> Dict[str, str]:
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(execute, hash_password_sync, password)


def verify_password(password: str, salt_b64: str, hash_b64: str) -> bool:
    salt = base64.b64decode(salt_b64)
    stored_hash = base64.b64decode(hash_b64)

    new_hash = pbkdf2_hmac("sha256", password.encode(), salt, ITERATIONS)

    return secrets.compare_digest(new_hash, stored_hash)


async def create_access_token(
    user: User,
    session: AsyncSession,
    expires_minutes: Optional[int] = None,
    ) -> str:
    permissions = await get_user_permissions_from_db(user, session)
    payload = {
        "sub": str(user.id),
        "email": user.email,
        "permissions": permissions,
        "is_admin": user.is_admin,
        "type": "access",
        "exp": datetime.now(timezone.utc)
        + timedelta(minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


async def create_refresh_token(user_id: int):
    expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_EXPIRE_DAYS)
    payload = {"sub": str(user_id), "exp": expire, "type": "refresh"}
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
