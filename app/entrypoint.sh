#!/bin/sh
set -e

cd /app/backend
uvicorn main:app --host 0.0.0.0 --port 8000 &

cd /app/frontend
npm run dev &

wait
