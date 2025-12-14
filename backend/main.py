from fastapi import APIRouter, Depends, FastAPI
from contextlib import asynccontextmanager
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from apps.db import Account, get_session, init_db
from apps.models import User

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

class AccountsView:
    router = APIRouter(prefix="/accounts", tags=["accounts"])
    orm = Account(User)

    @router.get("/")
    async def list_accounts(session: AsyncSession = Depends(get_session)):
        users = session.exec(select(User))
        return {"result": users.all()}
    
    @router.post("/")
    async def create_account(user: User):
        create = await AccountsView.orm.create_user(user)
        return create

    @router.get("/{account_id}")
    def get_account(account_id: int):

        return {"msg": f"details of {account_id}"}


accounts_view = AccountsView()
app.include_router(accounts_view.router)
