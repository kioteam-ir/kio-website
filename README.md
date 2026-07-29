# KIO Website

Corporate site — **React** frontend, **FastAPI** modular monolith backend.

```
backend/    API (Python 3.13, uv)
frontend/   UI (React, Vite)
compose/    Docker Compose overlays
docker/     Dockerfiles
```

---

## Local

```bash
cp .env.local.example .env

docker compose \
  -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.dev.yml \
  up --build
```

| | |
|---|---|
| Web | http://localhost:5173 |
| API | http://localhost:8000 |
| Docs | http://localhost:8000/docs |

Ports **5432** or **6379** busy on your machine? Add `-f compose/docker-compose.local.yml`.

Stop with the same `-f` flags, then `down`.

**No Docker:** from repo root, `cd backend && uv sync && ./scripts/dev.sh` (Postgres + Redis must match `.env`).

---

## Staging / production

```bash
cp .env.deploy.example .env
```

Fill in `SECRET_KEY`, `DB_PASSWORD`, `CRUDADMIN_PASSWORD`, `CORS_ORIGINS`, and `VITE_API_URL` before deploy.

**Staging** — bundled Postgres + Redis, web on host port **8080**:

```bash
docker compose \
  -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.staging.yml \
  up -d --build
```

**Production** — restart policies + resource limits; put nginx or Traefik in front (no host ports by default):

```bash
docker compose \
  -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.prod.yml \
  up -d --build
```

External database? Omit `compose.infra.yml` and set `DB_HOST` / `REDIS_HOST` in `.env`.

---

## Tests

```bash
cd backend
./scripts/lint.sh && ./scripts/typecheck.sh && ./scripts/test.sh
```
