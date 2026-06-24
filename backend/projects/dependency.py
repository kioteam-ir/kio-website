from fastapi.security import OAuth2PasswordBearer
from jose import jwt

from fastapi import Depends, HTTPException, status

from sqlmodel.ext.asyncio.session import AsyncSession

from config.database import get_session
from config.configs import settings as settings

import aiohttp
import async_timeout


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login", auto_error=False)


async def require_admin(
    token: str = Depends(oauth2_scheme),
    session: AsyncSession = Depends(get_session),
    ):
    if settings.DEBUG:
        return None
    headers = {
        "Authorization": f"Bearer {token}",
        "content-type": "application/json"
    }
    try:
        async with async_timeout.timeout(settings.GATEWAY_TIMEOUT):
            async with aiohttp.ClientSession() as aio_session:

                request = getattr(aio_session, "post")
                async with request(settings.ACCOUNTS_SERVICE_URL + "/auth/admin/", headers=headers) as response:

                    content_type = response.headers.get("Content-Type", "")
                    
                    if "application/json" in content_type:
                        resp_data = await response.json()
                    else:
                        resp_data = await response.text()

                    text = await response.text()

                    return resp_data, response.status
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    # user = await session.get(User, user_id)
    # if not user:
    #     raise HTTPException(status_code=401, detail="User not found")

    # return user
