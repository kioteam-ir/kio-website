from fastapi import FastAPI
from contextlib import asynccontextmanager


from routes import ProjectsAdminAPIView, ProjectsFrontAPIView

from config.database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

project_front = ProjectsFrontAPIView()
project_admin = ProjectsAdminAPIView()
app.include_router(project_front.router)
app.include_router(project_admin.router)
