# Open: src/api.py
from fastapi import APIRouter
# Import the router instance from your todos controller file
from src.todos.controller import router as todos_router

api_router = APIRouter()

# Register the router under the "/api" prefix block
api_router.include_router(todos_router)