from pydantic import validator
from fastapi_camelcase import CamelModel
import re



class UserEmail(CamelModel):
    email: str = 'example@example.com'

    @validator('email')
    def check_email(cls, v):
        email = "^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{1,8}$"
        if re.match(email, v):
            return v
        raise ValueError('email is not valid')


class UserAbstract(UserEmail):
    first_name: str | None
    surname: str | None


class User(UserAbstract):
    # is_superuser: bool = False
    is_superuser: bool
    id: int

    class Config:
        orm_mode = True


class UserCreate(UserAbstract):
    password: str


class UserUpdate(UserAbstract):
    pass


class UserUpdatePassword(CamelModel):
    old_password: str
    new_password: str


class UserLogin(UserEmail):
    password: str