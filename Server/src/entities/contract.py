from sqlalchemy import Column, Integer, String, Float, Date
from src.database.core import Base


class Contract(Base):

    __tablename__ = "contracts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(150),
        nullable=False
    )

    vendor = Column(
        String(150),
        nullable=False
    )
    
    type = Column(
        String(100),
        nullable=False
    )

    value = Column(
        Float,
        nullable=False
    )

    end_date = Column(
        Date,
        nullable=False
    )

    owner = Column(
        String(100),
        nullable=False
    )

    status = Column(
        String(50),
        default="Active"
    )

    compliance = Column(
        String(50),
        default="Compliant"
    )