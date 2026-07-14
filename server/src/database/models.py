from sqlalchemy import Boolean, Column, Integer, String, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from src.database.core import Base


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(String(100), nullable=True, default="User")
    organization = Column(String, nullable=True)
    department = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    job_title = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(1024), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    settings = relationship("UserSetting", back_populates="user", uselist=False, cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")


class UserSetting(Base):
    __tablename__ = "user_settings"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    org_name = Column(String(255), default="Acme Corp")
    currency = Column(String(10), default="USD")
    date_format = Column(String(20), default="YYYY-MM-DD")
    email_notif = Column(Boolean, default=True)
    slack_notif = Column(Boolean, default=False)
    renewal_alerts = Column(Boolean, default=True)
    two_factor = Column(Boolean, default=True)
    sso = Column(Boolean, default=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("UserModel", back_populates="settings")


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    category = Column(String(100), nullable=False)
    urgency = Column(String(50), nullable=False, default="info")
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("UserModel", back_populates="notifications")


class ContractModel(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    contract_type = Column(String, nullable=True)
    status = Column(String, nullable=True)
