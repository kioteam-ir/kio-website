from pydantic import BaseModel, field_validator, EmailStr

from string import ascii_letters

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    phone_number: str | None = None
    first_name: str
    last_name: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if value.isdigit() or value.islower():
            raise ValueError(
                "Password must contain at least one lowercase letter and upper"
            )
        num = 0
        for char in value:
            if char.isdigit():
                num += 1
        if num == 0:
            raise ValueError("Password must contain at least one number")
        return value

    @field_validator("phone_number")
    @classmethod
    def validate_phone_number(cls, value: str):
        if value is None:
            return value

        if value.startswith("09") and len(value) == 11:
            return value
        raise ValueError("Phone number format incorrect")


class LoginRequest(BaseModel):
    email: str
    password: str


class UserRead(BaseModel):
    email: str
    phone_number: str | None
    first_name: str
    last_name: str


class AdminCreateAccount(BaseModel):
    email: str
    phone_number: str | None = None
    first_name: str | None = "User"
    last_name: str | None = "Unknown"
    password: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class AccessTokenRequest(BaseModel):
    access_token: str
