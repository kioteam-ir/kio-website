#!/usr/bin/env bash
set -e

echo "Running Database Migrations..."
alembic upgrade head

echo "Starting FastAPI Server..."
exec uvicorn app.main:create_app --factory --host 0.0.0.0 --port 8000