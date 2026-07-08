from fastapi import APIRouter
from src.todos.controller import router as contract_router


api_router = APIRouter()


api_router.include_router(
    contract_router,
    prefix="/api"
)