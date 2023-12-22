import hashlib
import time
import jwt


class Helper:
    @classmethod
    def generate_hash_password(cls, password: str) -> str:
        salt = "secret_salt_key"
        return (
            hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ":" + salt
        )

    @classmethod
    def match_hash_text(cls, hashedText: str, providedText: str) -> bool:
        _hashedText, salt = hashedText.split(":")
        return (
            _hashedText
            == hashlib.sha256(salt.encode() + providedText.encode()).hexdigest()
        )

    @classmethod
    def generate_access_token(cls, payload: dict) -> str:
        return jwt.encode(
            {"payload": payload, "exp": int(time.time()) + 1000},
            "secret_key",
            algorithm="HS256",
        )

    @classmethod
    def generate_refresh_token(cls, payload: dict) -> str:
        return jwt.encode({"payload": payload}, "secret_key", algorithm="HS256")
