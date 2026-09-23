from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.database import get_session
from app.core.exceptions import ConflictError, NotFoundError, UnauthorizedError
from app.modules.accounts.models import User
from app.modules.accounts.repository import UserRepository
from app.modules.blog.models import Post, Subscription
from app.modules.blog.repository import PostRepository, SubscriptionRepository
from app.modules.blog.schemas import EmailSubscriptions, ListSubscriptions, PostCreate, PostRead


class BlogService:
    def __init__(self, session: AsyncSession) -> None:
        self._posts = PostRepository(session)
        self._users = UserRepository(session)

    async def create_post(self, data: PostCreate, author: User) -> PostRead:
        if author.id is None:
            raise UnauthorizedError("Invalid author state")

        verified = await self._users.get_by_id(author.id)
        if verified is None:
            raise UnauthorizedError("User not found")
        if not verified.is_active:
            raise UnauthorizedError("User is inactive")

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

    async def list_published_posts(self) -> list[Post]:
        return await self._posts.list_published()

    async def get_published_post(self, slug: str) -> PostRead:
        post = await self._posts.get_published_by_slug(slug)
        if post is None:
            raise NotFoundError("Post not found")
        return PostRead.model_validate(post)


async def get_blog_service(session: AsyncSession = Depends(get_session)) -> BlogService:
    return BlogService(session)


class SubscriptionService:
    def __init__(self, session: AsyncSession) -> None:
        self._subscriptions = SubscriptionRepository(session)

    async def add_subscriptions(self, data: EmailSubscriptions) -> EmailSubscriptions:
        existing = await self._subscriptions.get_email(data.email)
        if existing is not None:
            raise ConflictError("Email already exists")

        subscription = Subscription(email=data.email)
        created = await self._subscriptions.add(subscription)
        return EmailSubscriptions.model_validate(created, from_attributes=True)

    async def subscriptions_list(self) -> ListSubscriptions:
        return await self._subscriptions.list_all()  # type: ignore

    async def delete_subscription(self, sub_id: int) -> None:
        result = await self._subscriptions.get_by_id(sub_id)
        if result is None:
            raise NotFoundError("Post not found")
        return await self._subscriptions.delete(result)


async def get_sub_service(session: AsyncSession = Depends(get_session)) -> SubscriptionService:
    return SubscriptionService(session)
