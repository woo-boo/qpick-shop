from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from auth.dependencies import get_superuser_or_403
from db.dependencies import get_db
from crud import media as crud
from settings import BASE_DIR
from schemas.media import Media


router = APIRouter()


@router.get('/images/', response_model=list[Media])
def get_images(limit: int = 100, offset: int = 0, db: Session = Depends(get_db)):
    return crud.get_images(limit, offset, db)


@router.post('/images/', 
    response_model=Media, 
    status_code=201,
    dependencies=[Depends(get_superuser_or_403)])
def upload_image(image: UploadFile, db: Session = Depends(get_db)):
    return crud.save_image(image, db)


@router.get('/images/{image_uuid}', response_model=Media)
def get_image(image_uuid: str, db: Session = Depends(get_db)):
    return crud.get_image_by_uuid_or_404(image_uuid, db)


@router.get('/images/{image_uuid}/file')
def get_image_file(image_uuid: str, db: Session = Depends(get_db)):
    image = crud.get_image_by_uuid_or_404(image_uuid, db)
    return FileResponse(path=BASE_DIR.joinpath(image.path), media_type=image.media_type)


@router.delete('/images/{image_uuid}', 
    status_code=204,
    dependencies=[Depends(get_superuser_or_403)])
def delete_image(image_uuid: str, db: Session = Depends(get_db)):
    crud.delete_image(image_uuid, db)
