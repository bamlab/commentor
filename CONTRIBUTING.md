# Contributing to Commentor

You are here to help on Commentor? Awesome, feel welcome and read the following sections in order to know how to ask questions and how to work on something.

All members of our community are expected to follow our [Code of Conduct](./CODE_OF_CONDUCT.md). Please make sure you are welcoming and friendly in all of our spaces.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests or writing code which can be incorporated into Commentor itself.

## Improving the docs

The Commentor docs are stored in the `showcase/` folder in this very repository. The actual documentation is written in [GitHub Flavoured Markdown](https://github.github.com/gfm/) in individual files in the `showcase/docs/` subfolder. You can edit individual files right inside the GitHub editor, which does not require any local setup.

## Local development on Commentor

This section will guide you through installing Commentor on your development machine, so that you can work on your feature or bug fix locally before submitting a PR.

### First installation

**Prerequisites**:

- `node >=12.14` — It should work fine on older versions, however it was not tested recently. You can use [`nvm`](https://github.com/nvm-sh/nvm) to install and manage node versions on your machine.
- `docker` ([installation docs](https://docs.docker.com/install/)).

**Install steps**:

- Clone the repository:
  ```bash
  git clone git@github.com:theodo/commentor.git
  ```
- Move to the `commentor` directory:
  ```bash
  cd commentor
  ```
- Install the backend and the frontend:
  ```bash
  cd backend && yarn
  cd ..
  cd frontend && yarn
  ```
- Start the database:
  ```bash
  docker-compose up
  ```
- Start the backend:
  ```bash
  cd backend && yarn start:dev
  ```
- Edit the .env file: replace the initial SECRET_KEY with a random string

- Start the frontend:
  ```bash
  cd frontend && yarn start:dev
  ```
- Enjoy! 🎉
