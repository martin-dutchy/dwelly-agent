---
name: first-principles-review
description: Reviews a question, file, component, or codebase area from first principles and industry best practice to produce clear recommendations for the cleanest architecture and implementation. Only applied when explicitly invoked via /first-principles-review.
disable-model-invocation: true
---

# First-principles review

Reviews whatever the user provides (a question, file, component, or part of the codebase) and produces **clear recommendations** for the cleanest and best way to implement it. Use only first-principles reasoning and how strong software teams typically do it — not existing codebase conventions or chat history.

## Input

The user supplies the **subject** of the review: a question, a file path, a component name, or an area of the codebase. That subject is what they want to improve toward the cleanest architecture possible.

## Goal

Deliver a **clear recommendation or set of recommendations** for how to implement the subject, following the cleanest and best architecture possible.

## Method

### 1. Reason from first principles

- **Do not** base the answer on: current codebase conventions, how this (or similar) is already implemented in the repo, or prior chat context.
- **Do** base the answer on: the problem and its constraints, considered from scratch, and what would be the best approach in the abstract.

Reason from first principles about the best way to implement the subject given the constraints.

### 2. Anchor in how best teams do it

- Base the recommendation on how **strong software development teams** typically implement this—patterns, practices, and conventions from the ecosystem and industry.
- If it's unclear how best teams approach this: **research** the topic (e.g. web search, official docs, authoritative sources) before giving a recommendation, then summarize how best teams do it and align the recommendation with that.

### 3. Optional — Compare with current implementation

If the user pointed to specific code (file, component, or area), after giving the first-principles and best-practice view:

- Compare that ideal with the current implementation.
- Note gaps, risks, or concrete improvements.

## Output format

Structure the response as:

1. **First-principles view** — Best approach derived from the problem and constraints, without reference to the codebase or chat.
2. **How best teams do it** — Summary of industry/ecosystem practice (and research if it was needed).
3. **Recommendations** — Concrete, ordered recommendations for implementing the subject.
4. **Comparison** (if the user provided code) — How the current implementation differs from the recommendation and what to change.

Keep recommendations actionable and specific (e.g. “prefer X over Y because …”, “introduce a boundary here for …”).
