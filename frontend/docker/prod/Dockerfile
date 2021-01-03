FROM node:14 as build-stage
RUN mkdir /frontend
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx:1.19-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /frontend/dist /app
COPY docker/prod/nginx.conf /etc/nginx/nginx.conf