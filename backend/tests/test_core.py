from app.core.auth.password import hash_password, verify_password
from app.core.roles import PlatformRole, resolve_role


async def test_password_hash_roundtrip() -> None:
    hashed = await hash_password("SecurePass1")
    assert verify_password("SecurePass1", hashed.salt, hashed.hash)
    assert not verify_password("WrongPass1", hashed.salt, hashed.hash)


def test_resolve_role_matrix() -> None:
    assert resolve_role(is_authenticated=False, is_admin=False) == PlatformRole.GUEST
    assert resolve_role(is_authenticated=True, is_admin=False) == PlatformRole.USER
    assert resolve_role(is_authenticated=True, is_admin=True) == PlatformRole.ADMIN
