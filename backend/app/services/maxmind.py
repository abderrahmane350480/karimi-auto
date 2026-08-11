from dataclasses import dataclass
import ipaddress

import httpx
from fastapi import HTTPException

from app.core.config import settings
from app.core.logging import get_logger

log = get_logger(__name__)


@dataclass
class IpRiskResult:
    ip_address: str
    is_valid: bool
    country_code: str | None = None
    is_vpn: bool = False
    is_proxy: bool = False
    is_tor: bool = False
    is_hosting: bool = False
    provider: str | None = None
    reason: str | None = None


def _is_private_or_local(ip_address: str) -> bool:
    if ip_address in ("localhost",):
        return True
    try:
        parsed = ipaddress.ip_address(ip_address)
    except ValueError:
        return False
    return parsed.is_private or parsed.is_loopback


async def evaluate_ip(ip_address: str) -> IpRiskResult:
    if _is_private_or_local(ip_address):
        return IpRiskResult(
            ip_address=ip_address,
            is_valid=True,
            country_code="MA",
            provider="local",
        )

    maxmind_result = await _evaluate_with_maxmind(ip_address)
    ipqs_result = await _evaluate_with_ipqualityscore(ip_address)

    for result in (maxmind_result, ipqs_result):
        if result is not None and not result.is_valid:
            return result

    for result in (maxmind_result, ipqs_result):
        if result is not None and result.is_valid:
            return result

    return IpRiskResult(
        ip_address=ip_address,
        is_valid=False,
        reason="ip_validation_unavailable",
    )


async def _evaluate_with_maxmind(ip_address: str) -> IpRiskResult | None:
    if not settings.MAXMIND_ACCOUNT_ID or not settings.MAXMIND_LICENSE_KEY:
        return None

    url = f"https://geoip.maxmind.com/geoip/v2.1/insights/{ip_address}"
    auth = (settings.MAXMIND_ACCOUNT_ID, settings.MAXMIND_LICENSE_KEY)

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, auth=auth, timeout=5.0)
    except Exception as exc:
        log.error(f"MaxMind request failed: {exc}")
        return None

    if response.status_code != 200:
        log.error(f"MaxMind API error: {response.status_code} - {response.text}")
        return None

    data = response.json()
    country_code = data.get("country", {}).get("iso_code")
    traits = data.get("traits", {})
    is_vpn = traits.get("is_anonymous_vpn", False)
    is_proxy = traits.get("is_anonymous_proxy", False)
    is_tor = traits.get("is_tor_exit_node", False)
    is_hosting = traits.get("is_hosting_provider", False)

    reason = None
    if country_code != "MA":
        reason = "non_morocco_ip"
    elif is_vpn or is_proxy or is_tor or is_hosting:
        reason = "vpn_proxy_tor_or_hosting"

    return IpRiskResult(
        ip_address=ip_address,
        is_valid=reason is None,
        country_code=country_code,
        is_vpn=is_vpn,
        is_proxy=is_proxy,
        is_tor=is_tor,
        is_hosting=is_hosting,
        provider="maxmind",
        reason=reason,
    )


async def _evaluate_with_ipqualityscore(ip_address: str) -> IpRiskResult | None:
    if not settings.IPQUALITYSCORE_API_KEY:
        return None

    url = (
        "https://ipqualityscore.com/api/json/ip/"
        f"{settings.IPQUALITYSCORE_API_KEY}/{ip_address}"
    )
    params = {"strictness": 1, "allow_public_access_points": "true"}

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, timeout=5.0)
    except Exception as exc:
        log.error(f"IPQualityScore request failed: {exc}")
        return None

    if response.status_code != 200:
        log.error(f"IPQualityScore API error: {response.status_code} - {response.text}")
        return None

    data = response.json()
    country_code = data.get("country_code")
    is_vpn = bool(data.get("vpn"))
    is_proxy = bool(data.get("proxy"))
    is_tor = bool(data.get("tor"))
    is_hosting = bool(data.get("hosting") or data.get("active_vpn"))

    reason = None
    if country_code != "MA":
        reason = "non_morocco_ip"
    elif is_vpn or is_proxy or is_tor or is_hosting:
        reason = "vpn_proxy_tor_or_hosting"

    return IpRiskResult(
        ip_address=ip_address,
        is_valid=reason is None,
        country_code=country_code,
        is_vpn=is_vpn,
        is_proxy=is_proxy,
        is_tor=is_tor,
        is_hosting=is_hosting,
        provider="ipqualityscore",
        reason=reason,
    )


async def check_ip_allowed(ip_address: str) -> None:
    result = await evaluate_ip(ip_address)
    if result.is_valid:
        return

    log.warning(
        "Blocked request ip=%s country=%s provider=%s reason=%s",
        ip_address,
        result.country_code,
        result.provider,
        result.reason,
    )
    if result.reason == "non_morocco_ip":
        raise HTTPException(
            status_code=403,
            detail="Orders are only allowed from Morocco.",
        )
    raise HTTPException(
        status_code=403,
        detail="Suspicious network detected. Orders from VPNs or proxies are not allowed.",
    )
