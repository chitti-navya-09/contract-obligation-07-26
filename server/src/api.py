from fastapi import APIRouter
from src.auth.controller import router as auth_router
from src.contracts.controller import router as contracts_router
from src.dashboard.controller import router as dashboard_router
from src.database.dummy_data import obligations, reportMockData, auditLogs

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(contracts_router, prefix="/contracts", tags=["contracts"])
api_router.include_router(dashboard_router, prefix="/dashboard", tags=["dashboard"])

@api_router.get("/obligations")
def get_obligations():
    return obligations

@api_router.get("/reports/mockData")
def get_reports():
    return reportMockData

@api_router.get("/reports/details")
def get_report_details():
    from src.database.dummy_data import reportDetails
    return reportDetails

@api_router.get("/audit-logs")
def get_audit_logs():
    return auditLogs

@api_router.get("/dashboard/stats")
def get_dashboard_stats():
    from src.database.dummy_data import dashboardStats
    return dashboardStats

@api_router.get("/dashboard/activity")
def get_dashboard_activity():
    from src.database.dummy_data import activityData
    return activityData

@api_router.get("/transactions")
def get_transactions():
    from src.database.dummy_data import transactionsData
    return transactionsData

@api_router.get("/tax-estimators")
def get_tax_estimators():
    from src.database.dummy_data import taxEstimatorsData
    return taxEstimatorsData
