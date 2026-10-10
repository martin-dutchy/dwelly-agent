# M5 (runner half): time budget, resumable runs, rate-limit guidance, 15:15 rehearsal

Status: approved by Marc 12:06 BST (see Decision log) · Shape: default plan · Owner: Marc · Written 2026-10-10 12:15 BST by Claude for Marc · Window: pure modules from 12:45 in parallel; `run.ts` wiring 13:30 to 15:00 after PR #11 lands (13:00 to 13:30); rehearsal 15:15.

Parent: [docs/plans/dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md) (M5 row, AC1, AC2, AC13, section 6 "Time fallback at 16:50" and the 15:15 scope-ladder row). Runbook this plan must match: [.claude/skills/reality-test-run/SKILL.md](../../.claude/skills/reality-test-run/SKILL.md) (section "Runner flags still to come" and "Rehearsal record"). Sibling: the adapter half, [docs/plans/M5-organiser-api-adapter-plan.md](M5-organiser-api-adapter-plan.md). Conventions: `AGENTS.md`, `docs/plans/README.md`.

---

## Open questions for Marc

Each has a recommended default; if Marc accepts the defaults, the plan is executable as written. Answers go in the Decision log.

| # | Question | Recommended default |
|---|---|---|
| Q1 | PR #11 (Martin's run logs and traces, draft, conflicts with `main` in 5 files): land it before the runner flags, and who does the rebase? | Yes, land it first. Marc rebases `origin/claude/submission-logging-traces-002cf5` onto `main` **after M1 merges**, resolves the conflicts, runs `pnpm verify` and `/code-review`, and merges by **13:30**. Fallback time: **13:45** (see "Dependency on PR #11"). |
| Q2 | Is resuming the default, or an explicit flag? | Explicit `--resume`, off by default. A default-on resume would silently keep stale answers when a developer re-runs into the same `--out` after a code change. The runbook's re-run commands add `--resume`. |
| Q3 | `--budget-min` counts from the start of the run, but the runbook's hard stop is a clock time (16:50). Add `--deadline HH:MM` as well? | Yes. `--deadline 16:50` is what the runbook uses; `--budget-min` stays for rehearsals and the master plan's AC1 command. If both are given, the earlier one wins. |
| Q4 | What do cases that never started before the deadline get? | The runner writes an honest "not processed within the run's time budget, escalated (system failure)" `ANSWER.md`, `REASONING.md` and a `result.json` with `skipped: "budget"`. Coverage is scored and the master plan says "rather than nothing". `--resume` re-runs them if time is left. |
| Q5 | Adapt concurrency automatically when 429s appear? | No. Print the retry count and a recommended `--concurrency` for the next run at the end of the batch. Adaptive concurrency is new control flow in the one file that must never fail. |
| Q6 | Rehearsal set size: the master plan says "holdout plus 10 public cases" (21 cases), but AC13 says 25. | 25: the 11 holdout cases plus **14** eligible public cases (list below). If Marc prefers 10, use the first 10 of the list and AC13 reads 21/21. |
| Q7 | How are the rehearsal public cases cut? | `--at auto`, which for Property Management cases (no `Recorded action` marker) cuts just before an agency action in the second half of the history. That is the closest thing we have to "cut at a decision point" and is how the dev split runs them. |
| Q8 | Rehearsal profile and critic? | The exact 16:30 configuration: Sonnet agent, `--thinking medium`, `--critic` as decided by the M3 A/B, Jev as configured in `.env`. Judged afterwards with Opus `--summary-only`. |
| Q9 | Starting concurrency for the rehearsal? | 8 (the `final` profile's default). If 429 retries exceed 1 per case, the Reality Test uses 6; above 3 per case, 4. If 0 retries and wall time is under half the budget, keep 8. |
| Q10 | Ctrl-C handling (a clean stop that still writes fallbacks for in-flight and unstarted cases)? | Build it, but it is the first thing cut if behind: with `--deadline`, nobody needs to press Ctrl-C at 16:50. It needs a 3-line `signal` option on `runCase` (plan mode, `/code-review`). |

---

## Goal

Make the 16:37 to 16:55 window mechanical: one command that finishes every case before a clock time, writes an honest answer for every case even when time runs out, can be re-run to fill only the gaps, and tells the operator what concurrency to use next. Then prove it with a timed rehearsal on 25 cases nobody has tuned on.

## User-visible outcome

- `pnpm cases --in "$CASES" --out ANSWERS --at 100% --concurrency 6 --deadline 16:50` finishes by 16:50 whatever happens. Every case folder gets `ANSWER.md`, `REASONING.md`, `trace.jsonl` (when the agent ran) and `result.json`.
- Cases still running at the deadline are aborted and get the agent's own fallback answer with whatever verified actions it took; cases that never started get the "not processed within the time budget" answer. Both are escalations stated as system failures, never invented decisions.
- `pnpm cases ... --resume` skips every case whose folder already holds a complete decided run and re-runs the rest (crashed, timed out, budget-skipped, missing).
- The final lines of every run read, for example: `Done in 412s · total cost $3.10 · decisions 25/25 · resumed 0 · budget-skipped 0` and `Rate-limit retries: 7 across 4 cases (max 3 in one case) at concurrency 8 · next run: keep --concurrency 8`.
- The runbook's "Runner flags still to come" section is deleted and its run commands use the new flags.

## Context / current state (main at 46a0dc6, 12:15 BST)

- `src/run.ts` (main): `parseArgs` flags `--in --out --only --concurrency --model --thinking --timeout --at --chaos --seed`; a worker pool of size `--concurrency`; `processCase()` loads, prescreens, runs `runCase()` with `timeoutMs = --timeout × 1000` (default 300 s), writes the four files; a `catch` writes the "escalated (system failure)" fallback `ANSWER.md` and `REASONING.md` (no `result.json`); a final `console.table` and a `Done in … · decisions N/M` line. Files are written only when a case ends, so an interrupted re-run leaves the previous files intact.
- `src/agent/caseAgent.ts` `runCase()`: a `setTimeout(() => agent.abort(), timeoutMs)` around the first prompt and the one-shot "You must now call submit_decision" nudge; transient errors (429, 5xx, overloaded) are retried up to 6 times with backoff, and each retry pushes `{ type: 'retry', attempt, delayMs, error }` onto the trace. The runbook already counts them with `grep -c '"type":"retry"'`.
- **PR #11** (draft, Martin, commit e5978db, branch `origin/claude/submission-logging-traces-002cf5`) changes `run.ts`: `run.log` mirroring every console line, `run.json` manifest (git commit, args, models), `RUN.md` index table, `TRANSCRIPT.md` per case, `result.json` gains `thinking`, `totalEvents`, `inputs`, `withheld`, `usage.thinkingTokens`, and **the crash path now also writes `result.json` with `crashed: true`**; rows gain `severity` and `escalated`; `--thinking` accepts `off|minimal|low|medium|high|xhigh|max`. In `caseAgent.ts` it only timestamps trace events. It conflicts with `main` in `src/run.ts`, `src/agent/cases.ts`, `src/agent/publicCases.ts`, `src/eval/judge.ts`, `src/eval/loop.ts`.
- `src/eval/loop.ts` spawns one `run.ts` per split group **in parallel**, each with its own `--concurrency`, so a `pnpm loop` wall time is not the wall time of one `pnpm cases` batch. The rehearsal therefore runs one `pnpm cases` batch over a prepared folder (below), not `pnpm loop`.
- `src/agent/cases.ts` `listCases()` uses `statSync(...).isDirectory()`, which follows symlinks, so a folder of symlinks to case folders works as `--in`. `defaultAt(dir)` is path-based (`auto` only under `HackatonPublicCases/` or `public-cuts/`), so a rehearsal folder under `runs/` must pass `--at auto` explicitly.
- `runs/` is git-ignored. The master plan's "aggregate line committed to `runs/scorecard.md`" cannot be committed there; this plan records it in the runbook's "Rehearsal record" table and in `evals/rehearsal-2026-10-10.md` instead.
- Concurrent work: M1 edits `caseAgent.ts`, `opsTools.ts`, `systemPrompt.ts`; M3 adds `--critic` to `run.ts` and `loop.ts`; M4 edits `loop.ts` and `judge.ts`. This plan's `run.ts` changes are confined to argument parsing, the pool and the end-of-run summary, and the new logic lives in pure modules under `src/runner/`.

### Dependency on PR #11

The runner flags are written **on top of PR #11**: both rewrite the end of `run.ts` (summary lines, `RUN.md`, `run.json`), and #11's crash `result.json` is what lets `--resume` tell a crash from a finished case without guessing.

- **Plan of record:** 13:00 to 13:30, after M1 merges, Marc rebases #11 onto `main`, resolves the five conflicts (keep `main`'s M0b loader changes in `cases.ts` and `publicCases.ts`, keep `main`'s `loop.ts` profiles and add #11's `--thinking` passthrough, keep M1's validators in `caseAgent.ts` and add #11's `ts` field), runs `pnpm verify` and `/code-review` (it touches `run.ts` and `caseAgent.ts`), and merges. Runner-flag work starts from that merge commit.
- **Fallback at 13:45:** if #11 is not on `main` by 13:45, the flags are built on `main`'s `run.ts` as it stands. `--resume` then treats a folder without `result.json` as incomplete (true on `main`: crashes write no `result.json`), and the budget-skip fallback writes its own `result.json`. #11 is parked until after 17:00, or rebased on top of the flags only if it can be green by 15:00; it never merges after the 15:15 rehearsal, because the rehearsal must run the code that runs at 16:30.

## Requirements

1. **R1 Global time budget.** `--budget-min M` sets a deadline M minutes after the run starts; `--deadline HH:MM` sets it at that local clock time today (exit 1 with a message if it has already passed); the earlier wins. Without either, behaviour is unchanged.
2. **R2 Per-case timeouts scale to the budget.** With a deadline, each case's timeout is `min(base, deadline − now − 20 s)` where `base = min(--timeout, max(90 s, 2 × budget × concurrency / N))`. A case is not started when less than 60 s would remain; it is budget-skipped (R3).
3. **R3 Honest output for every case.** A budget-skipped case gets `ANSWER.md` ("escalated (system failure): not processed within the run's time budget; a human must handle it"), `REASONING.md` (the deadline, the time it was skipped, the flags), and `result.json` `{ id, skipped: "budget", deadline, error }`. A case aborted by its clamped timeout produces the existing "escalated (system fallback)" answer with its verified ledger, as today. The batch never aborts and the process exits 0.
4. **R4 Aborts are bounded.** A case whose timeout fires returns from `runCase` within 10 s: the "you must submit" nudge must not run after an abort (today it can, and it runs outside the timer). Verified by test; fixed in `caseAgent.ts` if the test fails.
5. **R5 Resumable runs.** With `--resume`, a case is skipped when its out folder has `ANSWER.md`, `REASONING.md` and a `result.json` that parses, has a non-null `decision`, and has neither `crashed` nor `skipped`. Skipped cases appear in the table as `resumed` with the outcome read from `result.json`, and count towards `decisions N/M`.
6. **R6 Rate-limit visibility.** The runner counts trace `retry` events per case in-process, writes `retries` into `result.json.usage`, and prints the total, the cases affected, the maximum per case, and the recommended `--concurrency` for the next run (rule in Q9). With PR #11, the same numbers go into `run.json` and `RUN.md`.
7. **R7 Clean stop (cut first).** The first SIGINT sets the deadline to now: in-flight cases are aborted through a new `signal` option on `runCase` and write their fallback; unstarted cases are budget-skipped; the table and summary print; exit code 130. A second SIGINT exits immediately.
8. **R8 Rehearsal.** At 15:15, 25 unseen cases run as one batch with the 16:30 configuration and finish in 15 minutes or less with 25/25 decisions; aggregates only.

## Non-goals

- Adaptive concurrency, a job queue, or retrying failed cases automatically inside one run (`--resume` is the retry).
- Changing the `Decision` schema, the agent prompt, or the case loaders.
- Reading or summarising holdout outputs per case, at any point.
- The organiser API adapter (sibling plan) and the format converter (already in the runbook).
- Making `pnpm loop` produce a single-batch wall time.

## Constraints / invariants

- `src/run.ts` never aborts the batch (master plan constraint). Every new code path is inside the existing per-case `try/catch` or is a pure function with tests.
- Files are written only at the end of a case, so `--resume` and Ctrl-C never leave a half-written folder that looks complete.
- Nothing in `ANSWERS/` is written by hand; budget-skip answers are written by the runner, which is the submitted system.
- `run.ts` and `caseAgent.ts` changes go through plan mode and `/code-review` before the PR (AGENTS.md rule 8).
- The holdout is never opened: the rehearsal's console output is filtered to aggregate lines, and the judge runs with `--summary-only`.

## Proposed approach

```
src/runner/
  budget.ts           # pure: parseDeadline(budgetMin?, deadlineHHMM?, now) -> Date | undefined
                      #       baseTimeoutMs(timeoutSec, budgetMs, concurrency, n); caseTimeoutMs(base, deadline, now) -> number | 'skip'
  budget.test.ts
  resume.ts           # pure over the filesystem: isComplete(outDir) -> boolean; resumedRow(outDir) -> Row
  resume.test.ts      # tmp dirs
  retries.ts          # pure: retryStats(rows) -> { total, cases, max }; recommendConcurrency(stats, c, n, wallMs, budgetMs) -> string
  retries.test.ts
  runner.integration.test.ts   # spawns `tsx src/run.ts` on tmp folders, no API key needed (see AC2, AC-M5-3, AC-M5-4)
  fallback.ts         # budgetSkipFiles(id, deadline, flags) -> { answer, reasoning, result }; one place for every fallback text
src/run.ts            # flags, pool hook (check before starting each case), clamp, summary lines, SIGINT handler
src/agent/caseAgent.ts  # R4 (no nudge after abort) and R7 (`signal?: AbortSignal`): 5 lines, plan mode
.claude/skills/reality-test-run/scripts/make-rehearsal-set.sh   # builds runs/rehearsal-cases from the list below
```

### Pool change (the heart of it)

```ts
// in the worker loop, before processCase(dirs[idx]):
const t = deadline ? caseTimeoutMs(base, deadline, Date.now()) : base;
results[idx] = t === 'skip' ? writeBudgetSkip(dirs[idx]) : await processCase(dirs[idx], t);
```

`processCase` takes the timeout as a parameter instead of reading `--timeout` directly. With `--resume`, `dirs` is partitioned first into `done` (rows from `resumedRow`) and `todo`; only `todo` goes through the pool, and `N` in `baseTimeoutMs` is `todo.length`.

### Worked numbers

At 16:37 with `--deadline 16:50` (780 s), N = 30, concurrency 6: `base = min(300, max(90, 2 × 780 × 6 / 30)) = 300 s`. The baseline measured about 45 s per case (25 cases in 134 s at concurrency 8), so 30 cases take about 4 to 5 minutes and no clamp fires. The clamp matters only when the API is slow: a case starting at 16:48:30 gets `min(300, 90 − 20) = 70 s`; one starting at 16:49:10 is budget-skipped (under 60 s left).

### Concurrency recommendation rule (Q9)

`perCase = total retries / cases run`. `0` and wall time < 50 % of budget → "keep or raise to c + 2"; `≤ 1` → "keep c"; `≤ 3` → "use max(2, c − 2)"; `> 3` → "use max(2, floor(c / 2)) or set LLM_CONCURRENCY". Printed, never applied.

### Rehearsal set (Q6, Q7)

Eligible public cases are those in none of: the `dev` split (003, 008, 012, 017, 021, 026), the `holdout` split (031, 036, 041, 045, 048, 050), the M2 public-cuts sources (001, 002, 004, 006, 007, 008, 010, 012, 014, 019, 020, 024, 025, 026, 030, 034, 037, 038, 040, 042, 044, 047) and the cases named in the M1 plan (002, 003, 008, 010, 017, 019, 025, 026, 047). That leaves 19: 005, 009, 011, 013, 015, 016, 018, 022, 023, 027, 028, 029, 032, 033, 035, 039, 043, 046, 049.

Ordered by how rarely the research docs that shaped the prompt and tools cite them (`research/eval-inventory.md`, `research/agent-tools.md`, `research/pm-case-data-analysis.md`), the rehearsal takes the first 14:

| Order | Case | Citations in research | Events | Note |
|---|---|---|---|---|
| 1 | 016 | 0 | 26 | |
| 2 | 046 | 0 | 52 | longest eligible history; exercises compaction |
| 3 | 011 | 1 | 32 | |
| 4 | 009 | 2 | 23 | |
| 5 | 013 | 2 | 35 | |
| 6 | 022 | 2 | 23 | |
| 7 | 023 | 2 | 27 | |
| 8 | 018 | 3 | 17 | |
| 9 | 027 | 3 | 17 | |
| 10 | 028 | 3 | 14 | |
| 11 | 049 | 3 | 14 | |
| 12 | 005 | 4 | 37 | |
| 13 | 015 | 4 | 19 | |
| 14 | 029 | 5 | 22 | |

Plus the holdout: practice 04, 09, 14, 19, 22 and public 031, 036, 041, 045, 048, 050. Total 25. The research docs read every public case for pattern analysis, so "never cited" is the strongest unseen-ness available; none of the 14 has been run, cut, mutated or judged in M1 or M2.

`make-rehearsal-set.sh` creates `runs/rehearsal-cases/` with absolute symlinks named by case id (practice ids are two digits, public ids three, so names never collide) and prints `rehearsal set: 25 cases`.

## Implementation plan

New files (`src/runner/*`) can be built by any free implementer from 12:45. Edits to shared files are serialized so two writers never touch the same file at once: `run.ts` goes PR #11 → step 3 → M3 step 4 (`--critic`) → step 5 wiring → adapter step 3 → step 7; `caseAgent.ts` goes M1 → M3 step 3 → step 4 → step 7.

| # | Step | Est. | Window | Prove by (named test or command) |
|---|---|---|---|---|
| 0 | Land PR #11 (Q1): rebase on `main` after M1, resolve 5 conflicts, `pnpm verify`, `/code-review`, merge | 30 min | 13:00 to 13:30 | `git log origin/main --oneline \| grep -i "run logs"` shows the merge; `pnpm verify` exit 0; one practice case run writes `RUN.md`, `run.json`, `TRANSCRIPT.md` |
| 1 | `src/runner/budget.ts` (R1, R2) | 15 min | from 12:45, in parallel (new file) | `pnpm test -- src/runner/budget.test.ts`: `parseDeadline(undefined, '16:50', 16:37)` is today 16:50; `'16:30'` at 16:37 throws "already passed"; both given → earlier; `baseTimeoutMs(300, 780 000, 6, 30) = 300 000`; `(300, 600 000, 6, 60) = 120 000`; floor 90 000; `caseTimeoutMs` returns `'skip'` with 59 s left and `remaining − 20 s` when below base |
| 2 | `src/runner/resume.ts` (R5) | 10 min | from 12:45, in parallel (new file) | `pnpm test -- src/runner/resume.test.ts`: complete folder → true; missing `REASONING.md` → false; `decision: null` → false; `crashed: true` → false; `skipped: "budget"` → false; unparsable `result.json` → false; no `result.json` → false |
| 3 | `src/runner/fallback.ts` and pool wiring in `run.ts` (R1 to R3, R5): flags, partition for `--resume`, clamp, budget-skip writer, summary line with `resumed` and `budget-skipped` | 25 min | 13:30 to 13:55, after step 0 | `pnpm test -- src/runner/runner.integration.test.ts` (offline, below): AC2, AC-M5-3, AC-M5-4 |
| 4 | R4 bounded abort: test first, fix only if red (skip the nudge when the agent was aborted or the deadline passed). Touches `caseAgent.ts`: after M1 and after M3 step 3 | 10 min | 13:55 to 14:05 | `pnpm test -- src/agent/caseAgent.test.ts -t "abort"`: a faux model that never finishes, `timeoutMs: 200`, returns within 2 s with no decision, and no second prompt in `messages` |
| 5 | `src/runner/retries.ts` and the summary lines (R6), plus `run.json` / `RUN.md` fields if #11 landed | 10 min | module from 12:45 in parallel; wiring 14:05 to 14:15 | `pnpm test -- src/runner/retries.test.ts`: the four branches of the rule; `retryStats` over rows with 0, 2 and 5 retries gives `{ total: 7, cases: 2, max: 5 }` |
| 6 | `/code-review` on the diff, `pnpm verify`, merge. Then the adapter plan's step 3 (its `run.ts` wiring, 14:25 to 14:35) | 10 min | 14:15 to 14:25 | `pnpm verify` exit 0; findings fixed or logged |
| 7 | R7 Ctrl-C (cut first, Q10): `signal?: AbortSignal` on `CaseRunOptions` (`opts.signal?.addEventListener('abort', () => agent.abort())`), SIGINT handler in `run.ts` | 15 min | 14:35 to 14:50, only if steps 1 to 6 and the adapter's step 3 are merged (or the adapter was dropped) | `caseAgent.test.ts › signal aborts the case`: a faux model that never finishes and an `AbortController` aborted after 100 ms returns within 2 s with no decision. The SIGINT handler itself needs a live model, so it is proved by hand on dev cases: `pnpm cases --in cases/practice --only 01,02,03,05,06,07 --out runs/m5-sigint --concurrency 2`, press Ctrl-C after the first `✓` line, see `budget-skipped` > 0, exit code 130, and an `ANSWER.md` in every case folder |
| 8 | `make-rehearsal-set.sh` and the runbook update: delete "Runner flags still to come", use `--deadline 16:50` and `--resume` in the run and re-run commands, update the Step 6 adapter text if the adapter landed | 10 min | 14:50 to 15:00 | `bash .claude/skills/reality-test-run/scripts/make-rehearsal-set.sh` prints `rehearsal set: 25 cases`; `rg "still to come" .claude/skills/reality-test-run/SKILL.md` is empty |
| 9 | Rehearsal (R8, AC13), commands below | 15 min wall + 5 min judge | 15:15 to 15:40 | The rehearsal record filled in; `evals/rehearsal-2026-10-10.md` committed |

### Offline integration test (`src/runner/runner.integration.test.ts`)

Spawns `pnpm exec tsx src/run.ts` with `ANTHROPIC_API_KEY=''` and `TYPESAFE_API_KEY=''` set explicitly in the child's environment (dotenv never overrides a variable that is already defined, so the developer's `.env` key is not picked up) and `USE_JEV=0`, on temporary folders, so no billable model call is ever made:

