import httpx
from fastapi import HTTPException

from app.core.config import settings
from app.core.logging import get_logger

log = get_logger(__name__)

async def check_ip_allowed(ip_address: str) -> None:
    if not settings.MAXMIND_ACCOUNT_ID or not settings.MAXMIND_LICENSE_KEY:
        return  # MaxMind not configured, skip check

    # Localhost / Private IPs bypass
    if ip_address in ("127.0.0.1", "::1", "localhost") or ip_address.startswith("192.168.") or ip_address.startswith("10."):
        return

    url = f"https://geoip.maxmind.com/geoip/v2.1/insights/{ip_address}"
    auth = (settings.MAXMIND_ACCOUNT_ID, settings.MAXMIND_LICENSE_KEY)

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, auth=auth, timeout=5.0)
            
            if response.status_code != 200:
                log.error(f"MaxMind API error: {response.status_code} - {response.text}")
                # If MaxMind fails, we might want to let the order pass rather than blocking legitimate sales,
                # or block it. Let's allow it to pass on MaxMind failure to avoid false positives during outages.
                return

            data = response.json()
            
            # Check Country
            country_code = data.get("country", {}).get("iso_code")
            if country_code != "MA":
                log.warning(f"Blocked order from non-Morocco IP: {ip_address} (Country: {country_code})")
                raise HTTPException(status_code=403, detail="Orders are only allowed from Morocco.")

            # Check for VPN / Proxy / Tor
            traits = data.get("traits", {})
            is_vpn = traits.get("is_anonymous_vpn", False)
            is_proxy = traits.get("is_anonymous_proxy", False)
            is_tor = traits.get("is_tor_exit_node", False)
            is_hosting = traits.get("is_hosting_provider", False)

            if is_vpn or is_proxy or is_tor or is_hosting:
                log.warning(f"Blocked order from suspicious IP: {ip_address} (VPN: {is_vpn}, Proxy: {is_proxy}, Tor: {is_tor}, Hosting: {is_hosting})")
                raise HTTPException(status_code=403, detail="Suspicious network detected. Orders from VPNs or proxies are not allowed.")

    except Exception as e:
        log.error(f"MaxMind request failed: {e}")
        # Allow order to proceed if MaxMind is down
        return
