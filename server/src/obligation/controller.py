from fastapi import APIRouter
from src.database.core import mock_db

router = APIRouter()

@router.get("/")
def get_obligations():
    return mock_db.get("obligations", [])