- **AC2 crash:** one organiser-format case whose `history.md` is `chmod 000`. Expect exit 0, a `CRASH` row, `ANSWER.md` containing "escalated (system failure)".
- **Budget skip:** two practice-format cases and `--budget-min 0.5` (30 s, under the 60 s start threshold). Expect both budget-skipped with no model call, both folders with the three files, `result.json.skipped === "budget"`, summary line `budget-skipped 2`, exit 0.
- **Resume:** case A pre-seeded with a complete `ANSWER.md`, `REASONING.md`, `result.json` (`decision` set); case B `chmod 000`. With `--resume`: A is `resumed` and its files are byte-identical afterwards; B is `CRASH`. Without `--resume`: A's row is not `resumed` (with an empty key it ends as `NO DECISION` or `CRASH`), which proves the skip only happens with the flag.

## Rehearsal (15:15, AC13)

```bash
bash .claude/skills/reality-test-run/scripts/make-rehearsal-set.sh          # runs/rehearsal-cases, 25 cases
mkdir -p runs/rehearsal
DEADLINE=$(date -v+15M +%H:%M)                                               # macOS; 15 minutes from now
time pnpm cases --in runs/rehearsal-cases --out runs/rehearsal --at auto --concurrency 8 --deadline "$DEADLINE" \
  2>&1 | tee runs/rehearsal/console.txt | grep -E '^(Running|Done in|Rate-limit retries)'
pnpm eval --cases runs/rehearsal-cases --answers runs/rehearsal --summary-only
```

