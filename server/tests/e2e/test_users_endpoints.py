def test_list_users(client):
    response = client.get("/users/")
    assert response.status_code == 200
    assert response.json() == []
