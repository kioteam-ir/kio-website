from datetime import UTC, datetime
from enum import StrEnum

from sqlalchemy import DateTime, Index
from sqlmodel import Field, SQLModel


class PostStatus(StrEnum):
    PUBLISHED = "published"
    WAITING = "waiting"
    REJECTED = "rejected"


class Post(SQLModel, table=True):
    __tablename__ = "blog_post"  # type: ignore
    __table_args__ = (Index("ix_blog_post_status_created_at", "status", "created_at"),)

    id: int | None = Field(default=None, primary_key=True)
    author_id: int | None = Field(default=None, nullable=True, foreign_key="accounts_user.id")
    title: str = Field(max_length=75)
    meta_title: str = Field(max_length=100)
    slug: str = Field(max_length=40, unique=True, index=True)
    summary: str = Field(max_length=255)
    content: str
    status: PostStatus = Field(default=PostStatus.WAITING)
    created_at: datetime = Field(  # type: ignore[call-overload]
        default_factory=lambda: datetime.now(UTC),
        sa_type=DateTime(timezone=True),
    )
    updated_at: datetime = Field(  # type: ignore[call-overload]
        default_factory=lambda: datetime.now(UTC),
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={"onupdate": lambda: datetime.now(UTC)},
    )


class Subscription(SQLModel, table=True):
    __tablename__ = "subscription"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
