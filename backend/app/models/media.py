from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy import func
from sqlalchemy.ext.hybrid import hybrid_property
import uuid
from pathlib import Path

from db.database import Base
from settings import HOST, MEDIA_PATH, MEDIA_URL, PORT


def generate_uuid():
    return str(uuid.uuid4())


class Media:
    uuid = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String)
    description = Column(String)
    media_type = Column(String)
    loaded = Column(DateTime(timezone=True), server_default=func.now())
    updated = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Image(Base, Media):
    __tablename__ = 'images'

    @hybrid_property
    def path(self):
        ext = Path(self.name).suffix
        return f'{MEDIA_PATH}/images/{self.uuid}{ext}'
    
    @hybrid_property
    def url(self):
        ext = Path(self.name).suffix
        return f'{MEDIA_URL}/images/{self.uuid}{ext}'

    # @hybrid_property
    # def abs_url(self):
    #     url = f'{HOST}:{PORT}/{MEDIA_URL}/images/{self.uuid}'
    #     return url
