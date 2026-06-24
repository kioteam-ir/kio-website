import aiohttp
import async_timeout

from conf import settings


async def make_request(url: str, method: str, data: dict | None = None, headers: dict | None = None):
    if not data:
        data = {}

    async with async_timeout.timeout(settings.GATEWAY_TIMEOUT):
        async with aiohttp.ClientSession() as session:

            request = getattr(session, method)
            async with request(url, json=data, headers=headers) as response:

                content_type = response.headers.get("Content-Type", "")
                
                if "application/json" in content_type:
                    resp_data = await response.json()
                else:
                    resp_data = await response.text()

                text = await response.text()

                return resp_data, response.status
            

async def check_admin(url: str, auth: str, data: dict):
    headers = {
        "Authorization": auth,
        "Content-type": "application/json"
    }
    async with async_timeout.timeout(settings.GATEWAY_TIMEOUT):
        async with aiohttp.ClientSession() as session:

            request = getattr(session, "post")
            async with request(url, headers=headers, json=data) as response:

                content_type = response.headers.get("Content-Type", "")
                
                if "application/json" in content_type:
                    resp_data = await response.json()
                else:
                    resp_data = await response.text()

                text = await response.text()

                return resp_data, response.status
    