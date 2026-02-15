from fastapi import APIRouter, Depends
from sqlmodel import select

from config.database import get_session
from models import Project
from schemas import AddProjects


class ProjectsFrontAPIView:
    router = APIRouter(prefix="/api/front/projects")

    @router.post("/")
    async def request_projects(data: AddProjects, session=Depends(get_session)):
        query = Project(**data.model_dump())
        session.add(query)
        await session.commit()
        return query


class ProjectsAdminAPIView:
    router = APIRouter(prefix="/api/admin/projects")

    @router.post("/")
    async def request_projects(data: AddProjects, session=Depends(get_session)):
        query = Project(**data.model_dump())
        session.add(query)
        await session.commit()
        return query

    @router.get("/list/")
    async def prohects_list(session=Depends(get_session)):
        query = await session.exec(select(Project))
        await session.close()
        return {"result": query.all()}

    @router.get("/{project_id}/")
    async def prohects_retrieve(project_id: int, session=Depends(get_session)):
        query = await session.get(Project, project_id)
        await session.close()
        return query
