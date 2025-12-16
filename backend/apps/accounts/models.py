from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str  = Field(unique=True)
    password: str = Field(min_length=8)
    salt: str = Field()
    phone_number: str | None = Field(default=None, unique=True, nullable=True)
    first_name: str = Field(nullable=True)
    last_name: str = Field(nullable=True)
    is_active : bool = Field(default=True)
    is_admin : bool = Field(default=False)
