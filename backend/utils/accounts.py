def password_checker(password: str):
    if len(password) < 8:
        if not password.isdigit() and not password.islower():
            for char in password:
                if char.isdigit(): return False
            return True
    return False
