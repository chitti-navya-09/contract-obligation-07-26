from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
import secrets

from src.database.core import get_db
from src.users.service import UserService
from src.auth.service import AuthService
from src.users.models import User

router = APIRouter(prefix="/auth", tags=["auth"])
user_service = UserService()
auth_service = AuthService()

class Token(BaseModel):
    access_token: str
    token_type: str

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@router.get("/health")
def health():
    return {"status": "ok"}

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = user_service.get_user_by_email(db, email=form_data.username)
    if not user or not auth_service.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth_service.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = user_service.get_user_by_email(db, email=req.email)
    if not user:
        # Don't reveal that the user does not exist
        return {"message": "If your email is registered, you will receive a password reset link."}
    
    # Generate a reset token
    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    db.commit()

    # Mock sending email
    print(f"--- MOCK EMAIL ---")
    print(f"To: {user.email}")
    print(f"Subject: Password Reset")
    print(f"Body: Use this token to reset your password: {reset_token}")
    print(f"------------------")

    return {"message": "If your email is registered, you will receive a password reset link."}

@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reset_token == req.token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")

    hashed_password = auth_service.get_password_hash(req.new_password)
    user.hashed_password = hashed_password
    user.reset_token = None
    db.commit()

    return {"message": "Password has been reset successfully"}
