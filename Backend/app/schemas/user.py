from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    name: str
    organization: str
    department: str
    phone: str
    email: EmailStr
    password: str
    role: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    new_password: str