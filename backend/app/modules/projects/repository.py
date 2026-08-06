from fastapi_pagination import paginate
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.modules.projects.models import Project


class ProjectRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_by_id(self, project_id: int) -> Project | None:
        return await self._session.get(Project, project_id)

    async def list_all(self) -> list[Project]:
        query = select(Project)
        return await paginate(self._session, query)

    async def add(self, project: Project) -> Project:
        self._session.add(project)
        await self._session.commit()
        await self._session.refresh(project)
        return project

    async def update(self, project: Project) -> Project:
        self._session.add(project)
        await self._session.commit()
        await self._session.refresh(project)
        return project
