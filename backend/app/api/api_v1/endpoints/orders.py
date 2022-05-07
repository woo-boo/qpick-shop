from email.policy import HTTP
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from auth.dependencies import get_current_user_or_401, get_superuser_or_403
from models.user import User
from schemas.order import Order, OrderCreate, OrderUpdate
from db.dependencies import get_db
from crud import order as crud


router = APIRouter()


@router.get('/', 
    response_model=list[Order],
    dependencies=[Depends(get_superuser_or_403)])
def get_orders(limit: int = 100, offset: int = 0, db: Session = Depends(get_db)):
    return crud.get_order_list(limit, offset, db)


@router.post('/', 
    response_model=Order, 
    status_code=201,
    dependencies=[Depends(get_superuser_or_403)])
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(order, db)


@router.get('/{order_id}', response_model=Order)
def get_order_by_id(
    order_id: int, 
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user_or_401)
):
    order = crud.get_order_by_id_or_404(order_id, db)
    if user is not order.user and not user.is_superuser:
        raise HTTPException(403)
    return order


@router.put('/{order_id}', response_model=Order)
def update_order(
    order_id: int, 
    order_data: OrderUpdate, 
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user_or_401)
):
    return crud.update_order(order_id, order_data, user, db)


@router.delete('/{order_id}', 
    status_code=204,
    dependencies=[Depends(get_superuser_or_403)])
def delete_order(order_id: int, db: Session = Depends(get_db)):
    crud.delete_order_by_id(order_id, db)
