from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from db.dependencies import get_db
from schemas.user import User, UserCreate, UserUpdate
from crud import user as crud
from auth.dependencies import get_current_user_or_401, get_superuser_or_403


router = APIRouter()


@router.get('/me', response_model=User)
def get_current_user(user: User = Depends(get_current_user_or_401)):
    return user


@router.put('/me', response_model=User)
def update_current_user(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_or_401)
):
    return crud.update_user_by_id(user_data, current_user.id, db)


@router.get('/', 
    response_model=list[User], 
    dependencies=[Depends(get_superuser_or_403)])
def get_users(db: Session = Depends(get_db)):
    return crud.get_user_list(db)


@router.post('/', 
    response_model=User, 
    status_code=201, 
    dependencies=[Depends(get_superuser_or_403)])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(user, db)


@router.get('/{user_id}', 
    response_model=User, 
    dependencies=[Depends(get_superuser_or_403)])
def get_user(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_by_id_or_404(user_id, db)


@router.get('/{user_email}', 
    response_model=User, 
    dependencies=[Depends(get_superuser_or_403)])
def get_user_by_email(user_email: str, db: Session = Depends(get_db)):
    return crud.get_user_by_email_or_404(user_email, db)


@router.delete('/{user_id}', 
    status_code=204, 
    dependencies=[Depends(get_superuser_or_403)])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    result = crud.delete_user(user_id, db)
    if result is None:
        raise HTTPException(404)

