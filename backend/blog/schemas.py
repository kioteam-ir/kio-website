from datetime import datetime
from enum import Enum

from pydantic import BaseModel

from models import PostStatus


class AddBlog(BaseModel):
    parent_id: int | None
    title: str
    meta_title: str
    slug: str
    summary: str
    content: str
