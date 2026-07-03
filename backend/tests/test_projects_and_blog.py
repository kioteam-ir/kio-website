import pytest
from httpx import AsyncClient
from pydantic import ValidationError
from tests.helpers import bearer_headers, blog_post_payload, project_payload

from app.modules.blog.models import PostStatus
from app.modules.blog.schemas import PostCreate


class TestProjectCreateSchema:
    def test_accepts_valid_iranian_phone(self) -> None:
        from app.modules.projects.schemas import ProjectCreate

        project = ProjectCreate(**project_payload())
        assert project.phone_number == "09123456789"

    def test_rejects_invalid_phone(self) -> None:
        from app.modules.projects.schemas import ProjectCreate

        with pytest.raises(ValidationError):
            ProjectCreate(**project_payload(phone_number="12345"))


class TestProjectFrontEndpoint:
    @pytest.mark.asyncio
    async def test_guest_can_submit_project_inquiry(self, client: AsyncClient) -> None:
        response = await client.post("/api/front/projects/", json=project_payload())
        assert response.status_code == 201
        body = response.json()
        assert body["title"] == "Mobile App"
        assert body["project_type"] == "mobile"

    @pytest.mark.asyncio
    async def test_submit_project_without_trailing_slash(self, client: AsyncClient) -> None:
        response = await client.post(
            "/api/front/projects", json=project_payload(project_type="web")
        )
        assert response.status_code == 201

    @pytest.mark.asyncio
    async def test_submit_project_rejects_invalid_phone(self, client: AsyncClient) -> None:
        response = await client.post(
            "/api/front/projects/",
            json=project_payload(phone_number="12345"),
        )
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_submit_project_missing_title_returns_422(self, client: AsyncClient) -> None:
        payload = project_payload()
        del payload["title"]
        response = await client.post("/api/front/projects/", json=payload)
        assert response.status_code == 422


class TestProjectAdminEndpoints:
    @pytest.mark.asyncio
    async def test_admin_list_requires_auth(self, client: AsyncClient) -> None:
        response = await client.get("/api/admin/projects/list/")
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_admin_list_rejects_regular_user(
        self,
        client: AsyncClient,
        user_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get("/api/admin/projects/list/", headers=user_auth_headers)
        assert response.status_code == 403

    @pytest.mark.asyncio
    async def test_admin_list_returns_empty_collection(
        self,
        client: AsyncClient,
        admin_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get("/api/admin/projects/list", headers=admin_auth_headers)
        assert response.status_code == 200
        assert response.json() == {"result": []}

    @pytest.mark.asyncio
    async def test_admin_can_list_submitted_projects(
        self,
        client: AsyncClient,
        admin_auth_headers: dict[str, str],
    ) -> None:
        await client.post("/api/front/projects/", json=project_payload(title="Listed Project"))
        response = await client.get("/api/admin/projects/list/", headers=admin_auth_headers)
        assert response.status_code == 200
        assert len(response.json()["result"]) == 1
        assert response.json()["result"][0]["title"] == "Listed Project"

    @pytest.mark.asyncio
    async def test_admin_get_project_by_id(
        self,
        client: AsyncClient,
        admin_auth_headers: dict[str, str],
    ) -> None:
        created = await client.post("/api/front/projects/", json=project_payload())
        project_id = created.json()["id"]
        response = await client.get(
            f"/api/admin/projects/{project_id}/", headers=admin_auth_headers
        )
        assert response.status_code == 200
        assert response.json()["id"] == project_id

    @pytest.mark.asyncio
    async def test_admin_get_missing_project_returns_404(
        self,
        client: AsyncClient,
        admin_auth_headers: dict[str, str],
    ) -> None:
        response = await client.get("/api/admin/projects/9999/", headers=admin_auth_headers)
        assert response.status_code == 404

    @pytest.mark.asyncio
    async def test_admin_can_create_project_directly(
        self,
        client: AsyncClient,
        admin_auth_headers: dict[str, str],
    ) -> None:
        response = await client.post(
            "/api/admin/projects/",
            json=project_payload(title="Admin Created"),
            headers=admin_auth_headers,
        )
        assert response.status_code == 201
        assert response.json()["title"] == "Admin Created"


class TestBlogSchema:
    def test_post_create_requires_all_fields(self) -> None:
        with pytest.raises(ValidationError):
            PostCreate(title="Only title")  # type: ignore[call-arg]


class TestBlogEndpoints:
    @pytest.mark.asyncio
    async def test_create_post_requires_authentication(self, client: AsyncClient) -> None:
        response = await client.post("/api/front/blog/", json=blog_post_payload())
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_user_can_create_blog_post(
        self,
        client: AsyncClient,
        regular_user,
        user_auth_headers: dict[str, str],
    ) -> None:
        response = await client.post(
            "/api/front/blog/",
            json=blog_post_payload(),
            headers=user_auth_headers,
        )
        assert response.status_code == 201
        body = response.json()
        assert body["slug"] == "hello-world"
        assert body["status"] == PostStatus.WAITING
        assert body["author_id"] == regular_user.id

    @pytest.mark.asyncio
    async def test_duplicate_slug_returns_409(
        self,
        client: AsyncClient,
        user_auth_headers: dict[str, str],
    ) -> None:
        first = await client.post(
            "/api/front/blog/", json=blog_post_payload(), headers=user_auth_headers
        )
        assert first.status_code == 201

        duplicate = await client.post(
            "/api/front/blog/",
            json=blog_post_payload(title="Another Title"),
            headers=user_auth_headers,
        )
        assert duplicate.status_code == 409
        assert duplicate.json()["detail"] == "Slug already exists"

    @pytest.mark.asyncio
    async def test_admin_can_create_blog_post(
        self,
        client: AsyncClient,
        admin_auth_headers: dict[str, str],
    ) -> None:
        response = await client.post(
            "/api/admin/blog/",
            json=blog_post_payload(slug="admin-post"),
            headers=admin_auth_headers,
        )
        assert response.status_code == 201
        assert response.json()["slug"] == "admin-post"

    @pytest.mark.asyncio
    async def test_create_post_missing_content_returns_422(
        self,
        client: AsyncClient,
        user_auth_headers: dict[str, str],
    ) -> None:
        payload = blog_post_payload()
        del payload["content"]
        response = await client.post("/api/front/blog/", json=payload, headers=user_auth_headers)
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_inactive_user_cannot_create_post(
        self, client: AsyncClient, inactive_user
    ) -> None:
        response = await client.post(
            "/api/front/blog/",
            json=blog_post_payload(slug="inactive-author"),
            headers=bearer_headers(inactive_user),
        )
        assert response.status_code == 401
