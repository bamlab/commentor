---
id: repositoryAccess
title: Grant repository access
sidebar_label: Repository Access
---

## Select your favorite versioning platform

Commentor plugs itself directly to your versioning platform in order to collect the comments your team members make on code.

So far, commentor supports:

- Github
- Gitlab

:::note

We plan to support shortly:

- Bitbucket

:::

---

## Integrate with Github

### Install Github App on your user account

Commentor needs to be able to get your available repositories in order to allow you to select the one you want to analyze.
Github is migrating many data accessible from its API to **Github Apps**. It's the **only way** for us to ask you for access to your repositories list **without** getting read access to your **code**.

source:

- The [github doc on the available scopes for github API](https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes)
- The [fine grained permissions you can define on Github Apps configuration](https://developer.github.com/v3/apps/permissions/#metadata-permissions).

Therefore **you have to** install the [Commentor Github App](https://github.com/apps/commentor) on your personnal account before starting analyzing your comments.

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

Head to [Commentor Platform](https://commentor.app) and authenticate with Github.

You're all set and ready to start analyzing :)

---

## Integrate with Gitlab

### Setup the commentor webhook on yoour project

Commentor needs to collect the comment your team add while performing code reviews. By setuping our webhook, you allow us to get the comments as you write them so that they are available for analysis on our platform.

- Head to Settings > Webhooks.
- Setup the webhook url to

```
https://backend.commentor.app/comments
```

- Tick the "Comments" checkbox
- Enable SSL verification
- Save the webhook

You're all set !

![webhook setup][gitlab-webhook-setup]

[gitlab-webhook-setup]: /img/gitlab-webhook-setup.png "Setup the webhook to be triggered by every comments"

:::important

Commentor does **not** need access to your code at any time.

:::

### Authenticate with Github on the platform

Head to [Commentor Platform](https://commentor.app) and authenticate with Gitlab.

:::important

The permissions we request during the OAuth process are the minimum permissions we could ask through Gitlab API so that we could access the list of project you have access to. We never access to your code.

:::

You're all set and ready to start analyzing :)
