import time
from typing import TYPE_CHECKING, cast

import redis.asyncio as redis
from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response

if TYPE_CHECKING:
    from collections.abc import Awaitable


class RedisTokenBucket:
    """Token-bucket rate limiter backed by Redis."""

    def __init__(self, redis_client: redis.Redis, rate: float, capacity: int) -> None:
        self._redis = redis_client
        self._rate = rate
        self._capacity = capacity

    async def allow_request(self, key: str) -> bool:
        now = time.time()
        bucket = await cast("Awaitable[dict[str, str]]", self._redis.hgetall(key))

        if not bucket:
            tokens = float(self._capacity)
            last_refill = now
        else:
            tokens = float(bucket["tokens"])
            last_refill = float(bucket["last_refill"])

        tokens = min(tokens + (now - last_refill) * self._rate, float(self._capacity))

        if tokens < 1:
            return False

        tokens -= 1
        hset_result = self._redis.hset(key, mapping={"tokens": tokens, "last_refill": now})
        if not isinstance(hset_result, int):
            await hset_result
        expire_result = self._redis.expire(key, 3600)
        if not isinstance(expire_result, int):
            await expire_result
        return True


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: object, bucket: RedisTokenBucket) -> None:
        super().__init__(app)  # type: ignore[arg-type]
        self._bucket = bucket

    async def dispatch(
        self,
        request: Request,
        call_next: RequestResponseEndpoint,
    ) -> Response:
        client = request.client
        client_host = client.host if client else "unknown"
        key = f"rate_limit:{client_host}"

        if not await self._bucket.allow_request(key):
            return JSONResponse(
                status_code=429,
                content={"detail": "Too many requests"},
            )

        return await call_next(request)
