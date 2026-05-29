from ninja import Schema
from pydantic import EmailStr



class RegisterIn(Schema):
    email: EmailStr
    username: str
    password: str

class LoginIn(Schema):
    email: EmailStr
    password: str

class UserOut(Schema):
    id: int
    email: str
    username: str
    