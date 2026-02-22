FROM python:3.12-alpine

WORKDIR /app

RUN apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    postgresql16-dev

RUN pip install --upgrade pip

COPY requirements.txt .
RUN pip install -r requirements.txt