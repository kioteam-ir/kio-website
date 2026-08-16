from sqlmodel import Field, SQLModel


class MainContent(SQLModel, table=True):
    __tablename__ = "seo_main_content" #type: ignore

    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=1024)
    description: str
