from pydantic import BaseModel, field_validator


class AddProjects(BaseModel):
    title: str
    description: str
    phone_number: str
    project_type: str

    @field_validator("phone_number")
    @classmethod
    def validate_phone_number(cls, value: str):
        if value is None:
            return value

        if value.startswith("09") and len(value) == 11:
            return value
        raise ValueError("Phone number format incorrect")
