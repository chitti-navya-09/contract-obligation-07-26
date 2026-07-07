# Open: src/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import api_router  # Import the grouped api_router

app = FastAPI(title="ContractIQ API")

# Ensure CORS middleware is attached properly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# THIS IS THE CRITICAL LINE: It mounts your paths to the main application engine
app.include_router(api_router, prefix="/api")