from pathlib import Path
from typing import ClassVar

from pydantic_settings import BaseSettings, SettingsConfigDict


class PsqlConfig(BaseSettings):
    DB_USER: str
    DB_PORT: int
    DB_HOST: str | int
    DB_PASSWORD: str
    DB_NAME: str

    model_config = SettingsConfigDict(
        env_file=(".env", ".env.global"),
        extra="ignore"
    )
    
    def get_config(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"


class Settings(BaseSettings):
    ACCESS_TOKEN_DEFAULT_EXPIRE_MINUTES: int = 360
    ACCOUNTS_SERVICE_URL: str = "http://accounts:8000"
    BLOG_SERVICE_URL: str = "http://blog:8000"
    PROJECTS_SERVICE_URL: str = "http://projects:8000"
    GATEWAY_TIMEOUT: int = 59
    BASE_DIR: Path = Path(__file__).resolve().parent.parent
    TEMPLATES_DIR: Path = BASE_DIR / "templates"
    STATIC_DIR: Path = BASE_DIR / "static"
    MEDIA_DIR: Path = BASE_DIR / "media"
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_EXPIRE_DAYS: int
    ITERATIONS: int
    DEBUG: bool

    model_config = SettingsConfigDict(
        env_file=(".env", ".env.global"),
        extra="ignore"
    )
    
settings = Settings() #type: ignore