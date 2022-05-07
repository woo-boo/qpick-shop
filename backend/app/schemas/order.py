from fastapi_camelcase import CamelModel
from datetime import datetime

from schemas.product import Product


class ProductInOrder(CamelModel):
    count: int
    product: Product
    # order_id: int

    class Config:
        orm_mode = True


class ProductIdInOrder(CamelModel):
    id: int
    count: int


class OrderAbstract(CamelModel):
    # products: list[int]
    pass


class Order(CamelModel):
    id: int
    created_at: datetime
    price_rub: int
    is_paid: bool
    is_processed: bool
    products: list[ProductInOrder]

    class Config:
        orm_mode = True


class OrderCreate(OrderAbstract):
    products: list[ProductIdInOrder]


class OrderUpdate(CamelModel):
    is_paid: bool | None
    is_closed: bool | None
    is_canseled: bool | None