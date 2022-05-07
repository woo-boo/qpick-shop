from enum import auto
from fastapi import APIRouter

from api.api_v1.endpoints import (
    categories,
    products,
    auth,
    users,
    orders,
    media
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix='/auth', tags=['auth'])
api_router.include_router(users.router, prefix='/users', tags=['users'])
api_router.include_router(products.router, prefix='/products', tags=['products'])
api_router.include_router(categories.router, prefix='/categories', tags=['categories'])
api_router.include_router(orders.router, prefix='/orders', tags=['orders'])
api_router.include_router(media.router, prefix='/media', tags=['media'])
