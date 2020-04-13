---
id: tags
title: Tags management
sidebar_label: Tags
---

## Understand how tags work

This is the basic feature of Commentor. The principle is to define a set of recognized patterns you will add to your comments in order to be able to analyze them. Under the hood it works with simple regex matching on the comment body. If you have a ✅ tag, it will be associated to all the comments containing the ✅ emoji inside their body.

:::tip

Using gitmoji as tags will allow you to use th native autocompletion on these emojis on your favorite versioning platform.

![Github autocompletion][github-autocompletion]

[github-autocompletion]: ../static/img/github-autocompletion.png "Use the native autocompletion of your favorite versioning platform"

:::

---

## Included tags

Commentor is shipped with default tags shared accross all projects. These are the tags we found more usefull when using the first version of commentor on our own projects :).

## Add your own tags

You can add your own tags if you want to analyze something we didn't. These tags are linked to your account and won't be available for others until they add them as well.

:::note

We plan on changin the behaviour of the Tags system in order to:

- Allow tags to be shared among the members of one project
- Allow you to link a standard describing how to react when a certain tag is often found in your code review comments

:::
