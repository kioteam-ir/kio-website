# KIO Website

Corporate website with React frontend and FastAPI modular monolith backend.

## Repository layout

```
backend/     Python API (uv, FastAPI)
frontend/    React + Vite
compose/     Docker Compose manifests (apps + optional infra)
docker/      Dockerfiles for api and web
```

Pick **one** env template — local and deploy values differ on purpose:

| File | Use when |
|------|----------|
| `.env.local.example` | Developing on your machine |
| `.env.deploy.example` | Staging or production servers |

Copy the matching template to `.env` at the repository root (never commit `.env`).

---

## Local development

**Goal:** hot reload, local Postgres + Redis, app on localhost.

### 1. Environment

```bash
cp .env.local.example .env
```

Edit `.env` only if you need different ports or credentials.

### 2. Start the stack

Standard (Postgres and Redis published on host ports 5432 / 6379):

```bash
docker compose \
  -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.dev.yml \
  up --build
```

If those ports are already in use on your machine, add the local overlay (DB/Redis stay inside Docker only):

```bash
docker compose \
  -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.dev.yml \
  -f compose/docker-compose.local.yml \
  up --build
```

### 3. Open the app

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:8000 |
| Health | http://localhost:8000/health |
| API docs | http://localhost:8000/docs |

### 4. Stop

```bash
docker compose \
  -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.dev.yml \
  down
```

Add `-f compose/docker-compose.local.yml` if you used the overlay.

### Backend without Docker (optional)

Requires Postgres and Redis reachable at the hosts in `.env`.

```bash
cp .env.local.example .env
cd backend && uv sync && ./scripts/dev.sh
```

---

## Staging / production deploy

**Goal:** production images, no hot reload, strong secrets, public URLs.

### 1. Environment

```bash
cp .env.deploy.example .env
```

Set at minimum:

- `SECRET_KEY` — long random string
- `DB_PASSWORD`, `CRUDADMIN_PASSWORD` — strong unique values
- `CORS_ORIGINS` — your public site URL(s)
- `VITE_API_URL` — public API URL (used when building the frontend image)

If Postgres/Redis run outside Compose, point `DB_HOST` / `REDIS_HOST` at those endpoints and skip `compose/docker-compose.infra.yml`.

### 2. Staging

Includes bundled Postgres + Redis and publishes API/web on host ports:

```bash
docker compose \
  -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.staging.yml \
  up -d --build
```

Default staging web port is **8080** (`WEB_PORT` in `.env`).

### 3. Production

Same infra overlay; production compose adds restart policy and resource limits. Put a reverse proxy (nginx, Traefik, etc.) in front — `compose/docker-compose.prod.yml` does not publish ports by default.

```bash
docker compose \
  -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.prod.yml \
  up -d --build
```

For apps-only deploy (managed DB/Redis):

```bash
docker compose \
  -f compose/docker-compose.yml \
  -f compose/docker-compose.prod.yml \
  up -d --build api web
```

---

## Compose reference

| File | Purpose |
|------|---------|
| `compose/docker-compose.yml` | Application services (`api`, `web`) |
| `compose/docker-compose.infra.yml` | Optional PostgreSQL + Redis |
| `compose/docker-compose.dev.yml` | Dev overrides (hot reload, exposed ports) |
| `compose/docker-compose.local.yml` | Optional: skip host DB/Redis ports when 5432/6379 are busy |
| `compose/docker-compose.staging.yml` | Staging (restart policy, published ports) |
| `compose/docker-compose.prod.yml` | Production (restart policy, resource limits) |

---

## Backend quality gates

```bash
cd backend
./scripts/lint.sh && ./scripts/typecheck.sh && ./scripts/test.sh
```
