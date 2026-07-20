from fastapi import APIRouter
from src.auth.controller import router as auth_router
from src.contracts.controller import router as contracts_router
from src.dashboard.controller import router as dashboard_router
from src.obligation.controller import router as obligation_router
from src.database.core import mock_db

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(contracts_router, prefix="/contracts", tags=["contracts"])
api_router.include_router(dashboard_router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(obligation_router, prefix="/obligations", tags=["obligations"])

@api_router.get("/reports/mockData")
def get_reports():
    return mock_db.get("reportMockData", [])

@api_router.get("/reports/details")
def get_report_details():
    return mock_db.get("reportDetails", {})

@api_router.get("/audit-logs")
def get_audit_logs():
    return mock_db.get("auditLogs", [])

@api_router.get("/dashboard/stats")
def get_dashboard_stats():
    return mock_db.get("dashboardStats", {})

@api_router.get("/dashboard/activity")
def get_dashboard_activity():
    return mock_db.get("activityData", [])

@api_router.get("/transactions")
def get_transactions():
    return mock_db.get("transactionsData", [])

@api_router.get("/tax-estimators")
def get_tax_estimators():
    return mock_db.get("taxEstimatorsData", {})

from pydantic import BaseModel
import uuid
from datetime import datetime

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
def get_users():
    return mock_db.get("users", [])

@api_router.post("/users")
def create_user(user: UserCreate):
    new_user = {
        "id": f"USR-{uuid.uuid4().hex[:6].upper()}",
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "status": "Active",
        "lastLogin": "Never"
    }
    mock_db["users"].append(new_user)
    return new_user

@api_router.put("/users/{user_id}")
def update_user(user_id: str, user: UserUpdate):
    for u in mock_db["users"]:
        if u["id"] == user_id:
            u["name"] = user.name
            u["email"] = user.email
            u["role"] = user.role
            u["status"] = user.status
            return u
    return {"error": "User not found"}

@api_router.delete("/users/{user_id}")
def delete_user(user_id: str):
    for u in mock_db["users"]:
        if u["id"] == user_id:
            u["status"] = "Inactive"
            return {"message": "User deactivated"}
    return {"error": "User not found"}
