from sqlmodel import SQLModel, select
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


class BaseDatabase:
    def __init__(self, model: SQLModel):
        self.model = model


class Account(BaseDatabase):

    def __init__(self, model):
        super().__init__(model)

    # async def create_user(self, instance: SQLModel):
    #     async with Session(self.engine) as session:
    #         session.add(instance)
    #         session.commit()

    # async def select_all(self):
        # async with Session(self.engine) as session:
        #     statement = select(self.model)
        #     results = session.exec(statement)
        #     return results.all()
        