# syntax=docker/dockerfile:1

FROM python:3.13-slim AS builder

COPY --from=ghcr.io/astral-sh/uv:0.6.14 /uv /usr/local/bin/uv

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_PYTHON_DOWNLOADS=never

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/pyproject.toml backend/uv.lock backend/README.md ./
COPY backend/app ./app

COPY backend/alembic ./alembic
COPY backend/alembic.ini ./

RUN uv sync --frozen --no-dev

FROM python:3.13-slim AS runtime

RUN groupadd --system kio \
    && useradd --system --gid kio --create-home kio \
    && apt-get update \
    && apt-get install -y --no-install-recommends libpq5 curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN mkdir -p /app/crudadmin_data \
    && chown kio:kio /app/crudadmin_data

COPY --from=builder --chown=kio:kio /app/.venv /app/.venv
COPY --from=builder --chown=kio:kio /app/app /app/app
COPY --chown=kio:kio backend/pyproject.toml ./

COPY --from=builder --chown=kio:kio /app/alembic /app/alembic
COPY --from=builder --chown=kio:kio /app/alembic.ini ./

COPY --chown=kio:kio backend/scripts/start.sh ./start.sh
RUN chmod +x ./start.sh

ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONPATH=/app

USER kio

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -fsS http://127.0.0.1:8000/health || exit 1

CMD ["./start.sh"]