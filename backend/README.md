# KIO Backend

FastAPI modular monolith — `accounts`, `projects`, `blog`.

Python 3.13 · uv · ruff · mypy · pytest

```
app/
  core/       auth, db, middleware
  modules/    accounts · projects · blog
scripts/
tests/
```

Env and Docker Compose live at the [repository root](../README.md).

## Setup

```bash
cp .env.local.example .env    # from repo root
cd backend && uv sync
```

## Scripts

| Command | What it does |
|---------|----------------|
| `./scripts/dev.sh` | API with hot reload |
| `./scripts/lint.sh` | ruff check + format |
| `./scripts/typecheck.sh` | mypy --strict |
| `./scripts/test.sh` | pytest |

Run all gates:

```bash
./scripts/lint.sh && ./scripts/typecheck.sh && ./scripts/test.sh
```
