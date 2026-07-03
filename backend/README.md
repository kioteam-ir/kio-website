# KIO Backend

Modular monolith API for the KIO corporate website.

## Stack

- Python 3.13, FastAPI, SQLModel
- `uv` for dependency management
- `ruff` + `mypy --strict` for quality gates

## Layout

```
app/
  config.py
  main.py
  core/              # auth, db, logging, middleware, roles
  modules/
    accounts/
    projects/
    blog/
scripts/
tests/
```

## Local development (without Docker)

```bash
cp ../.env.example ../.env   # from repository root
uv sync
./scripts/dev.sh
```

## Docker

Compose files live at the **repository root** (`compose/`), not in this directory.

```bash
# From repository root — full local stack (apps + postgres + redis)
docker compose -f compose/docker-compose.yml \
  -f compose/docker-compose.infra.yml \
  -f compose/docker-compose.dev.yml up --build

# Apps only — external database/redis via .env
docker compose -f compose/docker-compose.yml \
  -f compose/docker-compose.dev.yml up --build
```

## Quality

```bash
./scripts/lint.sh
./scripts/typecheck.sh
./scripts/test.sh
```
