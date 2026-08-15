import pytest
from httpx import AsyncClient
from pydantic import ValidationError
from tests.helpers import user_registration_payload

from app.modules.accounts.schemas import UserCreate


class TestUserCreateSchema:
    def test_accepts_valid_payload(self) -> None:
        user = UserCreate(**user_registration_payload())
        assert user.email == "user@example.com"

    def test_rejects_short_password(self) -> None:
        with pytest.raises(ValidationError):
            UserCreate(**user_registration_payload(password="Ab1"))

    def test_rejects_password_without_uppercase(self) -> None:
        with pytest.raises(ValidationError):
            UserCreate(**user_registration_payload(password="lowercase1"))

    def test_rejects_password_without_digit(self) -> None:
        with pytest.raises(ValidationError):
            UserCreate(**user_registration_payload(password="NoDigits"))

    def test_rejects_invalid_phone_format(self) -> None:
        with pytest.raises(ValidationError):
            UserCreate(**user_registration_payload(phone_number="12345"))

    def test_allows_null_phone_number(self) -> None:
        user = UserCreate(**user_registration_payload(phone_number=None))
        assert user.phone_number is None


class TestRegistrationEndpoint:
    @pytest.mark.asyncio
    async def test_register_valid_user_returns_201(self, client: AsyncClient) -> None:
        response = await client.post("/api/front/accounts/", json=user_registration_payload())
        assert response.status_code == 201
        body = response.json()
        assert body["email"] == "user@example.com"
        assert body["is_admin"] is False

    @pytest.mark.asyncio
    async def test_register_duplicate_email_returns_409(self, client: AsyncClient) -> None:
        payload = user_registration_payload()
        first = await client.post("/api/front/accounts/", json=payload)
        assert first.status_code == 201

        duplicate = await client.post(
            "/api/front/accounts/",
            json=user_registration_payload(email="user@example.com", phone_number="09111111111"),
        )
        assert duplicate.status_code == 409
        assert duplicate.json()["detail"] == "Email or phone number already exists"

    @pytest.mark.asyncio
    async def test_register_duplicate_phone_returns_409(self, client: AsyncClient) -> None:
        first = await client.post("/api/front/accounts/", json=user_registration_payload())
        assert first.status_code == 201

        duplicate = await client.post(
            "/api/front/accounts/",
            json=user_registration_payload(email="other@example.com", phone_number="09123456789"),
        )
        assert duplicate.status_code == 409

    @pytest.mark.asyncio
    async def test_register_weak_password_returns_422(self, client: AsyncClient) -> None:
        response = await client.post(
            "/api/front/accounts/",
            json=user_registration_payload(password="weak"),
        )
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_register_invalid_email_returns_422(self, client: AsyncClient) -> None:
        response = await client.post(
            "/api/front/accounts/",
            json=user_registration_payload(email="not-an-email"),
        )
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_register_missing_required_field_returns_422(self, client: AsyncClient) -> None:
        payload = user_registration_payload()
        del payload["first_name"]
        response = await client.post("/api/front/accounts/", json=payload)
        assert response.status_code == 422
