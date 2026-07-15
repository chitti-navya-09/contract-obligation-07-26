from sqlalchemy import Column, Integer, String, Float, Date, Text
from src.database.core import Base

class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    vendor = Column(String(150), nullable=False)
    type = Column(String(100), nullable=False)
    value = Column(Float, nullable=False)
    start_date = Column(Date, nullable=False) # <--- Added Start Date
    end_date = Column(Date, nullable=False)
    owner = Column(String(100), nullable=False)
    status = Column(String(50), default="Active")
    compliance = Column(Integer, default=0)  # Calculated out of 100 for your progress bar

    # --- Added Detail Columns ---
    description = Column(Text, nullable=True, default="No description provided for this contract.")
    auto_renewal = Column(String(100), nullable=True, default="N/A")
    payment_terms = Column(String(100), nullable=True, default="N/A")
    governing_law = Column(String(150), nullable=True, default="N/A")
    liability_cap = Column(String(150), nullable=True, default="N/A")