from typing import List
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from fastapi_mail import ConnectionConfig


class Setting(BaseSettings):
    API_PREFIX: str = "/api"
    DEBUG: bool = False

    ALLOWED_ORIGINS: List[str] = []

    DATABASE_URL: str = ""

    # JWT
    SECRET_KEY: str = ""
    ALGORITHM: str = ""
    ACCESS_TOKEN_EXPIRE_MINUTES: int = ""

    # Send Mail
    EMAIL_BACKEND: str = ""
    EMAIL_HOST: str = ""
    EMAIL_USE_TLS: bool = True
    EMAIL_PORT: int = 587
    EMAIL_HOST_USER: str = ""
    EMAIL_HOST_PASSWORD: str = ""

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return v

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


conf = ConnectionConfig(
    MAIL_USERNAME="your_email@gmail.com",
    MAIL_PASSWORD="your_app_password",
    MAIL_FROM="your_email@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)

settings = Setting()
