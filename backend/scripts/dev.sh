#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
uv run uvicorn app.main:create_app --factory --reload --host 0.0.0.0 --port 8000
