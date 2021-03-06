from fastapi.testclient import TestClient
from core.config import settings

def test_get_access_token(client: TestClient) -> None:
    login_data = {
        "username": settings.EMAIL_TEST_USER,
        "password": settings.PASSWORD_TEST_USER,
    }
    r = client.post(
        f"{settings.API_V1_STR}/login/acsses_token", data=login_data)
    tokens = r.json()
    assert r.status_code == 201 or r.status_code == 200
    assert "access_token" in tokens
    assert tokens["access_token"]


