Noise List
==========

Noise list is an application to keep track of musics you know, so you never forget them.
It is specially useful to remeber musics you know how to play.


## Instalation

### Dependencies
- [Docker](https://www.docker.com/get-started)
- [Docker-compose](https://docs.docker.com/compose/install/)

### Instructions
1. Clone the repository.
2. `cd` into the repo directory and run on your cli `docker-compose build`.
3. Run `docker-compose up` whenever you want to run the app. It will be available on [localhost:8000](http://localhost:8000).

This will run the developer version.
To run the production version, run `docker-compose -f docker-compose-prod.yml up`.
Note that you first have to create a `.env` file on `backend/docker/prod/` with the enviroment variables.
They are similar to those in `backend/docker/dev/.env`, but should also include a ALLOWED_HOSTS variable.
