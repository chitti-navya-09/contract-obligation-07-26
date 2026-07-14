from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import api_router
from src.logging import configure_logging
from src.rate_limiter import init_rate_limiter

configure_logging()

app = FastAPI(title="Server")

app = init_rate_limiter(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://automatic-pancake-5g7qvwj9v6x735jj-3000.app.github.dev",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
def root():
    return {"status": "ok"}