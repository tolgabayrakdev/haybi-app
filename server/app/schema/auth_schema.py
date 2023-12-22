from pydantic import BaseModel


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
    username: str
    email: str
    password: str


class UserRegisterResponse(BaseModel):
    username: str
    email: str