Aggregates only: the console is filtered to the three summary lines; `runs/rehearsal/console.txt`, `RUN.md` and the case folders are not opened (11 of the 25 are holdout). Record in the runbook's "Rehearsal record" table and in `evals/rehearsal-2026-10-10.md`: cases, decisions, wall time, concurrency, retries total and max, budget-skipped, mean cost per case, judge mean, critical count. The slowest case's time comes from `jq -s 'map(.usage.durationMs) | max' runs/rehearsal/*/result.json` (a number, no case content).

Then, in the same window, a resume drill on the same output: `pnpm cases --in runs/rehearsal-cases --out runs/rehearsal --at auto --resume 2>&1 | grep -E '^(Running|Done in)'` must print `resumed 25` (or `resumed <decided>` plus re-runs of the rest) and finish in under 30 s when nothing is left.

**15:15 scope-ladder fallback** (master plan section 6): if the rehearsal set or the flags are not ready, run `time pnpm loop --profile final --split holdout` alone; its wall time and the retry count from its run folders set `--timeout` and `--concurrency`, and the runbook keeps the `--timeout 300` plus Ctrl-C procedure.

## 16:50 fallback behaviour (what the operator sees)

| Situation at 16:50 | With this plan | Without it (today) |
|---|---|---|
| All cases finished | Nothing to do; commit at 16:55 | Same |
| Some cases still running | Their clamped timeout has already aborted them at or before 16:50; each wrote the fallback answer with its verified ledger | Operator presses Ctrl-C; in-flight cases write nothing; re-run with `--only <ids> --timeout 120` |
| Some cases never started | Budget-skipped with an honest answer; `--resume --deadline 16:53` re-runs them if the operator judges there is time | Operator builds the id list by hand |
| Process killed (laptop, terminal) | `--resume` re-runs only incomplete cases | `--only` by hand |

