from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from fastapi import Depends, HTTPException, status

from sqlmodel.ext.asyncio.session import AsyncSession

from models import User
from config.database import get_session
from config import settings as settings


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login", auto_error=False)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: AsyncSession = Depends(get_session),
    ):
    if settings.DEBUG:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id_raw = payload.get("sub")
        assert user_id_raw is not None, "JWT missing sub"
        user_id: int = user_id_raw
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


async def require_admin(
    current_user: User | None = Depends(get_current_user),
    ):
    if current_user is None:
        return None
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user