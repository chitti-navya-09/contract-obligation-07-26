def test_auth_health(client):
    response = client.get("/auth/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
