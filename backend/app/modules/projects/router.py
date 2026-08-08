from fastapi import APIRouter, Depends, Query, status

from app.core.auth.dependencies import require_admin
from app.modules.accounts.models import User
from app.modules.projects.schemas import ProjectCreate, ProjectListResponse, ProjectRead
from app.modules.projects.service import ProjectService, get_project_service
from app.core.pagination import ProjectPage


front_router = APIRouter(prefix="/api/front/projects", tags=["projects-front"])
admin_router = APIRouter(prefix="/api/admin/projects", tags=["projects-admin"])


@front_router.post("/", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
async def submit_project(
    payload: ProjectCreate,
    project_service: ProjectService = Depends(get_project_service),
) -> ProjectRead:
    return await project_service.create(payload)


@admin_router.get("/list/", response_model=ProjectPage[ProjectRead])
async def list_projects(
    project_service: ProjectService = Depends(get_project_service),
    _admin: User = Depends(require_admin),
) -> ProjectListResponse:
    return await project_service.list_projects()


@admin_router.get("/{project_id}/", response_model=ProjectRead)
async def get_project(
    project_id: int,
    project_service: ProjectService = Depends(get_project_service),
    _admin: User = Depends(require_admin),
) -> ProjectRead:
    return await project_service.get_by_id(project_id)


@admin_router.post("/", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
async def create_project_admin(
    payload: ProjectCreate,
    project_service: ProjectService = Depends(get_project_service),
    _admin: User = Depends(require_admin),
):
    return await project_service.create(payload)


@admin_router.patch("/{project_id}/status", response_model=ProjectRead)
async def change_project_status(
    project_id: int, 
    is_done: bool = Query(..., description="وضعیت جدید پروژه"),
    _admin: User = Depends(require_admin),
    project_service: ProjectService = Depends(get_project_service)
) -> ProjectRead:
    return await project_service.update_status(project_id, is_done)


@admin_router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT, response_model=None)
async def delete_project(
    project_id: int, 
    project_service: ProjectService = Depends(get_project_service),
    _admin: User = Depends(require_admin)
    ):
    await project_service.delete(project_id)