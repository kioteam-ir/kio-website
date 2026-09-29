from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.database import get_session
from app.core.exceptions import NotFoundError
from app.modules.seo.schemas import ReadMainContent, WriteMainContent

from .models import MainContent
from .repository import SeoReporitory


class SeoService:
    def __init__(self, session: AsyncSession) -> None:
        self._seo = SeoReporitory(session)

    async def get_main_content(self) -> ReadMainContent:
        content = await self._seo.get_first()
        if content is None:
            raise NotFoundError("Main content not found")
        return ReadMainContent.model_validate(content)

    async def main_content(self, data: WriteMainContent) -> ReadMainContent:
        check = await self._seo.get_first()
        if check is None:
            content = MainContent(title=data.title, description=data.description)
            created = await self._seo.add(content)
        else:
            check.title = data.title
            check.description = data.description
            created = await self._seo.update(check)
        return ReadMainContent.model_validate(created)

    async def delete_content(self, content_id: int) -> None:
        data = await self._seo.get_content(content_id)
        if data is None:
            raise NotFoundError("Main content not found")

        await self._seo.delete(data)


async def get_seo_service(session: AsyncSession = Depends(get_session)):
    return SeoService(session)
