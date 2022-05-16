from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError

from models.media import Image
from schemas.media import MediaUuid
from models.product import Product
from models.category import Category
from schemas.product import ProductCreate, ProductUpdate
from crud import media as crud_media
from crud import category as crud_category


def get_product_by_id(id: int, db: Session) -> Product | None:
    return db.get(Product, id)


def get_product_by_id_or_404(id: int, db: Session) -> Product:
    product = get_product_by_id(id, db)
    if product is None:
        raise HTTPException(404)
    return product


def check_product_exists(id: int, db: Session) -> bool:
    if get_product_by_id(id, db) is None:
        return False
    return True


def get_product_list(limit: int, offset: int, db: Session) -> list[Product]:
    query = select(Product).order_by(Product.id.desc()).limit(limit).offset(offset)
    return db.execute(query).scalars().all()


# def get_product_images_list(id: int, db: Session):
    # return get_product_by_id_or_404(id, db).images


def create_product(product: ProductCreate, db: Session) -> Product:
    category_id = product.category_id
    if not crud_category.check_category_id_exists(category_id, db):
        raise HTTPException(404, 'invalid category id')
    try:
        db_product = Product(**product.dict())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product
    except IntegrityError:
        raise HTTPException(409)


def save_product_image(id: int, upload_image: UploadFile, db: Session) -> Product:
    db_image = crud_media.save_image(upload_image, db)
    product = get_product_by_id_or_404(id, db)
    product.images.append(db_image)
    db.commit()
    db.refresh(product)
    return product


def update_product_by_id(id: int, product_data: ProductUpdate, db: Session) -> Product:
    data = product_data.dict(exclude_unset=True, exclude={'images'})
    try:
        product = get_product_by_id_or_404(id, db)
        if product_data.images:
            uuid_list = [obj.uuid for obj in product_data.images]
            query = select(Image).where(Image.uuid.in_(uuid_list))
            db_image_list = db.execute(query).scalars().all()
            product.images = db_image_list
        if len(data) != 0:
            query = update(Product).where(Product.id == id).values(**data)
            db.execute(query)
        db.commit()
        db.refresh(product)
        return product
    except IntegrityError:
        raise HTTPException(409)


def delete_product(product: Product, db: Session) -> None:
    db.delete(product)
    db.commit()


def delete_product_by_id(id: int, db: Session) -> None:
    db_product = get_product_by_id_or_404(id, db)
    db.delete(db_product)
    db.commit()


def append_image_to_product(prouct_id: int, image_uuid: int, db: Session) -> Product:
    product = get_product_by_id_or_404(prouct_id, db)
    image = crud_media.get_image_by_uuid_or_404(image_uuid, db)
    product.images.append(image)
    db.commit()
    db.refresh(product)
    return product


def delete_image_from_product(product_id: int, image_uuid: int, db: Session) -> Product:
    product = get_product_by_id_or_404(product_id, db)
    image = crud_media.get_image_by_uuid_or_404(image_uuid, db)
    product.images.remove(image)
    db.commit()
    db.refresh(product)
    return product

