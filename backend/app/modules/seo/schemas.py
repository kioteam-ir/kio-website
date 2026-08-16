from pydantic import BaseModel, ConfigDict, Field


class WriteMainContent(BaseModel):
    title: str = Field(max_length=1024)
    description: str

    model_config = ConfigDict(from_attributes=True)


class ReadMainContent(BaseModel):
    title: str
    description: str
