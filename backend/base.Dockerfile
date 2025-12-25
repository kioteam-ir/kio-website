FROM python:3.12-slim

# system dependencies مورد نیاز برای pip packages
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    libssl-dev \
    sqlite3 \
    libsqlite3-dev \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# upgrade pip
RUN pip install --upgrade pip

# copy و نصب requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements-base.txt
