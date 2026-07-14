from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete
from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from src.database.core import get_db
from src.database.models import Notification

router = APIRouter(prefix="/notifications", tags=["Notifications"])

class NotificationResponse(BaseModel):
    id: int
    cat: str
    urgency: str
    title: str
    desc: str
    time: str
    isRead: bool

    model_config = ConfigDict(from_attributes=True)

def format_relative_time(created_at):
    # Simply return a mock text for simplicity, or format the date nicely
    return created_at.strftime("%Y-%m-%d %H:%M")

@router.get("", response_model=List[NotificationResponse])
async def list_notifications(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Notification)
        .where(Notification.user_id == 1)
        .order_by(Notification.id.desc())
    )
    items = result.scalars().all()
    
    return [
        NotificationResponse(
            id=item.id,
            cat=item.category,
            urgency=item.urgency,
            title=item.title,
            desc=item.description,
            time=format_relative_time(item.created_at),
            isRead=item.is_read
        )
        for item in items
    ]

@router.patch("/{id}/read")
async def mark_as_read(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Notification).where(Notification.id == id, Notification.user_id == 1)
    )
    item = result.scalars().first()
    if not item:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    item.is_read = True
    db.add(item)
    await db.commit()
    return {"status": "success"}

@router.post("/mark-all-read")
async def mark_all_read(db: AsyncSession = Depends(get_db)):
    await db.execute(
        update(Notification)
        .where(Notification.user_id == 1)
        .values(is_read=True)
    )
    await db.commit()
    return {"status": "success"}

@router.delete("/{id}")
async def dismiss_notification(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Notification).where(Notification.id == id, Notification.user_id == 1)
    )
    item = result.scalars().first()
    if not item:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    await db.delete(item)
    await db.commit()
    return {"status": "success"}
