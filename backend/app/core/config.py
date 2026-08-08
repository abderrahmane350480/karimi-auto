from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    APP_NAME: str = "karimi-auto-api"
    ENVIRONMENT: str = "production"
    API_BASE_URL: str = "https://api.karimiauto.site"
    FRONTEND_URL: str = "https://karimiauto.site"
    CORS_ORIGINS: str = (
        "https://karimiauto.site,https://www.karimiauto.site,http://localhost:3000,http://localhost:3001,http://localhost:3002"
    )

    DATABASE_URL: str = (
        "postgres://karimiauto:karimiauto@karimiauto_database:5432/karimiauto?sslmode=disable"
    )

    GOOGLE_SHEET_WEBHOOK_URL: str = ""

    META_PIXEL_ID: str = ""
    META_ACCESS_TOKEN: str = ""
    META_API_VERSION: str = "v20.0"

    TIKTOK_PIXEL_CODE: str = ""
    TIKTOK_ACCESS_TOKEN: str = ""

    SNAP_PIXEL_ID: str = ""
    SNAP_ACCESS_TOKEN: str = ""

    ORDER_NUMBER_PREFIX: str = "KARIMI"
    DEFAULT_CURRENCY: str = "MAD"
    LOG_LEVEL: str = "INFO"

    MAXMIND_ACCOUNT_ID: str = ""
    MAXMIND_LICENSE_KEY: str = ""

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    def _convert_url(self, url: str, driver: str) -> str:
        for prefix in ("postgres://", "postgresql://"):
            if url.startswith(prefix):
                return f"postgresql+{driver}://" + url[len(prefix):]
        return url

    @property
    def db_url_async(self) -> str:
        return self._convert_url(self.DATABASE_URL, "psycopg")

    @property
    def db_url_sync(self) -> str:
        # Return plain postgresql:// for psycopg3 sync usage (start.sh wait script)
        url = self.DATABASE_URL
        for prefix in ("postgres://", "postgresql://", "postgresql+psycopg://"):
            if url.startswith(prefix):
                return "postgresql://" + url[len(prefix):]
        return url


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
