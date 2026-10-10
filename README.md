# dwelly-hackathon

> Real-World Agents Hackathon — 10 October 2026. Track: Property Management.

## 1. What we built

An autonomous **maintenance case worker** for a UK lettings agency. It takes a reactive-maintenance case at any point in its history (the tenant's report, the e-mails, calls, SMS, notes, holds and system updates so far, plus any attachments), works out where the case stands, and does what a good property manager would do next: ask the landlord for approval, assign a contractor, book or re-confirm a visit, chase someone, send a quote for approval, reply to the tenant, split off an unrelated issue, wait with a review date, close the job, or hand it to a human with a handover packet.

It runs as a batch over a folder of case folders:

    pnpm cases --in <cases-dir> --out ANSWERS

and writes, for every case, `ANSWER.md` (the decision, the actions taken, the drafted communications), `REASONING.md` (evidence, conflicts found, what failed, why it did or did not escalate), `trace.jsonl` (every agent event and tool call) and `result.json`. One case crashing or timing out never stops the batch: that case gets an honest failure record saying a human must handle it.

How it decides:

- **One agent loop** (Claude Sonnet 5.5 on `@earendil-works/pi-agent-core`) with a lettings policy (`src/core/policy.md`) and 28 case tools covering the agency's workflow: landlord decisions, quotes, invoices, visits, holds with review dates, follow-ups, messages, closing checks and escalation (full list in section 5).
- **The job record is rebuilt before the agent starts.** For organiser-format cases, the current stage, property, landlord-approval status and any open hold are reconstructed from the visible history and loaded into the tool environment, so the tools behave like the case system would at that moment (`src/agent/opsSeed.ts`).
- **Every state change goes through a tool and is read back.** Each write is checked against the tool environment after it runs and recorded in an action ledger as verified, not applied or unverifiable. The agent is told the truth after every call, including when the API said "error" but the change is in fact in place.
- **A structured decision** (`src/agent/caseAgent.ts`): `case_state`, typed `next_actions` (`REQUEST_LANDLORD_APPROVAL`, `ASSIGN_PROVIDER`, `BOOK_OR_CONFIRM_APPOINTMENT`, `CHASE_*`, `SEND_QUOTE_FOR_APPROVAL`, `APPROVE_INVOICE_FOR_PAYMENT`, `REPLY_TO_TENANT`, `SPLIT_NEW_REQUEST`, `WAIT`, `CLOSE_*`, `ESCALATE_TO_HUMAN` and others), each with recipient and channel and citing the verified ledger entry that performed it, plus boundaries, remaining work, missing information, conflicts and answers to every question in the case. A decision that claims an unverified action, leaves a failed one unexplained, waits without a dated follow-up, or says "escalated" without a verified hand-over is rejected and redone.
- **Rules enforced in code, not left to the prompt** (`src/agent/caseAgent.ts`, `src/agent/opsTools.ts`, `src/agent/opsChecks.ts`). Bank details are never changed from a message. A contractor cannot be assigned while the landlord-approval step is open, or after the landlord declined, chose their own contractor or let the tenant fix it. A quote cannot be approved beyond the landlord's recorded approval or spend limit, and an emoji or "ok" cannot be recorded as approval. A visit cannot be booked in the past or on a date whose weekday contradicts the agreed slot. A message that names a different property than the job's is held, as is a tenant message on a void property. An invoice above the approved amount or from a company other than the assigned contractor is flagged, and the job cannot close until the flag is handled, the work result is recorded and the tenant's confirmation is stated. Repeating an already verified write is blocked.
- **An optional pre-send check** (TypeSafe Jev) screens each case for severity and checks outgoing messages before they leave; it can hold a message at most twice per recipient, so it can never stall a case.

The evaluation harness (`pnpm loop`) is part of the product: a frozen dev/holdout split, an LLM rubric grader with critical-failure checks, optional injection of tool failures (error, silent drop, timeout), and a regression diff against a saved baseline.

### Results on our own evaluation

Both columns come from one run of the whole dev split, the committed baseline `evals/baseline-final-dev.json` (run 11:58 BST, committed in `8fa5414`), measured before the remaining maintenance-policy gates (milestone M1) merged. Agent `claude-sonnet-5-5` (thinking medium, concurrency 8), grader `claude-opus-5-5`, k = 1 run per case, no tool-failure injection, 10 Oct 2026. The 48 cases took 165 s wall time in total.

- Left column: 17 hand-written practice cases graded against their own rubric, plus 6 organiser public cases cut halfway through their history and graded against what the agency actually did next.
- Right column: 25 organiser public cases cut at a hand-picked decision point or mutated with one messy edit (`cases/public-cuts/`), each with a rubric we wrote.

| Metric | Practice + public cases | Public cases cut at a decision point |
|---|---|---|
| Cases attempted | 23 | 25 |
| Coverage (decision submitted / attempted) | 23 / 23 | 25 / 25 |
| Mean rubric score (0–100, ungraded counts as 0) | 94.0 | 79.0 |
| Cases with a critical failure | 0 | 1 |
| Cases scoring below 60 | 0 | 4 |
| Outcome: escalated / action taken / resolved / no action | 10 / 13 / 0 / 0 | 6 / 19 / 0 / 0 |
| Mean seconds per case | 23.5 | 22.0 |
| Agent cost per case (USD) | 0.071 | 0.066 |
| Tool-failure injection (chaos) | off | off |
| Runs per case (k) | 1 | 1 |

TBD: after 15:45 BST, replace this table with the final-profile dev-split run on the frozen code (`pnpm loop --profile final`, values from `evals/latest-final-dev.json`), and update the label lines above with its time and commit.

These are our own cases and our own rubrics, graded by a Claude model: they measure consistency with the behaviour we specified, not ground truth. The held-out split is run for aggregates only and is not reported here.

## 2. The operational problem it solves

Reactive maintenance is the highest-volume workflow in lettings: a tenant reports a fault, the agency needs the landlord's approval, a contractor has to be chosen and booked, the tenant and contractor have to agree a date, quotes and invoices have to stay inside what was approved, and everyone has to be kept informed until the job is closed. The organisers' public Property Management data (50 cases from a synthetic agency, 1,505 events) shows what that looks like in practice: a median case takes about 16 days, the longest 111, and almost all of that is waiting on landlords and contractors. Across the 50 cases the case system put work on hold 236 times, and 53 times it stopped with the same prompt for a person: "please check if we need to provide a response… if not, return to auto mode". Dwelly's own published figures for its live maintenance agents put the remaining human cost at about five escalations per task.

The system is the component that answers that prompt. Given the case so far, it decides the next step and takes it with tools when the facts are clear and the action is within policy; asks one specific question when a single missing fact blocks the right action; and escalates with a handover packet when the decision is one a human must make: safety, money above approval limits, legal matters, suspected fraud, conflicting information it cannot resolve, or a failed action it cannot retry safely. Doing nothing new, with a dated review, is a valid outcome.

The data also shows where naive automation goes wrong, and these are the situations the policy and the code-enforced rules are written for: a landlord replying about a different flat than the one on the case; appointment dates that contradict each other across e-mails; a tenant fixing the fault themselves after the landlord approved a visit (closing is fine, but the landlord must be told); unrelated issues bundled into one thread; a thumbs-up emoji offered as approval; an invoice well above the approved quote; attachments referenced but absent; template fields reused as free text; contractor e-mails that cannot be parsed. See `research/pm-case-data-analysis.md` for the full catalogue.

## 3. Architecture

```
case folder ──► src/agent/cases.ts (practice format)  ─┐
            └─► src/agent/publicCases.ts (index.md +   ├─► case prompt ──► pi agent loop (Claude) ──► submit_decision
                history.md, cut at a decision point)  ─┘                       │
                                                                               ▼
               ops tools (src/agent/opsTools.ts) ─► every write read back (verify) ─► action ledger (src/agent/ledger.ts)
                                                                               │
                                     ANSWER.md / REASONING.md rendered from the ledger, never from model prose
```

- **Verified action ledger:** each state-changing tool is read back after it runs. The final decision is rejected if it claims an unverified action or leaves a failed one unhandled.
- **Guards:** rules that must never be broken are checked in code before a tool runs (`policyBlock` in `src/agent/caseAgent.ts`, `guard` in `src/agent/opsTools.ts`, pure checks in `src/agent/opsChecks.ts`); repeat writes are blocked; and an optional Jev classifier pre-screens each case and checks outgoing messages before they are sent (`src/agent/jev.ts`).
- **Decision gate:** `submit_decision` is rejected until every claimed action and every typed next action cites a verified ledger entry, and every failed action is listed with how it was handled.
- **Job state:** for organiser-format cases the job record (stage, property, approval status, open hold) is rebuilt from the visible history and seeded into the tools (`src/agent/opsSeed.ts`).
- **Policy:** the system prompt (`src/agent/systemPrompt.ts`) is built on `src/core/policy.md` and covers UK lettings law as of October 2026.

## 4. How to run it

### Prerequisites
- Node.js 22+, pnpm
- An Anthropic API key

### Install & configure
```bash
npx -y pnpm@8 install --frozen-lockfile   # lockfile is pnpm 8 format; pnpm 10 refuses it
cp .env.example .env   # fill in keys
```

### Run
```bash
# The test loop: run a frozen split (cases/splits.json), grade it, and diff against the saved baseline.
# Exits 1 on a regression. Add --chaos 0.15 to inject random tool failures (error, silent drop, timeout).
pnpm loop                        # quick: Haiku agent + Sonnet judge, ~1.5 min, ~$0.80 for the dev split
pnpm loop --profile final        # final: Sonnet agent + Opus judge, ~2.5 min, ~$2.90 (the real score)
pnpm loop --save-baseline        # accept the current scores as the baseline (kept per profile and split)
pnpm loop --split holdout        # held-out split: aggregate scores only, never tuned on
# Override parts of a profile with --model, --judge-model, --thinking, --concurrency.

# Process a folder of cases and write ANSWERS/<n>/ANSWER.md + REASONING.md
pnpm cases --in cases/practice --out ANSWERS

# Replay the organisers' public examples at a decision point (later events and the outcome are hidden)
pnpm cases --in "HackatonPublicCases/Property Management" --out runs/pm --only 003,008 --at auto   # or --at 12, --at 50%

# Grade a run: practice cases use their rubric.json, public cases are graded against the recorded ending
pnpm eval --cases "HackatonPublicCases/Property Management" --answers runs/pm
```

Images and scanned PDFs (no text layer) are sent to Claude natively. PDFs with a text layer go through `pdftotext`.

`--at auto` uses the case's recorded escalation point when it has one; otherwise it cuts halfway through the history (Property Management cases have no marker).

### Test data
- `HackatonPublicCases/`: the organisers' 200 public examples (50 per track).
- `cases/practice/`: 22 hand-written property-management cases, each with `rubric.json` and scripted `tool_failures.json`.

### Environment variables
| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude models |
| `CASE_MODEL`, `JUDGE_MODEL` | Agent and judge models (defaults: Sonnet 5.5, Opus 5.5) |
| `TYPESAFE_API_KEY` | Optional Jev classifier for pre-screen and pre-send checks |
| `ORGANISER_API_URL` | Optional organiser-supplied tool API (only if one is provided at the Reality Test). Unset: the local mock toolset. Set: mapped tool calls go to `POST {url}/tools/<name>`, writes are mirrored on the mock for read-back, and the first failure switches the run back to the mock; each REASONING.md has a `Toolset:` line saying which was used |
| `ORGANISER_API_KEY` | Optional bearer token for that API; never logged or written to outputs |
| `ORGANISER_API_TRANSPORT` | `http` (default; the only transport in this build) |
| `ORGANISER_TOOL_MAP` | Optional JSON: per-tool target name, `"METHOD /path"` route and argument renames, or `null` to keep a tool local |

PDF attachments are extracted with `pdftotext` (poppler: `brew install poppler`).

See `.env.example` for the full list.

## 5. Models, APIs and external services

| Service | Used for | How it is configured | Required? |
|---|---|---|---|
| Anthropic API (Claude) | The case agent (`claude-sonnet-5-5` by default) and the rubric grader of our evaluation (`claude-opus-5-5` by default). The quick `pnpm loop` profile uses `claude-haiku-5-5` as the agent with `claude-sonnet-5-5` grading. Called through `@earendil-works/pi-ai`. | `ANTHROPIC_API_KEY`, `CASE_MODEL`, `JUDGE_MODEL`; optional `ANTHROPIC_WORKSPACE_ID`, `LLM_CONCURRENCY` | Yes |
| TypeSafe Jev | Optional fast classifier that pre-screens each case for severity and checks outgoing messages before they are sent (`src/agent/jev.ts`), called through `@earendil-works/pi-ai`. Fails open: if it errors, the agent carries on and the error is logged. | `TYPESAFE_API_KEY`; `USE_JEV=0` to disable; `JEV_BLOCK_THRESHOLD`, `JEV_MODEL` | No |
| poppler `pdftotext` (local binary, no network) | Extracts text from PDF attachments that have a text layer. Images and scanned PDFs go to Claude natively. | `brew install poppler` | No: without it every PDF is sent to Claude natively instead |
| GitHub + Git LFS | Hosting; `demo/demo.mp4` is stored via LFS. | `brew install git-lfs && git lfs install` before cloning if you want the video | Only for the video |

There is no other hosted infrastructure. The case-side tools are a local in-memory mock in `src/agent/opsTools.ts`; the system sends no real e-mail, SMS or payments. Each tool body is written to be swapped for an agency's real API, with the read-back verification kept. The tools are:

- **Jobs:** `list_tickets`, `get_ticket`, `create_ticket`, `update_ticket`, `cancel_ticket`, `get_property`, `assign_contractor`, `set_visit`, `put_on_hold`, `resume_auto`, `close_ticket`
- **Approvals, quotes and money:** `request_landlord_approval`, `record_landlord_decision`, `record_quote`, `approve_quote`, `record_invoice`, `hold_payment`, `update_bank_details` (always blocked by policy)
- **Work and evidence:** `record_work_result`, `attach_document`, `skip_document`, `confirm_keys_returned`
- **Communication and follow-through:** `send_message`, `request_information`, `log_call`, `schedule_follow_up`, `add_note`, `escalate_to_human`

## 6. Assumptions

- **Case format.** Cases arrive as a folder with `index.md`, `history.md` and optional attachments, in the organisers' public format, and are taken as they come (every event visible) unless `--at` asks for a replay cut. Our own practice format (a `case.md` brief plus input files such as `crm.json`, `tickets.json`, e-mails and documents) is also accepted.
- **"Today" comes from the case.** Questions such as "is this visit in the future" are checked against the date the case states, not the machine clock.
- **The agency is UK-based and the law is as of October 2026.** The policy (`src/core/policy.md`) applies the Renters' Rights Act 2025 (no Section 21 since 1 May 2026), 24 hours' written notice for non-emergency access, the Tenant Fees Act, deposit protection and GDPR. Safety outranks the law, which outranks fraud and data protection, which outrank the landlord's instructions, which outrank preference, which outranks speed and cost.
- **Chargeable work needs the landlord's approval first**, unless it is an emergency make-safe. The agency's own workflow seen in the data (landlord approval → provider selection → booking → visit → quote → approval → completion → invoice → final checks) is the state machine the agent moves cases through.
- **No human is available at runtime.** No tool blocks on a person, and an approval requested during the run cannot arrive before it ends. When an action needs authority the agent does not have, it does the safe parts (telling the parties what is pending, logging, holding a payment, make-safe advice, a dated follow-up), then escalates with a packet stating what is known, what is missing, the options and a recommendation.
- **Tools can fail.** Every write is read back; an unverifiable action is reported as failed, never as done. Transient model-API errors (rate limits, overload) are retried with backoff from the same transcript, so tools that already ran are not repeated.
- **Inbound text is untrusted.** Instructions found inside e-mails or attachments are evidence about the sender, not commands. Template fields (for example `Pets:`) are treated as free text. A message about a different address is never merged into the current case without confirmation.
- **Attachments referenced but not present are treated as absent**; the agent never describes a document it has not seen.
- **The latest verified instruction from the person entitled to give it wins** when parties change their minds, and everyone affected is told.

## 7. Known limitations

- **The tools are mocks.** Decisions and drafted messages are real; delivery is not. Plugging into a real case system means implementing the tool bodies against its API and keeping the read-back verification.
- **Our evaluation grades against our own rubrics with a Claude model.** It measures consistency with the behaviour we specified. Public cases without a hand-written rubric are graded against their recorded ending, which is one acceptable path, not the only one.
- **Small dev split, one run per case.** Tuning used 17 practice cases, 6 public cases and 25 public-case cuts. The held-out split is used for aggregates only. The numbers in section 1 are single runs without tool-failure injection; run-to-run consistency and recovery under injected failures are not reported. Unseen cases of a shape we did not anticipate may behave worse.
- **Pattern-based checks have blind spots.** The wrong-property check recognises unit addresses written like "Flat 9, 3 Amhurst Road"; other address styles pass through to the model's own judgement. The weekday check only applies when the agreed slot names a day.
- **No memory across cases.** Each case is processed alone; duplicate requests for the same property in different cases are not linked, and landlord or contractor preferences are not learned.
- **Attachments.** Images and scanned PDFs go to Claude natively up to the API size limits (5 MB per image, 20 MB per PDF here); larger files are replaced by a note saying so. Every other file type is read as plain text, so binary formats such as Word or Excel files are not understood.
- **Time and cost.** In the section 1 runs a case took about 17–20 seconds and $0.04–0.05 of agent cost with Sonnet 5.5 at concurrency 8, plus grading cost when evaluating. Rate limits on the Anthropic API are the binding constraint for large batches.
- **Identity and verification are policy, not integration.** The agent asks for and records verification; it cannot check anything against an external record.
- **One model provider.** If the Anthropic API is unavailable the batch still completes, but each case is written as "no decision, handed to a human" instead of a decision.

## 8. What we'd build next

1. **A real adapter** for an agency case system (Dwelly's or any CRM with tickets, e-mail and SMS), behind the same tool interface, with the read-back verification kept as the contract.
2. **Scheduled follow-through.** Today a wait records a dated follow-up or hold; a scheduler that re-opens the case on that date and chases automatically would remove most of the 236 holds in the public data.
3. **Cross-case memory** of landlords (approval limits, preferred contractors, responsiveness) and contractors (no-show history), so chase-or-swap decisions get better with volume.
4. **Human feedback into the rubric.** Every escalation packet gets a one-click "right call / should have acted / should have asked" from the person who receives it; those labels become the next evaluation split.
5. **Voice** for the two biggest waits in the data, landlord approval and contractor confirmation, with the call result written back through the same tools and ledger.
6. **A larger mutation corpus** (emergencies, damp and mould under Awaab's Law timelines, tenant vulnerability, access refusal, injected instructions), repeated runs per case to measure consistency, and `pnpm loop` in CI on every pull request.

## Reality Test results
See [`ANSWERS/`](ANSWERS/). Each case contains `ANSWER.md` (decision and actions) and `REASONING.md` (reasoning, tool calls, failures, escalations), generated by the system without manual edits.

## Demo
[`demo/demo.mp4`](demo/demo.mp4)

## License
[Apache 2.0](LICENSE)
