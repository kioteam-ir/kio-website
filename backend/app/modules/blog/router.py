from fastapi import APIRouter, Depends, Query, status
from redis_fastapi import rate_limit

from app.core.auth.dependencies import get_current_user, require_admin
from app.core.pagination import BlogPage, SubscriptionsPage
from app.modules.accounts.models import User
from app.modules.blog.models import Post
from app.modules.blog.schemas import EmailSubscriptions, ListSubscriptions, PostCreate, PostRead
from app.modules.blog.service import (
    BlogService,
    SubscriptionService,
    get_blog_service,
    get_sub_service,
)

front_router = APIRouter(prefix="/api/front/blog", tags=["blog-front"])
admin_router = APIRouter(prefix="/api/admin/blog", tags=["blog-admin"])


@front_router.post(
    "/",
    response_model=PostRead,
    status_code=status.HTTP_201_CREATED,
    dependencies=[
        Depends(rate_limit("1/second", scope="create_blog:burst")),
        Depends(rate_limit("10/minute", scope="create_blog:sustained")),
    ],
)
async def create_post(
    payload: PostCreate,
    blog_service: BlogService = Depends(get_blog_service),
    author: User = Depends(get_current_user),
) -> PostRead:
    return await blog_service.create_post(payload, author)


@front_router.post(
    "/subscriptions/",
    response_model=EmailSubscriptions,
    status_code=status.HTTP_201_CREATED,
    dependencies=[
        Depends(rate_limit("1/second", scope="subs:burst")),
        Depends(rate_limit("5/minute", scope="subs:sustained")),
    ],
)
async def add_subscription(
    payload: EmailSubscriptions,
    sub_service: SubscriptionService = Depends(get_sub_service),
):
    return await sub_service.add_subscriptions(payload)


@front_router.get("/list/", response_model=BlogPage[PostRead])
async def list_posts(
    _page: int = Query(default=1, ge=1),
    _size: int = Query(default=10, ge=1, le=100),
    blog_service: BlogService = Depends(get_blog_service),
) -> list[Post]:
    return await blog_service.list_published_posts()


@front_router.get("/{slug}/", response_model=PostRead)
async def get_post(
    slug: str,
    blog_service: BlogService = Depends(get_blog_service),
) -> PostRead:
    return await blog_service.get_published_post(slug)


@admin_router.get(
    "/subscriptions/list/",
    response_model=SubscriptionsPage[ListSubscriptions],
)
async def subscriptions_list(
    _admin: User = Depends(require_admin),
    sub_service: SubscriptionService = Depends(get_sub_service),
) -> SubscriptionsPage[ListSubscriptions]:
    return await sub_service.subscriptions_list()


@admin_router.delete("/subscriptions/{sub_id}", response_model=None)
async def subscriptions_delete(
    sub_id: int,
    _admin: User = Depends(require_admin),
    sub_service: SubscriptionService = Depends(get_sub_service),
) -> None:
    return await sub_service.delete_subscription(sub_id)


@admin_router.post("/", response_model=PostRead, status_code=status.HTTP_201_CREATED)
async def create_post_admin(
    payload: PostCreate,
    blog_service: BlogService = Depends(get_blog_service),
    _admin: User = Depends(require_admin),
) -> PostRead:
    return await blog_service.create_post(payload, _admin)
