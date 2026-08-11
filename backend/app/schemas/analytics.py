from typing import Optional

from pydantic import BaseModel, Field


class TrafficEventRequest(BaseModel):
    eventType: str = Field(max_length=64)
    sessionId: Optional[str] = Field(default=None, max_length=128)
    pageUrl: Optional[str] = None
    referrer: Optional[str] = None
    productSlug: Optional[str] = Field(default=None, max_length=128)
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_content: Optional[str] = None
    utm_term: Optional[str] = None
    fbclid: Optional[str] = None
    ttclid: Optional[str] = None
    sc_click_id: Optional[str] = None


class TrafficEventResponse(BaseModel):
    ok: bool = True
