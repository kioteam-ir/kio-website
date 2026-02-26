from sqlmodel import Column, Field, Relationship, SQLModel, TIMESTAMP, text
from datetime import datetime
from typing import List, Optional
from enum import Enum


class PostStatus(str, Enum):
    PUBLISHED = "published"
    WAITING = "waiting"
    REJECTED = "rejected"


class Post(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    auther_id: int = Field(foreign_key="user.id")
    parent_id: int = Field(foreign_key="post.id")
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


class CommentStatus(str, Enum):
    PUBLISHED = "published"
    WAITING = "waiting"
    REJECTED = "rejected"


class Comment(SQLModel, table= True):
    id: int | None = Field(default=None, primary_key=True)
    post: Optional[Post] = Relationship(back_populates="post")
    post_id: int = Field(foreign_key="post.id")
    title: str = Field(max_length=55)
    parent_id: Optional[int] = Field(foreign_key="comment.id", default=None)
    parent: Optional["Comment"] = Relationship(
        back_populates="children",
        sa_relationship_kwargs={"remote_side": "Comment.id"}
    )
    children: List["Comment"] = Relationship(back_populates="parent")
    content: str
    status: CommentStatus = Field(default=PostStatus.WAITING)
    created_datetime: Optional[datetime] = Field(sa_column=Column(
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


class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    parent_id: Optional[int] = Field(foreign_key="category.id", default=None)
    parent: Optional["Category"] = Relationship(
        back_populates="children",
        sa_relationship_kwargs={"remote_side": "Category.id"}
    )
    children: List["Category"] = Relationship(back_populates="parent")
    content: str
    title: str = Field(max_length=75)
    meta_tile: str = Field(max_length=100)
    slug: str = Field(max_length=40, unique=True, index=True)


class PostCategory(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    post: Optional[Post] = Relationship(back_populates="post")
    post_id: int = Field(foreign_key="post.id")
    category: Optional[Category] = Relationship(back_populates="category")
    category_id: int = Field(foreign_key="category.id")


class Tag(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=75)
    meta_tile: str = Field(max_length=100)
    slug: str = Field(max_length=40, unique=True, index=True)
    content: str


class PostTag(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    post: Optional[Post] = Relationship(back_populates="post")
    post_id: int = Field(foreign_key="post.id")
    tag: Optional[Post] = Relationship(back_populates="tag")
    tag_id: int = Field(foreign_key="tag.id")


class PostMeta(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    post: Optional[Post] = Relationship(back_populates="post")
    post_id: int = Field(foreign_key="post.id")
    key: str = Field(max_length=50)
    content: str
    