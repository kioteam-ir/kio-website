from fastapi import APIRouter, Depends, status
from redis_fastapi import rate_limit

from app.core.auth.dependencies import get_current_user, require_admin
from app.core.auth.jwt import TokenPair
from app.modules.accounts.models import User
from app.modules.accounts.schemas import (
    AccessTokenRequest,
    AdminCheckResponse,
    AdminCreateAccount,
    LoginRequest,
    RefreshTokenRequest,
    TokenVerifyResponse,
    UserCreate,
    UserRead,
)
from app.modules.accounts.service import (
    AuthService,
    UserService,
    get_auth_service,
    get_user_service,
)

router = APIRouter(tags=["accounts"])


@router.post(
    "/api/login/",
    response_model=TokenPair,
    status_code=status.HTTP_200_OK,
    dependencies=[
        Depends(rate_limit("1/second", scope="login:burst")),
        Depends(rate_limit("5/minute", scope="login:sustained")),
    ],
)
async def login(
    credentials: LoginRequest,
    auth_service: AuthService = Depends(get_auth_service),
) -> TokenPair:
    return await auth_service.login(credentials)


auth_router = APIRouter(prefix="/auth", tags=["auth"])


@auth_router.post("/verify/", response_model=TokenVerifyResponse, status_code=status.HTTP_200_OK)
async def verify_token(
    user: User = Depends(get_current_user),
) -> TokenVerifyResponse:
    if user.id is None:
        from app.core.exceptions import UnauthorizedError

        raise UnauthorizedError("Invalid user state")
    return TokenVerifyResponse(sub=str(user.id), email=user.email, is_admin=user.is_admin)


@auth_router.post("/refresh/", response_model=TokenPair, status_code=status.HTTP_200_OK)
async def refresh_token(
    body: RefreshTokenRequest,
    auth_service: AuthService = Depends(get_auth_service),
) -> TokenPair:
    return await auth_service.refresh(body.refresh_token)


@auth_router.post("/admin/", response_model=AdminCheckResponse, status_code=status.HTTP_200_OK)
async def check_admin(
    body: AccessTokenRequest,
    auth_service: AuthService = Depends(get_auth_service),
) -> AdminCheckResponse:
    await auth_service.is_admin_token(body.access_token)
    return AdminCheckResponse()


front_router = APIRouter(prefix="/api/front/accounts", tags=["accounts-front"])


@front_router.post(
    "/",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
    dependencies=[
        Depends(rate_limit("1/second", scope="front_create_account:burst")),
        Depends(rate_limit("5/minute", scope="front_create_account:sustained")),
    ],
)
async def create_account(
    payload: UserCreate,
    user_service: UserService = Depends(get_user_service),
) -> UserRead:
    return await user_service.register(payload)


@front_router.get(
    "/{account_id}/",
    response_model=UserRead,
    dependencies=[
        Depends(rate_limit("2/second", scope="front_create_account:burst")),
        Depends(rate_limit("20/minute", scope="front_create_account:sustained")),
    ],
)
async def get_account(
    account_id: int,
    user_service: UserService = Depends(get_user_service),
    requester: User = Depends(get_current_user),
) -> UserRead:
    return await user_service.get_profile_for_requester(account_id, requester)


admin_router = APIRouter(prefix="/api/admin/accounts", tags=["accounts-admin"])


@admin_router.get("/", status_code=status.HTTP_200_OK)
async def list_accounts(
    user_service: UserService = Depends(get_user_service),
    _admin: User = Depends(require_admin),
) -> dict[str, list[UserRead]]:
    users = await user_service.list_users()
    return {"result": users}


@admin_router.get("/{user_id}/", response_model=UserRead)
async def get_account_admin(
    user_id: int,
    user_service: UserService = Depends(get_user_service),
    _admin: User = Depends(require_admin),
) -> UserRead:
    return await user_service.get_by_id(user_id)


@admin_router.post("/create-account/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_account_admin(
    payload: AdminCreateAccount,
    user_service: UserService = Depends(get_user_service),
    _admin: User = Depends(require_admin),
) -> UserRead:
    return await user_service.admin_create(payload)
