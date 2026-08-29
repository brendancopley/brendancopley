---
title: Why your agent breaks in production
description: A no-code prototype proves the workflow is worth building. It does not tell you what happens when real data, real permissions and real volume arrive. Here is what actually breaks, in the order it breaks.
date: 2026-08-18
image: /projects/mcp-chain-of-draft.webp
readingTime: 7 min read
tags:
  - agents
  - architecture
  - production
---

A prototype agent is a demonstration that a workflow is worth building. That is genuinely
useful, and the no-code tools are good at it. The trouble is that a demo and a product fail
in completely different ways, and nothing in the demo warns you which failure is coming.

Here is the order things usually break, from the engagements I have run.

## 1. The happy path was the only path

In a demo you drive the input. In production the input drives you. The first real failure
is almost never the model — it is an empty result set, a null where the schema promised a
string, a PDF that is actually a scanned image, or a user asking something adjacent to the
workflow rather than inside it.

Agents fail unusually badly here because a language model will not throw. It will produce
a confident, well-formatted answer built on nothing. A traditional integration crashes and
you get a stack trace; an agent quietly invents.

The fix is boring and it is not a prompt: validate tool outputs against a schema before
they re-enter the context, and make "I could not do this" a first-class, testable return
value rather than something you hope the model says.

## 2. Nobody scoped the permissions

Most prototypes run with one set of credentials — usually the builder's, usually broad.
That is fine for a demo and disqualifying in production, because the moment the agent acts
on behalf of different users it either leaks across them or needs a permission model
retrofitted into a system that never had one.

Retrofitting is much harder than building it in. The agent's tool layer has to carry the
caller's identity all the way to the underlying API, and each tool needs the narrowest
scope that still lets it work.

## 3. The model has direct access to your data

This is the one I care most about, and it is worth stating plainly:

> **The LLM should never hold the credential.** It should choose and parameterise a call.
> Your platform executes it.

If the model can reach the data directly, then every prompt injection is a potential data
exfiltration, and no log you keep can tell you what it actually did versus what it said it
did. If the model can only emit a structured intent that your code validates and runs, you
get an audit trail for free and the blast radius of a bad generation is bounded by what
that tool was allowed to do anyway.

I have written about how this looks in practice in
[keeping the LLM out of your data path](/articles/keep-the-llm-out-of-your-data-path).

## 4. You cannot tell whether a change made it better

This is the failure that ends projects. Someone tweaks a prompt, it looks better on the
three examples anyone remembers, it ships, and something else silently regresses.

Without an evaluation set you are not engineering, you are redecorating. The minimum viable
version is not sophisticated: thirty to fifty real inputs with known-good outputs, run on
every change, with the results written down. That is usually enough to catch the regression
that would otherwise reach a customer.

## 5. Cost arrives all at once

Demos run tens of calls. Production runs millions. Retry loops that were invisible at
demo scale become the line item that gets the project cancelled. Agents are especially
prone to this because a retry is often a whole new reasoning trace, not a single request.

Cap the loop. Log tokens per request. Know what your p99 conversation costs before finance
asks.

## What this means if you have a prototype

None of this argues against starting in a no-code tool. It argues that the prototype has
finished its job the moment it proves the workflow is valuable — and that the next step is
a different kind of work.

If you are at that point and want a second pair of eyes on what will break first,
[book a call](https://cal.com/radfab). Bring the thing you are worried about.
