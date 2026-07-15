from fastapi import FastAPI

from src.api import api_router
from src.logging import configure_logging
from src.rate_limiter import init_rate_limiter

configure_logging()

from src.database.core import engine, Base
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Server")
app = init_rate_limiter(app)
app.include_router(api_router)


@app.get("/")
def root():
    return {"status": "ok"}