## Acceptance criteria

- [ ] **AC1 (master plan).** Given N ≤ 30 organiser-format cases, when `pnpm cases --in <dir> --out ANSWERS --budget-min 20` runs, then N case folders each have `ANSWER.md`, `REASONING.md`, `result.json` and (for every case the agent ran) `trace.jsonl`; the table has 0 `CRASH` and 0 `NO DECISION` rows unless the API itself failed; wall time ≤ 20 min. Proved for N = 25 by the rehearsal (AC13) with `--deadline` 15 minutes out.
- [x] **AC2 (master plan).** Given a case whose `history.md` is unreadable, its `ANSWER.md` says escalated (system failure) and the other cases complete. Named test: `runner.integration.test.ts › crash fallback`.
- [ ] **AC13 (master plan).** 25 unseen cases complete in ≤ 15 minutes with 25/25 decisions at the chosen concurrency, and the retry count is recorded in the runbook's Rehearsal record. Command and recording above.
- [x] **AC-M5-1 (R1, R2).** Named test: `budget.test.ts` (all cases listed in step 1).
- [x] **AC-M5-2 (R5).** Named test: `resume.test.ts` (all cases listed in step 2).
- [x] **AC-M5-3 (R3).** Given `--budget-min 0.5` and two cases, then both are budget-skipped, each folder has the three files with `skipped: "budget"`, no model was called, exit 0. Named test: `runner.integration.test.ts › budget skip`.
- [x] **AC-M5-4 (R5).** Given a complete case and `--resume`, then it is not re-run and its files are byte-identical. Named test: `runner.integration.test.ts › resume`.
- [x] **AC-M5-5 (R4).** Given `timeoutMs: 200` and a model that never finishes, `runCase` returns within 2 s with no decision and no nudge prompt. Named test: `caseAgent.abort.test.ts › abort is bounded` (a new file, so the M1 and M3 lanes own `caseAgent.test.ts` undisturbed).
- [ ] **AC-M5-6 (R6).** The summary prints `Rate-limit retries: <total> across <cases> cases (max <max> in one case) at concurrency <c> · next run: <advice>`, and `result.json.usage.retries` equals the case's `"type":"retry"` count in `trace.jsonl`. Named test: `retries.test.ts`; spot check `jq .usage.retries` against `grep -c` on one rehearsal case (a number only).
- [ ] **AC-M5-7 (runbook).** `.claude/skills/reality-test-run/SKILL.md` has no "Runner flags still to come" section; its run command uses `--deadline 16:50`; its re-run step uses `--resume`; its Rehearsal record table is filled with the 15:15 numbers.
- [x] **AC-M5-8 (no regression).** Without the new flags, `pnpm cases --in cases/practice --only 01 --out runs/m5-noflags` behaves as before: same files, same summary line apart from the added `resumed 0 · budget-skipped 0` and the retry line.

