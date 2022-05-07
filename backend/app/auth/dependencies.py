from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from auth.auth import SECRET_KEY
from auth.auth import ALGORITHM
from auth.auth import oauth2_scheme
from auth.schema import TokenData
from crud import user as crud_user
from db.dependencies import get_db
from schemas.user import User


credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"}
)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    if token is None:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = crud_user.get_user_by_email(email=token_data.email, db=db)
    if user is None:
        raise credentials_exception
    return user


def get_current_user_or_401(user: User = Depends(get_current_user)):
    if user is None:
        raise HTTPException(401)
    return user


def get_superuser_or_403(user: User = Depends(get_current_user_or_401)):
    if not user.is_superuser:
        raise HTTPException(403, 'permission denied')
    return user
