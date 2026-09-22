#!/usr/bin/env bash
set -euo pipefail

# Dependency endpoints come from .env (compose env_file) with local defaults.
DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-5432}"
REDIS_HOST="${REDIS_HOST:-redis}"
REDIS_PORT="${REDIS_PORT:-6379}"

# Startup tuning, in seconds.
STARTUP_TIMEOUT="${STARTUP_TIMEOUT:-60}"
STARTUP_INTERVAL="${STARTUP_INTERVAL:-2}"
MIGRATION_ATTEMPTS="${MIGRATION_ATTEMPTS:-5}"
REDIS_TIMEOUT="${REDIS_TIMEOUT:-15}"

# Uvicorn knobs; compose/docker-compose.dev.yml sets UVICORN_RELOAD=true.
UVICORN_HOST="${UVICORN_HOST:-0.0.0.0}"
UVICORN_PORT="${UVICORN_PORT:-8000}"
UVICORN_RELOAD="${UVICORN_RELOAD:-false}"

# Resolves the hostname and opens a TCP connection: fails on DNS errors
# ("Temporary failure in name resolution") and on refused/unreachable ports.
tcp_ready() {
    python -c '
import socket
import sys

host, port = sys.argv[1], int(sys.argv[2])
try:
    socket.create_connection((host, port), timeout=3).close()
except OSError as exc:
    print(f"    {host}:{port} not ready: {exc}", file=sys.stderr)
    sys.exit(1)
' "$1" "$2"
}

wait_for_service() {
    local name="$1" host="$2" port="$3" timeout="${4:-$STARTUP_TIMEOUT}"
    local deadline=$((SECONDS + timeout))

    echo "Waiting for ${name} at ${host}:${port} (timeout ${timeout}s) ..."
    until tcp_ready "$host" "$port"; do
        if ((SECONDS >= deadline)); then
            echo "ERROR: ${name} at ${host}:${port} is unreachable after ${timeout}s." >&2
            echo "HINT: if the host name does not resolve, this container is not on the" >&2
            echo "      same Docker network as '${host}'. Recreate it on kioteam_network:" >&2
            echo "      make down && make up" >&2
            return 1
        fi
        sleep "$STARTUP_INTERVAL"
    done
    echo "${name} is reachable."
}

run_migrations() {
    local attempt=1
    while ! alembic upgrade head; do
        if ((attempt >= MIGRATION_ATTEMPTS)); then
            echo "ERROR: 'alembic upgrade head' failed after ${MIGRATION_ATTEMPTS} attempts." >&2
            return 1
        fi
        echo "Migration attempt ${attempt}/${MIGRATION_ATTEMPTS} failed; retrying in ${STARTUP_INTERVAL}s ..." >&2
        attempt=$((attempt + 1))
        sleep "$STARTUP_INTERVAL"
    done
}

wait_for_service "PostgreSQL" "$DB_HOST" "$DB_PORT"

# Redis only backs rate limiting, so warn instead of blocking the API forever.
wait_for_service "Redis" "$REDIS_HOST" "$REDIS_PORT" "$REDIS_TIMEOUT" \
    || echo "WARNING: Redis is unreachable; rate limiting will degrade until it returns." >&2

echo "Running Database Migrations..."
run_migrations

echo "Starting FastAPI Server..."
uvicorn_args=(app.main:create_app --factory --host "$UVICORN_HOST" --port "$UVICORN_PORT")
if [ "$UVICORN_RELOAD" = "true" ]; then
    uvicorn_args+=(--reload)
fi
exec uvicorn "${uvicorn_args[@]}"