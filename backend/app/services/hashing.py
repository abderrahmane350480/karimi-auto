import hashlib


def _sha256(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def hash_phone_meta(phone_digits: str) -> str:
    """
    Meta CAPI: hash digits-only phone (212XXXXXXXXX) with SHA-256.
    Normalize to lowercase, trim whitespace before hashing.
    """
    return _sha256(phone_digits.strip().lower())


def hash_phone_tiktok(phone_e164: str) -> str:
    """
    TikTok Events API: hash E.164 phone (+212XXXXXXXXX) with SHA-256.
    """
    return _sha256(phone_e164.strip().lower())


def hash_phone_snap(phone_digits: str) -> str:
    """
    Snap CAPI: normalize phone to digits-only (no plus, no leading zeros),
    then hash with SHA-256.
    Input phone_digits already in form '212XXXXXXXXX'.
    """
    return _sha256(phone_digits.strip().lower())
