FROM python

WORKDIR /app/

COPY ./requirements.txt /requirements.txt


RUN pip install --no-cache-dir --upgrade -r /requirements.txt

COPY ./app /app

CMD ["python", "main.py"]

