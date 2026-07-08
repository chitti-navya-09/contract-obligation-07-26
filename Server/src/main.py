from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.core import Base, engine
from src.api import api_router


Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Contract Obligation Tracking API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(
    api_router
)


@app.get("/")
def home():

    return {
        "message":"Backend running"
    }