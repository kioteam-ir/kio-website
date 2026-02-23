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
)
async def login(login_data: LoginRequest, request: Request, response: Response):
    pass


@route(
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


async def gateway_proxy(
        request: Request, service_base_url: str
    ):
    base_url = service_base_url.rstrip("/")
    path = request.url.path

    url = f"{base_url}{path}"

    if request.url.query:
        url += f"?{request.url.query}"

    headers = dict(request.headers)
    headers.pop("host", None)
    headers.pop("content-length", None)

    body = None
    if request.method != "GET":
        try:
            body = await request.json()
        except:
            body = None

    data, status_code = await make_request(
        url=url,
        method=request.method.lower(),
        data=body,
        headers=headers
    )

    if isinstance(data, dict):
        return JSONResponse(
            content=data,
            status_code=status_code
        )

    return Response(
        content=data,
        status_code=status_code
    )


@app.api_route(
    "/api/admin/accounts/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"]
)
async def proxy_admin_accounts(request: Request):
    return await gateway_proxy(
        request,
        settings.ACCOUNTS_SERVICE_URL
    )


@app.api_route(
    "/api/front/accounts/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"]
)
async def proxy_front_accounts(request: Request):
    return await gateway_proxy(
        request,
        settings.ACCOUNTS_SERVICE_URL
    )


@app.api_route(
    "/api/admin/projects/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"]
)
async def proxy_admin_projects(request: Request):
    return await gateway_proxy(
        request,
        settings.PROJECTS_SERVICE_URL
    )


@app.api_route(
    "/api/front/projects/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"]
)
async def proxy_front_projects(request: Request):
    return await gateway_proxy(
        request,
        settings.PROJECTS_SERVICE_URL
    )
