from fastapi import APIRouter
from src.auth.controller import router as auth_router
from src.contracts.controller import router as contracts_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(contracts_router, prefix="/contracts", tags=["contracts"])
