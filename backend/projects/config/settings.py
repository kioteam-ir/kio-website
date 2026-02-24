from .local_settings import *

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES_DIR = BASE_DIR / "templates"

STATIC_DIR = BASE_DIR / "static"

MEDIA_DIR = BASE_DIR / "media"

SECRET_KEY = SECRET_KEY

ALGORITHM = ALGORITHM

ACCESS_TOKEN_EXPIRE_MINUTES = ACCESS_TOKEN_EXPIRE_MINUTES

REFRESH_EXPIRE_DAYS = REFRESH_EXPIRE_DAYS

ITERATIONS = ITERATIONS
