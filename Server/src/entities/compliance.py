from datetime import datetime
from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.ext.declarative import declarative_base

# Declarative base class for SQLAlchemy.
# Replace with your project's global base in production if needed.
Base = declarative_base()

class ComplianceRecord(Base):
    """
    SQLAlchemy model representing a compliance item.
    Naming conventions are aligned with the React frontend property names.
    """
    __tablename__ = "compliance_records"

    id = Column(Integer, primary_key=True, index=True)
    requirement = Column(String(255), nullable=False)            # E.g. 'GDPR Data Processing'
    category = Column(String(100), nullable=False, index=True)   # E.g. 'Data Privacy', 'Security'
    entity = Column(String(100), nullable=False, index=True)     # E.g. 'TechCorp Solutions'
    contract_id = Column(String(100), nullable=False, index=True) # E.g. 'CNT-2025-001'
    status = Column(String(50), nullable=False, default="Compliant", index=True) # E.g. 'Compliant', 'Non-Compliant', 'Warning', 'Under Review'
    risk = Column(String(50), nullable=False, default="Medium", index=True)      # E.g. 'High', 'Medium', 'Low'
    last_audit = Column(Date, nullable=False)                    # E.g. 2023-10-01
    score = Column(Integer, nullable=False, default=100)         # Health Score: 0 to 100

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def to_dict(self):
        """Serializes the database record to match the React frontend dictionary structure."""
        return {
            "id": f"CMP-{self.id:03d}",
            "requirement": self.requirement,
            "category": self.category,
            "entity": self.entity,
            "contractId": self.contract_id,
            "status": self.status,
            "risk": self.risk,
            "lastAudit": self.last_audit.isoformat() if self.last_audit else None,
            "score": self.score,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }