from fastapi import FastAPI
from .database import engine
from . import model

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
async def index():
    return {"hello": "world"}