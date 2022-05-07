from fastapi_camelcase import CamelModel
from datetime import datetime


class Media(CamelModel):
    uuid: str
    # path: str
    url: str
    # abs_url: str
    name: str
    media_type: str
    loaded: datetime
    updated: datetime

    class Config:
        orm_mode = True


class MediaUuid(CamelModel):
    uuid: str | None

    class Config:
        orm_mode = True


class MediaUrl(MediaUuid):
    url: str


# class ProductImage(Media):
#     product_id: int


# class ImageUrl(CamelModel):
#     url: str


# class ProductImageCreate(CamelModel):
#     product_id: int
#     image: UploadFile


