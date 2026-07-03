import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_project_inquiry(client: AsyncClient) -> None:
    payload = {
        "title": "Mobile App",
        "description": "Need a cross-platform app",
        "phone_number": "09123456789",
        "project_type": "mobile",
    }
    response = await client.post("/api/front/projects/", json=payload)
    assert response.status_code == 201
    body = response.json()
    assert body["title"] == payload["title"]
    assert body["project_type"] == payload["project_type"]


@pytest.mark.asyncio
async def test_create_project_rejects_invalid_phone(client: AsyncClient) -> None:
    payload = {
        "title": "Bad Phone",
        "description": "Invalid phone format",
        "phone_number": "12345",
        "project_type": "web",
    }
    response = await client.post("/api/front/projects/", json=payload)
    assert response.status_code == 422
