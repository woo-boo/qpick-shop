from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship

from db.database import Base


class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    category_name = Column(String, unique=True, nullable=False)
    description = Column(Text)
    
    products = relationship('Product', backref='category', lazy='selectin')

    def __repr__(self) -> str:
        return f'<Category (id={self.id}, category_name={self.category_name})>'