from datetime import UTC, datetime, timedelta

import pytest
from httpx import AsyncClient
from pydantic import ValidationError
from sqlmodel import col, select
from tests.helpers import bearer_headers, blog_post_payload, project_payload, seed_post

from app.modules.blog.models import Post, PostStatus
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
        response = await client.get("/api/admin/projects/list/", headers=admin_auth_headers)
        assert response.status_code == 200
        assert response.json()["items"] == []

    @pytest.mark.asyncio
    async def test_admin_can_list_submitted_projects(
        self,
        client: AsyncClient,
        admin_auth_headers: dict[str, str],
    ) -> None:
        await client.post("/api/front/projects/", json=project_payload(title="Listed Project"))
        response = await client.get("/api/admin/projects/list/", headers=admin_auth_headers)
        assert response.status_code == 200
        assert len(response.json()["items"]) == 1
        assert response.json()["items"][0]["title"] == "Listed Project"

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


class TestBlogPostModel:
    def test_author_id_references_accounts_user(self) -> None:
        fks = Post.__table__.c.author_id.foreign_keys
        assert {fk.target_fullname for fk in fks} == {"accounts_user.id"}

    def test_composite_index_on_status_and_created_at(self) -> None:
        composite = [
            ix for ix in Post.__table__.indexes if ix.name == "ix_blog_post_status_created_at"
        ]
        assert len(composite) == 1
        assert [c.name for c in composite[0].columns] == ["status", "created_at"]

    @pytest.mark.asyncio
    async def test_updated_at_defaults_and_changes_on_update(self, session) -> None:
        post = await seed_post(session, slug="timestamps-move")
        assert post.updated_at is not None
        original = post.updated_at

        post.title = "Renamed Title"
        session.add(post)
        await session.commit()
        await session.refresh(post)

        assert post.updated_at is not None
        assert post.updated_at > original


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


class TestBlogPublicEndpoints:
    @pytest.mark.asyncio
    async def test_public_list_returns_only_published_posts_newest_first(
        self, client: AsyncClient, session
    ) -> None:
        published_old = await seed_post(
            session, slug="published-old", created_at=datetime(2026, 1, 1, tzinfo=UTC)
        )
        published_new = await seed_post(
            session, slug="published-new", created_at=datetime(2026, 3, 1, tzinfo=UTC)
        )
        await seed_post(session, slug="waiting-one", status=PostStatus.WAITING)
        await seed_post(session, slug="rejected-one", status=PostStatus.REJECTED)

        response = await client.get("/api/front/blog/list/")
        assert response.status_code == 200

        body = response.json()
        assert body["total"] == 2
        returned_slugs = [item["slug"] for item in body["items"]]
        assert returned_slugs == ["published-new", "published-old"]
        assert set(returned_slugs) == {published_new.slug, published_old.slug}

    @pytest.mark.asyncio
    async def test_public_list_paginates(self, client: AsyncClient, session) -> None:
        for index in range(12):
            await seed_post(
                session,
                slug=f"page-post-{index:02d}",
                created_at=datetime(2026, 1, 1, tzinfo=UTC) + timedelta(minutes=index),
            )

        first_page = await client.get("/api/front/blog/list/")
        assert first_page.status_code == 200
        assert len(first_page.json()["items"]) == 10
        assert first_page.json()["total"] == 12
        assert first_page.json()["pages"] == 2

        second_page = await client.get("/api/front/blog/list/?page=2&size=10")
        assert second_page.status_code == 200
        assert len(second_page.json()["items"]) == 2

    @pytest.mark.asyncio
    async def test_public_list_items_carry_created_at(self, client: AsyncClient, session) -> None:
        await seed_post(session, slug="with-date")
        response = await client.get("/api/front/blog/list/")
        assert response.status_code == 200
        assert response.json()["items"][0]["created_at"] is not None

    @pytest.mark.asyncio
    async def test_public_detail_returns_published_post(self, client: AsyncClient, session) -> None:
        await seed_post(session, slug="read-me", title="Read Me")
        response = await client.get("/api/front/blog/read-me/")
        assert response.status_code == 200
        body = response.json()
        assert body["slug"] == "read-me"
        assert body["title"] == "Read Me"
        assert body["status"] == PostStatus.PUBLISHED
        assert body["created_at"] is not None
        assert body["updated_at"] is not None

    @pytest.mark.asyncio
    async def test_public_detail_returns_404_for_missing_slug(
        self, client: AsyncClient, session
    ) -> None:
        response = await client.get("/api/front/blog/does-not-exist/")
        assert response.status_code == 404
        assert response.json()["detail"] == "Post not found"

    @pytest.mark.asyncio
    async def test_public_detail_hides_unpublished_posts(
        self, client: AsyncClient, session
    ) -> None:
        await seed_post(session, slug="still-waiting", status=PostStatus.WAITING)
        await seed_post(session, slug="was-rejected", status=PostStatus.REJECTED)

        for slug in ("still-waiting", "was-rejected"):
            response = await client.get(f"/api/front/blog/{slug}/")
            assert response.status_code == 404

    @pytest.mark.asyncio
    async def test_public_list_matches_persisted_rows(self, client: AsyncClient, session) -> None:
        await seed_post(session, slug="db-check")
        result = await session.exec(select(Post).where(col(Post.slug) == "db-check"))
        stored = result.first()
        assert stored is not None
        response = await client.get("/api/front/blog/list/")
        assert response.status_code == 200
        assert response.json()["items"][0]["title"] == stored.title
