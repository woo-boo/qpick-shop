from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import get_superuser_or_403
from schemas.category import Category, CategoryCreate, CategoryList, CategoryUpdate
from db.dependencies import get_db
from crud import category as crud


router = APIRouter()


@router.get('/', response_model=list[CategoryList])
def get_categories(limit: int = 100, offset: int = 0, db: Session = Depends(get_db)):
    return crud.get_category_list(limit=limit, offset=offset, db=db)


@router.post('/', 
    response_model=Category, 
    status_code=201, 
    dependencies=[Depends(get_superuser_or_403)])
def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    return crud.create_category(category=category, db=db)


@router.get('/{category_id}', response_model=Category)
def get_category(category_id: int, db: Session = Depends(get_db)):
    return crud.get_category_by_id_or_404(id=category_id, db=db)


@router.put('/{category_id}', 
    response_model=Category, 
    dependencies=[Depends(get_superuser_or_403)])
def update_category(category_id: int, data: CategoryUpdate, db: Session = Depends(get_db)):
    return crud.update_category_by_id(category_id, data, db)


@router.delete('/{category_id}', 
    status_code=204, 
    dependencies=[Depends(get_superuser_or_403)])
def delete_category(category_id: int, db: Session = Depends(get_db)):
    crud.delete_category_by_id(id=category_id, db=db)


# @router.get('/{category_id}/products', response_model=list[Product])
# def get_product_list_from_category(category_id: int, db: Session = Depends(get_db)):
#     return crud.get_product_list_by_category_id(category_id, db)


# @router.post('/{category_id}/products', response_model=Product, status_code=201)
# def create_new_product_from_category(category_id: int, product: ProductCreate, db: Session = Depends(get_db)):
#     return crud.create_new_product_by_category_id(category_id, product, db)