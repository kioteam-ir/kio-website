import pytest
from httpx import AsyncClient
from tests.helpers import VALID_PASSWORD, bearer_headers, refresh_body

from app.core.auth.jwt import create_access_token, create_refresh_token
from app.modules.accounts.models import User


class TestLogin:
    @pytest.mark.asyncio
    async def test_login_with_valid_credentials_returns_tokens(self, client: AsyncClient) -> None:
        from tests.helpers import user_registration_payload

        await client.post("/api/front/accounts/", json=user_registration_payload())

        response = await client.post(
            "/api/login/",
            json={"email": "user@example.com", "password": VALID_PASSWORD},
        )
        assert response.status_code == 200
        body = response.json()
        assert body["token_type"] == "bearer"
        assert body["access_token"]
        assert body["refresh_token"]

    @pytest.mark.asyncio
    async def test_login_with_seeded_user_returns_tokens(
        self,
        client: AsyncClient,
        regular_user: User,
    ) -> None:
        response = await client.post(
            "/api/login/",
            json={"email": regular_user.email, "password": VALID_PASSWORD},
        )
        assert response.status_code == 200
        assert response.json()["access_token"]

    @pytest.mark.asyncio
    async def test_login_with_wrong_password_returns_401(self, client: AsyncClient, regular_user: User) -> None:
        response = await client.post(
            "/api/login/",
            json={"email": regular_user.email, "password": "WrongPass1"},
        )
        assert response.status_code == 401
        assert response.json()["detail"] == "Invalid credentials"

    @pytest.mark.asyncio
    async def test_login_with_unknown_email_returns_401(self, client: AsyncClient) -> None:
        response = await client.post(
            "/api/login/",
            json={"email": "missing@example.com", "password": VALID_PASSWORD},
        )
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_login_with_invalid_email_format_returns_422(self, client: AsyncClient) -> None:
        response = await client.post(
            "/api/login/",
            json={"email": "bad-email", "password": VALID_PASSWORD},
        )
        assert response.status_code == 422


class TestTokenVerify:
    @pytest.mark.asyncio
    async def test_verify_without_header_returns_401(self, client: AsyncClient) -> None:
        response = await client.post("/auth/verify")
        assert response.status_code == 401
        assert response.json()["detail"] == "Authorization header missing"

    @pytest.mark.asyncio
    async def test_verify_with_valid_token_returns_user_claims(
        self,
        client: AsyncClient,
        regular_user: User,
        user_auth_headers: dict[str, str],
    ) -> None:
        response = await client.post("/auth/verify", headers=user_auth_headers)
        assert response.status_code == 200
        body = response.json()
        assert body["sub"] == str(regular_user.id)
        assert body["email"] == regular_user.email
        assert body["is_admin"] is False

    @pytest.mark.asyncio
    async def test_verify_with_invalid_token_returns_401(self, client: AsyncClient) -> None:
        response = await client.post(
            "/auth/verify",
            headers={"Authorization": "Bearer not-a-valid-token"},
        )
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_verify_with_inactive_user_returns_401(
        self,
        client: AsyncClient,
        inactive_user: User,
    ) -> None:
        headers = bearer_headers(inactive_user)
        response = await client.post("/auth/verify", headers=headers)
        assert response.status_code == 401
        assert response.json()["detail"] == "User is inactive"


class TestTokenRefresh:
    @pytest.mark.asyncio
    async def test_refresh_with_valid_token_returns_new_pair(
        self,
        client: AsyncClient,
        regular_user: User,
    ) -> None:
        response = await client.post("/auth/refresh", json=refresh_body(regular_user))
        assert response.status_code == 200
        body = response.json()
        assert body["access_token"]
        assert body["refresh_token"]

    @pytest.mark.asyncio
    async def test_refresh_with_invalid_token_returns_401(self, client: AsyncClient) -> None:
        response = await client.post("/auth/refresh", json={"refresh_token": "invalid"})
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_refresh_with_access_token_returns_401(
        self,
        client: AsyncClient,
        regular_user: User,
    ) -> None:
        access = create_access_token(
            user_id=regular_user.id,  # type: ignore[arg-type]
            email=regular_user.email,
            is_admin=regular_user.is_admin,
        )
        response = await client.post("/auth/refresh", json={"refresh_token": access})
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_refresh_for_missing_user_returns_404(self, client: AsyncClient) -> None:
        orphan_refresh = create_refresh_token(user_id=9999)
        response = await client.post("/auth/refresh", json={"refresh_token": orphan_refresh})
        assert response.status_code == 404


class TestAdminCheck:
    @pytest.mark.asyncio
    async def test_admin_check_accepts_admin_access_token(
        self,
        client: AsyncClient,
        admin_user: User,
    ) -> None:
        token = create_access_token(
            user_id=admin_user.id,  # type: ignore[arg-type]
            email=admin_user.email,
            is_admin=True,
        )
        response = await client.post("/auth/admin", json={"access_token": token})
        assert response.status_code == 200
        assert response.json()["is_admin"] is True

    @pytest.mark.asyncio
    async def test_admin_check_rejects_non_admin_token(
        self,
        client: AsyncClient,
        regular_user: User,
    ) -> None:
        token = create_access_token(
            user_id=regular_user.id,  # type: ignore[arg-type]
            email=regular_user.email,
            is_admin=False,
        )
        response = await client.post("/auth/admin", json={"access_token": token})
        assert response.status_code == 401
