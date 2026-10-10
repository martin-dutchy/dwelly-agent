---
title: Reality Test readiness fixes (12:30 rules review)
status: active
last_updated: 2026-10-10
category: plan
---

# Reality Test readiness fixes

Parent: [dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md). Source: a review of the organisers' rules guide (§5, §6C/D, §9, §11, §13, §16) against our run outputs at 12:30 BST.

## Goal

Close the gaps between what the rules ask the outputs to show and what our runs produce, before the 16:30 freeze, without redesigning anything.

## User-visible outcome

For every case, `REASONING.md` shows exactly what the agent received and pairs every tool result with the call that produced it. Every batch run ends with an honest operational-value line and writes a run summary next to the answers. The judgement fixes are chosen from a fresh run on current code, not from stale findings.

## Context / current state

- Rules §6C: a reader must be able to tell what the system received, what it did, what it decided, what it escalated, what failed and the final result. §11: Claude-based judges read these outputs. §13: misleading evaluation artefacts are prohibited. §16: include traces and logs.
- `renderReasoning` in `src/agent/report.ts` prints tool calls and then tool results in arrival order, without the tool name. With parallel calls, results land under the wrong call. In `runs/loop/dev-final-2026-10-10T10-57-57-975Z/cases-public-cuts/002-quote-approval/REASONING.md`, `schedule_follow_up` appears to return a validation error that belongs to `record_work_result`.
- "What the system received" lists only `c.inputs` (for organiser cases: `history.md` and its length). It omits the case details from `index.md`, the cut point and which attachments were read or missing.
- §1 and §9 (real-world applicability, 7 pts): the README reports cost per case only. Dwelly's published figures (`research/dwelly-company.md`): about 6–7 human minutes per action and about 3 minutes per escalation.
- About 15 commits landed 12:00–12:20 (M1 gates, `set_visit` confirmation, verified waits). No eval has run on that code. Chaos (`--chaos`) has no committed run.

## Requirements

1. **R1 Trace pairing.** Each tool result in the `REASONING.md` trace is rendered directly under the call with the same `toolCallId`, and names the tool. Results with no matching call are still rendered, labelled with their tool name.
2. **R2 Inputs received.** "What the system received" lists the case brief or details (with size), the cut point for organiser cases (events shown, out of total), every input file, and the attachments that history references but are not in the folder. Everything comes from data the loader already has; nothing invented.
3. **R3 Operational value.** The batch summary prints one line: autonomous cases, escalated cases, verified actions, agent cost and seconds per case, and an estimated human-minutes figure with its assumption printed in the line. The constants are named and cite `research/dwelly-company.md`.
4. **R4 Run summary file.** `pnpm cases` writes `<out>/RUN_SUMMARY.md` (per-case table, the "Done in" line, the value line). The runbook's ANSWERS count checks count directories, so this file doesn't break them.
5. **R5 Fresh baseline.** The dev split is run on current `main` before any judgement change; judgement work is scoped from that result.
6. **R6 Failure recovery evidence.** One dev run with `--chaos 0.15`; results summarised in the master plan's Discoveries.
7. **R7 Judgement fixes.** Only general failure classes seen in the fresh run (for example confirming a date the parties dispute), enforced in code where code can check them, each with a test.
8. **R8 Submission.** README results table refreshed at 15:45; the repository is made public only with Marc's explicit go-ahead.

## Non-goals

- New agents, UI, or voice work.
- Prompt changes tuned to one practice case.
- Any change to `ANSWERS/` (does not exist yet; generated at 16:30).

## Constraints / invariants

- AGENTS.md non-negotiables apply, in particular 2 (verified ledger), 4 (no judge-directed text) and 8 (independent review of diffs touching `src/run.ts` or `src/agent/caseAgent.ts`).
- The value line is an estimate and says so; the assumption is printed with the number. No measured-looking figure without a source.
- Holdout transcripts stay unopened.

## Proposed approach

Three parallel lanes:

| Lane | Owner | Files | Depends on |
|---|---|---|---|
| A: renderer (R1, R2) | subagent, own worktree | `src/agent/report.ts`, a new `src/agent/report.test.ts` | nothing |
| B: value and run summary (R3, R4) | subagent, own worktree | new `src/agent/runValue.ts` + test, a minimal hook in `src/run.ts`, README, `reality-test-run` runbook | nothing |
| C: evals and judgement (R5, R6, R7) | main agent | eval runs; then policy hooks or tools as scoped | R5 before R7 |

Lanes A and B merge to `main` through PRs after `pnpm verify` and an independent review. Lane C reruns the dev split after A and B merge, which doubles as their behaviour check.

## Implementation plan

