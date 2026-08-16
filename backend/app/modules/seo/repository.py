from sqlmodel import col, select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.modules.seo.models import MainContent


class SeoReporitory:

    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    
    async def get_content(self, id: int) -> MainContent | None:
        statement = select(MainContent).where(col(MainContent.id) == id)
        result = await self._session.exec(statement)
        return result.first()

    async def add(self, data: MainContent) -> MainContent:
        self._session.add(data)
        await self._session.commit()
        await self._session.refresh(data)
        return data
    
    async def update(self, data: MainContent) -> MainContent:
        self._session.add(data)
        await self._session.commit()
        await self._session.refresh(data)
        return data

    async def delete(self, data: MainContent) -> None:
        await self._session.delete(data)
        await self._session.commit()
