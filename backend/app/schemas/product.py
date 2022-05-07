from pydantic import BaseModel
from fastapi_camelcase import CamelModel

from schemas.media import MediaUrl, MediaUuid


class ProductAbstract(CamelModel):
    product_name: str | None
    description: str | None = None
    price_rub: int | None 
    category_id: int | None
    discount: int | None = 0
    
    class Config:
        orm_mode = True


class Product(ProductAbstract):
    images: list[MediaUrl]
    main_image: MediaUrl | None
    id: int


class ProductCreate(ProductAbstract):
    main_image_uuid: str | None


class ProductUpdate(ProductAbstract):
    images: list[MediaUuid] | None
    main_image_uuid: str | None


class ProductInOrder(Product):
    count: int