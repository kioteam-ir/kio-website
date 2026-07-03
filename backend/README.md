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

From the **repository root**:

```bash
cp .env.local.example .env
cd backend && uv sync && ./scripts/dev.sh
```

Requires Postgres and Redis at the hosts configured in `.env`.

## Docker

Compose files and env templates live at the **repository root**. See the main [README](../README.md) for local vs deploy flows.

## Quality

```bash
./scripts/lint.sh
./scripts/typecheck.sh
./scripts/test.sh
```
