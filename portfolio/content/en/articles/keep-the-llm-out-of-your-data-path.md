---
title: Keep the LLM out of your data path
description: The single architectural decision that makes an agent auditable — the model selects and parameterises calls, the platform executes them. What it costs, what it buys, and how to structure it.
date: 2026-08-25
image: /projects/moderation-agent.webp
readingTime: 6 min read
tags:
  - architecture
  - security
  - agents
---

Most agent architectures put the model in the data path. It holds a token, calls an API,
receives rows, and reasons over them. It is the obvious design and it is the one most
frameworks nudge you toward.

It is also the design that makes an enterprise security review fail, and it is avoidable.

## The alternative, stated precisely

Invert the relationship. The model does not call anything. It **emits a structured intent**
— which operation, with which parameters — and your platform decides whether to execute it.

```
model  →  { tool: "headcount_by_org", org_id: 4412, quarter: "2026Q3" }
platform → validates shape
         → checks caller may read org 4412
         → executes against the approved endpoint
         → returns rows to the model as context
```

The model still reasons over the data. It never holds the credential, never constructs the
request, and never reaches an endpoint nobody approved.

## What this buys

**A real audit trail.** Every action is a validated, logged, replayable record produced by
your code rather than a model's account of what it thinks it did. When someone asks "what
did the system access last Tuesday", you answer from logs, not from traces.

**A bounded blast radius for prompt injection.** A successful injection can, at worst, make
the model request something it was already allowed to request. It cannot invent an endpoint,
widen a scope, or exfiltrate through a URL, because it never had the ability to make a
request in the first place.

**Least privilege that actually holds.** Each agent gets access to a specific, approved set
of operations. Adding a capability is a deliberate change to an allowlist, not an emergent
property of a prompt.

**Testability.** Intents are structured data. You can assert on them. "Given this question,
the router should produce this call with these parameters" is an ordinary unit test — which
means agent behaviour becomes something you can regression-test.

## What it costs

It is more work up front, and the cost is real:

- Every tool needs a schema and a validator.
- You need a routing layer that classifies a request and dispatches it to the agent that
  owns that domain.
- Errors have to be reflected back to the model in a form it can act on, without leaking
  internals.
- Adding a capability is a code change, not a prompt change. That is the point, and it is
  also the thing product teams find slow.

On a workforce-planning platform I architected at Cisco, this shape let domain-specialised
agents work against approved Workday and Finance REST endpoints while the model stayed
outside the credential boundary entirely. It processed roughly 2M records in under five
seconds and reduced a multi-day planning cycle to hours — but the reason it shipped was
that every action was auditable.

## When not to bother

If the agent only touches public data, or is a single-user tool operating on that user's own
data with their own session, the ceremony is not worth it. Put the model wherever is
convenient.

The moment there is more than one tenant, a compliance obligation, or data one user should
not see, this stops being an architectural preference and becomes the requirement.

---

If you are designing this now, or retrofitting it into something already running,
[book a call](https://cal.com/radfab).
