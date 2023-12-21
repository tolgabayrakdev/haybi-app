from .database import Base
from sqlalchemy import ForeignKey, Integer, String, DateTime, Column
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    
    

