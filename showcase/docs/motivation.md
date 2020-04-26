---
id: motivation
title: Motivation
sidebar_label: Motivation
---

## The meaning of code reviews

As developers we perform code reviews to reach different goals:

- Improve code quality
- Share knowledge
- Enable consistency in a code base
- Enhance legibility
- Prevent accidental errors

At BAM we believe these matters are a critical priority and we decided to improve the way we review code in order to maximize the benefits.

## Why use Commentor

Commentor was designed to help teams get the most out of their code reviews.
You should use Commentor if you want to:

- Define standard ways of coding all your team agrees upon
- Decrease the time spent reviewing code
- Find ways of improvement for your most experienced developpers so that they can raise the general code quality of the team.

## The method behind Commentor

The general idea behind Commentor is using the code reviews **comments** to help the most skilled developers of your team to **mentor** the beginners. Code review is a great part of your process to do this.

To make the most out of the comments your team members make while reviewing code, the first step is to gather them in one spot. By installing the Commentor Github App on your repo, you allow us to trigger a webhook call to our server containing every comments made on it.

Once all these comments are gathered you will be able to realize a few things:

- Code review comments are wonderful witnesses of disagreements among developers team
- The reasons of these desagreements are often unshared knowledge or ignorance about best practices
- While analyzing these comments, you might see patterns appearing

Our advice is to **tag** all of your comments (we provided you with a list of default tags but you can add the ones you want :))

Then, you can analyze the topics that come back the most. These are topics where your team needs **clarification and standardization**.

Sometimes your most experienced developers will have the best practices in mind and standardization will consist in them **training the rest of the team**.

However we also found a lot of situations where the author and the reviewer would agree something is wrong with the code but none of them would have the correct way to implement it without digging.

In both cases, the goal is to define the **best way to implement** something, propose it to the team and take their returns until **everyone agrees**.

Once this standard has been agreed upon by the whole team, code reviewers have to make a specific reference to this standard everytime they review a misaligned code.

Your team can then **measure** their well execution of a standard by seeing the number of code reviews tagged as related going down.
