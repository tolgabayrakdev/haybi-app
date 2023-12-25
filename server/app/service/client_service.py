from ..database import SessionLocal
from ..model import Client
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from app.schema.client_schema import CreateClient, UpdateClient

db = SessionLocal()


class ClientService:
    @staticmethod
    def create(user: CreateClient, user_id: int):
        try:
            client = Client(
                name=user.name,
                surname=user.surname,
                phone_number=user.phone_number,
                user_id=user_id,
            )
            db.add(client)
            db.commit()
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def delete(id: int):
        try:
            client = db.query(Client).filter_by(id=id).first()
            db.delete(client)
            db.commit()
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def update(data: UpdateClient, id: int):
        try:
            client = db.query(Client).filter_by(id=id).first()
            if client is None:
                raise HTTPException(status_code=404, detail="Client does not exist!")
            new_client = data.model_dump()
            db.add(new_client)
            db.commit()
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def show(id: int):
        try:
            client = db.query(Client).filter_by(id=id).first()
            if client is None:
                raise HTTPException(status_code=404, detail="Client does not exist!")
            return client
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    def list_by_user(user_id: int):
        try:
            client_list = db.query(Client).filter_by(user_id=user_id).all()
            return client_list
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))
