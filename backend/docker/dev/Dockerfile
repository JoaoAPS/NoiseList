FROM python:3.9-alpine

ENV PYTHONUNBUFFERED 1

COPY ./docker/dev/requirements.txt /
RUN python -m pip install --upgrade pip && \
	python -m pip install -r /requirements.txt --no-cache-dir

RUN mkdir /backend
COPY . /backend/
WORKDIR /backend

RUN adduser -D user
RUN chown -R user /backend
USER user
