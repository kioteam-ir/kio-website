from datetime import UTC, datetime, timedelta
from typing import Literal

from jose import JWTError, jwt
from pydantic import BaseModel, EmailStr

from app.config import get_settings
from app.core.exceptions import UnauthorizedError


class AccessTokenPayload(BaseModel):
    sub: str
    email: EmailStr
    is_admin: bool
    type: Literal["access"]
    exp: datetime


class RefreshTokenPayload(BaseModel):
    sub: str
    type: Literal["refresh"]
    exp: datetime


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: Literal["bearer"] = "bearer"


def create_access_token(*, user_id: int, email: str, is_admin: bool) -> str:
    settings = get_settings()
    expire = datetime.now(UTC) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": str(user_id),
        "email": email,
        "is_admin": is_admin,
        "type": "access",
        "exp": expire,
    }
    return str(jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM))


def create_refresh_token(*, user_id: int) -> str:
    settings = get_settings()
    expire = datetime.now(UTC) + timedelta(days=settings.REFRESH_EXPIRE_DAYS)
    payload = {"sub": str(user_id), "type": "refresh", "exp": expire}
    return str(jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM))


def decode_access_token(token: str) -> AccessTokenPayload:
    settings = get_settings()
    try:
        raw = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if raw.get("type") != "access":
            raise UnauthorizedError("Invalid or expired token")
        return AccessTokenPayload(
            sub=str(raw["sub"]),
            email=raw["email"],
            is_admin=bool(raw["is_admin"]),
            type="access",
            exp=datetime.fromtimestamp(int(raw["exp"]), UTC),
        )
    except (JWTError, KeyError, TypeError, ValueError) as exc:
        raise UnauthorizedError("Invalid or expired token") from exc


def decode_refresh_token(token: str) -> RefreshTokenPayload:
    settings = get_settings()
    try:
        raw = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if raw.get("type") != "refresh":
            raise UnauthorizedError("Invalid token type")
        return RefreshTokenPayload(
            sub=str(raw["sub"]),
            type="refresh",
            exp=datetime.fromtimestamp(int(raw["exp"]), UTC),
        )
    except (JWTError, KeyError, TypeError, ValueError) as exc:
        raise UnauthorizedError("Invalid refresh token") from exc
