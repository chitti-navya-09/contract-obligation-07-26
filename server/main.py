from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uvicorn

app = FastAPI(title="ContractIQ API", description="Backend API for Contract Management System")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Database setup (In-memory for prototype)
mock_db = {
    "contracts": [
        {"id": "CTR-2026-001", "vendor": "Acme Corp", "type": "NDA", "status": "Active", "value": "$50,000", "owner": "Jane Doe", "date": "Jul 12, 2026"}
    ],
    "users": []
}

# --- Pydantic Models ---
class UserLogin(BaseModel):
    email: str
    password: str

class UserSignup(BaseModel):
    fullName: str
    email: str
    password: str

class ContractBase(BaseModel):
    vendor: str
    type: str
    status: str
    value: str
    owner: str

class Contract(ContractBase):
    id: str
    date: str

# --- Auth Endpoints ---
@app.post("/api/auth/login")
async def login(credentials: UserLogin):
    # Mock auth success
    if credentials.email and credentials.password:
        return {"token": "mock-jwt-token-12345", "user": {"email": credentials.email}}
    raise HTTPException(status_code=400, detail="Invalid credentials")

@app.post("/api/auth/signup")
async def signup(user: UserSignup):
    # Mock signup success
    mock_db["users"].append(user.dict())
    return {"token": "mock-jwt-token-67890", "message": "User created successfully"}

@app.post("/api/auth/reset-password")
async def reset_password(email: str):
    return {"message": "If the email exists, a reset link has been sent."}

# --- Contract Endpoints ---
@app.get("/api/contracts", response_model=List[Contract])
async def get_contracts():
    return mock_db["contracts"]

@app.post("/api/contracts", response_model=Contract)
async def create_contract(contract: ContractBase):
    new_contract = contract.dict()
    new_contract["id"] = f"CTR-2026-00{len(mock_db['contracts']) + 1}"
    new_contract["date"] = datetime.now().strftime("%b %d, %Y")
    mock_db["contracts"].append(new_contract)
    return new_contract

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "ContractIQ API is running perfectly."}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
