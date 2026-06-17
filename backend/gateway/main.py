from fastapi import FastAPI, HTTPException, status, Request, Response
from fastapi.responses import JSONResponse
import redis.asyncio as redis

from conf import settings
from core import route
from middleware import RedisTokenBucket


app = FastAPI()
redis_client = redis.Redis(host="redis", port=6379, decode_responses=True)

bucket = RedisTokenBucket(redis_client, rate=1, capacity=10)


@app.middleware("http")
async def tocken_buscket_middleware(request: Request, call_next):
    client_ip = request.client
    key = f"rate_limit:{client_ip}"

    allowed = await bucket.allow_request(key)

    if not allowed:
      return JSONResponse(
            status_code=429,
            content={"detail": "Too Many Requests"}
        )

    return await call_next(request)


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


@route(
    request_method=app.api_route,
    path="/api/admin/blog/{full_path:path}",
    methods=["GET", "POST", "PUT", "DELETE"],
    status_code=status.HTTP_201_CREATED,
    payload_key="login_data",
    service_url=settings.BLOG_SERVICE_URL,
    authentication_required=True,
    response_model=None,
)
async def proxy_admin_blog(request: Request, response: Response):
    pass
