# Combined dev container: runs the backend gateway and the frontend
# together in a single image, as a convenience alternative to running
# them as separate containers.
#
# Build context must be the project root, e.g.:
#   docker compose -f docker-compose.local.yml build fullstack

FROM kio-base

WORKDIR /app

RUN apk add --no-cache nodejs npm

# Backend (gateway)
ENV PYTHONPATH=/app/backend
COPY backend/.env.global /app/backend/
COPY backend/gateway/ /app/backend/

# Frontend
COPY frontend/package*.json /app/frontend/
RUN cd /app/frontend && npm install
COPY frontend/ /app/frontend/

COPY app/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000 5173

CMD ["/entrypoint.sh"]
