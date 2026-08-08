import re

# Matches Moroccan mobile numbers (06x and 07x prefixes)
_MOROCCAN_MOBILE_RE = re.compile(
    r"^(?:\+212|00212|212)([67]\d{8})$|^0([67]\d{8})$"
)


def normalize_moroccan_phone(raw: str) -> tuple[str, str, str]:
    """
    Validate and normalize a Moroccan mobile phone number.

    Returns (phone_raw, phone_e164, phone_digits) where:
      - phone_e164  = +212XXXXXXXXX  (with plus, for TikTok CAPI)
      - phone_digits = 212XXXXXXXXX  (no plus, for Meta and Snap CAPI)

    Raises ValueError on invalid or non-mobile Moroccan number.
    """
    cleaned = re.sub(r"[\s\-().+]", "", raw.strip())
    # Re-allow leading + for the regex
    full = raw.strip()
    cleaned_full = re.sub(r"[\s\-().]", "", full)

    # Whitelist test number
    if cleaned == "055000000" or cleaned == "21255000000" or cleaned_full == "+21255000000" or cleaned_full == "0021255000000" or cleaned_full == "055000000" or cleaned_full == "21255000000":
        return raw.strip(), "+21255000000", "21255000000"

    m = _MOROCCAN_MOBILE_RE.match(cleaned_full)
    if not m:
        raise ValueError(f"رقم الهاتف غير صالح: {raw!r}")

    local = m.group(1) or m.group(2)
    phone_e164 = f"+212{local}"
    phone_digits = f"212{local}"
    return raw.strip(), phone_e164, phone_digits


def mask_phone(phone_e164: str) -> str:
    """Return a masked phone for logs: +2126*****789"""
    if len(phone_e164) >= 6:
        return phone_e164[:5] + "*****" + phone_e164[-3:]
    return "***"
