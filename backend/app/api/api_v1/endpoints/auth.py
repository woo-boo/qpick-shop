from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.security import OAuth2PasswordRequestFormStrict
from datetime import timedelta
from sqlalchemy.orm import Session
from schemas.user import UserLogin

from db.dependencies import get_db
from auth.auth import ACCESS_TOKEN_EXPIRE_MINUTES, authenticate_user, create_access_token


router = APIRouter()


unauthorized_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Incorrect username or password',
    headers={"WWW-Authenticate": "Bearer"}
)


@router.post('/token')
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if user is None:
        raise unauthorized_exception
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# @router.post('/signup')
# def signup(signup_data: UserCreate):
    
