import sys
import os
from datetime import date

# Add the server's root directory to python path if run directly
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from src.compliance.controller import SessionLocal, engine
from src.entities.compliance import Base, ComplianceRecord

def seed_db():
    print("Initializing database schema...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Clear existing placeholder records
        print("Clearing existing compliance records...")
        db.query(ComplianceRecord).delete()
        db.commit()
        
        # Standard mockup data matching Compliance.jsx exactly
        mock_records = [
            ComplianceRecord(
                requirement="GDPR Data Processing",
                category="Data Privacy",
                entity="TechCorp Solutions",
                contract_id="CNT-2025-001",
                status="Compliant",
                risk="High",
                last_audit=date(2023, 10, 1),
                score=98
            ),
            ComplianceRecord(
                requirement="ISO 27001 Certification",
                category="Security",
                entity="Cloud Services LLC",
                contract_id="CNT-2025-002",
                status="Non-Compliant",
                risk="High",
                last_audit=date(2023, 9, 15),
                score=45
            ),
            ComplianceRecord(
                requirement="Annual Background Checks",
                category="HR Policy",
                entity="Staffing Agency",
                contract_id="CNT-2025-003",
                status="Under Review",
                risk="Medium",
                last_audit=date(2023, 11, 5),
                score=72
            ),
            ComplianceRecord(
                requirement="Anti-Bribery Clause",
                category="Legal",
                entity="GlobalTech",
                contract_id="CNT-2025-004",
                status="Compliant",
                risk="Low",
                last_audit=date(2023, 1, 10),
                score=100
            ),
            ComplianceRecord(
                requirement="SLA Uptime >= 99.9%",
                category="Operations",
                entity="HostProvider Inc",
                contract_id="CNT-2025-005",
                status="Warning",
                risk="Medium",
                last_audit=date(2023, 11, 20),
                score=85
            ),
        ]
        
        print("Adding seed compliance records...")
        db.add_all(mock_records)
        db.commit()
        print("Database seeded successfully with 5 records!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
