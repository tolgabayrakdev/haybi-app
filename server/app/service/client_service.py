from ..database import SessionLocal
from ..model import User
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException

db = SessionLocal()


class ClientService:
    @staticmethod
    def create():
        pass

    @staticmethod
    def delete():
        pass

    @staticmethod
    def update():
        pass

    @staticmethod
    def show():
        pass

    @staticmethod
    def list():
        pass