## Verification

Run from the repo root and show the output.

- [x] `pnpm verify` exits 0.
- [x] `pnpm test -- src/runner/` passes (AC2, AC-M5-1 to AC-M5-4, AC-M5-6), offline.
- [ ] `pnpm test -- src/agent/caseAgent.test.ts -t "abort"` passes (AC-M5-5).
- [x] Manual AC2 as the master plan words it: `mkdir -p runs/tmp-crash && cp -R "HackatonPublicCases/Property Management/016" runs/tmp-crash/ && chmod 000 runs/tmp-crash/016/history.md && pnpm cases --in runs/tmp-crash --out runs/tmp-crash-out; head -4 runs/tmp-crash-out/016/ANSWER.md; chmod 644 runs/tmp-crash/016/history.md` shows a `CRASH` row and "escalated (system failure)".
- [ ] `pnpm cases --in cases/practice --only 01,02 --out runs/m5-budget --budget-min 0.5; jq .skipped runs/m5-budget/*/result.json` prints `"budget"` twice.
- [ ] Rehearsal commands above, with the three summary lines and the judge's summary pasted into the runbook (AC13, AC1).
- [ ] Resume drill above prints `resumed`.
- [x] `rg "still to come" .claude/skills/reality-test-run/SKILL.md` returns nothing (AC-M5-7).
- [ ] `/code-review` on the diff before the PR (step 6).

