from pydantic import BaseModel, EmailStr, Field

from app.modules.blog.models import PostStatus


class PostCreate(BaseModel):
    title: str = Field(max_length=75)
    meta_title: str = Field(max_length=100)
    slug: str = Field(max_length=40)
    summary: str = Field(max_length=255)
    content: str


class PostRead(BaseModel):
    id: int
    author_id: int | None
    title: str
    meta_title: str
    slug: str
    summary: str
    content: str
    status: PostStatus

    model_config = {"from_attributes": True}


class EmailSubscriptions(BaseModel):
    email: EmailStr


class ListSubscriptions(BaseModel):
    id: int
    email: EmailStr


class DeleteSubscription(BaseModel):
    id: int
    email: EmailStr
