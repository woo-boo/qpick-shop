from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi import status
from sqlalchemy.orm import Session

from auth.dependencies import get_superuser_or_403
from db.dependencies import get_db
from schemas.product import Product, ProductCreate, ProductUpdate
from crud import product as crud


router = APIRouter()


@router.get('/', response_model=list[Product])
def get_products(limit: int = 100, offset: int = 0, db: Session = Depends(get_db)):
    return crud.get_product_list(limit=limit, offset=offset, db=db)


@router.post('/', 
    response_model=Product, 
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_superuser_or_403)])
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(product=product, db=db)


@router.get('/{product_id}', response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return crud.get_product_by_id_or_404(product_id=product_id, db=db)


@router.put('/{product_id}', 
    response_model=Product,
    dependencies=[Depends(get_superuser_or_403)])
def update_product(product_id: int, product_data: ProductUpdate, db: Session = Depends(get_db)):
    return crud.update_product_by_id(product_id, product_data, db)


@router.delete('/{product_id}', 
    status_code=204,
    dependencies=[Depends(get_superuser_or_403)])
def delete_product(product_id: int, db: Session = Depends(get_db)):
    crud.delete_product_by_id(product_id, db)


@router.put('/{product_id}/images/{image_uuid}',
    response_model=Product,
    dependencies=[Depends(get_superuser_or_403)])
def append_image_to_product(product_id: int, image_uuid: str, db: Session = Depends(get_db)):
    return crud.append_image_to_product(product_id, image_uuid, db)


@router.delete('/{product_id}/images/{image_uuid}',
    response_model=Product,
    dependencies=[Depends(get_superuser_or_403)])
def remove_image_from_product(product_id: int, image_uuid: str, db: Session = Depends(get_db)):
    return crud.delete_image_from_product(product_id, image_uuid, db)


# @router.get('/{product_id}/images/')
# def get_product_images(product_id: int, db: Session = Depends(get_db)):
#     return crud.get_product_images_list(product_id, db)


# @router.post('/{product_id}/images/')
# def upload_product_image(product_id: int, upload_image: UploadFile, db: Session = Depends(get_db)):
#     return crud.save_product_image(product_id, upload_image, db)
    