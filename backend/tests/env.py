"""Populate required Settings env vars before app imports."""

import os

import redis_fastapi
import redis_fastapi.ratelimit as redis_rate_limit

os.environ.setdefault("SECRET_KEY", "test-secret-key-32-chars-minimum!")
os.environ.setdefault("DB_USER", "test")
os.environ.setdefault("DB_PASSWORD", "test")
os.environ.setdefault("CRUDADMIN_USERNAME", "admin")
os.environ.setdefault("CRUDADMIN_PASSWORD", "admin-pass")
os.environ.setdefault("ADMIN_DEV_EMAIL", "dev@example.com")
os.environ.setdefault("ADMIN_DEV_PASSWORD", "dev-pass")
os.environ.setdefault("RATE_LIMIT_ENABLED", "false")


async def _noop_rate_limit() -> None:
    return None


def _disabled_rate_limit(*_args: object, **_kwargs: object):
    return _noop_rate_limit


redis_rate_limit.rate_limit = _disabled_rate_limit
redis_fastapi.rate_limit = _disabled_rate_limit
