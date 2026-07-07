# Open: src/todos/models.py
from pydantic import BaseModel
from typing import Optional

class TodoCreate(BaseModel):
    title: str
    vendor: str
    type: str
    value: str
    endDate: str
    owner: str
    status: Optional[str] = "Active"
    compliance: Optional[str] = "high"

class TodoResponse(TodoCreate):
    id: str

    class Config:
        orm_mode = True