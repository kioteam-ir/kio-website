# Dockerfile
FROM python:3.12-alpine

WORKDIR /app

# نصب dependency های سیستمی برای build پکیج‌ها
RUN apk add --no-cache gcc musl-dev libffi-dev postgresql-dev bash curl

# آپدیت pip / wheel / setuptools
RUN pip install --upgrade pip wheel setuptools

# کپی requirements اصلی پروژه
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# کپی کل پروژه
COPY . .

# expose پیش‌فرض پورت uvicorn
EXPOSE 8000

# دستور پیش‌فرض (gateway)
CMD ["uvicorn", "gateway.main:app", "--host", "0.0.0.0", "--port", "8000"]
