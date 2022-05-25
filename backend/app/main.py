from unicodedata import name
from urllib import request
from fastapi import APIRouter, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from api.api_v1.api import api_router
from settings import APP_DIR, BASE_DIR, MEDIA_PATH, MEDIA_URL, STATIC_PATH, STATIC_URL
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


templates = Jinja2Templates(directory=BASE_DIR.joinpath(STATIC_PATH))

@app.get('/{full_path:path}')
def get_root(request: Request):
    return templates.TemplateResponse('index.html', {"request": request})


app.include_router(api_router)


app.mount(MEDIA_URL, StaticFiles(directory=BASE_DIR.joinpath(MEDIA_PATH)), name='media')
app.mount('/', StaticFiles(directory=BASE_DIR.joinpath(STATIC_PATH)), name='static')


# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run(app, debug=True)