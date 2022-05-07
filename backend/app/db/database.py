from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy import event

from settings import DB_URL


engine = create_engine(
    DB_URL,
    echo=True,
    connect_args = {
        'check_same_thread': False
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
