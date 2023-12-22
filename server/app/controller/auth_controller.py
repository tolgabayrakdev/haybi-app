from fastapi import APIRouter
from fastapi import Response, HTTPException, Request
from app.service.auth_service import AuthService
from app.schema.auth_schema import LoginUser, RegisterUser, UserRegisterResponse
import jwt

auth_router = APIRouter()


@auth_router.post("/login")
async def login(user: LoginUser, response: Response) -> dict[str, str]:
    result = AuthService.login(user.email, user.password)
    if result:
        response.set_cookie(
            key="access_token", value=result["access_token"], httponly=True  # type: ignore
        )
        response.set_cookie(
            key="refresh_token", value=result["refresh_token"], httponly=True  # type: ignore
        )
        return {"message": "Login is successful."}
    else:
        raise HTTPException(status_code=500, detail="Server error!")


@auth_router.post("/register", status_code=201, response_model=UserRegisterResponse)
async def register(user: RegisterUser):
    return AuthService.register(payload=user)


@auth_router.post("/logout")
async def logout(response: Response) -> dict[str, str]:
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "you are logged out."}


@auth_router.post("/verify", status_code=200)
async def verify_user(request: Request):
    try:
        auth_header = request.cookies.get("access_token") and request.cookies.get(
            "refresh_token"
        )
        if auth_header is not None:
            decoded_token = jwt.decode(auth_header, "secret_key", algorithms=["HS256"])
            id = decoded_token["payload"]["user_id"]
            result = AuthService.user_information(id)
            return {
                "success": True,
                "user": {"username": result.username, "email": result.email},
            }
        else:
            raise HTTPException(status_code=401, detail="Unauthorization")
    except jwt.ExpiredSignatureError as e:
        raise HTTPException(status_code=403, detail=str(e))
