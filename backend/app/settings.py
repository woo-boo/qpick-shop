from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent

HOST = 'localhost'
PORT = 8000

DB_USER = 'test'
DB_PASSWORD = 'test'
DB_NAME = 'test'
DB_HOST = HOST
DB_PORT = 5432
# DB_DIALECT = 'postgresql'
# DB_DRIVER = 'psycopg2'

DB_URL = 'sqlite:///db.sqlite'
# DATABASE_URL = f'{DATABASE_DIALECT}+{DATABASE_DRIVER}://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}'


APP_DIR = 'app'
MEDIA_PATH = 'files/media'
MEDIA_URL = '/static/media'
TMP_PATH = 'files/tmp'
