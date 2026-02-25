from sqlmodel import Column, Field, SQLModel, TIMESTAMP, text
from datetime import datetime
from typing import Optional, Literal
from enum import Enum


class PostStatus(str, Enum):
    PUBLISHED = "published"
    WAITING = "waiting"
    REJECTED = "rejected"


class Post(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    auther_id: int = Field()
    parent_id: int = Field()
    title: str = Field(max_length=75)
    meta_tile: str = Field(max_length=100)
    slug: str = Field(max_length=40, unique=True, index=True)
    sumary: str = Field(max_length=255)
    status: PostStatus = Field(default=PostStatus.WAITING)
    created_datetime: Optional[datetime] = Field(sa_column=Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
    ))
    updated_datetime: Optional[datetime] = Field(sa_column=Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
        server_onupdate=text("CURRENT_TIMESTAMP"),
    ))
    published_datetime: Optional[datetime] = Field(sa_column=Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
        server_onupdate=text("CURRENT_TIMESTAMP"),
    ))
    content: str