# test_README.md

import pytest
import httpx

BASE_URL = "http://127.0.0.1:8000"

@pytest.fixture(scope="module")
def test_user():
    return {"username": "testuser", "password": "testpass"}

@pytest.fixture(scope="module")
def access_token(test_user):
    # Sign up user
    httpx.post(f"{BASE_URL}/signup", json=test_user)
    # Login user
    resp = httpx.post(f"{BASE_URL}/login", data=test_user)
    assert resp.status_code == 200
    return resp.json()["access_token"]

def test_health_check():
    resp = httpx.get(f"{BASE_URL}/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"

def test_signup(test_user):
    resp = httpx.post(f"{BASE_URL}/signup", json=test_user)
    assert resp.status_code in [200, 400]  # 400 if user already exists

def test_login(test_user):
    resp = httpx.post(f"{BASE_URL}/login", data=test_user)
    assert resp.status_code == 200
    assert "access_token" in resp.json()

def test_create_book(access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    book = {"title": "Test Book", "author": "Author", "description": "Desc"}
    resp = httpx.post(f"{BASE_URL}/books/", json=book, headers=headers)
    assert resp.status_code == 200
    assert "id" in resp.json()
    global book_id
    book_id = resp.json()["id"]

def test_get_book(access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    resp = httpx.get(f"{BASE_URL}/books/{book_id}", headers=headers)
    assert resp.status_code == 200
    assert resp.json()["title"] == "Test Book"

def test_update_book(access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    update = {"title": "Updated Book", "author": "Author", "description": "Desc"}
    resp = httpx.put(f"{BASE_URL}/books/{book_id}", json=update, headers=headers)
    assert resp.status_code == 200
    assert resp.json()["title"] == "Updated Book"

def test_get_all_books(access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    resp = httpx.get(f"{BASE_URL}/books/", headers=headers)
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)

def test_delete_book(access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    resp = httpx.delete(f"{BASE_URL}/books/{book_id}", headers=headers)
    assert resp.status_code == 200