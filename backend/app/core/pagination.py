from typing import TypeVar
from fastapi_pagination import Page
from fastapi_pagination.customization import CustomizedPage, UseParamsFields

T = TypeVar("T")

ProjectPage = CustomizedPage[
    Page[T],
    UseParamsFields(size=10)
]

SubscriptionsPage = CustomizedPage[
    Page[T],
    UseParamsFields(size=10)
]