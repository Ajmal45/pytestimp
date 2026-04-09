import pytest
from app import app, users_collection

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture(autouse=True)
def clear_db():
    # This replaces users.clear()
    users_collection.delete_many({}) 
    yield