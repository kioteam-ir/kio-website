from fastapi import APIRouter, Depends, status

from app.core.auth.dependencies import get_current_user, require_admin
from app.modules.accounts.models import User
from app.modules.blog.schemas import PostCreate, PostRead
from app.modules.blog.service import BlogService, get_blog_service

front_router = APIRouter(prefix="/api/front/blog", tags=["blog-front"])
admin_router = APIRouter(prefix="/api/admin/blog", tags=["blog-admin"])


@front_router.post("/", response_model=PostRead, status_code=status.HTTP_201_CREATED)
async def create_post(
    payload: PostCreate,
    blog_service: BlogService = Depends(get_blog_service),
    author: User = Depends(get_current_user),
) -> PostRead:
    return await blog_service.create_post(payload, author)


@admin_router.post("/", response_model=PostRead, status_code=status.HTTP_201_CREATED)
async def create_post_admin(
    payload: PostCreate,
    blog_service: BlogService = Depends(get_blog_service),
    _admin: User = Depends(require_admin),
) -> PostRead:
    return await blog_service.create_post(payload, _admin)