1. Lane C: `pnpm loop --split dev` on `e252aa7`. Prove by: `evals/latest-final-dev.json` timestamp and the run folder.
2. Lane A: pair results by `toolCallId`; extend the received section. Prove by: `pnpm test -- report` passes new tests that fail on the current renderer (parallel-call fixture; organiser case with a cut and a missing attachment).
3. Lane B: pure `operationalValue(rows)` function plus test; `run.ts` prints it and writes `RUN_SUMMARY.md`; README "Results" gets a value paragraph; runbook count commands use `find ANSWERS -mindepth 1 -maxdepth 1 -type d`. Prove by: unit test, and a one-case `pnpm cases` run showing the line and the file.
4. Lane C: `pnpm loop --split dev --chaos 0.15 --seed 1`. Prove by: summary line and per-case `failed` counts; any crash or `NO DECISION` is a defect.
5. Lane C: for each general failure class in steps 1 and 4, a code rule or tool guard with a test, then `pnpm loop --split dev --only <ids>`.
6. Merge A and B, rerun the dev split, update the master plan Progress/Discoveries, refresh the README table at 15:45.

## Acceptance criteria

- [ ] AC1 Given an assistant message with two parallel tool calls whose results arrive in reverse order, the rendered trace shows each result directly under its own call, prefixed with the tool name.
- [ ] AC2 Given an organiser-format case cut at event 12 of 20 with one referenced-but-missing attachment, "What the system received" lists the case details, "events 1–12 of 20" and the missing attachment by name.
- [ ] AC3 `pnpm cases --in cases/practice --out /tmp/rr --only 03` prints a value line containing "estimate" and the per-action and per-escalation minute assumptions, and writes `/tmp/rr/RUN_SUMMARY.md`.
- [ ] AC4 The dev split run on current `main` has decisions 48/48 and no `CRASH` row; the chaos run has no `CRASH` or `NO DECISION` row.
- [ ] AC5 Each judgement fix adopted has a unit test that fails before and passes after, and the targeted dev cases do not regress against the fresh baseline.
- [ ] AC6 `bash .claude/skills/submission-check/scripts/check.sh` shows no new FAIL.

## Verification

- [ ] `pnpm verify` exits 0 on each lane and after merge.
- [ ] `pnpm test -- report` and `pnpm test -- runValue` (AC1–AC3).
- [ ] `pnpm loop --split dev` and `pnpm loop --split dev --chaos 0.15 --seed 1` (AC4, AC5); outputs quoted in the master plan Discoveries.
- [ ] `/code-review` on lane B's diff (touches `src/run.ts`).
- [ ] `bash .claude/skills/submission-check/scripts/check.sh` (AC6).

## Progress

- [x] (2026-10-10 12:35 BST) Plan written; dev rerun on `e252aa7` started. Lanes A and B spawned in their own worktrees.
- [x] (2026-10-10 12:37 BST) R5: final-profile dev run on `e252aa7`: 48/48 decided, mean 87.6, 0 critical (`runs/loop/dev-final-2026-10-10T11-35-43-266Z`). The default `pnpm loop` profile is `quick` (Haiku agent); baselines for the Reality Test must use `--profile final`.
- [x] (2026-10-10 12:40 BST) R6: chaos run (`--chaos 0.15 --seed 1`, final profile): 48/48 decided, recovery 47/47, 7 critical hits, all `no_fabricated_ids` false positives (see Discoveries). Fixed in PR #23.
- [x] (2026-10-10 12:42 BST) R7 first fix: landlord reachable via the agency record in organiser cases (PR #23). Weekday/date contradiction hint delegated to a third worktree lane.
- [ ] Lanes A (renderer) and B (value line, RUN_SUMMARY.md) to merge; then a full final-profile dev rerun.

## Discoveries

- Observation: in organiser-format cases `get_property` returned only an address, so the agent concluded it had no way to reach the landlord and escalated or deferred the landlord ask (014, 019, 038 at 11:35; 002, 006, 019, 024, 037 at 10:57). Evidence: `grep -l "no landlord contact" runs/loop/dev-final-*/*/*/ANSWER.md`. After seeding `contact: agency landlord record`, 12 targeted cases went from mean 76.1 to 87.0 with no such answer (`runs/loop/dev-final-2026-10-10T11-39-35-820Z` in the `marc/landlord-seed` worktree).
- Observation: under chaos a silently dropped write returns an id that the read-back cannot find; the agent retries and reports "ESC-105 not applied; retried and verified as ESC-106". The `no_fabricated_ids` check counted only ledger refs and flagged this honest report as critical in 7 of 48 cases. Evidence: `runs/loop/dev-final-2026-10-10T11-38-37-729Z/cases-practice/03/result.json` ledger A6 evidence; re-check after the fix passes all 7.
- Observation: remaining low scorers after the fix (038, 008, PM 003, 040) miss case-specific detail (who pays for disposal, sending scope to a second contractor, forwarding an invoice and closing). Not tuned, per AGENTS.md.

## Decision log

- Decision: the human-minutes estimate uses Dwelly's published figures (6.5 min per action, 3 min per escalation) and prints them with the number. Rationale: §1 asks for measurable value and §13 forbids fabricated results; a sourced, labelled estimate satisfies both. Date/Author: 2026-10-10 12:35, Claude for Marc (assumption; Marc to confirm).
- Decision: making the repository public is left to Marc. Rationale: irreversible visibility change. Date/Author: 2026-10-10 12:35, Claude.