## Risks

| Risk | Mitigation |
|---|---|
| PR #11's rebase eats the window | Hard stop at 13:45, then build on `main` (Dependency section). |
| The "you must submit" nudge runs after an abort and ignores the deadline | R4 test written first; the fix is a guard on the nudge. |
| Clock skew or a typo in `--deadline` | Exit 1 if the deadline has passed or is more than 3 hours away; the start line prints the deadline and the computed base timeout. |
| `--resume` keeps a stale answer from an older code version | Off by default; on the Reality Test, `ANSWERS/` starts empty; the start line prints `resuming K of N`. |
| Symlinked rehearsal folder behaves differently from real folders | `listCases` follows symlinks (`statSync`); `--at auto` is passed explicitly; the judge reloads by path with the cutoff from `result.json`. |
| Holdout leakage through the rehearsal output | Console filtered, judge `--summary-only`, no folder opened; the rehearsal is after the last tuning change anyway. |
| Rate limits at 16:30 differ from 15:15 (shared organiser traffic) | Retry line printed live at the end of each run; `--resume` with lower concurrency is the documented next step. |

## Progress

- [x] 12:30 Steps 1, 2, 5 (`src/runner/budget.ts`, `resume.ts`, `retries.ts` with tests), step 3 (`fallback.ts`, pool wiring, `runner.integration.test.ts`), step 4 (R4 test, green without a `caseAgent.ts` change), step 7 (Ctrl-C, run.ts only), step 8 (`make-rehearsal-set.sh` prints `rehearsal set: 25 cases`; runbook updated). Built on `main` 85ed782 (Q1 override). Also wired the M1 case-state hints (`hintsFor`) into `processCase`.
- [x] Live checks: `--only 01,02 --budget-min 3` gives `decisions 2/2`; the same command with `--resume` gives `resumed 2` in 0 s with `ANSWER.md` unchanged; public 017 shows `<case_state_hints>` in `trace.jsonl`, practice 01/02 none; AC2 manual command shows `CRASH` and "escalated (system failure)". Ctrl-C drill on practice 03, 05, 06 at concurrency 1: 03 (running) `CRASH` "stopped by the operator", 05 and 06 `BUDGET SKIP` with `skipped: "interrupt"`, all three folders complete, exit 130.
- [x] 13:20 PR #11 (Martin's run logs) ported onto `main`: `run.log`, `run.json` manifest (command, model, thinking, commit), per-case `TRANSCRIPT.md`, `ts` on every trace event, parse method and withheld files in REASONING, thinking summaries in the condensed trace, `--thinking` validated, `pnpm eval --thinking`. `TRANSCRIPT.md` and `trace.jsonl` write failures are logged and never turn a decided case into a crash. Checked with `pnpm loop --profile cursor` on the port and on `main` ca3bda5 side by side: on the 33 cases the Cursor judge graded in both, 87.6 vs 85.8, 0 critical in either.
- [ ] Step 9 rehearsal at 15:15 (orchestrator).

