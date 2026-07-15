from pathlib import Path
import os
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
# Dynamically loaded frontend URL for CORS configurations
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")