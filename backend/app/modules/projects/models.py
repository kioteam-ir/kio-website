from sqlmodel import Field, SQLModel


class Project(SQLModel, table=True):
    __tablename__ = "projects_project"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=128)
    phone_number: str = Field(max_length=11)
    description: str = Field(max_length=256)
    project_type: str = Field(max_length=64)
    is_done: bool = Field(default=False)
