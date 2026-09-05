from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.auth.jwt import (
    TokenPair,
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)
from app.core.auth.password import hash_password, verify_password
from app.core.database import get_session
from app.core.exceptions import ConflictError, NotFoundError, UnauthorizedError
from app.modules.accounts.models import User
from app.modules.accounts.repository import UserRepository, initial_dev_admin
from app.modules.accounts.schemas import (
    AdminCreateAccount,
    LoginRequest,
    UserCreate,
    UserRead,
)


class AuthService:
    def __init__(self, session: AsyncSession) -> None:
        self._users = UserRepository(session)

    async def login(self, credentials: LoginRequest) -> TokenPair:
        user = await self._users.get_by_email(credentials.email)
        if user is None:
            raise UnauthorizedError("Invalid credentials")
        if not verify_password(credentials.password, user.salt, user.password):
            raise UnauthorizedError("Invalid credentials")
        if user.id is None:
            raise UnauthorizedError("Invalid user state")
        return self._build_token_pair(user)

    async def refresh(self, refresh_token: str) -> TokenPair:
        payload = decode_refresh_token(refresh_token)
        user = await self._users.get_by_id(int(payload.sub))
        if user is None:
            raise NotFoundError("User not found")
        if user.id is None:
            raise UnauthorizedError("Invalid user state")
        return self._build_token_pair(user)

    async def is_admin_token(self, access_token: str) -> bool:
        from app.core.auth.jwt import decode_access_token

        payload = decode_access_token(access_token)
        user = await self._users.get_by_id(int(payload.sub))
        if user is None:
            raise UnauthorizedError("User not found")
        if not user.is_admin:
            raise UnauthorizedError("Admin privileges required")
        return True

    def _build_token_pair(self, user: User) -> TokenPair:
        if user.id is None:
            raise UnauthorizedError("Invalid user state")
        return TokenPair(
            access_token=create_access_token(
                user_id=user.id,
                email=user.email,
                is_admin=user.is_admin,
            ),
            refresh_token=create_refresh_token(user_id=user.id),
        )


class UserService:
    def __init__(self, session: AsyncSession) -> None:
        self._users = UserRepository(session)

    async def register(self, data: UserCreate) -> UserRead:
        existing = await self._users.find_by_email_or_phone(data.email, data.phone_number)
        if existing is not None:
            raise ConflictError("Email or phone number already exists")
        return await self._create_user(data)

    async def admin_create(self, data: AdminCreateAccount) -> UserRead:
        existing = await self._users.find_by_email_or_phone(data.email, data.phone_number)
        if existing is not None:
            raise ConflictError("Email or phone number already exists")
        return await self._create_admin(data)

    async def get_by_id(self, user_id: int) -> UserRead:
        user = await self._users.get_by_id(user_id)
        if user is None:
            raise NotFoundError("User not found")
        return UserRead.model_validate(user)

    async def list_users(self) -> list[UserRead]:
        users = await self._users.list_all()
        return [UserRead.model_validate(user) for user in users]

    async def get_profile_for_requester(self, account_id: int, requester: User) -> UserRead:
        user = await self._users.get_by_id(account_id)
        if user is None:
            raise NotFoundError("User not found")
        if user.id != requester.id and not requester.is_admin:
            from app.core.exceptions import ForbiddenError

            raise ForbiddenError("You do not have access to this profile")
        return UserRead.model_validate(user)

    async def _create_user(self, data: UserCreate | AdminCreateAccount) -> UserRead:
        hashed = await hash_password(data.password)
        user = User(
            email=data.email,
            password=hashed.hash,
            salt=hashed.salt,
            phone_number=data.phone_number,
            first_name=data.first_name,
            last_name=data.last_name,
        )
        created = await self._users.add(user)
        return UserRead.model_validate(created)

    async def _create_admin(self, data: AdminCreateAccount) -> UserRead:
        hashed = await hash_password(data.password)
        user = User(
            email=data.email,
            password=hashed.hash,
            salt=hashed.salt,
            phone_number=data.phone_number,
            first_name=data.first_name,
            last_name=data.last_name,
            is_admin=data.is_admin
        )
        created = await self._users.add(user)
        return UserRead.model_validate(created)

async def create_dev_admin(data: AdminCreateAccount, session: AsyncSession):
    hashed = await hash_password(data.password)
    user = User(
        email=data.email,
        password=hashed.hash,
        salt=hashed.salt,
        phone_number=data.phone_number,
        first_name=data.first_name,
        last_name=data.last_name,
        is_admin=data.is_admin
    )
    created = await initial_dev_admin(session, user)
    return UserRead.model_validate(created)


async def get_auth_service(session: AsyncSession = Depends(get_session)) -> AuthService:
    return AuthService(session)


async def get_user_service(session: AsyncSession = Depends(get_session)) -> UserService:
    return UserService(session)
