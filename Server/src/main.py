from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import Base, engine
from src.todos.controller import router as contracts_router

# Sync PostgreSQL tables on startup
try:
    Base.metadata.create_all(bind=engine)
    print("Database synced successfully!")
except Exception as e:
    print(f"Database sync failed: {e}")

app = FastAPI(
    title="Contract Management API",
    version="1.0.0"
)

# Bulletproof CORS setup for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows any origin (localhost, 127.0.0.1, etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes mounted at http://127.0.0.1:8000/api/contracts
app.include_router(contracts_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "API is running successfully!"}