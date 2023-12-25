from fastapi import APIRouter
from fastapi import Depends
from app.service.client_service import ClientService
from app.schema.client_schema import CreateClient, UpdateClient
from app.middleware.auth_middleware import auth_middleware
from typing import Annotated
from ..model import User

client_router = APIRouter()


@client_router.post("/", status_code=201)
async def create(
    client: CreateClient, auth_user: Annotated[User, Depends(auth_middleware)]
):
    return ClientService.create(user=client, user_id=int(auth_user.id)) # type: ignore


@client_router.put("/{id}")
async def update(id: int, client: UpdateClient):
    return ClientService.update(data=client, id=id)


@client_router.delete("/{id}")
async def delete(id: int):
    return ClientService.delete(id=id)


@client_router.get("/{id}")
async def show(id: int):
    return ClientService.show(id=id)


@client_router.get("/")
async def list(
    auth_user: Annotated[User, Depends(auth_middleware)]
):
    return ClientService.list_by_user(user_id=auth_user.id) #type: ignore
