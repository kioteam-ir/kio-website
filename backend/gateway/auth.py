import asyncio
import base64
from hashlib import pbkdf2_hmac
import secrets

from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from conf import settings

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


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = {
            "id": user_id,
            "email": payload.get("email"),
            "permissions": payload.get("permissions", []),
            "is_admin": payload.get("is_admin", False)
        }
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return user


async def create_access_token(user: dict, expires_minutes: int = None) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    payload = {
        "sub": str(user["id"]),
        "email": user.get("email"),
        "permissions": user.get("permissions", []),
        "is_admin": user.get("is_admin", False),
        "type": "access",
        "exp": expire
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


async def create_refresh_token(user_id: int):
    expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_EXPIRE_DAYS)
    payload = {
        "sub": str(user_id),
        "exp": expire,
        "type": "refresh"
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
