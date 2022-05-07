from mimetypes import guess_extension
import shutil
from tempfile import NamedTemporaryFile
from fastapi import HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from pathlib import Path
import magic

from models.media import Image
from models.product import Product
from settings import BASE_DIR, TMP_PATH


def save_upload_file(upload_file: UploadFile, destination: Path):
    path = Path(BASE_DIR).joinpath(destination)
    try:
        if not path.parent.exists():
            path.parent.mkdir(parents=True)
        with path.open('wb') as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
    finally:
        upload_file.file.close()


def save_upload_file_tmp(upload_file: UploadFile):
    try:
        suffix = Path(upload_file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(upload_file.file, tmp)
            tmp_path = Path(tmp.name)
    finally:
        upload_file.file.close()
    return tmp_path


def get_images(limit: int, offset: int, db: Session) -> list[Image]:
    query = select(Image).order_by(Image.loaded.desc()).slice(offset, limit)
    return db.execute(query).scalars().all()


def get_images_by_product_id(product_id: int, limit: int, offset: int, db: Session) -> Image:
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(404, 'product not found')
    return product.images


def get_image_by_uuid(uuid: int, db: Session) -> Image | None:
    return db.get(Image, uuid)


def get_image_by_uuid_or_404(uuid: int, db: Session) -> Image:
    image = db.get(Image, uuid)
    if image is None:
        raise HTTPException(404)
    # image_file = BASE_DIR.joinpath(image.path)
    # if not image_file.exists():
    #     raise HTTPException(404)
    return image



def save_image(upload_image: UploadFile, db: Session) -> Image:
    allowed_types = {"image/jpeg", "image/png", "image/gif", "image/tiff", "image/bmp"}
    tmp_image = save_upload_file_tmp(upload_image)
    mime = magic.from_file(tmp_image, mime=True)

    if mime not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='mime type not allowed'
        )

    ext = guess_extension(mime)
    name = upload_image.filename.split('.')[0] + ext

    db_image = Image()
    db_image.name = name
    db_image.media_type = mime

    try:
        db.add(db_image)
        db.commit()
        db.refresh(db_image)
        new_path = BASE_DIR.joinpath(db_image.path)
        if not new_path.parent.exists():
            new_path.parent.mkdir(parents=True)
        shutil.move(tmp_image, new_path)
        return db_image
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT
        )
    finally:
        if tmp_image.exists():
            db.delete(db_image)
            db.commit()
            tmp_image.unlink()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT
            )


def delete_image(image_uuid: str, db: Session) -> bool:
    db_image = get_image_by_uuid_or_404(image_uuid, db)
    image_path = BASE_DIR.joinpath(db_image.path)
    db.delete(db_image)
    db.commit()
    if image_path.exists():
        image_path.unlink()
