from fastapi import FastAPI
from dotenv import load_dotenv
from sqlalchemy import create_engine
import os

app = FastAPI()

load_dotenv()
database_url = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

#register routes
app.include_router(,prefix="/")
