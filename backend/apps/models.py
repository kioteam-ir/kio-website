from pydantic import BaseModel, field_validator, EmailStr


class UserCreate(BaseModel):
    id: int | None 
    email: EmailStr
    password: str 
    phone_number: str | None
    first_name: str 
    last_name: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if value.isdigit() or value.islower():
            raise ValueError("Password must contain at least one lowercase letter and upper")
        num = 0
        for char in value:
            if char.isdigit():
                num += 1
        if num == 0:
            raise ValueError("Password must contain at least one number")
        return value
