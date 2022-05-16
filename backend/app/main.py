from unicodedata import name
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from api.api_v1.api import api_router
from settings import APP_DIR, BASE_DIR, MEDIA_PATH, MEDIA_URL
from db.database import Base, engine


Base.metadata.create_all(bind=engine)


app = FastAPI()

origins = [
    'http://localhost:8000',
    'https://localhost:8000',
    'http://localhost:3000',
    'https://localhost:3000'
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*']
)

app.mount(MEDIA_URL, StaticFiles(directory=BASE_DIR.joinpath(MEDIA_PATH)), name='media')

app.include_router(api_router)


# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run(app, debug=True)