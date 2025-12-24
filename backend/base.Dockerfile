FROM python:3.12-alpine

WORKDIR /app

# نصب dependencies مشترک
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements-base.txt

# expose default port
EXPOSE 8000
