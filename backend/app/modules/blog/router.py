from fastapi import APIRouter, Depends, status
from redis_fastapi import rate_limit

from app.core.auth.dependencies import get_current_user, require_admin
from app.modules.accounts.models import User
from app.modules.blog.schemas import EmailSubscriptions, PostCreate, PostRead
from app.modules.blog.service import BlogService, SubscriptionService, get_blog_service, get_sub_service

front_router = APIRouter(prefix="/api/front/blog", tags=["blog-front"])
admin_router = APIRouter(prefix="/api/admin/blog", tags=["blog-admin"])


@front_router.post("/", response_model=PostRead, status_code=status.HTTP_201_CREATED, dependencies=[
        Depends(rate_limit("1/second", scope="create_blog:burst")),
        Depends(rate_limit("10/minute", scope="create_blog:sustained")),
    ])
async def create_post(
    payload: PostCreate,
    blog_service: BlogService = Depends(get_blog_service),
    author: User = Depends(get_current_user),
) -> PostRead:
    return await blog_service.create_post(payload, author)


@front_router.post("/subscriptions/", response_model=EmailSubscriptions, status_code=status.HTTP_201_CREATED, dependencies=[
        Depends(rate_limit("1/second", scope="subs:burst")),
        Depends(rate_limit("5/minute", scope="subs:sustained")),
    ])
async def add_subscription(
    payload: EmailSubscriptions,
    sub_service: SubscriptionService = Depends(get_sub_service),
):
    return await sub_service.add_subscriptions(payload)


@admin_router.post("/", response_model=PostRead, status_code=status.HTTP_201_CREATED)
async def create_post_admin(
    payload: PostCreate,
    blog_service: BlogService = Depends(get_blog_service),
    _admin: User = Depends(require_admin),
) -> PostRead:
    return await blog_service.create_post(payload, _admin)
