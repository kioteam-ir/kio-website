from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.database import get_session
from app.core.exceptions import NotFoundError
from app.modules.projects.models import Project
from app.modules.projects.repository import ProjectRepository
from app.modules.projects.schemas import ProjectCreate, ProjectListResponse, ProjectRead


class ProjectService:
    def __init__(self, session: AsyncSession) -> None:
        self._projects = ProjectRepository(session)

    async def create(self, data: ProjectCreate) -> ProjectRead:
        project = Project.model_validate(data)
        created = await self._projects.add(project)
        return ProjectRead.model_validate(created)

    async def list_projects(self) -> ProjectListResponse:
        return await self._projects.list_all() #type: ignore

    async def get_by_id(self, project_id: int) -> ProjectRead:
        project = await self._projects.get_by_id(project_id)
        if project is None:
            raise NotFoundError("Project not found")
        return ProjectRead.model_validate(project)

    async def update_status(self, project_id: int, is_done: bool) -> ProjectRead:
        project = await self._projects.get_by_id(project_id)
        if project is None:
            raise NotFoundError("Project not found")
        project.is_done = is_done
        updated_project = await self._projects.update(project)
        return ProjectRead.model_validate(updated_project)

    async def delete(self, project_id: int) -> None:
        project = await self._projects.get_by_id(project_id)
        if project is None:
            raise NotFoundError("Project not found")
        
        await self._projects.delete(project)


async def get_project_service(session: AsyncSession = Depends(get_session)) -> ProjectService:
    return ProjectService(session)
