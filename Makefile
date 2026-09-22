SHELL := /bin/bash

ENV_FILE=.env
# The root .env feeds compose variable interpolation (VITE_API_URL, host ports, ...).
# It lives outside compose/, so it must be passed explicitly with --env-file.
COMPOSE_ENV=$(if $(wildcard $(ENV_FILE)),--env-file $(ENV_FILE),)

COMPOSE=docker compose $(COMPOSE_ENV)

# External network shared with the central nginx/database stack.
NETWORK=kioteam_network

BASE=-f compose/docker-compose.yml
INFRA=-f compose/docker-compose.infra.yml

DEV=$(BASE) $(INFRA) -f compose/docker-compose.dev.yml
LOCAL=$(DEV) -f compose/docker-compose.local.yml
STAGING=$(BASE) $(INFRA) -f compose/docker-compose.staging.yml
PROD=$(BASE) $(INFRA) -f compose/docker-compose.prod.yml

.PHONY: help env network up up-build down rebuild logs ps \
        local-up local-down staging staging-down prod prod-d prod-down \
        lint typecheck test shell clean makemigrations migrate downgrade

help:
	@echo "Available commands:"
	@echo ""
	@echo "Development"
	@echo "  make up          Start development"
	@echo "  make up-build    Start development (rebuild images)"
	@echo "  make down        Stop development"
	@echo "  make logs        Follow logs"
	@echo "  make ps          Show containers"
	@echo "  make rebuild     Rebuild development"
	@echo ""
	@echo "Local (alternate ports)"
	@echo "  make local-up"
	@echo "  make local-down"
	@echo ""
	@echo "Staging"
	@echo "  make staging"
	@echo "  make staging-down"
	@echo ""
	@echo "Production"
	@echo "  make prod"
	@echo "  make prod-down"
	@echo ""
	@echo "Backend"
	@echo "  make lint"
	@echo "  make typecheck"
	@echo "  make test"
	@echo "  make shell"
	@echo ""
	@echo "Utilities"
	@echo "  make network     Create $(NETWORK) if missing"
	@echo "  make clean"

# -----------------------
# Development
# -----------------------

env:
	@test -f $(ENV_FILE) || { echo "Missing $(ENV_FILE) - create it first: cp .env.local.example $(ENV_FILE)"; exit 1; }

network:
	@docker network inspect $(NETWORK) >/dev/null 2>&1 || { echo "Creating external Docker network $(NETWORK)"; docker network create $(NETWORK); }

up: env network
	$(COMPOSE) $(DEV) up

up-build: env network
	$(COMPOSE) $(DEV) up --build

down:
	$(COMPOSE) $(DEV) down

rebuild: env network
	$(COMPOSE) $(DEV) up --build --force-recreate

logs:
	$(COMPOSE) $(DEV) logs -f

ps:
	$(COMPOSE) $(DEV) ps

# -----------------------
# Local (alternate ports)
# -----------------------

local-up: env network
	$(COMPOSE) $(LOCAL) up --build

local-down:
	$(COMPOSE) $(LOCAL) down

# -----------------------
# Staging
# -----------------------

staging: env network
	$(COMPOSE) $(STAGING) up -d --build

staging-down:
	$(COMPOSE) $(STAGING) down

# -----------------------
# Production
# -----------------------

prod-d: env network
	$(COMPOSE) $(PROD) up -d --build
prod: env network
	$(COMPOSE) $(PROD) up --build

prod-down:
	$(COMPOSE) $(PROD) down

# -----------------------
# Backend
# -----------------------

lint:
	cd backend && ./scripts/lint.sh

typecheck:
	cd backend && ./scripts/typecheck.sh

test:
	cd backend && ./scripts/test.sh

shell:
	cd backend && uv sync && ./scripts/dev.sh

# -----------------------
# Utilities
# -----------------------

clean:
	docker system prune -f

makemigrations:
	${COMPOSE} ${BASE} ${INFRA} ${DEV} run --rm api alembic revision --autogenerate -m "$(m)"

migrate:
	${COMPOSE} ${BASE} ${INFRA} ${DEV} run --rm api alembic upgrade head

downgrade:
	${COMPOSE} ${BASE} ${INFRA} ${DEV} run --rm api alembic downgrade -1
