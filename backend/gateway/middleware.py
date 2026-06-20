import time


class RedisTokenBucket:

    def __init__(self, redis_client, rate: float, capacity: int = 20):
        self.redis = redis_client
        self.rate = rate
        self.capacity = capacity

    async def allow_request(self, key: str) -> bool:
        now = time.time()

        bucket = await self.redis.hgetall(key)

        if not bucket:
            tokens = self.capacity
            last_refill = now
        else:
            tokens = float(bucket["tokens"])
            last_refill = float(bucket["last_refill"])

        # refill
        tokens += (now - last_refill) * self.rate
        tokens = min(tokens, self.capacity)

        if tokens < 1:
            return False

        tokens -= 1

        await self.redis.hset(key, mapping={
            "tokens": tokens,
            "last_refill": now
        })

        await self.redis.expire(key, 3600)

        return True
