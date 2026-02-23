from urllib.parse import urljoin

from fastapi import FastAPI, status, Request, Response
from fastapi.responses import JSONResponse

from conf import settings
from core import route

from network import make_request
from schemas.accounts import LoginRequest, UserCreate

app = FastAPI()


@route(
    request_method=app.post,
    path="/api/login",
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.ACCOUNTS_SERVICE_URL,
    authentication_required=False,
    post_processing_func="auth.create_access_token",
    response_model="schemas.accounts.UserRead",
    methods=None
)
async def login(login_data: LoginRequest, request: Request, response: Response):
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
    methods=None,
    request_method=app.post,
    path="/api/accounts",
    status_code=status.HTTP_201_CREATED,
    payload_key="user",
    service_url=settings.ACCOUNTS_SERVICE_URL,
    authentication_required=True,
    authentication_token_decoder="auth.decode_access_token",
    service_authorization_checker="auth.is_admin_user",
    service_header_generator="auth.generate_request_header",
    response_model="schemas.accounts.UserRead",
)
async def create_user(user: UserCreate, request: Request, response: Response):
    pass


@route(
    request_method=app.api_route,
    path="/api/admin/accounts/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.ACCOUNTS_SERVICE_URL,
    authentication_required=False,
    post_processing_func="auth.create_access_token",
    response_model=None,
)
async def proxy_admin_accounts(request: Request, response: Response, **kwargs):
    pass


@route(
    request_method=app.api_route,
    path="/api/front/accounts/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.ACCOUNTS_SERVICE_URL,
    authentication_required=False,
    post_processing_func="auth.create_access_token",
    response_model=None,
)
def proxy_front_accounts(request: Request, response: Response, **kwargs):
    pass


@route(
    request_method=app.api_route,
    path="/api/admin/projects/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.PROJECTS_SERVICE_URL,
    authentication_required=False,
    post_processing_func="auth.create_access_token",
    response_model=None,
)
async def proxy_admin_projects(request: Request, response: Response, **kwargs):
    pass


@route(
    request_method=app.api_route,
    path="/api/front/projects/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.PROJECTS_SERVICE_URL,
    authentication_required=False,
    post_processing_func="auth.create_access_token",
    response_model=None,
)
async def proxy_front_projects(request: Request, response: Response, **kwargs):
    pass