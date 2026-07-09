from datetime import date
from pydantic import BaseModel


class RenewalBase(BaseModel):
    contract_name: str
    vendor: str
    department: str

    renewal_date: date
    expiry_date: date

    status: str
    approval_status: str

    contract_value: float

    confidence: int

    recommendation: str


class RenewalCreate(RenewalBase):
    pass


class RenewalResponse(RenewalBase):
    id: int

    class Config:
        from_attributes = True