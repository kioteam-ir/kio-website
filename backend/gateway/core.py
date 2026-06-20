import functools

from importlib import import_module
from fastapi import Request, Response, HTTPException, status
from typing import Any, List

from network import make_request
from conf import settings


# async def verify_token_remote(token: str):
#     try:
#         if token.startswith("Bearer "):
#             token = token

#         resp_data, status_code = await make_request(
#             url=f"{settings.ACCOUNTS_SERVICE_URL}/verify",
#             method="post",
#             data={},
#             headers={
#                 "Authorization": token
#             },
#         )

#         if status_code != 200:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Unauthorized"
#             )

#         return resp_data

#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
#             detail="Auth service unavailable"
#         )


def route(
    request_method,
    path: str,
    status_code: int,
    payload_key: str,
    service_url: str,
    methods: List | None = None,
    authentication_required: bool = True,
    post_processing_func: str | None = None,
    response_model: Any = None,
    response_list: bool = False,
):
    """
    it is an advanced wrapper for FastAPI router, purpose is to make FastAPI
    acts as a gateway API in front of anything

    Args:
        request_method: is a callable like (app.get, app.post and so on.)
        path: is the path to bind (like app.post('/api/users/'))
        status_code: expected HTTP(status.HTTP_200_OK) status code
        payload_key: used to easily fetch payload data in request body
        authentication_required: is bool to give to user an auth priviliges
        post_processing_func: does extra things once in-network service returns
        authentication_token_decoder: decodes JWT token as a proper payload
        service_authorization_checker: does simple front authorization checks
        service_header_generator: generates headers for inner services from jwt token payload # noqa
        response_model: shows return type and details on api docs
        response_list: decides whether response structure is list or not

    Returns:
        wrapped endpoint result as is

    """

    # request_method: app.post || app.get or so on
    # app_any: app.post('/api/login', status_code=200, response_model=int)
    if settings.DEBUG:
        authentication_required = False

    if response_model:
        response_model = import_function(response_model)
        if response_list:
            response_model = List[response_model]
    kwargs = {
        "path": path,
        "status_code": status_code,
    }

    if methods is not None:
        kwargs["methods"] = methods

    if response_model is not None:
        kwargs["response_model"] = response_model

    app_any = request_method(**kwargs)

    def wrapper(f):
        @app_any
        @functools.wraps(f)
        async def inner(request: Request, response: Response, **kwargs):
            # ۱. فقط هدرهایی که کلید و مقدار معتبر دارند را کپی کنید
            service_headers = {}

            # ۲. هدر Host کلاینت را حذف کنید (چون با آدرس میکروسرویس داخلی تداخل ایجاد می‌کند)
            if "host" in service_headers:
                del service_headers["host"]

            if authentication_required:
                authorization = request.headers.get("authorization")
                if not authorization:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Authorization header missing"
                    )
                service_headers["authorization"] = str(authorization)

            scope = request.scope
            method = scope["method"].lower()
            path = scope["path"]
            url = f"{service_url}{path}"

            payload = await request.json()

            try:
                resp_data, status_code_from_service = await make_request(
                    url=url,
                    method=method,
                    data=payload,
                    headers=service_headers,
                )
            except Exception as e:
                import traceback
                traceback.print_exc()

                raise HTTPException(
                    status_code=500,
                    detail=str(e)
                )
            response.status_code = status_code_from_service

            if all([status_code_from_service == status_code, post_processing_func]):
                post_processing_f = import_function(post_processing_func)
                resp_data = post_processing_f(resp_data)

            return resp_data

    return wrapper


def import_function(method_path) -> Any:
    module, method = method_path.rsplit(".", 1)
    mod = import_module(module)
    return getattr(mod, method, lambda *args, **kwargs: None)
