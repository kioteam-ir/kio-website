FROM myproject-base:latest

WORKDIR /app

COPY ./blog/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
