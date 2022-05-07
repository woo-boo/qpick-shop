from ast import Or
from fastapi import HTTPException, status
from sqlalchemy import select, update
from sqlalchemy.orm import Session

from models.user import User
from crud.product import get_product_by_id_or_404
from models.order import Order, OrderProductAssociation
from models.product import Product
from schemas.order import OrderCreate, OrderUpdate


def get_order_by_id(id: int, db: Session) -> Order | None:
    return db.get(Order, id)


def get_order_by_id_or_404(id: int, db: Session) -> Order:
    order = get_order_by_id(id, db)
    if order is None:
        raise HTTPException(404)
    return order


def get_order_list(limit: int, offset: int, db: Session):
    # query = select(Order).order_by(Order.created_at.desc()).slice(offset, limit)
    query = select(Order).order_by(Order.created_at.desc()).slice(offset, limit)
    return db.execute(query).scalars().all()


def create_order(order: OrderCreate, db: Session):
    db_order = Order()
    product_list = order.products
    for obj in product_list:
        if obj.count == 0:
            continue
        db_product = get_product_by_id_or_404(obj.id, db)
        assoc = OrderProductAssociation(count=obj.count)
        assoc.product = db_product
        db_order.products.append(assoc)
    if len(db_order.products) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='empty product list'
        )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def cancel_order_by_owner(order: Order, new_data: OrderUpdate, db: Session):
    if new_data.is_canseled == True:
        order.is_canceled = True
        db.commit()
        db.refresh(order)
        return order
    raise HTTPException(403)


def update_order_by_superuser(order: Order, new_data: OrderUpdate, db: Session):
    data = new_data.dict(exclude_unset=True)
    query = update(order).values(**data)
    db.execute(query)
    db.commit()
    db.refresh(order)
    return order


def update_order(order_id: int, new_data: OrderUpdate, user: User, db: Session):
    order = get_order_by_id_or_404(order_id, db)
    if user.is_superuser:
        return update_order_by_superuser(order, new_data, db)
    if user is order.user:
        return cancel_order_by_owner(order, new_data, db)
    raise HTTPException(403)


def delete_order_by_id(order_id: int, db: Session):
    db_order = get_order_by_id_or_404(order_id, db)
    db.delete(db_order)
    db.commit()