from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str  = Field(unique=True)
    password: str = Field(min_length=8)
    phone_number: str = Field(unique=True)
    first_name: str = Field(nullable=True)
    last_name: str = Field(nullable=True)
