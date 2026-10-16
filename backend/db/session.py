import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

#.
from collections.abc import Generator#?
from sqlalchemy.orm import Session#?

from dotenv import load_dotenv
# Always load backend/.env, regardless of the terminal's directory
ENV_FILE = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(ENV_FILE)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        f"DATABASE_URL missing. Check your environment file: {ENV_FILE}"
    )

engine = create_engine(DATABASE_URL)#INSTANCE
#connect_args={"check_same_thread": False} for sqllite
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)#creates individual database sessions when called.
#FACTORY not class-instance can be called by call 

def get_db() -> Generator[Session, None, None]:#?
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()