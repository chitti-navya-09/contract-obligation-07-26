import os
import tempfile

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.database.core import Base
from src.database.models import UserModel
from src.auth.service import AuthService
from src.auth.security import hash_password, verify_password


@pytest.fixture(scope="function")
def db_session():
    # create a temporary SQLite database file
    fd, path = tempfile.mkstemp(suffix=".db")
    os.close(fd)
    engine = create_engine(f"sqlite:///{path}")
    Base.metadata.create_all(bind=engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    yield session

    session.close()
    engine.dispose()
    os.remove(path)


def test_hash_and_verify_password():
    pw = "a" * 100  # longer than bcrypt 72-byte limit
    hashed = hash_password(pw)
    assert isinstance(hashed, str)
    assert verify_password(pw, hashed) is True
    # A password that differs only after the 72-byte truncation may still verify
    # because bcrypt truncates inputs; ensure a differing prefix fails verification
    different_pw = "b" * 100
    assert verify_password(different_pw, hashed) is False


def test_register_creates_user(db_session):
    service = AuthService()

    class Req:
        name = "Tester"
        organization = "Org"
        department = "Dept"
        phone = "+100000"
        email = "tester@example.com"
        password = "secretpass"
        role = "Employee"

    req = Req()
    result = service.register(req, db_session)

    assert result["message"] == "User registered successfully"
    assert result["email"] == "tester@example.com"

    user = db_session.query(UserModel).filter_by(email=req.email).first()
    assert user is not None
    assert user.email == req.email
