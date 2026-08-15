#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -f "../.env" ]; then
    set -a
    source ../.env
    set +a
fi

echo "Running Database Migrations..."
uv run alembic upgrade head

echo "Starting FastAPI Server..."
uv run uvicorn app.main:create_app --factory --reload --host 0.0.0.0 --port 8000