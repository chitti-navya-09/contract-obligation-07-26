from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.db import get_db
from src.database.models import Contract

router = APIRouter()

@router.get("/recent")
def get_recent_contracts(db: Session = Depends(get_db)):
    recent = db.query(Contract).order_by(Contract.id.desc()).limit(5).all()
    return recent
