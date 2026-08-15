"""Import all SQLModel tables so metadata is registered before migrations."""

from app.modules.accounts.models import User
from app.modules.blog.models import Post
from app.modules.projects.models import Project
from app.modules.seo.models import MainContent

__all__ = ["Post", "Project", "User", "MainContent"]
