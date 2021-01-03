FROM node:14-alpine

RUN mkdir /frontend
WORKDIR /frontend

COPY package*.json /frontend/
RUN npm install
COPY . /frontend/
