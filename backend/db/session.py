from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
load_dotenv()
database_url = os.getenv("DATABASE_URL")

engine = create_engine(database_url)#INSTANCE
#connect_args={"check_same_thread": False} for sqllite
SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)#FACTORY not class-instance can be called by call 