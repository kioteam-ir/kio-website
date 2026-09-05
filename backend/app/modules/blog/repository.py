from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import col, select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.modules.blog.models import Post, Subscription


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


class SubscriptionRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_email(self, email: str) -> Subscription | None:
        statement = select(Subscription).where(col(Subscription.email) == email)
        result = await self._session.exec(statement)
        return result.first()

    async def get_by_id(self, id: int) -> Subscription | None:
        statement = select(Subscription).where(col(Subscription.id) == id)
        result = await self._session.exec(statement)
        return result.first()

    async def add(self, subscription: Subscription) -> Subscription:
        self._session.add(subscription)
        await self._session.commit()
        await self._session.refresh(subscription)
        return subscription

    async def list_all(self) -> list[Subscription]:
        query = select(Subscription)
        return await paginate(self._session, query) #type: ignore

    async def delete(self, data: Subscription) -> None:
        await self._session.delete(data)
        await self._session.commit()