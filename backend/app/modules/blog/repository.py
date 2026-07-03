from sqlmodel import col, select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.modules.blog.models import Post


class PostRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_by_slug(self, slug: str) -> Post | None:
        statement = select(Post).where(col(Post.slug) == slug)
        result = await self._session.exec(statement)
        return result.first()

    async def add(self, post: Post) -> Post:
        self._session.add(post)
        await self._session.commit()
        await self._session.refresh(post)
        return post
