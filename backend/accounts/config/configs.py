import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path
from .local_settings import *

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2] 
load_dotenv(BASE_DIR / ".env.dev")

class PsqlConfig(BaseSettings):
    DB_USER: str
    DB_PORT: int
    DB_HOST: str | int
    DB_PASSWORD: str
    DB_NAME: str

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env.dev",
        extra="ignore"
    )
    
    def get_config(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"


class Settings(BaseSettings):

    BASE_DIR: Path = Path(__file__).resolve().parent.parent
    TEMPLATES_DIR: Path = BASE_DIR / "templates"
    STATIC_DIR: Path = BASE_DIR / "static"
    MEDIA_DIR: Path = BASE_DIR / "media"
    SECRET_KEY: str = SECRET_KEY
    ALGORITHM: str = ALGORITHM
    ACCESS_TOKEN_EXPIRE_MINUTES: int = ACCESS_TOKEN_EXPIRE_MINUTES
    REFRESH_EXPIRE_DAYS: int = REFRESH_EXPIRE_DAYS
    ITERATIONS: int = ITERATIONS
    DEBUG: bool = bool(os.getenv("DEBUG"))

settings = Settings()