from fastapi import APIRouter, Depends, status

from app.core.auth.dependencies import require_admin
from app.modules.accounts.models import User
from app.modules.seo.schemas import ReadMainContent, WriteMainContent
from app.modules.seo.service import SeoService, get_seo_service

admin_router = APIRouter(prefix="/api/admin/seo", tags=["seo-admin"])


@admin_router.get("/", response_model=ReadMainContent)
@admin_router.get("", response_model=ReadMainContent, include_in_schema=False)
async def get_main_content(
    seo_service: SeoService = Depends(get_seo_service),
    _admin: User = Depends(require_admin),
) -> ReadMainContent:
    """Retrieve the singleton SEO main content row.

    Returns:
        ReadMainContent: The current SEO main content when present.

    Raises:
        NotFoundError (404): When no SEO main content row has been created yet.
    """
    return await seo_service.get_main_content()


@admin_router.post("/", response_model=ReadMainContent, status_code=status.HTTP_201_CREATED)
@admin_router.post(
    "",
    response_model=ReadMainContent,
    status_code=status.HTTP_201_CREATED,
    include_in_schema=False,
)
async def write_main_content(
    payload: WriteMainContent,
    seo_service: SeoService = Depends(get_seo_service),
    _admin: User = Depends(require_admin),
) -> ReadMainContent:
    return await seo_service.main_content(payload)


@admin_router.delete(
    "/{content_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
@admin_router.delete(
    "/{content_id}/",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    include_in_schema=False,
)
@admin_router.post(
    "/{content_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    include_in_schema=False,
)
@admin_router.post(
    "/{content_id}/",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    include_in_schema=False,
)
async def delete_main_content(
    content_id: int,
    seo_service: SeoService = Depends(get_seo_service),
    _admin: User = Depends(require_admin),
) -> None:
    await seo_service.delete_content(content_id)
