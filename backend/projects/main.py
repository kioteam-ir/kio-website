from fastapi import Depends, FastAPI, HTTPException
from contextlib import asynccontextmanager

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from models import Project
from schemas import AddProjects
from routes import ProjectsFrontAPIView

from config import settings
from config.database import get_session, init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(lifespan=lifespan)

project_front = ProjectsFrontAPIView()
app.include_router(project_front.router)