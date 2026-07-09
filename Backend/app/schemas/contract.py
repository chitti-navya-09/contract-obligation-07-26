from pydantic import BaseModel
from datetime import date


class ContractCreate(BaseModel):
    title: str
    description: str
    contract_type: str
    start_date: date
    end_date: date


class ContractResponse(BaseModel):
    id: int
    title: str
    description: str
    contract_type: str
    status: str

    class Config:
        from_attributes = True