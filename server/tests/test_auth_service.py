from src.auth.service import AuthService


def test_login_returns_token():
    service = AuthService()
    token = service.login("user@example.com", "password")
    assert token == "stub-token"
