from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional
from datetime import datetime
from src.database.core import get_db
from src.database.models import User

router = APIRouter(prefix="/profile", tags=["Profile"])


# ── Request schema (PATCH) ──────────────────────────────────────────────────
class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    bio: Optional[str] = None
    phone: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None
    avatar_url: Optional[str] = None


# ── Response schema ─────────────────────────────────────────────────────────
class ProfileResponse(BaseModel):
    id: int
    full_name: str
    email: str
    role: str
    department: Optional[str] = None
    job_title: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# ── GET /api/profile ─────────────────────────────────────────────────────────
@router.get("", response_model=ProfileResponse)
async def get_profile(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == 1))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")

    return ProfileResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        role=user.role,
        department=user.department,
        job_title=user.job_title,
        phone=user.phone,
        bio=user.bio,
        avatar_url=user.avatar_url,
        updated_at=user.updated_at,
    )


# ── PATCH /api/profile ───────────────────────────────────────────────────────
@router.patch("", response_model=ProfileResponse)
async def update_profile(profile_data: ProfileUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == 1))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found")

    if profile_data.full_name is not None:
        user.full_name = profile_data.full_name
    if profile_data.email is not None:
        user.email = profile_data.email
    if profile_data.bio is not None:
        user.bio = profile_data.bio
    if profile_data.phone is not None:
        user.phone = profile_data.phone
    if profile_data.job_title is not None:
        user.job_title = profile_data.job_title
    if profile_data.department is not None:
        user.department = profile_data.department
    if profile_data.avatar_url is not None:
        user.avatar_url = profile_data.avatar_url

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return ProfileResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        role=user.role,
        department=user.department,
        job_title=user.job_title,
        phone=user.phone,
        bio=user.bio,
        avatar_url=user.avatar_url,
        updated_at=user.updated_at,
    )
