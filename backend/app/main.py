from fastapi import APIRouter, FastAPI

from api.api_v1.api import api_router
from db.database import Base, engine


Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(api_router)


# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run(app, debug=True)