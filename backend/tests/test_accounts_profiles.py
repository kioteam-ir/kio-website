import pytest
from httpx import AsyncClient
from sqlmodel.ext.asyncio.session import AsyncSession
from tests.helpers import VALID_PASSWORD

from app.modules.accounts.models import User


class TestProfileAccess:
    @pytest.mark.asyncio
    async def test_user_can_read_own_profile(
        self,
        client: AsyncClient,
        regular_user: User,
        user_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get(f"/api/front/accounts/{regular_user.id}/", headers=user_auth_headers)
        assert response.status_code == 200
        body = response.json()
        assert body["id"] == regular_user.id
        assert body["email"] == regular_user.email

    @pytest.mark.asyncio
    async def test_user_cannot_read_other_profile(
        self,
        client: AsyncClient,
        session: AsyncSession,
        regular_user: User,
        user_auth_headers: dict[str, str],
    ) -> None:
        from tests.helpers import seed_user

        other = await seed_user(session, email="other@example.com", phone_number="09111111111")
        response = await client.get(f"/api/front/accounts/{other.id}/", headers=user_auth_headers)
        assert response.status_code == 403
        assert response.json()["detail"] == "You do not have access to this profile"

    @pytest.mark.asyncio
    async def test_admin_can_read_other_profile(
        self,
        client: AsyncClient,
        regular_user: User,
        admin_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get(
            f"/api/front/accounts/{regular_user.id}/",
            headers=admin_auth_headers,
        )
        assert response.status_code == 200
        assert response.json()["email"] == regular_user.email

    @pytest.mark.asyncio
    async def test_profile_without_auth_returns_401(self, client: AsyncClient, regular_user: User) -> None:
        response = await client.get(f"/api/front/accounts/{regular_user.id}/")
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_profile_for_missing_user_returns_404(
        self,
        client: AsyncClient,
        user_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get("/api/front/accounts/9999/", headers=user_auth_headers)
        assert response.status_code == 404
        assert response.json()["detail"] == "User not found"

    @pytest.mark.asyncio
    async def test_verify_trailing_slash_alias(
        self,
        client: AsyncClient,
        user_auth_headers: dict[str, str],
        regular_user: User,
    ) -> None:
        response = await client.post("/auth/verify/", headers=user_auth_headers)
        assert response.status_code == 200
        assert response.json()["sub"] == str(regular_user.id)


class TestAdminAccountsRoutes:
    @pytest.mark.asyncio
    async def test_list_accounts_requires_admin(
        self,
        client: AsyncClient,
        user_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get("/api/admin/accounts/", headers=user_auth_headers)
        assert response.status_code == 403

    @pytest.mark.asyncio
    async def test_list_accounts_without_auth_returns_401(self, client: AsyncClient) -> None:
        response = await client.get("/api/admin/accounts/")
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_admin_lists_all_users(
        self,
        client: AsyncClient,
        regular_user: User,
        admin_user: User,
        admin_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get("/api/admin/accounts/", headers=admin_auth_headers)
        assert response.status_code == 200
        emails = {item["email"] for item in response.json()["result"]}
        assert regular_user.email in emails
        assert admin_user.email in emails

    @pytest.mark.asyncio
    async def test_admin_get_user_by_id(
        self,
        client: AsyncClient,
        regular_user: User,
        admin_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get(f"/api/admin/accounts/{regular_user.id}/", headers=admin_auth_headers)
        assert response.status_code == 200
        assert response.json()["email"] == regular_user.email

    @pytest.mark.asyncio
    async def test_admin_get_missing_user_returns_404(
        self,
        client: AsyncClient,
        admin_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get("/api/admin/accounts/9999/", headers=admin_auth_headers)
        assert response.status_code == 404

    @pytest.mark.asyncio
    async def test_admin_create_account(
        self,
        client: AsyncClient,
        admin_auth_headers: dict[str, str],
    ) -> None:
        payload = {
            "email": "created-by-admin@example.com",
            "password": VALID_PASSWORD,
            "phone_number": "09222222222",
            "first_name": "Created",
            "last_name": "ByAdmin",
        }
        response = await client.post("/api/admin/accounts/create-account/", json=payload, headers=admin_auth_headers)
        assert response.status_code == 201
        assert response.json()["email"] == payload["email"]

    @pytest.mark.asyncio
    async def test_admin_create_duplicate_returns_409(
        self,
        client: AsyncClient,
        regular_user: User,
        admin_auth_headers: dict[str, str],
    ) -> None:
        payload = {
            "email": regular_user.email,
            "password": VALID_PASSWORD,
            "first_name": "Dup",
            "last_name": "User",
        }
        response = await client.post("/api/admin/accounts/create-account/", json=payload, headers=admin_auth_headers)
        assert response.status_code == 409

    @pytest.mark.asyncio
    async def test_admin_check_rejects_invalid_token(self, client: AsyncClient) -> None:
        response = await client.post("/auth/admin", json={"access_token": "not-valid"})
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_admin_check_rejects_missing_user_token(self, client: AsyncClient) -> None:
        from app.core.auth.jwt import create_access_token

        orphan_token = create_access_token(user_id=4242, email="ghost@example.com", is_admin=True)
        response = await client.post("/auth/admin", json={"access_token": orphan_token})
        assert response.status_code == 401
