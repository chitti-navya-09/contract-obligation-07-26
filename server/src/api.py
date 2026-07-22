from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.auth.controller import router as auth_router
from src.contracts.controller import router as contracts_router
from src.dashboard.controller import router as dashboard_router
from src.obligation.controller import router as obligation_router
from src.database.db import get_db
from src.database.models import User, Contract, Obligation, Renewal, Transaction, AuditLog, TaxEstimator
from pydantic import BaseModel
import uuid
from datetime import datetime

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(contracts_router, prefix="/contracts", tags=["contracts"])
api_router.include_router(dashboard_router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(obligation_router, prefix="/obligations", tags=["obligations"])

@api_router.get("/reports/mockData")
def get_reports(db: Session = Depends(get_db)):
    # Group contracts value by month or just mock dynamically from DB
    return [
        { "name": "Jan", "value": 4200 },
        { "name": "Feb", "value": 3800 },
        { "name": "Mar", "value": 5100 },
        { "name": "Apr", "value": 4700 },
        { "name": "May", "value": 6300 },
        { "name": "Jun", "value": 5900 }
    ]

@api_router.get("/reports/details")
def get_report_details(db: Session = Depends(get_db)):
    total_val = sum([c.value for c in db.query(Contract).all()])
    renewals_count = db.query(Renewal).count()
    return {
        "totalValue": f"${total_val:,.2f}",
        "renewals": str(renewals_count),
        "compliance": "98.5%",
        "csvData": "id,name,value\n1,Contract A,4200\n2,Contract B,3800"
    }

@api_router.get("/audit-logs")
def get_audit_logs(db: Session = Depends(get_db)):
    return db.query(AuditLog).all()

@api_router.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    active_count = db.query(Contract).filter(Contract.status == "Active").count()
    renewals_count = db.query(Renewal).count()
    pending_obl = db.query(Obligation).filter(Obligation.status == "Pending").count()
    return {
        "activeContracts": { "metric": str(active_count), "trendText": "+12% this month", "trendDirection": "up" },
        "upcomingRenewals": { "metric": str(renewals_count), "trendText": "+4 this week", "trendDirection": "up" },
        "pendingObligations": { "metric": str(pending_obl), "trendText": "-2% from last week", "trendDirection": "down" },
        "complianceStatus": { "metric": "98.5%", "trendText": "Consistent", "trendDirection": "up" }
    }

@api_router.get("/dashboard/activity")
def get_dashboard_activity(db: Session = Depends(get_db)):
    return [
        { "month": "Jan", "drafts": 25, "executed": 15 },
        { "month": "Feb", "drafts": 40, "executed": 20 },
        { "month": "Mar", "drafts": 35, "executed": 35 },
        { "month": "Apr", "drafts": 65, "executed": 45 },
        { "month": "May", "drafts": 50, "executed": 70 },
        { "month": "Jun", "drafts": 85, "executed": 60 }
    ]

@api_router.get("/transactions")
def get_transactions(db: Session = Depends(get_db)):
    trxs = db.query(Transaction).all()
    return [
        {
            "id": t.transaction_id,
            "date": t.date,
            "description": t.description,
            "amount": t.amount,
            "status": t.status
        } for t in trxs
    ]

@api_router.get("/renewals")
def get_renewals(db: Session = Depends(get_db)):
    from src.database.models import Contract
    renewals = db.query(Renewal, Contract).join(Contract, Renewal.contract_id == Contract.id).all()
    return [
        {
            "id": r.id,
            "contract": c.vendor,
            "type": c.type,
            "renewalDate": r.renewal_date.strftime("%b %d, %Y") if r.renewal_date else "",
            "status": r.status,
            "owner": c.owner
        } for r, c in renewals
    ]

@api_router.get("/tax-estimators")
def get_tax_estimators(db: Session = Depends(get_db)):
    import json
    te = db.query(TaxEstimator).first()
    if te:
        return {
            "estimatedTax": te.estimatedTax,
            "taxRate": te.taxRate,
            "deductions": te.deductions,
            "netIncome": te.netIncome,
            "breakdown": json.loads(te.breakdown) if te.breakdown else []
        }
    return {
        "estimatedTax": "$0",
        "taxRate": "0%",
        "deductions": "$0",
        "netIncome": "$0",
        "breakdown": []
    }

class UserCreate(BaseModel):
    name: str
    email: str
    role: str

class UserUpdate(BaseModel):
    name: str
    email: str
    role: str
    status: str

@api_router.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@api_router.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(
        user_id=f"USR-{uuid.uuid4().hex[:6].upper()}",
        name=user.name,
        email=user.email,
        role=user.role,
        status="Active",
        lastLogin="Never"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@api_router.put("/users/{user_id}")
def update_user(user_id: str, user: UserUpdate, db: Session = Depends(get_db)):
    u = db.query(User).filter(User.user_id == user_id).first()
    if u:
        u.name = user.name
        u.email = user.email
        u.role = user.role
        u.status = user.status
        db.commit()
        db.refresh(u)
        return u
    return {"error": "User not found"}

@api_router.delete("/users/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):
    u = db.query(User).filter(User.user_id == user_id).first()
    if u:
        u.status = "Inactive"
        db.commit()
        return {"message": "User deactivated"}
    return {"error": "User not found"}
