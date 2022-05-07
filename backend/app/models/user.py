from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship


from db.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String, nullable=False)
    first_name = Column(String)
    surname = Column(String)
    is_superuser = Column(Boolean, nullable=False)
    # is_disabled = Column(Boolean)

    def __repr__(self) -> str:
        return f'<User (id={self.id}, email={self.email})>'
