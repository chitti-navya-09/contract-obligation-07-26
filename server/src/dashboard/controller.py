from fastapi import APIRouter
from src.database.dummy_data import recentContracts

router = APIRouter()

@router.get("/recent")
def get_recent_contracts():
    return recentContracts
