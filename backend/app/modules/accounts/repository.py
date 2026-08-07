from sqlmodel import col, or_, select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.modules.accounts.models import User
from app.config import get_settings

settings = get_settings()


class UserRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_by_id(self, user_id: int) -> User | None:
        return await self._session.get(User, user_id)

    async def get_by_email(self, email: str) -> User | None:
        statement = select(User).where(col(User.email) == email)
        result = await self._session.exec(statement)
        return result.first()

    async def find_by_email_or_phone(self, email: str, phone_number: str | None) -> User | None:
        if phone_number is not None:
            statement = select(User).where(
                or_(col(User.email) == email, col(User.phone_number) == phone_number),
            )
        else:
            statement = select(User).where(col(User.email) == email)
        result = await self._session.exec(statement)
        return result.first()

    async def list_all(self) -> list[User]:
        statement = select(User)
        result = await self._session.exec(statement)
        return list(result.all())

    async def add(self, user: User) -> User:
        self._session.add(user)
        await self._session.commit()
        await self._session.refresh(user)
        return user


async def initial_dev_admin(session: AsyncSession, user: User):
    statement = select(User).where(col(User.email) == user.email)
    result = await session.exec(statement)
    result = result.first()
    if result is None:
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return user
    return result
