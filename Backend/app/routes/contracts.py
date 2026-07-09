from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.contract import Contract
from app.schemas.contract import ContractCreate
from app.core.dependencies import get_current_user
from app.models.user import User
from fastapi import APIRouter

router = APIRouter()


@router.post("/")
def create_contract(
    contract: ContractCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_contract = Contract(
        title=contract.title,
        description=contract.description,
        contract_type=contract.contract_type,
        start_date=contract.start_date,
        end_date=contract.end_date
    )

    db.add(new_contract)
    db.commit()
    db.refresh(new_contract)

    return {
        "message": "Contract created successfully",
        "contract_id": new_contract.id
    }


@router.get("/")
def get_contracts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Contract).all()


@router.get("/{contract_id}")
def get_contract(
    contract_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    contract = db.query(Contract).filter(
        Contract.id == contract_id
    ).first()

    if not contract:
        raise HTTPException(
            status_code=404,
            detail="Contract not found"
        )

    return contract