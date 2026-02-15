from typing import List
from sqlmodel import Relationship, SQLModel, Field
from sqlmodel.ext.asyncio.session import AsyncSession


class UserRole(SQLModel, table=True):
    user_id: int = Field(default=None, foreign_key="user.id", primary_key=True)
    role_id: int = Field(default=None, foreign_key="role.id", primary_key=True)


class RolePermission(SQLModel, table=True):
    role_id: int = Field(default=None, foreign_key="role.id", primary_key=True)
    permission_id: int = Field(
        default=None, foreign_key="permission.id", primary_key=True
    )


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(unique=True)
    password: str = Field(min_length=8)
    salt: str = Field()
    phone_number: str | None = Field(default=None, unique=True, nullable=True)
    first_name: str = Field(nullable=True)
    last_name: str = Field(nullable=True)
    is_active: bool = Field(default=True)
    is_admin: bool = Field(default=False)
    roles: List["Role"] = Relationship(back_populates="users", link_model=UserRole)


class Role(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True)

    users: List[User] = Relationship(back_populates="roles", link_model=UserRole)

    permissions: List["Permission"] = Relationship(
        back_populates="roles", link_model=RolePermission
    )


class Permission(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True)

    roles: List[Role] = Relationship(
        back_populates="permissions", link_model=RolePermission
    )


async def get_user_permissions_from_db(user: User, session: AsyncSession) -> List[str]:
    await session.refresh(user)
    permissions = [perm.name for role in user.roles for perm in role.permissions]
    return permissions
