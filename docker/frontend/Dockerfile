# syntax=docker/dockerfile:1

FROM node:22-alpine AS base

WORKDIR /app

FROM base AS deps

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

FROM base AS dev

COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:1.27-alpine AS production

COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