## Discoveries

- `agent.abort()` in pi-agent-core only aborts the *active* run. If `runCase`'s timer fires while `withRetries` is sleeping between 429 retries, the abort is a no-op and the following `agent.continue()` runs with a fresh controller and no timer. The streaming abort itself is bounded (`caseAgent.abort.test.ts` passes, and the nudge is skipped because the aborted turn sets `errorMessage`). Rather than edit `caseAgent.ts` (M1/M3 lanes), `run.ts` puts a guard around each case: if the case has not returned within its timeout plus 15 s (inside the 20 s write margin, so it still ends before the deadline), the runner stops waiting, writes the crash fallback (without the ledger, which only the abandoned run holds) and exits the process at the end of the batch. A proper fix in `caseAgent.ts` is to check the timer in `withRetries` before `continue()`.
- R7 Ctrl-C needed no `signal` option on `runCase`: the same guard rejects on the interrupt, so in-flight cases write the crash fallback ("stopped by the operator") and unstarted cases write the skip answer with `skipped: "interrupt"`. Exit code 130.
- Crashes now write `result.json` (`crashed: true`, `decision: null`, plus `cutoff` when the case loaded) through `writeFallback`, so `--resume` and `loop.ts` both see them. `loop.ts` still reports them as `CRASH`.

