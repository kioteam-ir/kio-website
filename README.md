# KIO Website

Corporate website with a **React** frontend and a **FastAPI** modular monolith backend.

```
backend/    FastAPI API (Python 3.13, uv)
frontend/   React + Vite
compose/    Docker Compose overlays
docker/     Dockerfiles
```

---

## Local development

Create your environment file:

```bash
cp .env.local.example .env
```

Start the development stack:

```bash
make up
```

If ports **5432** or **6379** are already in use, start the local profile instead:

```bash
make local-up
```

Stop the stack:

```bash
make down
```

Useful commands:

```bash
make logs
make ps
make rebuild
```

| Service  | URL                        |
| -------- | -------------------------- |
| Web      | http://localhost:5173      |
| API      | http://localhost:8000      |
| API Docs | http://localhost:8000/docs |

### Without Docker

From the repository root:

```bash
cd backend
uv sync
./scripts/dev.sh
```

Make sure Postgres and Redis are running and match the values in `.env`.

---

## Staging

Create the deployment environment:

```bash
cp .env.deploy.example .env
```

Update at least the following variables before deploying:

* `SECRET_KEY`
* `DB_PASSWORD`
* `CRUDADMIN_PASSWORD`
* `CORS_ORIGINS`
* `VITE_API_URL`

Deploy:

```bash
make staging
```

Stop:

```bash
make staging-down
```

The staging profile includes bundled Postgres and Redis and exposes the application on host port **8080**.

---

## Production

Deploy:

```bash
make prod
```

Stop:

```bash
make prod-down
```

The production profile enables restart policies and resource limits. It is intended to run behind **nginx** or **Traefik** and does not expose host ports by default.

### External database

If using external Postgres or Redis, do not include the infrastructure compose file and configure:

* `DB_HOST`
* `REDIS_HOST`

through your `.env`.

---

## Backend checks

Run quality checks:

```bash
make lint
make typecheck
make test
```

Or run them individually from the backend directory if needed.

---

## Available Make targets

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `make up`           | Start development environment    |
| `make down`         | Stop development environment     |
| `make local-up`     | Development with alternate ports |
| `make logs`         | Follow container logs            |
| `make ps`           | List running containers          |
| `make rebuild`      | Rebuild development containers   |
| `make staging`      | Deploy staging                   |
| `make staging-down` | Stop staging                     |
| `make prod`         | Deploy production                |
| `make prod-down`    | Stop production                  |
| `make lint`         | Run linters                      |
| `make typecheck`    | Run type checking                |
| `make test`         | Run test suite                   |
| `make shell`        | Start backend without Docker     |
| `make clean`        | Remove unused Docker resources   |

