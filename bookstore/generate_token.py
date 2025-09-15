# bookstore/generate_token.py
from bookstore.utils import create_access_token
from bookstore.constants import ALGORITHM, SECRET_KEY
from datetime import timedelta

if __name__ == "__main__":
    # Example payload, can be anything you want to test
    payload = {"sub": "testuser"}

    # Generate token valid for 1 hour
    token = create_access_token(payload, expires_delta=timedelta(hours=1))
    print(token)