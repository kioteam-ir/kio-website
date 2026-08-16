#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
uv run ruff check app tests scripts
uv run ruff format --check app tests scripts
