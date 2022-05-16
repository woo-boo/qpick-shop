import re
from getpass import getpass
import click
from click import echo
from sqlalchemy.exc import IntegrityError
from sqlalchemy.exc import OperationalError


import models
from auth.auth import get_password_hash
from db.database import SessionLocal
# from db.dependencies import get_db


def validate_email(str):
    pat = "^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{1,3}$"
    if re.match(pat,str):
        return True
    return False

def validate_name(str):
    pat = "^[a-zA-Z]{1,10}$"
    if re.match(pat,str):
        return True
    return False


@click.command()
def create_superuser():
    while True:
        email = input('Enter email: ')
        if validate_email(email):
            break
        echo('Invalid email. Enter valid email, or press CTRL+C')
    while True:
        password1 = getpass('Enter password: ')
        password2 = getpass('Repeat password: ')
        if password1 == password2:
            break
        echo('Password not match. Enter password again, or press CTRL+C')
    while True:
        firstname = input('Enter firstname: ')
        if validate_name(firstname):
            break
        echo('Name must not contain any numbers or special characters, try again or press CTR+C')
    while True:
        surname = input('Enter surname: ')
        if validate_name(surname):
            break
        echo('Name must not contain any numbers or special characters, try again or press CTR+C')
    # email = 'email@email.com'
    # password1 = '12345'

    with SessionLocal() as db:
        try:
            db_user = models.User()
            db_user.email = email
            db_user.password = get_password_hash(password1)
            db_user.is_superuser = True
            db_user.first_name = firstname
            db_user.surname = surname
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            echo(f'Created superuser with email: "{db_user.email}"')
        except IntegrityError:
            echo(f'Email "{email}" is already used')
        except OperationalError:
            echo('Something went wrong... Maybe you should create db tables or apply migrations')