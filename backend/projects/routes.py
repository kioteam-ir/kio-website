from fastapi import APIRouter, Depends

from config.database import get_session


class ProjectsFrontAPIView():

    router = APIRouter(prefix="api/front/projcets")

    async def request_projects(data: ..., session = Depends(get_session)):
        pass