import base64
from hashlib import pbkdf2_hmac
import secrets

ITERATIONS = 100_000

def get_password_hash(password: str):
    salt = secrets.token_bytes(16)
    hash_bytes = pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt,
        ITERATIONS
    )
    return {
        "salt": base64.b64encode(salt).decode(),
        "hash": base64.b64encode(hash_bytes).decode(),
    }

def verify_password(password: str, salt_b64: str, hash_b64: str) -> bool:
    salt = base64.b64decode(salt_b64)
    stored_hash = base64.b64decode(hash_b64)

    new_hash = pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt,
        ITERATIONS
    )

    return secrets.compare_digest(new_hash, stored_hash)