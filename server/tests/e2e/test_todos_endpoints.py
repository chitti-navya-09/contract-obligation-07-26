def test_list_todos(client):
    response = client.get("/todos/")
    assert response.status_code == 200
    assert response.json() == []
