from pydantic import BaseModel, EmailStr, Field, field_validator


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    phone_number: str | None = None
    first_name: str
    last_name: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if value.isdigit() or value.islower():
            raise ValueError("Password must contain at least one uppercase and lowercase letter")
        if not any(char.isdigit() for char in value):
            raise ValueError("Password must contain at least one number")
        return value

    @field_validator("phone_number")
    @classmethod
    def validate_phone_number(cls, value: str | None) -> str | None:
        if value is None:
            return value
        if value.startswith("09") and len(value) == 11:
            return value
        raise ValueError("Phone number format incorrect")


class AdminCreateAccount(BaseModel):
    email: EmailStr
    phone_number: str | None = None
    first_name: str = "User"
    last_name: str = "Unknown"
    password: str = Field(min_length=8)
    is_admin: bool = Field(default=True)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserRead(BaseModel):
    id: int
    email: EmailStr
    phone_number: str | None
    first_name: str
    last_name: str
    is_admin: bool

    model_config = {"from_attributes": True}


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class AccessTokenRequest(BaseModel):
    access_token: str


class AdminCheckResponse(BaseModel):
    is_admin: bool = True


class TokenVerifyResponse(BaseModel):
    sub: str
    email: EmailStr
    is_admin: bool
