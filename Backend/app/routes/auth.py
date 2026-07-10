from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session
from app.core.permissions import ROLE_PERMISSIONS
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import (
    RegisterRequest,
    LoginRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest
)
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.core.dependencies import get_current_user

router = APIRouter()




@router.post("/register")
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        organization=user.organization,
        department=user.department,
        phone=user.phone,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(
        {"sub": new_user.email}
    )

    return {
        "message": "User registered successfully",
        "access_token": token,
        "token_type": "bearer",
        "role": new_user.role
    }


@router.post("/login")
def login(
    user: LoginRequest,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
        {"sub": existing_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": existing_user.role,
        "name": existing_user.name
    }


@router.post("/forgot-password")
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "User verified. You can reset your password."
    }


@router.post("/reset-password")
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.password = hash_password(data.new_password)
    db.commit()

    return {
        "message": "Password reset successful"
    }


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "organization": current_user.organization,
        "department": current_user.department,
        "phone": current_user.phone,
        "email": current_user.email,
        "role": current_user.role
    }


@router.get("/admin")
def admin_dashboard(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "Administrator":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )

    return {
        "message": "Welcome Admin"
    }
@router.get("/permissions")
def get_permissions(
    current_user: User = Depends(get_current_user)
):
    return {
        "role": current_user.role,
        "permissions":
            ROLE_PERMISSIONS.get(
                current_user.role,
                []
            )
    }