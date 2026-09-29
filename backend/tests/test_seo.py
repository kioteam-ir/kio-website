import pytest
from httpx import AsyncClient


def seo_payload(
    title: str = "تیم کایو — توسعه نرم‌افزار تحت وب",
    description: str = "معرفی کوتاه تیم کایو که در نتایج جستجو نمایش داده می‌شود…",
) -> dict[str, str]:
    return {"title": title, "description": description}


class TestSeoAdminEndpoints:
    @pytest.mark.asyncio
    async def test_get_seo_requires_auth(self, client: AsyncClient) -> None:
        response = await client.get("/api/admin/seo/")
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_get_seo_rejects_regular_user(
        self, client: AsyncClient, user_auth_headers: dict[str, str]
    ) -> None:
        response = await client.get("/api/admin/seo/", headers=user_auth_headers)
        assert response.status_code == 403

    @pytest.mark.asyncio
    async def test_get_seo_returns_404_when_empty(
        self, client: AsyncClient, admin_auth_headers: dict[str, str]
    ) -> None:
        response = await client.get("/api/admin/seo/", headers=admin_auth_headers)
        assert response.status_code == 404
        assert response.json()["detail"] == "Main content not found"

    @pytest.mark.asyncio
    async def test_save_seo_requires_auth(self, client: AsyncClient) -> None:
        response = await client.post("/api/admin/seo/", json=seo_payload())
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_save_seo_rejects_regular_user(
        self, client: AsyncClient, user_auth_headers: dict[str, str]
    ) -> None:
        response = await client.post(
            "/api/admin/seo/", json=seo_payload(), headers=user_auth_headers
        )
        assert response.status_code == 403

    @pytest.mark.asyncio
    async def test_save_and_get_seo_content(
        self, client: AsyncClient, admin_auth_headers: dict[str, str]
    ) -> None:
        save_res = await client.post(
            "/api/admin/seo/",
            json=seo_payload(title="عنوان تستی سئو", description="توضیحات تستی سئو"),
            headers=admin_auth_headers,
        )
        assert save_res.status_code == 201
        saved = save_res.json()
        assert saved["title"] == "عنوان تستی سئو"
        assert saved["description"] == "توضیحات تستی سئو"
        assert saved.get("id") is not None

        # Read back with trailing slash
        get_res = await client.get("/api/admin/seo/", headers=admin_auth_headers)
        assert get_res.status_code == 200
        data = get_res.json()
        assert data["title"] == "عنوان تستی سئو"
        assert data["description"] == "توضیحات تستی سئو"
        assert data["id"] == saved["id"]

        # Read back without trailing slash
        get_no_slash = await client.get("/api/admin/seo", headers=admin_auth_headers)
        assert get_no_slash.status_code == 200
        assert get_no_slash.json()["id"] == saved["id"]

    @pytest.mark.asyncio
    async def test_save_seo_upsert_updates_existing_singleton(
        self, client: AsyncClient, admin_auth_headers: dict[str, str]
    ) -> None:
        # First creation
        first = await client.post(
            "/api/admin/seo/",
            json=seo_payload(title="نسخه 1", description="توضیحات 1"),
            headers=admin_auth_headers,
        )
        assert first.status_code == 201
        first_id = first.json()["id"]

        # Second creation updates existing row (singleton upsert)
        second = await client.post(
            "/api/admin/seo/",
            json=seo_payload(title="نسخه 2", description="توضیحات 2"),
            headers=admin_auth_headers,
        )
        assert second.status_code == 201
        assert second.json()["title"] == "نسخه 2"
        assert second.json()["description"] == "توضیحات 2"
        assert second.json()["id"] == first_id

        # Verify GET returns updated values
        get_res = await client.get("/api/admin/seo/", headers=admin_auth_headers)
        assert get_res.status_code == 200
        assert get_res.json()["title"] == "نسخه 2"
        assert get_res.json()["description"] == "توضیحات 2"

    @pytest.mark.asyncio
    async def test_delete_seo_by_id(
        self, client: AsyncClient, admin_auth_headers: dict[str, str]
    ) -> None:
        created = await client.post(
            "/api/admin/seo/",
            json=seo_payload(),
            headers=admin_auth_headers,
        )
        assert created.status_code == 201
        content_id = created.json()["id"]

        del_res = await client.delete(
            f"/api/admin/seo/{content_id}",
            headers=admin_auth_headers,
        )
        assert del_res.status_code == 204

        # After delete, GET returns 404
        get_res = await client.get("/api/admin/seo/", headers=admin_auth_headers)
        assert get_res.status_code == 404

    @pytest.mark.asyncio
    async def test_delete_seo_via_post_verb_backwards_compat(
        self, client: AsyncClient, admin_auth_headers: dict[str, str]
    ) -> None:
        created = await client.post(
            "/api/admin/seo/",
            json=seo_payload(),
            headers=admin_auth_headers,
        )
        content_id = created.json()["id"]

        # POST verb for delete (legacy compatibility)
        del_res = await client.post(
            f"/api/admin/seo/{content_id}",
            headers=admin_auth_headers,
        )
        assert del_res.status_code == 204

        get_res = await client.get("/api/admin/seo/", headers=admin_auth_headers)
        assert get_res.status_code == 404

    @pytest.mark.asyncio
    async def test_delete_missing_content_returns_404(
        self, client: AsyncClient, admin_auth_headers: dict[str, str]
    ) -> None:
        response = await client.delete(
            "/api/admin/seo/99999",
            headers=admin_auth_headers,
        )
        assert response.status_code == 404
        assert response.json()["detail"] == "Main content not found"

    @pytest.mark.asyncio
    async def test_delete_requires_auth_and_rejects_regular_user(
        self, client: AsyncClient, user_auth_headers: dict[str, str]
    ) -> None:
        unauth = await client.delete("/api/admin/seo/1")
        assert unauth.status_code == 401

        forbidden = await client.delete("/api/admin/seo/1", headers=user_auth_headers)
        assert forbidden.status_code == 403
