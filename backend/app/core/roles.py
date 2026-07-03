"""Authorization model for the KIO platform.

Roles are intentionally simple for the current scale (<5k users):

- **guest**: unauthenticated access to public endpoints (project inquiry, registration).
- **user**: authenticated customer; can manage own profile and create blog drafts.
- **admin**: staff; full CRUD via admin routes and CRUDAdmin panel.

Future RBAC (Role/Permission tables) can extend this module without API breakage.
"""

from enum import StrEnum


class PlatformRole(StrEnum):
    GUEST = "guest"
    USER = "user"
    ADMIN = "admin"


def resolve_role(*, is_authenticated: bool, is_admin: bool) -> PlatformRole:
    if not is_authenticated:
        return PlatformRole.GUEST
    if is_admin:
        return PlatformRole.ADMIN
    return PlatformRole.USER
