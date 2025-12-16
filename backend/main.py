from fastapi import FastAPI
from contextlib import asynccontextmanager

from config.database import init_db

from apps.accounts.routes import AccountsView


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)


accounts_view = AccountsView()
app.include_router(accounts_view.router)
