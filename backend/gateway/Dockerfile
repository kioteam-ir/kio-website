FROM kio-base

WORKDIR /app
ENV PYTHONPATH=/app

COPY .env.dev /app/

COPY gateway/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]