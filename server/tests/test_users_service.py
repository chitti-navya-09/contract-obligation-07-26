from src.users.service import UserService


def test_list_users_empty():
    service = UserService()
    assert service.list_users() == []
