from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, update

from models.category import Category
from models.product import Product
from schemas.category import CategoryCreate, CategoryUpdate
from schemas.product import ProductCreate


def get_category_by_id(id: int, db: Session) -> Category | None:
    return db.get(Category, id)
    # category = db.get(Category, category_id)


def get_category_by_id_or_404(id: int, db: Session) -> Category:
    category = get_category_by_id(id, db)

    if category is None:
        raise HTTPException(404)

    return category


def check_category_id_exists(id: int, db: Session) -> bool:
    category = get_category_by_id(id, db)

    if category is None:
        return False
    
    return True
    

def get_category_list(limit: int, offset: int, db: Session) -> list[Category]:
    query = select(Category).order_by(Category.id.desc()).slice(offset, limit)
    return db.execute(query).scalars().all()


def create_category(category: CategoryCreate, db: Session) -> Category:
    try:
        db_category = Category(**category.dict())
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category
    except IntegrityError:
        raise HTTPException(409)


def update_category_by_id(id: int, data: CategoryUpdate, db: Session) -> Category:
    query = update(Category).where(Category.id == id).values(**data)
    db.execute(query)
    db.commit()
    return get_category_by_id(id, db)


def delete_category(category: Category, db: Session) -> None:
    db.delete(category)
    db.commit()


def delete_category_by_id(id: int, db: Session) -> None:
    db_category = get_category_by_id_or_404(id, db)
    db.delete(db_category)
    db.commit()


def get_product_list_by_category_id(id: int, db: Session) -> list[Product]:
    return get_category_by_id_or_404(id, db).products


def create_new_product_by_category_id(id: int, data: ProductCreate, db: Session) -> Product:
    category = get_category_by_id_or_404(id, db)
    try:
        new_product = Product(**data.dict())
        new_product.category_id = id
        db.add(new_product)
        category.products.append(new_product)
        db.commit()
        db.refresh(new_product)
        return new_product
    except IntegrityError:
        raise HTTPException(409)




