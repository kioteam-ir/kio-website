from sqlmodel import SQLModel, Field
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from typing import AsyncGenerator

DATABASE_URL = "sqlite+aiosqlite:///database.db"

engine = create_async_engine(DATABASE_URL, echo=True)

async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def drop_data():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str  = Field(unique=True)
    password: str = Field(min_length=8)
    phone_number: str | None = Field(default=None, unique=True, nullable=True)
    first_name: str = Field(nullable=True)
    last_name: str = Field(nullable=True)
