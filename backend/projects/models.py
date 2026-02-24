from sqlmodel import SQLModel, Field


class Project(SQLModel, table=True):
    id: None | int = Field(default=None, primary_key=True)
    title: str = Field(max_length=128)
    phone_number: str = Field(max_length=11)
    description: str = Field(max_length=256)
