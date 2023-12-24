from pydantic import BaseModel


class CreateClient(BaseModel):
    name: str
    surname: str
    phone_number: float