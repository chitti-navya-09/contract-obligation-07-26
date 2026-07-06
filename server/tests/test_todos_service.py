from src.todos.service import TodoService


def test_list_todos_empty():
    service = TodoService()
    assert service.list_todos() == []
