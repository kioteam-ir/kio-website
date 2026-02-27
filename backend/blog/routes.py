from fastapi import APIRouter, Depends

from config.database import get_session
from schemas import AddBlog

from sqlmodel.ext.asyncio.session import AsyncSession


class FrontBlogView:
    router = APIRouter(prefix="/api/front/blog", tags=["front-blog"])

    @staticmethod
    @router.post("/")
    async def add_blog(data: AddBlog, session: AsyncSession = Depends(get_session)):
        pass
