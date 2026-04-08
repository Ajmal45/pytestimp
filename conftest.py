import pytest
from app import app, users

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client

@pytest.fixture(autouse=True)
def clear_users():
    print("Clearing users...")
    users.clear()