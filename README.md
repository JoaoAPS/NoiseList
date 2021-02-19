Noise List
==========

Noise list is an application to keep track of musics you know, so you never forget them.
It is specially useful to remeber musics you know how to play.

Each music in the list also holds information about its language, tags the user can create,
and instruments in which you can play the music.

-->  [Live Demo](http://35.198.7.228/)  <--

## Instalation

### Dependencies
- [Docker](https://www.docker.com/get-started)
- [Docker-compose](https://docs.docker.com/compose/install/)

### Instructions
1. Clone the repository and `cd` into the repo directory.
2. Create a .env file in `backend/docker/dev/` following the example present in the directory.
3. On the repo root directory, run on your cli `docker-compose build`.
4. Run `docker-compose up` whenever you want to run the app. It will be available on [localhost:8000](http://localhost:8000).

This will run the developer version.
To get the production version, run `docker-compose -f docker-compose-prod.yml build` to build it and
`docker-compose -f docker-compose-prod.yml up` to run it.
Note that you first have to create a `.env` file on `backend/docker/prod/` with the enviroment variables.
The app will be available on [localhost:80](http://localhost:80).
