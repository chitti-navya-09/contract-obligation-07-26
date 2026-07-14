import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


SERVER_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = SERVER_DIR / ".env"

# Local development lo .env unte load chestundi.
# GitHub Actions lo env variables direct ga use avutayi.
if ENV_FILE.exists():
    load_dotenv(ENV_FILE, override=False)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL environment variable is not configured."
    )

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()