## Decision log

- Decision: the rehearsal is one `pnpm cases` batch over a symlink folder, not `pnpm loop --split holdout` plus a second run.
  Rationale: `loop.ts` runs groups as parallel processes with separate pools, so its wall time does not measure the single batch the Reality Test runs. Date/Author: 2026-10-10 12:15, Claude for Marc.
- Decision: the rehearsal record is committed in the runbook and `evals/rehearsal-2026-10-10.md`, not `runs/scorecard.md`.
  Rationale: `runs/` is git-ignored. Date/Author: 2026-10-10 12:15, Claude for Marc.
- Decision: open questions Q1 to Q10 are pending Marc's answers; the defaults are the plan of record until he answers.
  Rationale: hackathon exception in `docs/plans/README.md`. Date/Author: 2026-10-10 12:15, Claude for Marc.
- Decision: Marc approved the plan with the recommended defaults for Q2 to Q10, and overrode Q1: the runner flags are built on `main`'s `run.ts` now, without waiting for PR #11. This plan's "Fallback at 13:45" path is the plan of record from the start. PR #11 rebases on top of the flags afterwards and merges only if it is green before the 15:15 rehearsal; otherwise it waits until after 17:00. The same lane also wires the M1 case-state hints into `run.ts` (4 lines, `hintsFor` from `src/agent/maintenance/stateReconstruct.ts`) and then builds the organiser API adapter, so `run.ts` has one writer.
  Rationale: the rehearsal needs the flags by 15:00, and waiting on a rebase of someone else's branch puts the critical path on the slowest dependency. Date/Author: 2026-10-10 12:06 BST, Marc.
- Decision: R4 and R7 are enforced in `run.ts` by a per-case guard (timeout + 15 s, or Ctrl-C) instead of a `signal` option and a nudge guard in `caseAgent.ts`.
  Rationale: `caseAgent.ts` belongs to the M1 and M3 lanes today; the guard bounds every hang (prescreen, retry backoff, nudge) from the one file this lane owns. Cost: a case abandoned by the guard loses its ledger in the fallback answer. Date/Author: 2026-10-10 12:30 BST, Claude for Marc.
- Decision: budget-skip and Ctrl-C-skip answers set `decision: null` in `result.json` as well as `skipped`, and the summary table shows them as `BUDGET SKIP`.
  Rationale: every consumer that looks for `decision` (`loop.ts`, `--resume`) then treats them as undecided without special cases. Date/Author: 2026-10-10 12:30 BST, Claude for Marc.
