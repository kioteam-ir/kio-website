from fastapi import FastAPI, status, Request, Response

from .conf import settings
from .core import route

from .schemas.accounts import LoginRequest, UserCreate

app = FastAPI()


@route(
    request_method=app.post,
    path="/api/login",
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.USERS_SERVICE_URL,
    authentication_required=False,
    post_processing_func="auth.create_access_token",
    response_model="schemas.accounts.UserRead",
)
async def login(login_data: LoginRequest, request: Request, response: Response):
    pass


@route(
    request_method=app.post,
    path="/api/users",
    status_code=status.HTTP_201_CREATED,
    payload_key="user",
    service_url=settings.USERS_SERVICE_URL,
    authentication_required=True,
    authentication_token_decoder="auth.decode_access_token",
    service_authorization_checker="auth.is_admin_user",
    service_header_generator="auth.generate_request_header",
    response_model="schemas.accounts.UserRead",
)
async def create_user(user: UserCreate, request: Request, response: Response):
    pass
