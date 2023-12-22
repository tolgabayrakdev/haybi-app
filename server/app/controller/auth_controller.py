from fastapi import APIRouter
from fastapi import Response, Request, HTTPException


auth_router = APIRouter()

@auth_router.post("/login")
async def login():
    pass