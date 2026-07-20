from fastapi import APIRouter
from src.database.core import mock_db

router = APIRouter()

@router.get("/recent")
def get_recent_contracts():
    return mock_db.get("recentContracts", [])
