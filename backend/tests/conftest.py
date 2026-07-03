from collections.abc import AsyncGenerator

import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker, create_async_engine
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

from app.config import get_settings
from app.core.database import get_session
from app.main import create_app
from app.models import Post, Project, User

_registered_models = (User, Project, Post)


@pytest.fixture(autouse=True)
def _test_env(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("SECRET_KEY", "test-secret-key-32-chars-minimum!")
    monkeypatch.setenv("DB_USER", "test")
    monkeypatch.setenv("DB_PASSWORD", "test")
    monkeypatch.setenv("CRUDADMIN_USERNAME", "admin")
    monkeypatch.setenv("CRUDADMIN_PASSWORD", "admin-pass")
    monkeypatch.setenv("RATE_LIMIT_ENABLED", "false")
    get_settings.cache_clear()


@pytest.fixture
async def engine() -> AsyncGenerator[AsyncEngine]:
    async_engine = create_async_engine(
        "sqlite+aiosqlite:///:memory:",
        connect_args={"check_same_thread": False},
    )
    async with async_engine.begin() as connection:
        await connection.run_sync(SQLModel.metadata.create_all)
    yield async_engine
    await async_engine.dispose()


@pytest.fixture
async def session(engine: AsyncEngine) -> AsyncGenerator[AsyncSession]:
    factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with factory() as db_session:
        yield db_session


@pytest.fixture
async def client(
    session: AsyncSession,
    monkeypatch: pytest.MonkeyPatch,
) -> AsyncGenerator[AsyncClient]:
    from app.config import Settings

    async def noop_database_op() -> None:
        return None

    monkeypatch.setattr("app.main.init_database", noop_database_op)
    monkeypatch.setattr("app.main.close_database", noop_database_op)

    test_settings = Settings(
        DEBUG=True,
        SECRET_KEY="test-secret-key-32-chars-minimum!",
        ALGORITHM="HS256",
        ACCESS_TOKEN_EXPIRE_MINUTES=60,
        REFRESH_EXPIRE_DAYS=7,
        PASSWORD_HASH_ITERATIONS=10_000,
        DB_HOST="localhost",
        DB_PORT=5432,
        DB_USER="test",
        DB_PASSWORD="test",
        DB_NAME="test",
        REDIS_HOST="localhost",
        REDIS_PORT=6379,
        CRUDADMIN_USERNAME="admin",
        CRUDADMIN_PASSWORD="admin-pass",
        CRUDADMIN_ENABLED=False,
        CORS_ORIGINS=["http://localhost:5173"],
        RATE_LIMIT_ENABLED=False,
    )
    application = create_app(settings=test_settings)

    _ = _registered_models

    async def override_session() -> AsyncGenerator[AsyncSession]:
        yield session

    application.dependency_overrides[get_session] = override_session

    transport = ASGITransport(app=application)
    async with AsyncClient(transport=transport, base_url="http://test") as http_client:
        yield http_client

    application.dependency_overrides.clear()
    get_settings.cache_clear()
