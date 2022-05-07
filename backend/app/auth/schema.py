from fastapi_camelcase import CamelModel

from schemas.user import UserEmail


class Token(CamelModel):
    access_token: str
    token_type: str


class TokenData(CamelModel):
    email: str | None = None
