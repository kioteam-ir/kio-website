from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.database import get_session
from app.core.exceptions import NotFoundError
from app.modules.seo.schemas import WriteMainContent

from .models import MainContent
from .repository import SeoReporitory


class SeoService:

    def __init__(self, session: AsyncSession) -> None:
        self._seo = SeoReporitory(session)

    async def main_content(self, data: WriteMainContent) -> WriteMainContent:
        content = MainContent(title=data.title, description=data.description)
        check = await self._seo.get_content(content_id=1)
        if check is None:
            created = await self._seo.add(content)
        else:
            created = await self._seo.update(check)
        print(created)
        return WriteMainContent.model_validate(created)

    async def delete_content(self, content_id: int) -> None:
        data = await self._seo.get_content(content_id)
        if data is None:
            raise NotFoundError("Project not found")
        
        await self._seo.delete(data)

async def get_seo_service(session: AsyncSession = Depends(get_session)):
    return SeoService(session)