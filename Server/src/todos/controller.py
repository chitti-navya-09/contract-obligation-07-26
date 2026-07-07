# Open: src/todos/controller.py
from fastapi import APIRouter, Query
from src.todos.service import TodoService
from src.todos.models import TodoCreate

# Changing prefix here exposes it directly as /api/contracts to the frontend


router = APIRouter(prefix="/contracts", tags=["Contracts"])

@router.get("/")
def get_all_items(search: str = Query(None), status: str = Query(None)):
    return TodoService.get_all(search=search, status=status)

@router.post("/")
def create_item(payload: TodoCreate):
    return TodoService.create(payload.dict())