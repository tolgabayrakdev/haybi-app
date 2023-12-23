from pydantic import BaseModel, Field


class CurrentUser(BaseModel):
    id: int
    username: str
    email: str
    password: str
    role_id: int
    created_at: str
    updated_at: str


class LoginUser(BaseModel):
    email: str
    password: str


class RegisterUser(BaseModel):
    username: str = Field(
        max_length=10
    )
    email: str
    password: str


class UserRegisterResponse(BaseModel):
    username: str
    email: str



class UserVerifyResponse(BaseModel):
    username: str
    email: str
    role: str