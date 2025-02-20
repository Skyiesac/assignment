import re

def check_strong_password(password):
    if (
        len(password) < 8
        or (not re.findall("\d", password))
        or (not re.findall("[A-Z]", password))
        or (not re.findall("[a-z]", password))
        or (not re.findall("[!@#$%&*]", password))
    ):
        return False
    else:
        return True
