import os
from pydantic_settings import BaseSettings, SettingsConfigDict

from local_settings import *

from pathlib import Path


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
    SECRET_KEY: str = SECRET_KEY
    ALGORITHM: str = ALGORITHM
    ACCESS_TOKEN_EXPIRE_MINUTES: int = ACCESS_TOKEN_EXPIRE_MINUTES
    REFRESH_EXPIRE_DAYS: int = REFRESH_EXPIRE_DAYS
    ITERATIONS: int = ITERATIONS
    DEBUG: bool = False

    model_config = SettingsConfigDict(
        env_file=(".env", ".env.dev"),
        extra="ignore"
    )
    
settings = Settings()