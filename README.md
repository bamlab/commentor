## Commentor

A Github App to help you analyze github comments 📈

# requirement

- node >= 10
- docker
- yarn

# backend

- get dependencies: `cd backend` && `yarn install`
- create file `.env` in folder with secret key with same format `.env.example`
- create db in docker container: `docker-compose up`
- run `yarn start:dev` when db is up

run migration:

- run `yarn migration:run`

# frontend

- cd `frontend` && `yarn install`
- `yarn start` -> localhost:8000/

# Storybook

- 🚀 In `frontend` folder, launch `yarn storybook`
