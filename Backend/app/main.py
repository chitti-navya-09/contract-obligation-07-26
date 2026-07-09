from fastapi import FastAPI

# Database
from app.db.database import Base, engine

# Models (import them before create_all)
from app.models.user import User
from app.models.contract import Contract

# Routers
from app.routes.auth import router as auth_router
from app.routes.contracts import router as contract_router

# Create all tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(
    title="ContractIQ API",
    version="1.0.0"
)

# Authentication routes
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

# Contract routes
app.include_router(
    contract_router,
    prefix="/contracts",
    tags=["Contracts"]
)

# Root endpoint
@app.get("/")
def root():
    return {
        "message": "ContractIQ Backend Running 🚀"
    }