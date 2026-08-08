#!/bin/bash
set -e

echo "[karimi-auto] Waiting for database..."
python -c "
import time, sys, psycopg, os
from app.core.config import settings

url = settings.DATABASE_URL
# Convert to psycopg3 DSN format
url = url.replace('postgres://', 'postgresql://').replace('postgresql+psycopg://', 'postgresql://')

for attempt in range(30):
    try:
        conn = psycopg.connect(url)
        conn.execute('SELECT 1')
        conn.close()
        print('[karimi-auto] Database is ready.')
        break
    except Exception as e:
        print(f'[karimi-auto] Waiting for DB ({attempt+1}/30): {e}')
        time.sleep(2)
else:
    print('[karimi-auto] Database not ready after 60s. Exiting.')
    sys.exit(1)
"

echo "[karimi-auto] Starting API server..."
exec gunicorn app.main:app \
  -k uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000 \
  --workers 2 \
  --timeout 120 \
  --access-logfile - \
  --error-logfile -
