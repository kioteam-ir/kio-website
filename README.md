# KIO Website

Corporate website with React frontend and FastAPI modular monolith backend.

## Repository layout

```
backend/     Python API (uv, FastAPI)
frontend/    React + Vite
compose/     Docker Compose manifests (apps + optional infra)
docker/      Dockerfiles for api and web
```

## Environment

```bash
cp .env.example .env
```

Edit `.env` for your deployment. Use `DB_HOST` / `REDIS_HOST` to point at external services when not running local infrastructure.

## Docker Compose

Compose is split intentionally:

| File | Purpose |
|------|---------|
| `compose/docker-compose.yml` | Application services (`api`, `web`) |
| `compose/docker-compose.infra.yml` | Optional PostgreSQL + Redis |
| `compose/docker-compose.dev.yml` | Dev overrides (hot reload, exposed ports) |
| `compose/docker-compose.staging.yml` | Staging hardening |
| `compose/docker-compose.prod.yml` | Production hardening |

### Full local stack

```bash
docker compose -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.dev.yml up --build
```

### Apps only (external DB/Redis)

```bash
# Set DB_HOST, REDIS_HOST, etc. in .env to your external endpoints
docker compose -f compose/docker-compose.yml \
  -f compose/docker-compose.dev.yml up --build api web
```

### Staging / production

```bash
docker compose -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.staging.yml up -d --build

docker compose -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.prod.yml up -d --build
```

## Backend quality gates

```bash
cd backend
./scripts/lint.sh && ./scripts/typecheck.sh && ./scripts/test.sh
```
