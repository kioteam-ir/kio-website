from fastapi import FastAPI, status, Request, Response

from conf import settings
from core import route


app = FastAPI()


@route(
    request_method=app.post,
    path="/api/login",
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.ACCOUNTS_SERVICE_URL,
    authentication_required=False,
    methods=None
)
async def login(login_data, request: Request, response: Response):
    pass


@route(
    request_method=app.post,
    path="/api/verify",
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.ACCOUNTS_SERVICE_URL,
)
async def verify(request: Request, response: Response):
    pass


@route(
    request_method=app.api_route,
    path="/api/admin/accounts/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.ACCOUNTS_SERVICE_URL,
    authentication_required=True,
    response_model=None,
)
async def proxy_admin_accounts(request: Request, response: Response):
    pass


@route(
    request_method=app.api_route,
    path="/api/front/accounts/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.ACCOUNTS_SERVICE_URL,
    authentication_required=False,
    response_model=None,
)
def proxy_front_accounts(request: Request, response: Response):
    pass


@route(
    request_method=app.api_route,
    path="/api/admin/projects/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.PROJECTS_SERVICE_URL,
    authentication_required=True,
    response_model=None,
)
async def proxy_admin_projects(request: Request, response: Response):
    pass


@route(
    request_method=app.api_route,
    path="/api/front/projects/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.PROJECTS_SERVICE_URL,
    authentication_required=False,
    response_model=None,
)
async def proxy_front_projects(request: Request, response: Response):
    pass


@route(
    request_method=app.api_route,
    path="/api/admin/{full_path:path}",
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.ACCOUNTS_SERVICE_URL,
    authentication_required=False,
    methods=["GET", "POST", "PUT", "DELETE"]
)
async def crudadmin(request: Request, response: Response):
    pass


@route(
    request_method=app.api_route,
    path="/api/front/blog/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="blog_data",
    service_url=settings.PROJECTS_SERVICE_URL,
    authentication_required=True,
    response_model=None,
)
async def proxy_front_blog(request: Request, response: Response):
    pass
