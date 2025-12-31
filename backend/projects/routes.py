from fastapi import APIRouter, Depends

from config.database import get_session
from models import Project
from schemas import AddProjects


class ProjectsFrontAPIView():

    router = APIRouter(prefix="/api/front/projcets")

    @router.post("/")
    async def request_projects(data: AddProjects, session = Depends(get_session)):
        query = Project(**data.model_dump())
        session.add(query)
        await session.commit()
        return query
