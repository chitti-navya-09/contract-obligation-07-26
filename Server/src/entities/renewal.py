from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from database.core import Base


class Renewal(Base):
    __tablename__ = "renewals"

    renewal_id = Column(Integer, primary_key=True)
    contract_id = Column(Integer, ForeignKey("contracts.contract_id"), nullable=False)
    old_expiry_date = Column(DateTime, nullable=False)
    new_expiry_date = Column(DateTime, nullable=False)
    renewal_date = Column(DateTime, server_default=func.now())
    renewed_by = Column(String(200), nullable=False)
    remarks = Column(String(500))
    status = Column(String(100), default="Completed")
    contract = relationship("Contract", back_populates="renewals")
