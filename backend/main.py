from fastapi import APIRouter, FastAPI

from apps.urls import front_urls, admin_urls
from apps.db import Database
from apps.models import User

app = FastAPI()


class AccountsView:
    router = APIRouter(prefix="/accounts", tags=["accounts"])
    orm = Database(User)

    @router.get("/")
    async def list_accounts():
        lists = await AccountsView.orm.select_all()
        return {"msg": lists}
    
    @router.post("/")
    async def create_account(user: User):
        create = await AccountsView.orm.add_data(user)
        return user

    @router.get("/{account_id}")
    def get_account(account_id: int):
        return {"msg": f"details of {account_id}"}


accounts_view = AccountsView()
app.include_router(accounts_view.router)
