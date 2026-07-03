import asyncio
import base64
import secrets
from concurrent.futures import ThreadPoolExecutor
from hashlib import pbkdf2_hmac

from pydantic import BaseModel

from app.config import get_settings

_executor = ThreadPoolExecutor(max_workers=4)


class HashedPassword(BaseModel):
    salt: str
    hash: str


def _hash_password_sync(password: str, iterations: int) -> HashedPassword:
    salt_bytes = secrets.token_bytes(16)
    hash_bytes = pbkdf2_hmac("sha256", password.encode(), salt_bytes, iterations)
    return HashedPassword(
        salt=base64.b64encode(salt_bytes).decode(),
        hash=base64.b64encode(hash_bytes).decode(),
    )


async def hash_password(password: str) -> HashedPassword:
    settings = get_settings()
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(
        _executor,
        _hash_password_sync,
        password,
        settings.PASSWORD_HASH_ITERATIONS,
    )


def verify_password(password: str, salt_b64: str, hash_b64: str) -> bool:
    settings = get_settings()
    salt = base64.b64decode(salt_b64)
    stored_hash = base64.b64decode(hash_b64)
    new_hash = pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt,
        settings.PASSWORD_HASH_ITERATIONS,
    )
    return secrets.compare_digest(new_hash, stored_hash)
