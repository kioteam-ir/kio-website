from fastapi import FastAPI
from contextlib import asynccontextmanager


from routes import FrontBlogView

from config.database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

blog_front = FrontBlogView()
app.include_router(blog_front.router)
