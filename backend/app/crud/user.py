from fastapi import HTTPException
from sqlalchemy import select, update
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from models.user import User
from schemas.user import UserCreate, UserUpdate, UserUpdatePassword
from auth import auth


def get_user_by_id(id: int, db: Session) -> User | None:
    return db.get(User, id)


def get_user_by_email(email: str, db: Session) -> list[User]:
    query = select(User).where(User.email == email)
    return db.execute(query).scalars().first()


def get_user_by_id_or_404(id: int, db: Session) -> User:
    user = get_user_by_id(id, db)
    if user is None:
        raise HTTPException(404)
    return user


def get_user_by_email_or_404(email: str, db: Session) -> User:
    user = get_user_by_email(email, db)
    if user is None:
        raise HTTPException(404)
    return user


def get_user_list(db: Session) -> list[User]:
    query = select(User).order_by(User.id.desc())
    return db.execute(query).scalars().all()


def create_user(user: UserCreate, db: Session, superuser: bool = False) -> User:
    try:
        db_user = User(**user.dict())
        db_user.password = auth.get_password_hash(user.password)
        db_user.is_superuser = superuser
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        raise HTTPException(409, 'email is used')


# def create_superuser_from_cli(email: str, password: str, db) -> User:
#     try:
#         db_user =


def update_user_by_id(data: UserUpdate, id: int, db: Session) -> User:
    query = update(User).where(User.id == id).values(**data.dict())
    db.execute(query)
    db.commit()
    return get_user_by_id(id, db)


def update_user_password(data: UserUpdatePassword, id: int, db: Session) -> bool:
    db_user = get_user_by_id(id, db)
    if auth.verify_password(data.old_password, db_user.password):
        db_user.password = auth.get_password_hash(data.new_password)
        return True
    return False


def delete_user(user_id: int, db: Session):
    db_user = db.get(User, user_id)
    if db_user is None:
        return None
    db.delete(db_user)
    db.commit()
    return True
