---
title: M5 eval gaps and judgement fixes
status: active
last_updated: 2026-10-10
category: plan
---

# M5 eval gaps and judgement fixes

Parent: [dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md) (AC6, AC10, AC11; Verification). Follows [M5-acceptance-and-rehearsal-closeout-plan.md](M5-acceptance-and-rehearsal-closeout-plan.md), whose open follow-ups this plan picks up.

## Goal

Close the eval-suite gaps found in the 13:30 test-case review, re-measure the practice cases on current code (AC11) and under tool chaos, and make general judgement fixes for the lowest-scoring dev public-cuts, all before the 16:30 freeze.

## User-visible outcome

- Escalation precision and recall are measured against labelled positives and negatives from the practice set, not one case.
- Practice cases carry deterministic checks for the prohibited actions a single tool call decides, so `pnpm checks` and `pnpm loop --no-judge` catch them without a judge.
- AC11 has fresh numbers; a chaos run on dev shows the failure-recovery rate and zero critical failures, or names the cases that break.
- The lowest dev public-cuts (038, 019, 047-three-chases, 008, 025) and the 040 close rate are investigated, with general fixes where the cause is a policy gap.

## Context / current state

- `main` at `1083c00` (M5 close-out merged). AC10 on public-cuts at k = 3: mean 82.4, required-met 80.2 %, 0 critical, escalation P/R 1.00/1.00 over one positive case (024-gas).
- `cases/practice/*` has no `checks.json` and no escalation labels; only the two global checks run on them. Only 06 and 10 have scripted tool failures.
- The loop reads an escalation label from `checks.json` `expect.escalate` or `expected.json` `escalate` (`src/eval/loop.ts`), so labels need no code change.
- Practice runs from the dev-final runs at 11:44 and 11:46 (k = 2) are committed under `runs/loop/` and can be re-checked with `pnpm checks` at no cost.
- The master plan has uncommitted edits from a parallel session (AC4, AC5, AC18). This plan edits only AC6, AC10, AC11 lines and appends to Progress, Discoveries and the Decision log.

## Requirements

1. Every dev practice case has a `checks.json` with `expect.escalate` (`yes`, `no` or `either`) derived from its rubric.
2. Checks are added only where one tool call (or its absence) decides a rubric item; anything needing judgement stays with the judge.
3. A unit test fails if any practice `checks.json` is malformed or names a tool outside the toolset, as the public-cuts test does.
4. New critical and prohibited checks produce no false positives on the committed practice runs, or the false positive is explained and the check downgraded.
5. AC11: dev practice cases re-run on current code with the 16:30 agent (`claude-sonnet-5-5`, thinking medium) and graded by the Cursor judge.
6. One chaos run (`--chaos 0.15`) over the dev split, checks only.
7. Judgement fixes are general (policy text or a deterministic guard), never tuned to one case's wording, and are measured on dev only.

## Non-goals

- Opening holdout transcripts, answers or grades, or adding files to holdout case folders (practice 04, 09, 14, 19, 22).
- Opening the five public cases used nowhere (032, 033, 035, 039, 043): they stay the last clean check after the freeze candidate.
- New case-specific checks on the 14 public-cuts without them (judgement items, the judge is the right grader).
- More scripted tool failures (chaos covers them).
- Changes to `src/agent/caseAgent.ts`, `src/run.ts` or the `Decision` schema (plan-mode files).

## Constraints / invariants

- `cases/splits.json` is frozen; no case moves between splits.
- Grading uses the Cursor judge; the agent stays on `claude-sonnet-5-5` (M5 decision).
- No text addressed to a judge or grader in any case, check or prompt.
- Behaviour work stops at 15:30 whatever its state, leaving time for a re-rehearsal before the freeze.

## Proposed approach

Labels and checks first (cheap, no model calls, validated against committed runs). Then the AC11 run and the chaos run, in sequence so neither inflates the other's rate-limit retries. In parallel with the runs, read the dev grades of the lowest public-cuts to find shared causes; fix only causes that recur across cases.

Label rule: `yes` when a required outcome or the checks require handing the case to a human; `no` when the rubric's path is routine and escalation would be over-escalation; `either` otherwise.

## Implementation plan

1. Write `cases/practice/<NN>/checks.json` for all 22 cases. Prove by: `pnpm checks --cases cases/practice --answers <run>` loads every file (no `CHECK SPEC` error).
2. Extend the unit test so practice `checks.json` files are validated like public-cuts ones, and every practice case has an `expect.escalate` label. Prove by: `pnpm test -- src/eval/publicCuts.test.ts` green.
3. Run `pnpm checks` against the three committed practice runs. Prove by: output table; every critical or prohibited failure is either a real agent failure (recorded in Discoveries) or the check is fixed.
4. AC11: `pnpm loop --profile cursor --model claude-sonnet-5-5 --thinking medium --split dev --only <17 dev practice ids>`. Prove by: summary line with mean, critical count and escalation P/R.
5. Chaos: `pnpm loop --profile cursor --model claude-sonnet-5-5 --thinking medium --split dev --chaos 0.15 --no-judge`. Prove by: summary line with failure-recovery rate and critical count.
6. Read failing required items for 038, 019, 047-three-chases, 008, 025 and 040 in the AC10 run (`runs/loop/dev-cursor-k3-2026-10-10T12-26-11-138Z`). Group by cause. Prove by: a cause table in Discoveries.
7. For each cause shared by two or more cases, make a general fix in the maintenance policy or an ops guard, with a unit test where it is a guard. Prove by: `pnpm loop … --only <affected ids> --k 3` against the AC10 numbers for those cases; keep the fix only if required-met rises and no critical appears.
8. Update the master plan (AC6, AC10, AC11, Progress, Discoveries, Decision log); `pnpm verify`; PR.

