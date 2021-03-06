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

APP_DIR = 'app'
MEDIA_PATH = 'files/media'
STATIC_PATH = 'static'
MEDIA_URL = '/files/media'
STATIC_URL = '/static'
TMP_PATH = 'files/tmp'
