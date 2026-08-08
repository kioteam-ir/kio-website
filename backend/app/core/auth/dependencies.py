from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.auth.jwt import decode_access_token
from app.core.database import get_session
from app.core.exceptions import ForbiddenError, UnauthorizedError
from app.modules.accounts.models import User
from app.modules.accounts.repository import UserRepository
from app.config import get_settings


settings = get_settings()


_bearer = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer),
    session: AsyncSession = Depends(get_session),
) -> User:
    repository = UserRepository(session)

    if settings.DEBUG:
        admin = await repository.get_by_email(settings.ADMIN_DEV_EMAIL)
        if admin is None:
            raise UnauthorizedError("User not found")
        return admin
    
    if credentials is None:
        raise UnauthorizedError("Authorization header missing")

    payload = decode_access_token(credentials.credentials)
    
    user = await repository.get_by_id(int(payload.sub))
    if user is None:
        raise UnauthorizedError("User not found")
    if not user.is_active:
        raise UnauthorizedError("User is inactive")
    return user


async def require_admin(user: User = Depends(get_current_user)) -> User:
    if not user.is_admin:
        raise ForbiddenError("Admin privileges required")
    return user
