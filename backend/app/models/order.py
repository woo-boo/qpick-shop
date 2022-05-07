from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Table
from sqlalchemy import func
from sqlalchemy.orm import relationship

from db.database import Base


class OrderProductAssociation(Base):
    __tablename__ = 'orders_products_at'

    order_id = Column(ForeignKey('orders.id'), primary_key=True)
    product_id = Column(ForeignKey('products.id'), primary_key=True)
    count = Column(Integer)

    product = relationship('Product', back_populates='orders')
    order = relationship('Order', back_populates='products')


class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    price_rub = Column(Integer)
    is_paid = Column(Boolean, nullable=False, server_default='0')
    is_closed = Column(Boolean, nullable=False, server_default='0')
    is_canceled = Column(Boolean, nullable=False, server_default='0')

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', backref='orders')
    products = relationship('OrderProductAssociation', back_populates='order', lazy='selectin')
