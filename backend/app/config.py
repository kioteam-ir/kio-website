from functools import lru_cache
from pathlib import Path
from typing import Annotated

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    DEBUG: bool = False
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_EXPIRE_DAYS: int = 7
    PASSWORD_HASH_ITERATIONS: int = 100_000

    DB_HOST: str = "db"
    DB_PORT: int = 5432
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str = "kio"

    REDIS_HOST: str = "redis"
    REDIS_PORT: int = 6379

    CORS_ORIGINS: Annotated[
        list[str],
        NoDecode,
        Field(default_factory=lambda: ["http://localhost:5173", "http://127.0.0.1:5173"]),
    ]

    CRUDADMIN_USERNAME: str
    CRUDADMIN_PASSWORD: str
    CRUDADMIN_ENABLED: bool = True

    RATE_LIMIT_RATE: float = 1.0
    RATE_LIMIT_CAPACITY: int = 10
    RATE_LIMIT_ENABLED: bool = True

    BASE_DIR: Path = Path(__file__).resolve().parent

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: object) -> list[str]:
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        if isinstance(value, list):
            return value
        return []

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

    @property
    def redis_url(self) -> str:
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/0"


@lru_cache
def get_settings() -> Settings:
    return Settings()