## Acceptance criteria

- [x] 17 dev practice `checks.json` files, each with `expect.escalate`: 4 `yes` (01, 08, 10, 16), 4 `no` (05, 07, 18, 21), 9 `either`. Holdout cases carry none (Decision log).
- [x] `pnpm test -- src/eval/publicCuts.test.ts` fails on a malformed practice `checks.json` (bad label and unknown tool: 2 failed) and passes on the committed files (149 passed).
- [x] `pnpm checks` on the committed practice runs: 17/17 dev cases pass every new check, 0 critical or prohibited failures, so no false positives to explain.
- [x] AC11 numbers recorded in the master plan with the run folder; escalation P/R 1.00/1.00 over 26 labelled runs in the full dev run (8 from practice alone).
- [x] Chaos run recorded: 0 critical, recovery 53/53; the one escalation against a `no` label (014) is a correct response to an injected double failure.
- [x] Each judgement fix kept on k = 3 evidence, recorded in the Decision log.

## Verification

- [x] `pnpm verify` exits 0 (30 files, 488 tests).
- [x] `pnpm checks --cases cases/practice --answers runs/loop/dev-final-2026-10-10T11-44-17-482Z/cases-practice` prints results for every case and no `CHECK SPEC` error.
- [x] `pnpm loop` summary lines for steps 4, 5 and 7 quoted in Progress.
- [ ] `bash .claude/skills/submission-check/scripts/check.sh`: no new FAIL.

## Progress

- [x] (2026-10-10 13:45 BST) Plan written.
- [x] (2026-10-10 13:50 BST) Steps 1–3: `checks.json` for the 17 dev practice cases, practice test block in `publicCuts.test.ts`; `pnpm checks` on the 11:44 practice run: 17 evaluated, 0 critical/prohibited failures.
- [x] (2026-10-10 14:00 BST) Step 4, AC11 on `1083c00`: `Coverage 17/17 decided · 17 judged · mean 93.5 · critical in 0` / `pass@1 0.76 · esc P/R 1.00/1.00 over 8 labelled run(s) · inject 0/1 · recovery 3/3 · checks 66/66`. Run `runs/loop/dev-cursor-2026-10-10T12-39-48-744Z`.
- [x] (2026-10-10 14:00 BST) Merged `origin/main` (PR #36, AC18 emergency approval path) before the policy edits.
- [x] (2026-10-10 14:05 BST) Steps 6–7: five policy rows in `src/agent/maintenance/maintenance-policy.md`. k = 3 on the six affected cuts: `Coverage 6/6 decided · mean 78.3 · critical in 0` / `pass@1 0.33 · pass^3 0.33 · stable 2/6 · checks 48/48`; baseline for the same six 64.5 (required 57 % → 76 %). Run `runs/loop/dev-cursor-k3-2026-10-10T12-40-56-673Z`.
- [x] (2026-10-10 14:10 BST) Step 5, chaos: `Coverage 48/48 decided · 0 judged · critical in 0` / `pass@1 1.00 (pass by checks) · esc P/R 0.83/1.00 over 26 labelled run(s) · inject 0/2 · recovery 53/53 · checks 154/154`. Run `runs/loop/dev-cursor-2026-10-10T12-43-45-688Z`.
- [x] (2026-10-10 14:10 BST) Full dev regression on the new policy (after re-grading 034): `Coverage 48/48 decided · 48 judged · mean 91.1 · critical in 0` / `pass@1 0.73 · esc P/R 1.00/1.00 over 26 labelled run(s) · inject 0/2 · recovery 9/9 · checks 154/154`; practice 94.4, public-cuts 86.8 (required 86.7 %), public examples 100. Run `runs/loop/dev-cursor-2026-10-10T12-43-45-642Z`.
- [x] (2026-10-10 14:10 BST) Step 8: master plan AC6, AC10, AC11, Progress, Discoveries, Decision log updated.

## Discoveries

Recorded in the master plan's Discoveries (14:10 entries): the four shared causes behind the weakest cuts, 008's missing provider panel, the chaos precision reading, and the Cursor judge's occasional malformed JSON.

## Decision log

- Decision: holdout practice cases (04, 09, 14, 19, 22) get no `checks.json`; the test skips the holdout ids in `cases/splits.json`. Rationale: the master plan's constraint is that holdout cases are never read, cut, mutated or tuned on, and adding a file to their folders is a mutation. The first version of this plan added them; they were removed from the working tree at about 14:10 and that removal is kept. Date/Author: 2026-10-10 14:15, Claude for Marc.
- Decision: checks that can misfire on a legitimate path are `required` (reported, never zeroing), not `critical`. Example: case 01 accepts a P1 escalation or an emergency job, which one `tool_called` check cannot express. Rationale: a false critical zeroes a correct run and would mislead tuning. Date/Author: 2026-10-10 13:45, Claude for Marc.
