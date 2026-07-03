from typing import Any

from httpx import AsyncClient
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.auth.jwt import create_access_token, create_refresh_token
from app.core.auth.password import hash_password
from app.modules.accounts.models import User

VALID_PASSWORD = "SecurePass1"


def user_registration_payload(
    *,
    email: str = "user@example.com",
    phone_number: str | None = "09123456789",
    first_name: str = "Test",
    last_name: str = "User",
    password: str = VALID_PASSWORD,
) -> dict[str, Any]:
    return {
        "email": email,
        "password": password,
        "phone_number": phone_number,
        "first_name": first_name,
        "last_name": last_name,
    }


def project_payload(
    *,
    title: str = "Mobile App",
    description: str = "Cross-platform application",
    phone_number: str = "09123456789",
    project_type: str = "mobile",
) -> dict[str, str]:
    return {
        "title": title,
        "description": description,
        "phone_number": phone_number,
        "project_type": project_type,
    }


def blog_post_payload(
    *,
    title: str = "Hello World",
    meta_title: str = "hello-world-meta",
    slug: str = "hello-world",
    summary: str = "A short summary",
    content: str = "Full post content",
) -> dict[str, str]:
    return {
        "title": title,
        "meta_title": meta_title,
        "slug": slug,
        "summary": summary,
        "content": content,
    }


async def seed_user(
    session: AsyncSession,
    *,
    email: str = "user@example.com",
    password: str = VALID_PASSWORD,
    phone_number: str | None = "09123456789",
    first_name: str = "Test",
    last_name: str = "User",
    is_admin: bool = False,
    is_active: bool = True,
) -> User:
    hashed = await hash_password(password)
    user = User(
        email=email,
        password=hashed.hash,
        salt=hashed.salt,
        phone_number=phone_number,
        first_name=first_name,
        last_name=last_name,
        is_admin=is_admin,
        is_active=is_active,
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    if user.id is None:
        raise RuntimeError("Seeded user has no id")
    return user


def bearer_headers(user: User) -> dict[str, str]:
    if user.id is None:
        raise RuntimeError("Cannot build auth header for user without id")
    token = create_access_token(
        user_id=user.id,
        email=user.email,
        is_admin=user.is_admin,
    )
    return {"Authorization": f"Bearer {token}"}


def refresh_body(user: User) -> dict[str, str]:
    if user.id is None:
        raise RuntimeError("Cannot build refresh body for user without id")
    return {"refresh_token": create_refresh_token(user_id=user.id)}


async def register_user(client: AsyncClient, **overrides: Any) -> dict[str, Any]:
    payload = user_registration_payload(**overrides)
    response = await client.post("/api/front/accounts/", json=payload)
    assert response.status_code == 201, response.text
    return response.json()


async def login(client: AsyncClient, email: str, password: str = VALID_PASSWORD) -> dict[str, Any]:
    response = await client.post("/api/login/", json={"email": email, "password": password})
    return response.json() if response.status_code == 200 else {}
