---
title: Implementation plans
description: Two plan shapes, default and ExecPlan, both gated by interview-first acceptance criteria and checks the agent can run and show evidence for.
status: stable
last_updated: 2026-10-10
category: guide
---

# Implementation plans

Adapted for this repository from the AirDojo planning guide. The commands and layers below are this repo's, not AirDojo's.

A plan's job is to make the **final outcome trustworthy**: before anyone writes code, success is spelled out in enough detail that an agent can run checks, read pass/fail signals, and show evidence, not assert "looks done."

This follows Anthropic's guidance: [Give Claude a way to verify its work](https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work) and [Let Claude interview you](https://code.claude.com/docs/en/best-practices#let-claude-interview-you).

Feature **specs** (contracts before code) are separate: see the `spec-and-plan-docs` skill in `.agents/skills/`. Conventions stay in skills and `AGENTS.md`, never pasted into a plan.

## Which shape

| Shape            | When                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Default plan** | Normal implementation plans. One markdown file under a `plans/` directory next to the code it changes.                            |
| **ExecPlan**     | Long-running work: multi-hour, multi-package, high ambiguity, cold resume or handoff, or the user says "ExecPlan" or "living plan." |

If the user says "create a plan" without naming ExecPlan, use the **default** shape.

Placement and naming: `spec-and-plan-docs` skill (`*-implementation-plan.md`, `*-plan.md`). Cross-cutting plans live under `docs/plans/`. The orchestrating plan for this project is [dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md); every sub-plan links back to it. When the work completes or is abandoned, mark the plan `superseded` and promote durable lessons into `research/` or `README.md`.

## Interview first (required)

Before treating a plan as ready to implement, **interview the user** until acceptance criteria and verification are spelled out in painful detail. Ask about the hard parts: edge cases, failure modes, tradeoffs, what must not change, and what "done" looks like as concrete checks. Do not ask filler questions the codebase already answers. Keep interviewing until:

1. Every acceptance criterion is observable (inputs to outputs, or a named test that fails before and passes after).
2. Every verification step is a **check the agent can run** (command, test, script) with a clear pass/fail signal.
3. Ambiguities that would change the implementation are resolved or explicitly deferred as non-goals.

Hackathon exception: when the user cannot be reached (autonomous run, or the clock is the constraint), record each unresolved question in the plan's Decision log with the assumption taken, and proceed. Never silently pick.

## What every plan must nail

**Acceptance criteria** and **Verification** are the load-bearing sections.

### Acceptance criteria

Write criteria a skeptic could check without re-reading the chat: observable behaviours with exact expected results, data outcomes (files written, fields present, exit codes), edge cases and explicit "must not break X" cases. Prefer "Given / when / then" or named tests with fixtures.

### Verification

List **runnable** checks. For each: exact command (from repo root), what pass looks like, and that the agent must **show evidence** (command output, test transcript), not a bare claim.

| Layer              | This repo                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Done-gate          | `pnpm verify` (typecheck + vitest) **must** exit 0 before claiming done                                                    |
| Fast loop          | `pnpm typecheck`, `pnpm test -- <file>` while iterating                                                                     |
| Unit / integration | Named Vitest files or `describe` blocks under `src/**/*.test.ts`; fail-before / pass-after                                  |
| Agent behaviour    | `pnpm cases --in <cases> --out <run>` then `pnpm eval --cases <cases> --answers <run>`; pass is a score or check threshold  |
| Reproducibility    | A cold clone + `pnpm install` + documented env vars runs the same command and produces the same artefacts                   |
| Other              | Scripts, `gh` checks, file-existence checks, anything with a pass/fail                                                     |

`pnpm verify` is necessary and **not sufficient**. Product acceptance still needs the agent-behaviour checks above.

---

## Default plan skeleton

```md
# <Short, action-oriented title>

## Goal
## User-visible outcome
## Context / current state
## Requirements
## Non-goals
## Constraints / invariants
## Proposed approach
## Implementation plan
1. … — prove by: …
## Acceptance criteria
- [ ] …
## Verification
- [ ] `pnpm verify` (repo root) exits 0
- [ ] unit tests: …
- [ ] agent behaviour: …
- [ ] other: …
```

---

## ExecPlan (long-running)

Same required sections as the default plan, plus:

1. **Self-contained**: a cold agent with no chat history can finish from this file alone.
2. **Living document**: update as you go. **Progress** (checkboxes with timestamps), **Discoveries** (unexpected behaviour with evidence), **Decision log** (Decision / Rationale / Date / Author), **Final outcome**.
3. **Self-verification while implementing**: advance milestones, run the Verification checks, show evidence, iterate until they pass.
4. **Independent review before the PR**: run `/code-review` on the diff before opening or updating the PR.

### ExecPlan extras (append after Verification)

```md
## Progress
- [x] (2026-10-10 11:00 BST) …
## Discoveries
- Observation: … Evidence: …
## Decision log
- Decision: … Rationale: … Date/Author: …
## Final outcome
```

## Rules of thumb

- If you cannot say how the agent will **know** it succeeded, the plan is not ready.
- If Verification is only `pnpm verify`, you under-specified product acceptance.
- Show evidence; do not claim success.
- Plans never encode conventions; conventions never live in plans.
