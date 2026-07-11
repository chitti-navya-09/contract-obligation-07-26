from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.compliance.controller import router as compliance_router
from src.entities.compliance import Base, ComplianceRecord
from src.compliance.controller import engine, SessionLocal
from src.database.seed import seed_db

app = FastAPI(title="Contract Obligation API")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
Base.metadata.create_all(bind=engine)

# Auto-seed if database is empty
db = SessionLocal()
try:
    if db.query(ComplianceRecord).count() == 0:
        print("No compliance records found. Auto-seeding...")
        db.close()
        seed_db()
    else:
        db.close()
except Exception as e:
    print("Auto-seed verification failed:", e)
    db.close()

app.include_router(compliance_router)

