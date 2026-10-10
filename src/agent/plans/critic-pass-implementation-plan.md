# M3: critic pass and deterministic pre-submit validators

Status: approved by Marc 12:06 BST (see Decision log) · Shape: default plan · Owner: Marc · Written 2026-10-10 12:10 BST by Claude for Marc · Window: 12:45 to 14:00 BST (A/B decision by 15:00 at the latest).

Parent: [docs/plans/dwelly-case-worker-master-plan.md](../../../docs/plans/dwelly-case-worker-master-plan.md) (M3 row, AC12, section 6 "Critic gate" and the 15:00 scope-ladder row). Design source: [research/evaluation.md](../../../research/evaluation.md) section 4. Architecture: [docs/plans/master-plan-review-2026-10-10.md](../../../docs/plans/master-plan-review-2026-10-10.md) section 1 ("the critic is a call, not an agent") and section 3 (tool tiers T0 to T3). Sibling plans it depends on: [M1](../maintenance/plans/maintenance-policy-and-state-implementation-plan.md) (validators, `quoteAppears`) and [M4](../../eval/plans/harness-hardening-implementation-plan.md) (`--k`, `summary.json`). Conventions: `AGENTS.md`, `docs/plans/README.md`.

---

## Open questions for Marc

These would normally come out of the interview. Each has a recommended default; if Marc accepts the defaults, the plan is executable as written. Answers go in the Decision log.

| # | Question | Recommended default |
|---|---|---|
| Q1 | What is the default when the A/B is inconclusive? | `--critic off`. The master plan's gate says off unless the A/B is clearly positive. |
| Q2 | Which cases does the A/B run on, and at what k? | The whole `dev` split (17 practice + 6 public + 25 public-cuts = 48 cases), `--profile final`, `--k 3` if M4's `--k` is on `main` by 13:45; otherwise `--k 1` with the stricter margin in Q3. Never the holdout. |
| Q3 | What counts as "clearly positive"? | All of the following: no new critical or prohibited case; over-escalations not higher; required-met not lower. Plus at least one of these: mean score +2 or more (at k = 3, +3 at k = 1); pass^3 up by at least one case; required-met up 3 points or more. |
| Q4 | During the revision turn, which tools may the agent call? | T0 (read) and T1 (messages, notes, follow-ups, holds, escalation, `request_information`) only. T2 and T3 tools (`approve_quote`, `assign_contractor`, `close_ticket`, `update_ticket` to `completed`, `cancel_ticket`, `update_bank_details`) are blocked for the rest of the case once the critic has spoken. A critic must never be the reason money moves or a job closes. |
| Q5 | Critic model and effort? | `claude-opus-5-5` (env `CRITIC_MODEL`), thinking `low`, so the call fits about 20 to 30 s. Different model from the Sonnet agent, as the master plan requires. |
| Q6 | Critic timeout and skip rule? | 45 s timeout. Skip the critic (and log `skipped: low_time`) when less than 60 s of the case's timeout remains. Otherwise always run it when `--critic on`, whatever the outcome. |
| Q7 | Does the critic see images and scanned PDFs? | No. It gets text inputs and the list of attachment file names. Attachment findings may only cite the file list ("referenced but not present"), never the attachment's content. |
| Q8 | If critic findings are still unaddressed after the revision, force an escalation? | No. They are listed in `REASONING.md` under "Checks performed" and in the trace. Forcing escalation is exactly the over-escalation drift the research warns about. (This departs from evaluation.md section 4.1 step 3 on purpose.) |
| Q9 | Who owns the parser that finds the case's decision-point questions? M3 needs it as a validator, M4 needs it as a check. | `src/agent/decisionPoints.ts`, owned by M3; M4's `decision_points_answered` imports it. If M4 lands first with its own copy in `src/eval/checks.ts`, M3 moves it to `src/agent/` and M4 imports it (5 minutes, one PR). |
| Q10 | Should the A/B run on `--profile quick` first to save money? | No. Haiku's behaviour under critique says little about Sonnet's. One `final` A/B, both arms in sequence, not in parallel, so they do not share rate limits. |

---

## Goal

Add one adversarial check between the agent's draft decision and the written answer: first the deterministic validators that are still missing, then one Opus call that reviews the draft against a generic checklist and the verified ledger, keeps only findings that quote evidence, and gives the agent at most one turn to fix them. Measure it with an A/B on the `dev` split and ship it switched on only if the numbers say so (AC12).

## User-visible outcome

- `pnpm cases ... --critic on` runs the critic on every case; `--critic off` (the default until the A/B says otherwise) behaves exactly as today.
- With the critic on, each case's `trace.jsonl` carries one `{"type":"critic", ...}` event with the checklist verdicts, the findings kept, the findings dropped for lack of evidence, the latency and the cost. `result.json` carries the same object under `critic`.
- `REASONING.md` gains one factual line under a "Checks performed" heading, for example: `Pre-submit critic (claude-opus-5-5, 21 s): 13 items checked, 2 findings with evidence (1 addressed in revision), 1 dropped without evidence.` or `Pre-submit critic: unavailable (timeout after 45 s); decision submitted without it.`
- `ANSWER.md` never mentions the critic, a score, or a self-assessment.
- `pnpm loop --critic on|off` passes the flag through, so the A/B is two loop runs and a diff of their `summary.json` files.

