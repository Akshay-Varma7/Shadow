from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy import create_engine

from backend.db.session import engine#engine contains the information and machinery SQLAlchemy needs to communicate with the database:db connection manager
from backend.db.schema import Base

from backend.api.chat import router as chat_router
from backend.api.message import router as message_router


app = FastAPI()#1.make app
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)#2.create table if dne

#register routes-3.listen to requests
app.include_router(chat_router,prefix="/chat")
app.include_router(message_router,prefix="/message")

#uvicorn handles ports

#SQLAlchemy doesn't just use Base for inheritance. It also uses it to collect information about all models that inherit from it. and store in metadata

#metadata: SQLAlchemy's description of your database structure.
#create_all(bind=engine): Take all the tables described in this metadata and create them in the database connected through this engine, if they don't already exist."