from pydantic import BaseModel, field_validator


class ProjectCreate(BaseModel):
    title: str
    description: str
    phone_number: str
    project_type: str

    @field_validator("phone_number")
    @classmethod
    def validate_phone_number(cls, value: str) -> str:
        if value.startswith("09") and len(value) == 11:
            return value
        raise ValueError("Phone number format incorrect")


class ProjectRead(BaseModel):
    id: int
    title: str
    description: str
    phone_number: str
    project_type: str

    model_config = {"from_attributes": True}


class ProjectListResponse(BaseModel):
    result: list[ProjectRead]
