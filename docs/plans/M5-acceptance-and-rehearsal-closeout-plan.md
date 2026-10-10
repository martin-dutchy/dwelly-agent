---
title: M5 close-out: acceptance-criteria evidence and the timed rehearsal
status: active
last_updated: 2026-10-10
category: plan
---

# M5 close-out: acceptance-criteria evidence and the timed rehearsal

Parent: [dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md) (M0, M5 rows; AC2–AC13, AC15, AC18–AC20; Verification). Runbook: [.claude/skills/reality-test-run/SKILL.md](../../.claude/skills/reality-test-run/SKILL.md). Rehearsal design: [M5-reality-runner-implementation-plan.md](M5-reality-runner-implementation-plan.md).

## Goal

Turn the master plan's open acceptance boxes into evidence-backed ticks (or honest open items), run the AC13 rehearsal on the frozen 16:30 configuration, and close the bookkeeping items (M0 baseline, PR #11).

## User-visible outcome

The master plan's acceptance list shows, per criterion, a tick with the command or file that proves it, or an open box with the reason. The runbook's "Rehearsal record" is filled in and `evals/rehearsal-2026-10-10.md` is committed with aggregates only.

## Context / current state

- `main` at `bb56a9a`. M1–M4 and the M5 runner and adapter are merged. Only AC16 and AC17 are ticked.
- PR #11 is closed; its content landed as #33 (`3062ce1`, "Port #11: run logs, TRANSCRIPT.md, thinking in logs, parse info, withheld files").
- M0's `evals/baseline-public-8.md` was never written; `evals/baseline-final-dev.json`, `baseline-quick-dev.json` and `baseline-final-dev-k3.json` supersede it.
- The case agent runs only on Anthropic models (`src/agent/models.ts`). The judge can run on the Cursor SDK (`cursor:<id>`, `CURSOR_API_KEY`).

## Requirements

1. M0 and PR #11 recorded as closed in the master plan, with the superseding evidence.
2. Every AC in the master plan either ticked with evidence or left open with a one-line reason.
3. AC13 rehearsal run per the runbook block (25 cases: holdout + 14 unseen public cases), aggregates only, judged with the Cursor judge.
4. AC10 measured on `cases/public-cuts` at k = 3 with the Sonnet agent and the Cursor judge.

## Non-goals

- Any change to agent behaviour, prompts or tools.
- Opening holdout case folders, answers or grades (practice 04, 09, 14, 19, 22; public 031, 036, 041, 045, 048, 050).
- Making the repo public, recording the demo, filling `SUBMISSION.md` (Marc's human steps).

## Constraints / invariants

- All grading uses the Cursor judge (`--model cursor:<id>` / `--judge-model cursor:<id>`); the agent stays on `claude-sonnet-5-5`, because the rehearsal must measure the system that runs at 16:30.
- The rehearsal runs alone, so its rate-limit retry count is not inflated by other batches.
- `runs/rehearsal*` is not committed (holdout outputs); only the aggregate file is.

## Proposed approach

Three parallel lanes: (A) the rehearsal and then the AC10 k = 3 run, in the main session; (B) a subagent mapping AC3–AC9 and AC18–AC20 to named tests and committed dev-run evidence (no LLM runs); (C) a subagent running AC2 (crash fallback), AC15 (judge-directed text grep), the submission check and the cold-clone reproduction.

## Implementation plan

1. Rehearsal: runbook block with `--deadline` 15 minutes out, `pnpm eval --summary-only --model cursor:…`. Prove by: `Done in` line, decisions 25/25, retry line, aggregate score line.
2. AC10: `pnpm loop --profile cursor --model claude-sonnet-5-5 --thinking medium --split dev --only <25 public-cuts ids> --k 3`. Prove by: summary with mean, required-met, critical, prohibited, escalation P/R, pass^3.
3. Lane B report: per AC, test name + `pnpm test -- <file>` output, or run-folder evidence.
4. Lane C report: commands and outputs for AC2, AC15, `check.sh`, cold clone.
5. Update the master plan (Progress, AC boxes, Discoveries, Decision log), the runbook record, `evals/rehearsal-2026-10-10.md`; `pnpm verify`; PR.

## Acceptance criteria

- [x] Rehearsal record table has no placeholder cells; `evals/rehearsal-2026-10-10.md` exists with aggregates only.
- [x] AC10 numbers recorded in Discoveries with the run folder.
- [x] Each master-plan AC box is ticked with evidence or open with a reason.
- [x] M0 and PR #11 closed in Progress.

## Verification

- [ ] `pnpm verify` exits 0.
- [ ] `rg -n "_N/25_|_mm:ss|_pending_" .claude/skills/reality-test-run/SKILL.md` returns nothing.
- [ ] `bash .claude/skills/submission-check/scripts/check.sh`: no new FAIL beyond Marc's human steps.

## Progress

- [x] (2026-10-10 13:24 BST) Plan written; lanes A, B, C started.
- [x] (2026-10-10 13:27 BST) Lane A rehearsal: 25/25 in 75 s, 0 retries, Cursor judge mean 94.2, 0/25 critical.
- [x] (2026-10-10 13:32 BST) Lane A AC10: mean 82.4, required-met 80.2 % (below 90 %), 0 critical, escalation P/R 1.00/1.00.
- [x] (2026-10-10 13:32 BST) Lanes B and C reported. Ticked AC1–AC4, AC7, AC9, AC12, AC13, AC15, AC19, AC20. AC5, AC6, AC8, AC10 and AC18 are partial and AC11 is not re-run (reasons inline in the master plan). AC14 is Marc's human steps. README prerequisites now name poppler and `pnpm verify`.

## Discoveries

- Observation: the master plan's AC2 recipe ("replace `history.md` with binary garbage") does not crash: `parseHistory` finds no event anchors and keeps the bytes as preamble, so the agent would receive them. `chmod 000` does crash and exercises the fallback. Evidence: `loadCase` on the garbage copy returned `cutoff 0 totalEvents 0 inputs history.md:3887`.
- Observation: AC3's "047 cut at event 7" was wrong: the other-property email is event 010, and the cut-7 test asserts no mismatch yet.
- Open follow-ups (judgement work, not started): required-met 80.2 % on public-cuts; the lowest cases are 038, 019, 047-three-chases, 008 and 025. AC6: the agent closes 040 in only 2 of 6 final runs. AC18: `approve_quote` has no emergency path and the assign emergency exemption is untested.

## Decision log

- Decision: the agent stays on Claude for the rehearsal and AC10; only grading uses the Cursor key. Rationale: Marc asked for evals on the Cursor key; the agent has no Cursor backend, and a rehearsal on a different agent model would not measure the 16:30 system. Date/Author: 2026-10-10 13:30, Claude for Marc.
- Decision: the rehearsal runs now rather than at 15:15. Rationale: Marc asked to start; any later behaviour change can be re-rehearsed with the same commands. Date/Author: 2026-10-10 13:30, Claude for Marc.
