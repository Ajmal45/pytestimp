def test_register_success(client):
    response = client.post("/register", json={
        "email": "test@gmail.com",
        "password": "123456"
    })
    assert response.status_code == 201


def test_register_duplicate(client):
    client.post("/register", json={
        "email": "dup@gmail.com",
        "password": "123"
    })

    response = client.post("/register", json={
        "email": "dup@gmail.com",
        "password": "123"
    })

    assert response.status_code == 409


def test_register_missing_fields(client):
    response = client.post("/register", json={
        "email": ""
    })
    assert response.status_code == 400

def test_login_success(client):
    client.post("/register", json={
        "email": "user@gmail.com",
        "password": "123456"
    })

    response = client.post("/login", json={
        "email": "user@gmail.com",
        "password": "123456"
    })

    assert response.status_code == 200
    assert "token" in response.json


def test_login_success(client):
    client.post("/register", json={
        "email": "user@gmail.com",
        "password": "123456"
    })

    response = client.post("/login", json={
        "email": "user@gmail.com",
        "password": "123456"
    })

    assert response.status_code == 200


def test_login_user_not_found(client):
    response = client.post("/login", json={
        "email": "unknown@gmail.com",
        "password": "123"
    })

    assert response.status_code == 404


def test_login_missing_fields(client):
    response = client.post("/login", json={
        "email": ""
    })

    assert response.status_code == 400