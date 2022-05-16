from sqlalchemy import Column, ForeignKey, Integer, String, null
from sqlalchemy.orm import relationship, backref

from db.database import Base


class ProductImageAssociation(Base):
    __tablename__ = 'products_images_at'

    product_id = Column(ForeignKey('products.id'), primary_key=True)
    image_id = Column(ForeignKey('images.uuid'), primary_key=True)


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True)
    product_name = Column(String, unique=True, nullable=False)
    description = Column(String)
    price_rub = Column(Integer, nullable=False)
    discount = Column(Integer, default=null)

    category_id = Column(Integer, ForeignKey('categories.id'))
    orders = relationship('OrderProductAssociation', back_populates='product')
    images = relationship('Image', secondary='products_images_at', backref='products', lazy='selectin')
    main_image_uuid = Column(Integer, ForeignKey('images.uuid'))
    main_image = relationship('Image', backref=backref('product', uselist=False))

    def __repr__(self) -> str:
        return f'<Product (id={self.id}, product_name={self.product_name})>'