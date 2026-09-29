from fastapi import APIRouter, Body, Depends, HTTPException, Query, status
from redis_fastapi import rate_limit

from app.core.auth.dependencies import get_current_user, require_admin
from app.core.pagination import BlogPage, SubscriptionsPage
from app.modules.accounts.models import User
from app.modules.blog.models import Post, PostStatus
from app.modules.blog.schemas import (
    EmailSubscriptions,
    ListSubscriptions,
    PostCreate,
    PostRead,
    PostStatusUpdate,
    PostUpdate,
)
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


@admin_router.get(
    "/list/",
    response_model=BlogPage[PostRead],
)
async def list_posts_admin(
    status: PostStatus | None = Query(default=None),
    _page: int = Query(default=1, ge=1),
    _size: int = Query(default=10, ge=1, le=100),
    _admin: User = Depends(require_admin),
    blog_service: BlogService = Depends(get_blog_service),
) -> list[Post]:
    return await blog_service.list_all_posts(status=status)


@admin_router.get(
    "/{post_id}/",
    response_model=PostRead,
)
@admin_router.get(
    "/{post_id}",
    response_model=PostRead,
    include_in_schema=False,
)
async def get_post_admin(
    post_id: int,
    _admin: User = Depends(require_admin),
    blog_service: BlogService = Depends(get_blog_service),
) -> PostRead:
    return await blog_service.get_post_by_id(post_id)


@admin_router.patch(
    "/{post_id}/status",
    response_model=PostRead,
)
@admin_router.patch(
    "/{post_id}/status/",
    response_model=PostRead,
    include_in_schema=False,
)
async def change_post_status(
    post_id: int,
    payload: PostStatusUpdate | None = Body(default=None),
    status_query: PostStatus | None = Query(default=None, alias="status"),
    _admin: User = Depends(require_admin),
    blog_service: BlogService = Depends(get_blog_service),
) -> PostRead:
    new_status = payload.status if payload is not None else status_query
    if new_status is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Status field is required",
        )
    return await blog_service.update_post_status(post_id, new_status)


@admin_router.patch(
    "/{post_id}/",
    response_model=PostRead,
)
@admin_router.patch(
    "/{post_id}",
    response_model=PostRead,
    include_in_schema=False,
)
async def update_post_admin(
    post_id: int,
    payload: PostUpdate,
    _admin: User = Depends(require_admin),
    blog_service: BlogService = Depends(get_blog_service),
) -> PostRead:
    return await blog_service.update_post(post_id, payload)


@admin_router.delete(
    "/{post_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=None,
)
@admin_router.delete(
    "/{post_id}/",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=None,
    include_in_schema=False,
)
async def delete_post_admin(
    post_id: int,
    _admin: User = Depends(require_admin),
    blog_service: BlogService = Depends(get_blog_service),
) -> None:
    await blog_service.delete_post(post_id)
