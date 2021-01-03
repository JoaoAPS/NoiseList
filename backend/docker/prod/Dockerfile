FROM python:3.9-alpine

ENV PYTHONUNBUFFERED 1

COPY ./docker/prod/requirements.txt /
RUN python -m pip install --upgrade pip && \
	python -m pip install -r /requirements.txt --no-cache-dir

RUN mkdir /backend
COPY . /backend/
WORKDIR /backend

RUN mkdir /files
COPY ./docker/prod/entrypoint.sh /files
RUN chmod +x /files/entrypoint.sh

RUN if [ ! -f db.sqlite3 ]; then cp initial_db.sqlite3 db.sqlite3; fi

RUN adduser -D user
RUN chown -R user /backend
RUN chown -R user /files
USER user
