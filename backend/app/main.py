from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from typing import cast

import redis.asyncio as aioredis
from crudadmin import CRUDAdmin
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import DeclarativeBase

from app.config import Settings, get_settings
from app.core.database import close_database, get_session, init_database
from app.core.exceptions import register_exception_handlers
from app.core.logging import configure_logging, get_logger
from app.core.middleware.rate_limit import RateLimitMiddleware, RedisTokenBucket
from app.models import Post, Project, User
from app.modules.accounts.router import admin_router as accounts_admin_router
from app.modules.accounts.router import auth_router
from app.modules.accounts.router import front_router as accounts_front_router
from app.modules.accounts.router import router as accounts_router
from app.modules.accounts.schemas import AdminCreateAccount, UserCreate
from app.modules.blog.router import admin_router as blog_admin_router
from app.modules.blog.router import front_router as blog_front_router
from app.modules.projects.router import admin_router as projects_admin_router
from app.modules.projects.router import front_router as projects_front_router

_registered_models = (User, Project, Post)
ModelType = type[DeclarativeBase]


class HealthResponse(BaseModel):
    status: str = "ok"


def _build_crud_admin(settings: Settings) -> CRUDAdmin:
    admin = CRUDAdmin(
        session=get_session,
        mount_path="/api/admin/",
        SECRET_KEY=settings.SECRET_KEY,
        initial_admin={
            "username": settings.CRUDADMIN_USERNAME,
            "password": settings.CRUDADMIN_PASSWORD,
        },
    )
    admin.add_view(
        model=cast("ModelType", User),
        create_schema=UserCreate,
        update_schema=AdminCreateAccount,
        allowed_actions={"view", "create", "update", "delete"},
    )
    return admin


def create_app(settings: Settings | None = None) -> FastAPI:
    configure_logging()
    runtime_settings = settings or get_settings()
    logger = get_logger(__name__)
    crud_admin = (
        _build_crud_admin(runtime_settings)
        if runtime_settings.CRUDADMIN_ENABLED
        else None
    )

    @asynccontextmanager
    async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
        _ = _registered_models
        await init_database()
        if crud_admin is not None:
            await crud_admin.initialize()
        logger.info("application_started")
        yield
        await close_database()
        redis_client = _app.state.redis_client
        if redis_client is not None:
            await redis_client.aclose()
        logger.info("application_stopped")

    app = FastAPI(
        title="KIO API",
        version="0.1.0",
        lifespan=lifespan,
    )

    register_exception_handlers(app)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=runtime_settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # TODO
    """
    getting CORS errors from frontend while connecting to backend.
    """
    if runtime_settings.RATE_LIMIT_ENABLED:
        redis_client = aioredis.Redis(
            host=runtime_settings.REDIS_HOST,
            port=runtime_settings.REDIS_PORT,
            decode_responses=True,
        )
        app.state.redis_client = redis_client
        bucket = RedisTokenBucket(
            redis_client,
            rate=runtime_settings.RATE_LIMIT_RATE,
            capacity=runtime_settings.RATE_LIMIT_CAPACITY,
        )
        app.add_middleware(RateLimitMiddleware, bucket=bucket)
    else:
        app.state.redis_client = None

    app.include_router(accounts_router)
    app.include_router(auth_router)
    app.include_router(accounts_front_router)
    app.include_router(accounts_admin_router)
    app.include_router(projects_front_router)
    app.include_router(projects_admin_router)
    app.include_router(blog_front_router)
    app.include_router(blog_admin_router)
    if crud_admin is not None:
        app.mount("/api/admin/", crud_admin.app)

    @app.get("/health", response_model=HealthResponse, tags=["system"])
    async def health() -> HealthResponse:
        return HealthResponse()

    return app
