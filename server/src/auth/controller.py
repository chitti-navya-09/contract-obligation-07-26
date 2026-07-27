from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.database.models import User, UserSession
from pydantic import BaseModel
from passlib.context import CryptContext
import jwt
import uuid
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "super-secret-key-for-contractiq"
ALGORITHM = "HS256"

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.get("/health")
def health():
    return {"status": "ok"}

@router.post("/signup")
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(user_data.password)
    new_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "email": new_user.email, "full_name": new_user.full_name}

@router.post("/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    
    # Try to verify hash (will fail for old placeholder accounts)
    try:
        is_valid = pwd_context.verify(user_data.password, user.hashed_password) if user else False
    except ValueError:
        # Happens if we try to verify the old '_hashed' plaintext
        is_valid = False
        
    if not user or not is_valid:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=30)
    expire = datetime.utcnow() + access_token_expires
    to_encode = {"sub": user.email, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    session_token = str(uuid.uuid4())
    session_expire = datetime.utcnow() + timedelta(days=7)
    
    new_session = UserSession(
        user_id=user.id,
        session_token=session_token,
        expires_at=session_expire
    )
    db.add(new_session)
    db.commit()
    
    return {
        "access_token": encoded_jwt,
        "refresh_token": session_token,
        "token_type": "bearer", 
        "user": {"id": user.id, "email": user.email, "full_name": user.full_name}
    }

@router.post("/logout")
def logout():
    # In a real app we would read the token and set is_active=False in the db
    return {"message": "Successfully logged out"}
