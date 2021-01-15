FROM node:14 as build-stage
RUN mkdir /frontend
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . /frontend/
COPY ./docker/prod/.env /frontend/
RUN npm run build

FROM nginx:1.19-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /frontend/dist /app
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/prod/nginx.conf /etc/nginx/conf.d/noiselist.conf
