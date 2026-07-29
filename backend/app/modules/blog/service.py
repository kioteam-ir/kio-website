from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.database import get_session
from app.core.exceptions import ConflictError
from app.modules.accounts.models import User
from app.modules.blog.models import Post
from app.modules.blog.repository import PostRepository
from app.modules.blog.schemas import PostCreate, PostRead


class BlogService:
    def __init__(self, session: AsyncSession) -> None:
        self._posts = PostRepository(session)

    async def create_post(self, data: PostCreate, author: User) -> PostRead:
        if author.id is None:
            from app.core.exceptions import UnauthorizedError

            raise UnauthorizedError("Invalid author state")

        existing = await self._posts.get_by_slug(data.slug)
        if existing is not None:
            raise ConflictError("Slug already exists")

        post = Post(
            author_id=author.id,
            title=data.title,
            meta_title=data.meta_title,
            slug=data.slug,
            summary=data.summary,
            content=data.content,
        )
        created = await self._posts.add(post)
        return PostRead.model_validate(created)


async def get_blog_service(session: AsyncSession = Depends(get_session)) -> BlogService:
    return BlogService(session)
