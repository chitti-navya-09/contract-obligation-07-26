from sqlalchemy import Column, Integer, String, Text, Date
from app.db.database import Base


class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    contract_type = Column(String)
    status = Column(String, default="Draft")
    start_date = Column(Date)
    end_date = Column(Date)