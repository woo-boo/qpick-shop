from pydantic import BaseModel
from fastapi_camelcase import CamelModel

from schemas.product import Product


class CategoryAbstract(CamelModel):
    category_name: str
    description: str | None = None
    # products: list[Product] | None = None


class Category(CategoryAbstract):
    id: int
    products: list[Product] | None = None

    class Config:
        orm_mode = True


class CategoryList(CategoryAbstract):
    id: int

    class Config:
        orm_mode = True


class CategoryCreate(CategoryAbstract):
    pass


class CategoryUpdate(CategoryAbstract):
    pass

# class SubCategory(CategoryAbstract):
#     parent: Category