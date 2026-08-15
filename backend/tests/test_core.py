from datetime import UTC, datetime, timedelta

import pytest
from jose import jwt

from app.config import Settings, get_settings
from app.core.auth.jwt import (
    create_access_token,
    create_refresh_token,
    decode_access_token,
    decode_refresh_token,
)
from app.core.auth.password import hash_password, verify_password
from app.core.exceptions import UnauthorizedError
from app.core.roles import PlatformRole, resolve_role


class TestSettings:
    def test_cors_origins_parsed_from_comma_separated_env(
        self, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        monkeypatch.setenv("SECRET_KEY", "test-secret")
        monkeypatch.setenv("DB_USER", "kio")
        monkeypatch.setenv("DB_PASSWORD", "secret")
        monkeypatch.setenv("CRUDADMIN_USERNAME", "admin")
        monkeypatch.setenv("CRUDADMIN_PASSWORD", "admin-pass")
        monkeypatch.setenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173",
        )
        get_settings.cache_clear()
        settings = Settings()
        assert settings.CORS_ORIGINS == [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
        get_settings.cache_clear()


class TestPasswordHashing:
    @pytest.mark.asyncio
    async def test_hash_and_verify_roundtrip(self) -> None:
        hashed = await hash_password("SecurePass1")
        assert verify_password("SecurePass1", hashed.salt, hashed.hash)
        assert not verify_password("WrongPass1", hashed.salt, hashed.hash)

    @pytest.mark.asyncio
    async def test_different_passwords_produce_different_hashes(self) -> None:
        first = await hash_password("SecurePass1")
        second = await hash_password("SecurePass2")
        assert first.hash != second.hash
        assert first.salt != second.salt


class TestRoles:
    def test_guest_role_for_unauthenticated_users(self) -> None:
        assert resolve_role(is_authenticated=False, is_admin=False) == PlatformRole.GUEST

    def test_user_role_for_authenticated_non_admin(self) -> None:
        assert resolve_role(is_authenticated=True, is_admin=False) == PlatformRole.USER

    def test_admin_role_for_authenticated_admin(self) -> None:
        assert resolve_role(is_authenticated=True, is_admin=True) == PlatformRole.ADMIN


class TestJwtTokens:
    def test_access_token_roundtrip(self) -> None:
        token = create_access_token(user_id=42, email="user@example.com", is_admin=False)
        payload = decode_access_token(token)
        assert payload.sub == "42"
        assert str(payload.email) == "user@example.com"
        assert payload.is_admin is False
        assert payload.type == "access"

    def test_refresh_token_roundtrip(self) -> None:
        token = create_refresh_token(user_id=7)
        payload = decode_refresh_token(token)
        assert payload.sub == "7"
        assert payload.type == "refresh"

    def test_access_token_rejects_refresh_token(self) -> None:
        refresh = create_refresh_token(user_id=1)
        with pytest.raises(UnauthorizedError, match="Invalid or expired token"):
            decode_access_token(refresh)

    def test_refresh_token_rejects_access_token(self) -> None:
        access = create_access_token(user_id=1, email="user@example.com", is_admin=False)
        with pytest.raises(UnauthorizedError, match="Invalid token type"):
            decode_refresh_token(access)

    def test_decode_rejects_tampered_token(self) -> None:
        token = create_access_token(user_id=1, email="user@example.com", is_admin=False)
        tampered = f"{token}invalid"
        with pytest.raises(UnauthorizedError):
            decode_access_token(tampered)

    def test_decode_rejects_expired_access_token(self) -> None:
        settings = get_settings()
        expired = datetime.now(UTC) - timedelta(minutes=1)
        payload = {
            "sub": "1",
            "email": "user@example.com",
            "is_admin": False,
            "type": "access",
            "exp": expired,
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        with pytest.raises(UnauthorizedError, match="Invalid or expired token"):
            decode_access_token(token)

    def test_decode_rejects_wrong_secret(self) -> None:
        settings = get_settings()
        token = jwt.encode(
            {
                "sub": "1",
                "email": "user@example.com",
                "is_admin": False,
                "type": "access",
                "exp": datetime.now(UTC) + timedelta(minutes=5),
            },
            "wrong-secret-key",
            algorithm=settings.ALGORITHM,
        )
        with pytest.raises(UnauthorizedError):
            decode_access_token(token)
