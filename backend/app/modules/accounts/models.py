from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "accounts_user"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    password: str = Field(min_length=8)
    salt: str
    phone_number: str | None = Field(default=None, unique=True, nullable=True)
    first_name: str
    last_name: str
    is_active: bool = Field(default=True)
    is_admin: bool = Field(default=False)
