from pydantic import BaseModel


class CreateClient(BaseModel):
    name: str
    surname: str
    phone_number: float


class UpdateClient(BaseModel):
    name: str
    surname: str
    phone_number: str