---
id: repositoryAccess
title: Grant repository access
sidebar_label: Repository Access
---

## Select your favorite versioning platform

Commentor plugs itself directly to your versioning platform in order to collect the comments your team members make on code.

So far, commentor supports:

- Github

:::note

We plan to support shortly:

- Gitlab
- Bitbucket

:::

---

## Integrate with Github

### Install Github App on your user account

Commentor needs to be able to get your available repositories in order to allow you to select the one you want to analyze. The Github API let us ask for the repos a user has access to only if you have installed the Github app on your account.

![user level permissions][github-app-user-permissions]

[github-app-user-permissions]: /img/github-app-user-permissions.png "Grant the read access to the repo you want to access to through commentor."

:::important

Commentor does **not** need access to your code, you can check that by reviewing the permissions it asks you while installing the Github App.

:::

### Install Github App on your repository

Commentor needs to collect the comment your team add while performing code reviews. By installing the Github App to your repo, you enable a webhook to be triggered everytime a comment is created - edited - deleted towards our server.

![repository level permissions][github-app-repository-permissions]

[github-app-repository-permissions]: /img/github-app-repository-permissions.png "Grant the read access to the repo you want to start tracking the comments from."

:::important

Commentor does **not** need access to your code, you can check that by reviewing the permissions it asks you while installing the Github App.

:::

### Authenticate with Github on the platform

Head to [Commentor Platform](https://commentor.netlify.com) and authenticate with Github.
