from fastapi import APIRouter, Depends, status

from app.core.auth.dependencies import require_admin
from app.modules.accounts.models import User
from app.modules.seo.schemas import ReadMainContent, WriteMainContent
from app.modules.seo.service import SeoService, get_seo_service

admin_router = APIRouter(prefix="/api/admin/seo", tags=["seo-admin"])


@admin_router.post("/", response_model=ReadMainContent, status_code=status.HTTP_201_CREATED)
async def write_main_content(
    payload: WriteMainContent,
    seo_service: SeoService = Depends(get_seo_service),
    _admin: User = Depends(require_admin),
) -> WriteMainContent:
    return await seo_service.main_content(payload)


@admin_router.post("/{content_id}", response_model=None, status_code=status.HTTP_204_NO_CONTENT)
async def delete_main_content(
    content_id: int,
    seo_service: SeoService = Depends(get_seo_service),
    _admin: User = Depends(require_admin),
):
    return await seo_service.delete_content(content_id)
