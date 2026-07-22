from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.database.db import get_db
from src.auth.models import LoginRequest, SignupRequest
from src.auth.service import login_user, signup_user
from pydantic import BaseModel
import uuid
from src.utils.email import send_reset_email

router = APIRouter()

class ResetPasswordRequest(BaseModel):
    email: str

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    result = login_user(data, db)
    if result:
        return result
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/register", status_code=201)
def register(data: SignupRequest, db: Session = Depends(get_db)):
    if data.password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    return signup_user(data, db)

@router.post("/logout")
def logout():
    return {"message": "Logged out successfully", "status": "success"}

@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest):
    reset_token = str(uuid.uuid4())
    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"
    
    try:
        success, extra = send_reset_email(data.email, reset_link)
        if success:
            if extra:
                return {"message": "Email sent! (Test Mode)", "preview_url": extra, "reset_link": reset_link}
            return {"message": "Password reset link sent to your email.", "reset_link": reset_link}
    except Exception as e:
        # If email fails (e.g. no internet or smtp), just return the link anyway for demo purposes
        pass

    return {"message": "Password reset link generated (mocked).", "reset_link": reset_link}
