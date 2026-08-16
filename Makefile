SHELL := /bin/bash

COMPOSE=docker compose

BASE=-f compose/docker-compose.yml
INFRA=-f compose/docker-compose.infra.yml

DEV=$(BASE) $(INFRA) -f compose/docker-compose.dev.yml
LOCAL=$(DEV) -f compose/docker-compose.local.yml
STAGING=$(BASE) $(INFRA) -f compose/docker-compose.staging.yml
PROD=$(BASE) $(INFRA) -f compose/docker-compose.prod.yml

.PHONY: help

help:
	@echo "Available commands:"
	@echo ""
	@echo "Development"
	@echo "  make up          Start development"
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
	@echo "  make clean"

# -----------------------
# Development
# -----------------------

up:
	$(COMPOSE) $(DEV) up
	
up -b:
	$(COMPOSE) $(DEV) up --build

down:
	$(COMPOSE) $(DEV) down

rebuild:
	$(COMPOSE) $(DEV) up --build --force-recreate

logs:
	$(COMPOSE) $(DEV) logs -f

ps:
	$(COMPOSE) $(DEV) ps

# -----------------------
# Local (alternate ports)
# -----------------------

local-up:
	$(COMPOSE) $(LOCAL) up --build

local-down:
	$(COMPOSE) $(LOCAL) down

# -----------------------
# Staging
# -----------------------

staging:
	$(COMPOSE) $(STAGING) up -d --build

staging-down:
	$(COMPOSE) $(STAGING) down

# -----------------------
# Production
# -----------------------

prod:
	$(COMPOSE) $(PROD) up -d --build

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