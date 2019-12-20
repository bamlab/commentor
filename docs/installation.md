# Requirement

- node >= 10
- docker
- yarn

## Backend

- get dependencies: `cd backend` && `yarn install`
- create file `.env` in folder with secret key with same format `.env.example`
- create db in docker container: `docker-compose up`
- run `yarn start:dev` when db is up

run migration:

- run `yarn migration:run`

## Frontend

- cd `frontend` && `yarn install`
- `yarn start` -> localhost:8000/

## Storybook

- 🚀 In `frontend` folder, launch `yarn storybook`

# Installation

In development:

- webpack-dev-server listens on the port 3000
  - it serves your frontend app's bundle.js
  - it manages hot reloading

## Start the app

What you need to do to (re)start the project:

- start the frontend:

  ```bash
  cd frontend
  yarn install
  yarn start
  ```

  The project should now be running at [localhost:3000](http://localhost:3000).
