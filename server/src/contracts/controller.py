from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.db import get_db
from src.database.models import Contract
from pydantic import BaseModel

router = APIRouter()

class ContractCreate(BaseModel):
    id: str
    vendor: str
    type: str
    status: str
    value: str
    owner: str

@router.get("/")
def get_contracts(db: Session = Depends(get_db)):
    contracts = db.query(Contract).all()
    return contracts

@router.get("/metrics")
def get_metrics(db: Session = Depends(get_db)):
    total = db.query(Contract).count()
    active = db.query(Contract).filter(Contract.status == "Active").count()
    return {"total": total, "active": active}

@router.post("/", status_code=201)
def add_contract(data: ContractCreate, db: Session = Depends(get_db)):
    # Simple placeholder for create contract
    return {"message": "Create contract not fully implemented with DB yet"}