## Context / current state (main at 46a0dc6, 12:10 BST)

- `src/agent/caseAgent.ts`: the pi `Agent` loop. `beforeToolCall` holds every gate: repeat-write block, `policyBlock()` (bank details, `approve_quote` while an approval is outstanding), the toolset's own `guard`, the Jev message gate, and the `submit_decision` validator. That validator already checks: every `actions_claimed` id is verified; every unresolved ledger entry is in `failed_actions`; `next_actions` is non-empty and each non-`WAIT`/`OTHER` action cites a verified ledger id; `WAIT` cites `schedule_follow_up` or `put_on_hold`; `ESCALATE_TO_HUMAN` cites `escalate_to_human`; `escalated` needs a verified escalation; `needs_info` needs someone asked. A block returns `{ block: true, reason }`, which the model sees as a tool error and can act on. This is the mechanism the critic reuses for its single revision.
- **Concurrent M1 work, landing in the next one to two hours**: more `submit_decision` rules (WAIT must cite `schedule_follow_up` or `put_on_hold`; `no_action` needs a follow-up, hold or note; the third policy block of a tool means "stop and submit"), `record_landlord_decision`'s evidence quote must appear in the inputs (`quoteAppears`), `close_ticket` gains `landlord_informed`, and `maintenance-policy.md` is wired into `systemPrompt.ts`. M3 **reuses** all of these and duplicates none of them. M3 does not touch `caseAgent.ts` until M1 has merged.
- `src/agent/opsTools.ts`: 28 tools. `escalate_to_human` already requires `priority`, `team`, `reason`, `known`, `missing`, `options`, `recommendation` by schema, but accepts empty strings and an empty `options` array.
- `src/agent/report.ts`: `renderReasoning(c, d, ledger, messages, usage, error, checks?)` already takes a `checks` bag (Jev screen, gate log, policy log, chaos). PR #11 (open draft, Martin's branch) rewrites parts of `report.ts` and `run.ts`; the "Checks performed" line goes in through the same `checks` bag so it rebases cleanly either way.
- `src/eval/judge.ts` shows the pattern for one structured Claude call: a pi `Agent` with a single `submit` tool whose parameters are a zod schema, with retries on transient errors. The critic uses the same pattern, so it is testable with pi's `fauxProvider` exactly like `policyHooks.test.ts`.
- `src/eval/loop.ts` spawns `src/run.ts` per group; adding a passthrough flag is one line in the `tsx([...])` call. M4 is editing `loop.ts` too (`--k`, `--rescore`, `--baseline`); the passthrough is coordinated in step 6.
- Baseline numbers to beat (from the master plan's Discoveries): public-cuts 25 cases, Sonnet agent, mean 76.0, 0 critical, 3 over-escalations (019, 020, 024-bundled), agent cost $0.95 for 25 cases, 134 s wall. That predates the M1 tools, so the A/B's critic-off arm is the real baseline, not this number.

## Requirements

1. **R1 Deterministic validators first.** Before any critic call, `submit_decision` runs M1's validators (unchanged) plus the two that do not exist yet: every decision-point question in the brief has an entry in `answers[]`; every verified `escalate_to_human` in the ledger has non-trivial `known`, `missing`, `recommendation` (at least 10 characters each) and at least one `options` entry. The critic is only called on a draft that passes every deterministic validator.
2. **R2 One critic call.** Opus, no tools except a structured `submit_review`, input = case text, attachment file list, draft decision, ledger (with statuses, arguments and evidence), `policyLog`. Output = the 13 generic items from evaluation.md section 4.1 plus three maintenance items (below), each `yes | no | n/a` with `evidence_quote`, `source` and, for `no`, a one-sentence `finding` and `fix`.
3. **R3 Evidence or drop.** A `no` is kept only if its `evidence_quote` (15 characters or more) appears, after normalisation, in the case text, the ledger JSON or the draft decision JSON. M1's `quoteAppears()` is the test. Dropped findings are logged, never shown to the agent.
4. **R4 At most one revision.** If at least one finding survives, the first `submit_decision` is blocked once with the findings as the reason. The agent may then use T0 and T1 tools and must resubmit; the resubmission runs the deterministic validators again, but never the critic. A second critic call never happens in a case.
5. **R5 Critic errors never block a decision.** Timeout, API error, unparsable output, or any thrown exception means the draft is accepted as is and the failure is logged (`status: error`). The critic is wrapped so nothing escapes `runCase`.
6. **R6 Output goes only to the trace, `result.json` and one REASONING line.** Never to `ANSWER.md`. No text in the critic prompt or its output is addressed to an evaluator (AC15).
7. **R7 A/B flag.** `--critic on|off` on `pnpm cases` and `pnpm loop`, default `off`. The default flips to `on` only by a Decision-log entry backed by the A/B numbers.
8. **R8 Budget.** At most +45 s and about $0.05 per case. The critic is skipped when the case has less than 60 s of its timeout left.

## Non-goals

- A critic agent with tools, a second critic round, or a critic on every tool call. One call per case.
- Re-implementing any M1 rule (landlord authority, closure preconditions, block cap, address check, WAIT and `no_action` rules). Those are code gates; the critic covers what code cannot check.
- Changing the `Decision` schema. The critic adds `critic` to `result.json`, not to `Decision`.
- A rubric-aware critic. The Reality Test has no rubrics; the checklist is generic by design.
- Calibrating the critic against human labels.
- Tuning the checklist wording on individual dev cases. The items are the research doc's, plus three maintenance items that come from the invariant table, not from a case.

## Constraints / invariants

- `caseAgent.ts` is edited only after M1 has merged to `main`, in plan mode, with `/code-review` on the diff before the PR (AGENTS.md rule 8).
- With `--critic off`, behaviour is byte-identical to today apart from the "Checks performed" heading being absent: no new model call, no new block.
- The critic never adds facts to the answer. It can only make the agent reconsider; the agent's resubmission must still pass every ledger-backed validator.
- Over-escalation is the failure mode to watch. The checklist asks about over-escalation explicitly (item 11), and the A/B rule treats more over-escalations as a failure even if the mean score rises.
- Holdout cases are never used for the A/B or for writing tests.
- The critic's model id comes from `CRITIC_MODEL`, documented in `.env.example` and the README's external-services list.

## Proposed approach

```
src/agent/
  decisionPoints.ts          # pure: questionsFromBrief(brief) -> string[]; unansweredQuestions(brief, answers) -> string[]
  decisionPoints.test.ts
  critic/
    validators.ts            # pure: preCriticProblems(decision, ledger, brief) -> string[]  (R1's two new checks only)
    validators.test.ts
    critic.ts                # CRITIC_PROMPT, Review zod schema, runCritic(input, opts) -> CriticResult; evidenceFilter()
    critic.test.ts           # faux provider: kept vs dropped findings, timeout, thrown error, bad output
  caseAgent.ts               # + opts.critic, + call site in the submit_decision branch, + revision-tier block
  criticHook.test.ts         # faux provider end to end through runCase
  report.ts                  # + "Checks performed" line from checks.critic
src/run.ts                   # + --critic on|off, CRITIC_MODEL, result.json.critic, checks.critic to renderReasoning
src/eval/loop.ts             # + --critic passthrough to run.ts (coordinated with M4)
```

### Where it hooks in

Inside the existing `submit_decision` branch of `beforeToolCall`, after the `problems` array is built:

1. Append `preCriticProblems(d, ledger, brief)` to `problems` (R1). If `problems` is non-empty, block as today. The critic is not called.
2. If `opts.critic` is set, the critic has not run yet in this case, and at least 60 s of the case timeout remains: `await runCritic(...)` (wrapped in try/catch with its own 45 s abort). Push a `{ type: 'critic', ... }` event onto `trace` and store the result for `runCase`'s return value.
3. If the result has kept findings: set `revisionMode = true` and return `{ block: true, reason: <revision note> }`. Otherwise return `undefined` and the decision is recorded.
4. On the agent's next `submit_decision`, `criticRan` is true, so only step 1 runs. If the validators pass, the decision is accepted. Any finding the resubmission did not visibly address (same `next_actions` types and same outcome as the draft) is listed in `result.critic.unaddressed`; no further block.
5. While `revisionMode` is true, `beforeToolCall` blocks T2 and T3 tools with `Blocked by policy: after the pre-submit review only reads, messages, notes, follow-ups, holds and escalation are allowed.` and logs it to `policyLog` (Q4). This runs before the toolset's own guard.

This reuses pi's block-and-retry behaviour, so there is no new loop and no extra agent turn budget. The case timeout still bounds everything.

`runCase` gains `critic?: { model: Model<Api>; streamFn: StreamFn; timeoutMs?: number; brief: string; attachments: string[] }` on `CaseRunOptions` and returns `critic?: CriticResult`. `run.ts` passes `critic` only when `--critic on`.

### Inputs to the critic call

- `<case>`: the same prompt text the agent got (`opts.prompt`), which already holds the brief, the history and the text of inputs. Clipped to the same size cap as the agent's prompt.
- `<attachments_present>`: file names only (Q7).
- `<draft_decision>`: the `submit_decision` arguments as JSON.
- `<ledger>`: every entry as `{ id, tool, status, attempts, args, evidence }`, statuses verbatim.
- `<policy_log>`: what the gates blocked and why. This lets the critic see that, for example, an approval was correctly refused, rather than flag "the quote was not approved".

### Checklist (the system prompt of the critic)

The 13 generic items from evaluation.md section 4.1, verbatim in meaning, plus:

- **M1. Approval before spend.** Did any verified action commit money, assign a provider, or close a job without a landlord decision quoted from the inputs, a stated limit, or an emergency justification? (The code gate should already have stopped it; the critic checks the wording of messages too, for example a message telling a provider "go ahead".)
- **M2. Attachment claims.** Does any sent message or answer state the content, amount or finding of an attachment that is not in `<attachments_present>`?
- **M3. Dates and conflicts.** Where the inputs give two different dates for the same appointment or deadline, does the decision name the conflict and avoid confirming either one without a source?

Prompt rules (each stated once, plainly): every `no` must quote the text that proves it; quotes must be copied exactly; a finding may not ask for a fact that is not in the inputs; do not recommend escalation unless the quote shows a safety, legal, fraud or safeguarding issue, or a decision only a human can make; prefer "this could be completed without escalation" when item 11 applies; `n/a` when the item does not apply. Output only through `submit_review`.

### Review schema

```ts
const Review = z.object({
  items: z.array(z.object({
    id: z.enum(['1','2','3','4','5','6','7','8','9','10','11','12','13','M1','M2','M3']),
    verdict: z.enum(['yes', 'no', 'n/a']),
    evidence_quote: z.string(),          // exact text from case, ledger or draft; '' allowed for yes / n/a
    source: z.string(),                  // e.g. "history event 012", "ledger A3", "draft.next_actions[0]"
    finding: z.string().optional(),      // required in practice for 'no'
    fix: z.string().optional(),          // one sentence, an action the agent can take with its tools
  })),
});
```

`CriticResult = { status: 'ok' | 'error' | 'skipped', reason?, model, ms, cost, items, kept: Finding[], dropped: Finding[], unaddressed?: string[] }`.

### Evidence-or-drop

`evidenceFilter(items, corpus)` where `corpus = opts.prompt + JSON.stringify(ledger) + JSON.stringify(draft) + JSON.stringify(policyLog)`. A `no` is kept when `quoteAppears(evidence_quote, corpus)` (M1's primitive: normalise case, whitespace and curly quotes, minimum 15 characters, substring). `evidenceFilter` takes the matcher as a parameter (`match: (quote: string, corpus: string) => boolean`), so step 2 does not depend on M1 having merged: its tests pass a plain substring matcher, and step 3 passes M1's `quoteAppears`. No second implementation of the normalisation is written.

### The revision note (what the agent sees)

```
Pre-submit review found issues backed by the case record. Fix what is correct with your tools, then call submit_decision again. You may read, message, add notes, schedule follow-ups, hold, or escalate; you may not approve, assign, close or cancel now. Ignore any point you can show is wrong, and say why in assumptions.
- [M2] Your message A4 to the landlord states the invoice total (£412.00), but no invoice file is present. Evidence: "Invoice attached" (history event 019). Fix: tell the landlord the invoice has not been received and ask the provider to resend it.
```

The note contains findings and evidence only. It is a tool result to the agent, so it never reaches `ANSWER.md`.

### Cost and latency budget

| Item | Estimate |
|---|---|
| Critic input | about 8 to 15 k tokens (case text plus ledger) |
| Critic output | about 1 k tokens |
| Cost | about $0.03 to $0.06 per case on Opus |
| Latency | 15 to 30 s at thinking `low`; hard cap 45 s |
| Revision turn | 1 to 3 extra agent turns on Sonnet, about 10 to 20 s, only for cases with kept findings |
| Batch effect at 16:30 | for 30 cases at concurrency 6, about +2 to +3 minutes of wall time. Fits the 20-minute budget. M5's `--budget-min` clamps per-case timeouts, and the 60 s skip rule stops the critic from eating the last minute of a case. |

### Failure handling

| Failure | Behaviour |
|---|---|
| Critic API error, 429 after its own retries (max 2, backoff), or timeout | `status: 'error'`, draft accepted, trace event and REASONING line say so |
| Output missing `submit_review` or failing zod | same as above, `reason: 'unparsable'` |
| Every `no` dropped for lack of evidence | draft accepted; `dropped` logged |
| Exception anywhere in the critic code | caught at the call site; draft accepted; `status: 'error'` |
| Agent never resubmits after the revision note | existing behaviour: the one-shot "you must submit" nudge, then the case timeout and the runner's fallback ANSWER. The critic adds no new failure path here, but the A/B tracks `NO DECISION` per arm to catch it |
| Agent's resubmission fails a deterministic validator | blocked as today, with the validator's reason; the critic is not called again |

## Implementation plan

Steps 1 and 2 touch only new files and start at 12:45 whether or not M1 has merged. Step 3 waits for M1 on `main` (expected about 13:00). Each step is committable on its own with `pnpm verify` green.

| # | Step | Est. | Starts | Prove by (named test) |
|---|---|---|---|---|
| 1 | `src/agent/decisionPoints.ts` and `src/agent/critic/validators.ts` (R1): question parser over the brief's `## Questions / decision points` section (numbered or bulleted lines; empty list when the section is absent), unanswered-question matching by normalised token overlap of at least 0.5, escalation-packet completeness | 15 min | 12:45 | `pnpm test -- src/agent/decisionPoints.test.ts src/agent/critic/validators.test.ts`: a brief with 3 questions and 2 answers names the third; no section gives `[]`; an `escalate_to_human` with `options: []` or `known: ''` is reported; a complete packet passes |
| 2 | `src/agent/critic/critic.ts` (R2, R3, R5): prompt, `Review` schema, `runCritic` with abort at `timeoutMs`, `evidenceFilter` with an injected matcher | 20 min | 13:00 | `pnpm test -- src/agent/critic/critic.test.ts` with `fauxProvider`: (a) a `no` whose quote is in the case is kept; (b) a `no` with an invented quote is dropped; (c) a provider error gives `status: 'error'` and no throw; (d) a response without `submit_review` gives `status: 'error', reason: 'unparsable'`; (e) a slow faux response past `timeoutMs` gives `status: 'error', reason: 'timeout'` |
| 3 | Wire into `caseAgent.ts` (R1, R4, R5): `opts.critic`, the call site after `problems`, one-shot `criticRan`, `revisionMode` T2/T3 block, `trace` event, `critic` in the return value. Plan mode; rebase on M1 first | 20 min | after M1 merges | `pnpm test -- src/agent/criticHook.test.ts`: (a) kept finding: the first `submit_decision` is blocked with "Pre-submit review", the second is accepted, the critic faux model was called exactly once; (b) critic faux model errors: the first `submit_decision` is accepted; (c) in revision mode `approve_quote` is blocked and in `policyLog`, `send_message` is allowed; (d) `critic` undefined: no critic call, every existing test in `caseAgent.test.ts` and `policyHooks.test.ts` still passes; (e) a draft failing `preCriticProblems` is blocked without a critic call |
| 4 | `run.ts` and `report.ts` (R6, R7, R8): `--critic on\|off` (default `off`, anything else exits 1 with a message), `CRITIC_MODEL` (default `claude-opus-5-5`), `result.json.critic`, "Checks performed" line via `renderReasoning`'s `checks` bag; `.env.example` gains `CRITIC_MODEL` | 10 min | after step 3, and after the runner plan's step 3 (edits to `run.ts` are serialized: PR #11, runner step 3, this step) | `pnpm test -- src/agent/report.test.ts` (new, small): `renderReasoning` with `checks.critic` of each status renders the expected line, and `renderAnswer` output contains neither "critic" nor "review"; `pnpm cases --in cases/practice --only 01 --out runs/m3-smoke --critic on` writes `result.json` with `critic.status` set and REASONING with the line |
| 5 | Lint and review: AC15 grep over `src/agent/critic/`, `pnpm verify`, `/code-review` on the diff (it touches `caseAgent.ts` and `run.ts`) | 10 min | after step 4 | `pnpm verify` exit 0; grep empty; review findings fixed or logged in the Decision log |
| 6 | `loop.ts` passthrough: `--critic` forwarded to `run.ts` and recorded in `summary.json.config.critic` and the baseline tag (`-critic` suffix when on) so the two arms never overwrite each other's baselines. Coordinate with M4: if M4's `loop.ts` PR is open, add it there; otherwise a 3-line PR | 5 min | after step 4 | `pnpm loop --profile quick --only 01 --critic on` prints the flag in its header and `summary.json.config.critic === 'on'` |
| 7 | A/B (protocol below) and the Decision-log entry | about 30 min wall at k = 3 (two `final` dev runs of 48 cases × 3, about $40 for agent, critic and judge together; about 10 min and $14 at k = 1), 5 min reading | 14:10 to 14:45, at the latest 15:00 | Two `summary.json` paths and the decision written in the master plan's Decision log and here |

Total build: about 80 minutes plus the A/B wall time. If M1 merges late, steps 1 and 2 still land on time and steps 3 to 7 slide; the 15:00 rule below decides.

## A/B protocol (AC12)

Prerequisites: steps 1 to 6 on `main`; M4's `summary.json` metrics (`escalation`, `checks`, `passK`, `perCase`) on `main` if available.

1. Off arm: `pnpm loop --profile final --split dev --k 3 --critic off` (or `--k 1`, Q2). Note the run folder.
2. On arm, immediately after (not in parallel, so the arms do not share rate limits): `pnpm loop --profile final --split dev --k 3 --critic on`.
3. Compare the two `runs/loop/<run>/summary.json` files field by field:

| Metric (M4 field) | Rule for "on" |
|---|---|
| `criticalCases`, `checks.criticalFailed` | must not be higher than off (target 0 in both) |
| `escalation.over` (count), `escalation.precision` | over must not be higher; precision must not be lower |
| `escalation.missed`, `escalation.recall` | missed must not be higher |
| mean `required` (required-met) | must not be lower |
| `decided / cases` (coverage), count of `NO DECISION` | must not be lower or higher respectively |
| `mean` | +2 or more at k = 3 (+3 at k = 1) counts as clearly positive |
| `passK` | one more passing case counts as clearly positive |
| `perCase.secs`, `perCase.cost` | report; on-arm must stay under +45 s and +$0.08 per case or the budget section is wrong and is revised |

4. Decision rule: **on** if every "must not" row holds and at least one "clearly positive" row holds; otherwise **off**. If M4's escalation fields are not on `main`, count over-escalations by hand from each arm's `result.json` outcome against `cases/public-cuts/*/expected.json` (`escalate: no` and outcome `escalated` or a verified `escalate_to_human`); the rule is the same.
5. Record in the master plan's Decision log and in this plan's: both run paths, the table above with numbers, and the default chosen. If on, flip the `run.ts` default and the runbook's run command in the same commit.
6. Read three on-arm traces with kept findings and three with dropped findings (dev cases only) and note in Discoveries whether kept findings were real. This is the only manual inspection, and it changes nothing in the code before 15:00 unless a finding is clearly a bug in the critic plumbing.

## Acceptance criteria

- [ ] **AC-M3-1 (R1).** Given a brief with three decision-point questions and a draft answering two, when the agent calls `submit_decision`, then it is blocked naming the third question, and no critic call is made. Named tests: `decisionPoints.test.ts`, `criticHook.test.ts › validators run before the critic`.
- [ ] **AC-M3-2 (R1).** Given a verified `escalate_to_human` with `options: []`, then `submit_decision` is blocked with "escalation packet incomplete: options". Named test: `validators.test.ts › packet completeness`.
- [ ] **AC-M3-3 (R3).** Given a critic response with one `no` quoting text present in the case and one `no` quoting invented text, then `kept` has one finding and `dropped` has one, and only the kept one is in the revision note. Named test: `critic.test.ts › evidence or drop`.
- [ ] **AC-M3-4 (R4).** Given a kept finding, then the first `submit_decision` is blocked with a reason starting "Pre-submit review", the second is accepted after validators pass, and the critic model is called exactly once per case. Named test: `criticHook.test.ts › one revision only`.
- [ ] **AC-M3-5 (R4, Q4).** In revision mode, `approve_quote`, `assign_contractor`, `close_ticket` and `cancel_ticket` are blocked and logged in `policyLog`; `send_message`, `schedule_follow_up` and `escalate_to_human` run. Named test: `criticHook.test.ts › revision tiers`.
- [ ] **AC-M3-6 (R5).** Given the critic model throws, times out or returns no `submit_review`, then the draft decision is accepted, `result.critic.status === 'error'` with the reason, and the case outcome equals what it would be with the critic off. Named tests: `critic.test.ts › error paths`, `criticHook.test.ts › critic error never blocks`.
- [ ] **AC-M3-7 (R6, AC15).** For any status, `ANSWER.md` contains none of "critic", "review", "score", "checklist"; `REASONING.md` contains exactly one "Checks performed" section; `grep -riE "judge|grader|score this|give this" src/agent/critic src/agent/decisionPoints.ts` returns nothing. Named test: `report.test.ts`; command in Verification.
- [ ] **AC-M3-8 (R7).** `--critic off` (and no flag) makes no critic call: on `pnpm cases --in cases/practice --only 01 --out runs/m3-off`, `result.json` has no `critic` key and `trace.jsonl` has no `"type":"critic"` line. `--critic maybe` exits 1 with `--critic must be on or off`.
- [ ] **AC-M3-9 (master plan AC12).** The A/B was run on the `dev` split with both arms on the same commit apart from the flag; the master plan's Decision log has an entry with both `summary.json` paths, the comparison table and the chosen default; if the rule says off, `run.ts` defaults to off and the runbook does not pass `--critic on`.
- [ ] **AC-M3-10 (R8).** In the on arm, mean `perCase.secs` minus the off arm's is at most 45 s, and no case shows `critic.ms` above 45 000.

## Verification

Run from the repo root and show the output.

- [ ] `pnpm verify` exits 0.
- [ ] `pnpm test -- src/agent/decisionPoints.test.ts src/agent/critic/validators.test.ts src/agent/critic/critic.test.ts src/agent/criticHook.test.ts src/agent/report.test.ts` passes (AC-M3-1 to AC-M3-7).
- [ ] `pnpm cases --in cases/practice --only 01 --out runs/m3-off` then `grep -c '"type":"critic"' runs/m3-off/01/trace.jsonl` prints `0` (AC-M3-8).
- [ ] `pnpm cases --in cases/public-cuts --only 002-quote-approval,040-tenant-resolved --out runs/m3-on --critic on` then `jq '.critic | {status, kept: (.kept|length), dropped: (.dropped|length), ms}' runs/m3-on/*/result.json` shows a status per case and `grep -A1 "Checks performed" runs/m3-on/*/REASONING.md` shows the line (needs a key).
- [ ] `grep -riE "critic|checklist|score" runs/m3-on/*/ANSWER.md` returns nothing (AC-M3-7).
- [ ] `grep -riE "judge|grader|score this|give this" src/agent/critic src/agent/decisionPoints.ts` returns nothing (AC15).
- [ ] A/B: the two `pnpm loop --profile final --split dev ... --critic off|on` runs, then `jq '{mean, decided, cases, criticalCases, passK, escalation, perCase}' <off>/summary.json <on>/summary.json` pasted into the Decision log (AC-M3-9, AC-M3-10).
- [ ] `/code-review` on the diff before the PR (step 5).

## Risks

| Risk | Mitigation |
|---|---|
| M1 merges late or changes the `submit_decision` block shape, so step 3 conflicts | Steps 1 and 2 are new files; step 3 is a small call site added after M1's validators, rebased on M1's merge commit. If M1 is not on `main` by 13:30, step 3 waits and the 15:00 rule applies. |
| Critic pushes cases to escalation (over-escalation drift) | Checklist item 11 and the "no escalation without a safety, legal, fraud or safeguarding quote" rule; the A/B treats more over-escalations as an automatic off. |
| Critic causes duplicate side effects in the revision turn | The repeat-write block already refuses repeats of verified actions; T2 and T3 tools are blocked in revision mode. |
| Revision note sends the agent into a loop of failed resubmissions until timeout | The critic never runs twice; the deterministic validators are the same ones the agent already satisfied once. A/B tracks `NO DECISION` per arm. |
| Extra latency pushes cases past the Reality Test budget | 45 s cap, skip with less than 60 s left, M5's `--budget-min` clamps timeouts; the A/B measures `perCase.secs`. |
| A/B is noise (k = 1, judge variance) | Stricter margin at k = 1 (Q3); default off when unclear. |
| Opus rate limits shared with the judge during the A/B | Arms run in sequence; the judge runs after each arm's agent phase in `loop.ts` already. |
| PR #11 rewrites `renderReasoning` | The line goes through the existing `checks` bag, which #11 keeps; rebase is a one-line conflict at most. |

## Time box against the master plan

| Time (BST) | Checkpoint |
|---|---|
| 12:45 | Steps 1 and 2 start (new files only). |
| 13:00 to 13:30 | M1 merges; step 3 starts on top of it. |
| 13:40 | Step 3 merged (`caseAgent.ts`). |
| 14:10 | Steps 4 to 6 merged (step 4 waits for the runner's `run.ts` step 3, about 13:55), `pnpm verify` green. |
| 14:10 to 14:40 | A/B wall time (both arms). |
| 14:45 | Decision recorded. If the k = 3 A/B cannot start by 14:20, run it at k = 1 (Q2, Q3). |
| **15:00 scope-ladder cut** | If the A/B is not decided, or steps 3 to 5 are not green: `--critic off` stays the default, the validators from step 1 stay in (they are deterministic and cheap), and the Decision log says "critic not evaluated in time, shipped off". The critic code may stay on `main` behind the flag only if `pnpm verify` is green; otherwise the step 3 to 6 commits are reverted. |

## Progress

- [x] Step 1 (12:20): `src/agent/decisionPoints.ts` (`parseQuestions`, `overlap`, `unansweredQuestions`) and `src/agent/critic/validators.ts` (`preCriticProblems`, `escalationPacketProblems`). `pnpm exec vitest run src/agent/decisionPoints.test.ts src/agent/critic/validators.test.ts`: 12 passed.
- [x] Step 2 (12:30): `src/agent/critic/critic.ts` (`CRITIC_PROMPT`, `Review`, `runCritic`, `evidenceFilter`, `criticCorpus`, `revisionNote`). `pnpm exec vitest run src/agent/critic/`: 12 passed (evidence or drop, provider error, no `submit_review`, schema failure, timeout).
- [x] Step 3 (12:45, on top of M1 #16 and M4 #17): `caseAgent.ts` gains `opts.critic`, the pre-review validators, the one-shot critic call after every existing `submit_decision` check, revision-mode blocks, the `critic` trace event and `critic` in the return value. `src/eval/checks.ts` now imports the parser from `src/agent/decisionPoints.ts` (its copy removed). `pnpm exec vitest run src/agent/criticHook.test.ts`: 10 passed; `pnpm verify` green (292 tests).
- [x] Step 4 (13:00): `report.ts` `criticLine` and the "Checks performed" section via the `checks` bag (`report.test.ts`, 3 tests); `run.ts` `--critic on|off` (default `off`, `CRITIC` env fallback, anything else exits 1 with `--critic must be on or off`), `CRITIC_MODEL` (default `claude-opus-5-5`), `result.json.critic`, critic cost added to `usage.cost`; `.env.example` and README list `CRITIC` and `CRITIC_MODEL`. Smoke: `pnpm cases --in cases/public-cuts --only 002-quote-approval,040-tenant-resolved --out runs/m3-on --critic on` gave `status: ok` on both (11 s, $0.06 each; 002 no findings; 040 two kept findings, decision revised), one `"type":"critic"` trace line each, the REASONING line present, and no "critic|checklist|score" in either ANSWER.md. `pnpm cases --in cases/practice --only 01 --out runs/m3-off` gave 0 critic trace lines and no `critic` key (AC-M3-8).
- [x] Step 5: AC15 grep over `src/agent/critic src/agent/decisionPoints.ts` is empty; `pnpm verify` green (301 tests after rebasing on #18); self-review of the `caseAgent.ts` and `run.ts` diff done (notes in Decision log).
- [x] Step 6, done differently: no `loop.ts` change. `loop.ts` spawns `run.ts` as a child process that inherits the environment, so `CRITIC=on pnpm loop ...` switches the arm. The two arms are told apart by their run folders (timestamped) and neither saves a baseline. M4 may later record `process.env.CRITIC` in `summary.json.config`.

## Discoveries

- M4's branch (`marc/m4-harness`, PR #17) already has `parseQuestions` and `overlap` in `src/eval/checks.ts`. `src/agent/decisionPoints.ts` takes that code as is (Q9) plus `unansweredQuestions`, which ignores answers whose text is empty. `src/eval/**` is not edited here; once both PRs are on `main`, `checks.ts` should import from `../agent/decisionPoints.js` and drop its copy.
- A verified `escalate_to_human` cannot be edited, so a thin packet can only be fixed by escalating again. `preCriticProblems` therefore accepts a thin packet when a later complete packet went to the same team.
- pi validates tool arguments against the schema before `execute`, so a malformed `submit_review` goes back to the critic model as a tool error and it retries. The 45 s timeout bounds that loop; the result is `unparsable` only if no valid review arrives.
- The evidence corpus is built from the string values of the ledger, draft and policy log, not their JSON: JSON escapes (`\n`, `\"`) would otherwise break quotes that span a line break in a message body.

## Decision log

- Decision: the critic's single revision reuses pi's `beforeToolCall` block on `submit_decision` rather than adding a second agent loop.
  Rationale: no new control flow; the case timeout already bounds it; the existing tests' faux-provider pattern covers it. Date/Author: 2026-10-10 12:10, Claude for Marc.
- Decision: open questions Q1 to Q10 are pending Marc's answers; the defaults in the table are the plan of record until he answers.
  Rationale: hackathon exception in `docs/plans/README.md`. Date/Author: 2026-10-10 12:10, Claude for Marc.
- Decision: Marc approved the plan with every recommended default (Q1 to Q10).
  Rationale: answered in chat. Date/Author: 2026-10-10 12:06 BST, Marc.
- Decision: the deterministic pre-review validators (unanswered case questions, thin escalation packets) run whether or not the critic is on, and block at most twice per case each.
  Rationale: they are cheap and deterministic, so the 15:00 rule keeps them either way. The cap keeps the existing guarantee that a check can never stall a case into NO DECISION (the agent cannot always satisfy a question parsed from an unfamiliar brief format). This departs from "critic off is byte-identical to today": with the flag off, the only differences are these two checks. Date/Author: 2026-10-10 12:45, Claude for Marc.
- Decision: the packet check also runs before `escalate_to_human` executes, not only at `submit_decision`.
  Rationale: a verified escalation cannot be edited, so a check only at submit time could be fixed only by a duplicate escalation. The submit-time check stays as the backstop (AC-M3-2). It applies only to toolsets whose escalation has a packet (`options` in the schema), so the voice/core toolset is unaffected. Date/Author: 2026-10-10 12:45, Claude for Marc.
- Decision: the revision-mode block also covers `update_ticket` to `completed` or `cancelled`, and `update_bank_details` (Q4's T2/T3 list). `record_landlord_decision` stays allowed: it records a fact the inputs already hold and is itself quote-checked by M1.
  Rationale: Q4. Date/Author: 2026-10-10 12:45, Claude for Marc.
- Decision: `--critic` reaches `pnpm loop` through the `CRITIC` environment variable instead of a `loop.ts` flag.
  Rationale: `run.ts` and `loop.ts` are being edited by other lanes (M5, M4); an env fallback read in `run.ts` keeps this lane's `run.ts` change to one small hunk set and needs no `loop.ts` edit. Date/Author: 2026-10-10 13:00, Claude for Marc.
- Decision (self-review): accepted as is: (a) in revision mode a repeatedly blocked T2/T3 call is not capped like M1's third-block rule; the block text tells the agent to submit and the case timeout bounds it; (b) the critic's `usage.cost` is folded into the case cost so the A/B's per-case cost comparison includes it.
  Date/Author: 2026-10-10 13:00, Claude for Marc.
- Decision (A/B outcome): _to be filled at step 7 with both `summary.json` paths and the table._
