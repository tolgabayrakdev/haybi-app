from ..database import SessionLocal
from ..model import User
from app.util.helper import Helper
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from app.schema.auth_schema import RegisterUser


db = SessionLocal()


class AuthService:
    @staticmethod
    def login(email: str, password: str) -> HTTPException | dict[str, str]:
        user = db.query(User).filter_by(email=email).first()
        if user is None or not Helper.match_hash_text(str(user.password), password):
            raise HTTPException(status_code=400, detail="Email or password wrong!")
        access_token = Helper.generate_access_token({"user_id": user.id})
        refresh_token = Helper.generate_access_token({"user_id": user.id})
        return {"access_token": access_token, "refresh_token": refresh_token}

    @staticmethod
    def register(payload: RegisterUser):
        try:
            user = User(
                username=payload.username,
                email=payload.email,
                password=Helper.generate_hash_password(payload.password),
                role_id=1,
            )
            db.add(user)
            db.commit()
            return user
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def user_information(id: int):
        user = db.query(User).filter_by(id=id).first()
        if user:
            return user
        else:
            return False
