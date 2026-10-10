# Harness v2: the case worker restructured around a harness that enforces, and a model that judges (ExecPlan)

Status: active · Shape: ExecPlan (multi-hour, nine parallel workstreams, cold handoff to subagents) · Owner: Marc · Written 2026-10-10 15:30 BST · Parent: [dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md)

Read [docs/plans/README.md](README.md) for the plan rules. Conventions live in `AGENTS.md` and `.agents/skills/`, not here.

---

## Goal

Restructure the case agent so that reliability on unseen cases comes from the harness, not the prompt. **The model** interprets, weighs evidence, decides and writes to people. **Code** does everything else:

- enforces every rule it can check;
- computes every fact it can derive;
- renders every claim about what was done from the verified action ledger.

The work is split so that up to nine subagents can build it in parallel without editing the same files.

## User-visible outcome

`pnpm cases --in <any case folder> --out <dir>` behaves exactly as today with every v2 flag off. With the v2 flags on, every case in any format goes through the same nine-stage pipeline:

1. **Supervisor**: time-boxes the case, retries, and writes an honest fallback if anything fails.
2. **Ingest**: turns any folder into one `CaseBundle`.
3. **Brief**: compiles a `CaseBrief` with facts, sources and conflicts found by code.
4. **Skills**: classifies the situation and loads the matching playbooks.
5. **Action loop**: typed tools behind tiered guards, with every result read back into the ledger as a typed success or failure.
6. **Completion check**: runs on submit.
7. **Critic**: one revision at most.
8. **Rendering**: `ANSWER.md` and `REASONING.md` built from the structured decision plus the ledger.
9. **Eval taxonomy**: every eval miss is labelled with the layer that should fix it.

A reader of `REASONING.md` can see, for each case:
- the input manifest;
- the brief's conflicts;
- the skills loaded;
- every guard block, with its rule id;
- every failure, with its class;
- every completion problem;
- the critic's findings.

## Context / current state (branch `marc/pre-submit-gap-check` at `af6a276`, 15:25 BST)

Gap map against the agreed target. About two thirds already exists; this plan builds the rest and adds the seams that let the pieces be built in parallel.

| Part | Exists today | Gap this plan closes |
|---|---|---|
| 1 Supervisor | `src/run.ts` (`bounded`, `processCase`, `pool`), `src/runner/{budget,fallback,resume,retries}.ts`, `withRetries` in `caseAgent.ts` L321-334, seeded `chaosPlan` in `src/core/failures.ts` | The crash fallback is generic: no parties, timeline or manifest. Temperature is not pinned or recorded. A malformed `tool_failures.json` crashes the case (`cases.ts` L85). A timed-out run is abandoned but never aborted. |
| 2 Ingest | `LoadedCase` from two loaders: `src/agent/cases.ts` for practice cases, `src/agent/publicCases.ts` for organiser cases. `attachments.ts` handles PDFs and images. | No structured bundle: practice cases have no timeline, parties, typed `now` or manifest. `.eml` files are read as raw text (no MIME or base64 decoding). Unknown binaries become unflagged garbage text. A folder in neither format is unsupported. |
| 3 Brief | `maintenance/stateReconstruct.ts` (`reconstructState`, `renderHints`, `hintsFor`), `dateChecks.ts`, `decisionPoints.ts` | Runs **only for organiser-format cases**. Missing: party/identity table, money reconciliation (quote, approval, invoice, spend limit), name/company/amount conflicts, gate-order conflicts, CRM-vs-history conflicts, statutory deadlines. Questions are not shown up front. Hints are free text, not a typed object. |
| 4 Skills | None. About 227 lines are always on: `systemPrompt.ts`, `core/policy.md` (36 lines, also used by voice), `maintenance/maintenance-policy.md` (141 lines). | No playbooks, no classifier, no `load_skill`. Damp, Awaab's Law, letters of claim, void properties and keys, vulnerable tenants, and identity and privacy have no procedure at all. |
| 5 Tools and guards | 28 ops tools in `opsTools.ts`. `guard` (L509-583) covers bank details, the landlord gate, spend limit and emergency justification, evidence quotes, visit dates, foreign addresses, void-property tenants and closure preconditions. Also `policyBlock` in `caseAgent.ts` L162, the read-back ledger in `ledger.ts`, the Jev classifier gate in `jev.ts`, and a block counter that stops at three blocks. | Missing tools: `verify_identity` and `share_tenant_contact` (with consent) in the ops toolset. No "priority only goes up" rule. The message consistency check covers addresses only, not names, job refs, amounts or dates. No deterministic check for prohibited legal actions. No risk tiers. No typed failure classes. No general loop detector. |
| 6 Completion check | The `submit_decision` branch of `beforeToolCall` (`caseAgent.ts` L231-276) plus `critic/validators.ts` `preCriticProblems` | Missing: a check that every safety risk is addressed, a review date that is valid and in the future, a full escalation-packet check, a check of free-text claims against the ledger, and caps on the ledger checks. |
| 7 Critic | `critic/critic.ts`: separate agent with fresh context and a 16-item checklist, evidence-or-drop, one revision. Off by default. | It does not see the brief or the loaded skills' red flags. |
| 8 Rendering | `report.ts` `renderAnswer` / `renderReasoning`, built from the ledger and `Decision` (`caseAgent.ts` L54-75) | The `Decision` has no structured escalation packet, follow-ups or unknowns. Free text (`summary`, `answers`) is never checked against the ledger. |
| 9 Eval | `src/eval/loop.ts` (splits, profiles, `--k`, `--chaos`, baseline diff), `judge.ts`, `checks.ts`, `summary.ts` | No failure taxonomy that labels which layer should fix a miss. About 37 of the 60 practice cases are gas or CO, so damp, void properties and keys, legal, and unrelated-issue cases are thin. |

Hooks available in `@earendil-works/pi-agent-core` 1.1.0 (`node_modules/@earendil-works/pi-agent-core/dist/agent.d.ts`):
- `beforeToolCall`, which returns `{block, reason, terminate}`;
- `afterToolCall`;
- `finishTurn`;
- `transformContext`;
- `prepareNextTurn` / `prepareNextTurnWithContext`.

`caseAgent.ts` uses only `beforeToolCall`, `afterToolCall`, `subscribe` and `continue`.

In-flight branches (`marc/m5-*`, `marc/gas-co-safety-questions`) touch only `src/voice/**`, `cases/voice-calls/**`, `cases/practice/**`, `cases/splits.json` and `.env.example`. None of them touches a file this plan owns, apart from `cases/splits.json`, which no workstream edits (see Constraints).

## Requirements

1. **No behaviour change with flags off.** Every v2 layer sits behind a flag in `HarnessFlags`, and all flags default to off. Flipping a default is a Wave 3 decision recorded in the Decision log.
2. **One case type.** Every loader produces a `CaseBundle`. `toLoadedCase(bundle)` keeps every existing consumer working until it migrates.
3. **Facts have sources.** Every fact and conflict in the `CaseBrief` cites at least one `SourceId` that resolves to a document or event in the bundle.
4. **Rules that code can check are enforced in code.** Guards run before tools and completion checks run on submit. Both return a reason the model can act on, and both are capped so they cannot loop.
5. **Skills are progressive.** A short always-on constitution, skills chosen by a deterministic classifier, and `load_skill` for anything else mid-run.
6. **Failures are typed.** Every failed tool call is recorded as `retry`, `alternative_route` or `record_and_escalate`, and the model is told the next step.
7. **Reports cannot over-claim.** Anything that renders as done has a verified ledger id. Free-text claims of done actions without a matching verified entry are bounced on submit.
8. **Every eval miss is labelled with a layer.** `pnpm loop` prints a table of misses per layer.

## Non-goals

- Replacing pi-agent-core, adding an orchestrator agent, or adding agent-level subagents. The runtime stays one case agent plus one critic call.
- Changes to `src/voice/**`. Voice still reads `src/core/policy.md`, so that file must keep working for voice.
- New UI. Tuning on `holdout`. Editing `ANSWERS/`.
- Rewriting working parts (ledger, existing guards, runner) beyond what the gaps need.

## Constraints / invariants

- **`main` stays runnable, and the 16:30 Reality Test runs on whatever is on `main` at 16:15.** Harness v2 reaches `main` only through the Wave 3 gate. If the gate is not green by 16:15, v2 waits until after the freeze. (This plan targets the end state regardless of the clock, per Marc at 15:21.)
- `holdout` cases (practice 04, 09, 14, 19, 22; public 031, 036, 041, 045, 048, 050) are never read, used as fixtures, cut or tuned on. Golden tests over the public cases exclude them.
- `cases/splits.json` is edited only by the Wave 2 integrator: one additive change that puts the new practice cases in `expansion`.
- The `Decision` schema is extended additively in Wave 0 only. All new fields are optional.
- Wave 1 workstreams treat `src/agent/harness/contracts.ts` as read-only. A needed contract change goes in the workstream's final report as a request; the integrator applies it.
- `caseAgent.ts`, `run.ts` and the `Decision` schema have one writer per wave (Wave 0 and Wave 2: the integrator; Wave 1: only workstream A, and only for `run.ts`). Changes to them get `/code-review` (or the Bugbot subagent) before merge (AGENTS.md non-negotiable 8).
- **LLM budget.** Wave 1 agents may run at most `--only` with 3 cases and `--profile quick`. They share rate limits with each other and with the 16:30 run. Full loops are Wave 3 only.
- No text addressed to a judge or grader anywhere (rules §13).

## Proposed approach

### Where each kind of rule goes (the routing rule for all fixes, now and later)

| Kind of rule or knowledge | Layer | Module |
|---|---|---|
| Must never happen, checkable from the data | Guard (before the tool runs) | `src/agent/guards/` |
| Must be true before finishing | Completion check | `src/agent/completion/` |
| Facts that can be computed (dates, weekdays, totals, mismatches) | Brief | `src/agent/brief/` |
| How to handle a situation | Skill | `src/agent/skills/*.md` |
| Universal priorities (safety, the law, honesty, escalation is valid) | Constitution | `src/core/policy.md` + slim `systemPrompt.ts` |
| Ambiguous judgement calls | Model, reviewed by the critic | `caseAgent.ts`, `critic/` |
| Reading a new input format | Ingest | `src/agent/ingest/` |

### Seams (built in Wave 0 so that Wave 1 is parallel)

`caseAgent.ts` and `run.ts` stop hard-coding each layer. They call fixed module entry points, which Wave 0 creates as stubs that preserve today's behaviour. Each Wave 1 workstream replaces the stub behind its own entry point and never touches the hot files:

| Entry point (created by Wave 0) | Stub behaviour | Real implementation by |
|---|---|---|
| `src/agent/ingest/index.ts` `ingest(dir, opts): CaseBundle` (synchronous, like `loadCase`), `fromLoadedCase`, `toLoadedCase(b)` | Wraps today's `loadCase` | B |
| `src/agent/brief/index.ts` `compileBrief(b): CaseBrief`, `renderBrief(brief): string` | Puts `hintsFor` text in `brief.notes` | C |
| `src/agent/skills/index.ts` `listSkills()`, `classify(b, brief?)`, `selectSkills(tags)`, `renderSkills(skills)`, `loadSkill(id)` | Returns no skills; `caseAgent.ts` registers `load_skill` only when the `skills` flag is on and `listSkills()` is non-empty | D |
| `src/agent/guards/index.ts` `GUARDS: Guard[]`, `TOOL_TIERS` | Empty array; every tool at tier 1 | E |
| `src/agent/completion/index.ts` `COMPLETION_CHECKS: CompletionCheck[]` | Empty array | F |
| `src/agent/critic/critic.ts` gains a `CriticContext` parameter (`brief?`, `redFlags?`) | Ignores it | G |
| `src/agent/report.ts` renders the new optional `Decision` fields | Ignores them | R |
| `src/eval/taxonomy.ts` `classifyMiss(item, ctx): Layer` | Returns `'unclassified'` | T |

### Contracts (`src/agent/harness/contracts.ts`, written in Wave 0, then frozen)

The file in the repo is authoritative. Wave 0 refined the sketch below as follows:
- `CaseBundle.withheld` is `{ name, reason }[]`, and `CaseBundle` also carries `totalEvents` and `missingAttachments`.
- `GuardContext.bundle` is optional, because voice and tests run without one.
- `CaseBrief.notes: string[]` holds derived lines not yet typed.
- `HarnessRun { flags, bundle?, brief?, skills?, briefText? }` is what `runCase` receives.
- `ToolCall { tool, args }` is the guard input.
- Guards and completion checks are applied by `src/agent/harness/apply.ts` (`firstGuardBlock`, `completionProblems` with a cap per check id). Owners only add entries to the arrays.

```ts
export type SourceId = string; // "doc:inputs/email_tenant.eml", "ev:27", "crm:property.spend_limit"
export type DocKind = 'email' | 'chat' | 'transcript' | 'json' | 'markdown' | 'pdf' | 'image' | 'text' | 'unknown';
export interface CaseDocument { id: SourceId; path: string; kind: DocKind; text: string; parse: ParseInfo; flagged?: string }
export interface TimelineEvent { id: SourceId; at?: string; channel: 'email' | 'sms' | 'whatsapp' | 'call' | 'note' | 'update' | 'hold' | 'other'; from?: string; to?: string; text: string; doc: SourceId }
export interface Party { role: 'tenant' | 'landlord' | 'provider' | 'agency' | 'other'; name?: string; contacts: string[]; sources: SourceId[] }
export interface ManifestEntry { path: string; kind: DocKind; parse: string; included: boolean; note?: string }
export interface CaseBundle {
  id: string; dir: string; format: 'practice' | 'organiser' | 'generic';
  now?: string; brief: string; documents: CaseDocument[]; events: TimelineEvent[]; parties: Party[];
  questions: string[]; seedTickets: unknown[]; failures: FailurePlan; media: unknown[];
  manifest: ManifestEntry[]; withheld: string[]; reference?: string; cutoff?: number;
}

export type SituationTag = 'gas' | 'co' | 'water' | 'electrical' | 'fire' | 'damp_mould' | 'out_of_hours'
  | 'landlord_approval' | 'quote_invoice' | 'contractor_chase' | 'closure' | 'legal_claim' | 'deposit'
  | 'arrears' | 'identity_privacy' | 'vulnerable' | 'void_keys' | 'unrelated_issue' | 'fraud_injection'
  | 'access_entry' | 'compliance' | 'tenancy_lifecycle';
export interface Fact { id: string; kind: string; value: string; sources: SourceId[] }
export type ConflictKind = 'address' | 'name' | 'company' | 'amount' | 'spend_limit' | 'date_past' | 'weekday'
  | 'attachment_missing' | 'gate_order' | 'crm_vs_history' | 'other';
export interface Conflict { kind: ConflictKind; detail: string; sources: SourceId[]; severity: 'info' | 'warn' | 'block' }
export interface Deadline { what: string; due: string; basis: 'promised' | 'hold_review' | 'statutory' | 'sla'; sources: SourceId[] }
export interface Money { quotes: Fact[]; approvals: Fact[]; invoices: Fact[]; spendLimit?: Fact }
export interface CaseBrief { now?: string; stage?: string; parties: Party[]; facts: Fact[]; conflicts: Conflict[];
  deadlines: Deadline[]; money: Money; questions: string[]; tags: SituationTag[] }

export type Tier = 0 | 1 | 2 | 3; // read | internal record | outbound communication | money, legal or closure
export interface GuardContext { bundle: CaseBundle; brief?: CaseBrief; ledger: ActionLedgerView; state: OpsStateView; flags: HarnessFlags }
export interface GuardVerdict { rule: string; reason: string }
export interface Guard { id: string; tools: string[] | '*'; check(call: { tool: string; args: Record<string, unknown> }, ctx: GuardContext): GuardVerdict | undefined }

export interface CompletionProblem { check: string; message: string }
export interface CompletionCheck { id: string; check(decision: Decision, ctx: GuardContext): CompletionProblem[] }

export interface Skill { id: string; title: string; tags: SituationTag[]; whenToUse: string; body: string; redFlags: string[] }
export type FailureClass = 'retry' | 'alternative_route' | 'record_and_escalate';
export type Layer = 'ingest' | 'brief' | 'skill' | 'guard' | 'completion' | 'critic' | 'render' | 'model_judgement' | 'unclassified';

export interface HarnessFlags { ingestV2: boolean; brief: boolean; skills: boolean; guardsV2: boolean; completionV2: boolean; criticContext: boolean }
```

`HarnessFlags` are read in `src/agent/harness/flags.ts` from the `HARNESS` environment variable or `--harness brief,skills,...` (`all` turns everything on). They are written to `run.json` and `result.json`.

### Decision schema additions (Wave 0, additive, all optional)

```ts
escalations?: { to: string; decision_needed: string; options: string[]; recommendation: string; deadline: string; evidence: SourceId[]; already_done: string[]; ledger_id?: string }[];
follow_ups?: { party: string; purpose: string; review_on: string; ledger_id: string }[];
unknowns?: string[];
```

## Parallel execution model

**Waves.** Wave 0 is sequential (one agent, the integrator). Wave 1 is fully parallel (nine agents). Wave 2 is sequential integration. Wave 3 is evaluation, which can be parallel per flag but shares rate limits. Wave 4 fixes the misses Wave 3 finds; it is parallel and uses the same file ownership as Wave 1.

**Branches and worktrees.**
1. Wave 0 commits to `h2/base`, branched from `main`.
2. Each Wave 1 workstream runs as a `best-of-n-runner` subagent, which gets its own worktree and a branch `h2/<ws>` cut from `h2/base`.
3. If the subagent tool cannot base the branch on `h2/base`, run `git worktree add ../dwelly-h2-<ws> -b h2/<ws> h2/base` and point a `generalPurpose` subagent at that directory.
4. In each new worktree, run `npx -y pnpm@8 install --frozen-lockfile` first.

**File ownership in Wave 1.** Nobody edits another workstream's files. Shared reads are fine.

| WS | Name | Owns (sole writer) | Depends on (contracts only) |
|---|---|---|---|
| A | Supervisor | `src/run.ts`, `src/runner/**`, `src/agent/models.ts` | `CaseBundle` |
| B | Ingest | `src/agent/ingest/**`, `src/agent/cases.ts`, `src/agent/publicCases.ts`, `src/agent/attachments.ts`, `src/agent/fixtures/bundles/**` (new) | none |
| C | Brief | `src/agent/brief/**`, `src/agent/maintenance/stateReconstruct.ts`, `src/agent/maintenance/dateChecks.ts`, `src/agent/decisionPoints.ts` | `CaseBundle`; fixture bundles from Wave 0 |
| D | Skills and constitution | `src/agent/skills/**`, `src/agent/systemPrompt.ts`, `src/agent/systemPrompt.test.ts`, `src/agent/maintenance/maintenance-policy.md`, `src/core/policy.md` (voice must still build) | `CaseBundle`, `CaseBrief` |
| E | Tools, guards and failures | `src/agent/guards/**`, `src/agent/opsTools.ts`, `src/agent/opsChecks.ts`, `src/agent/opsSeed.ts`, `src/agent/ledger.ts`, `src/agent/jev.ts`, `src/agent/adapters/toolMap.ts`, `src/core/executor.ts`, `src/core/failures.ts` | `CaseBrief`, `Guard`, `FailureClass` |
| F | Completion checks | `src/agent/completion/**`, `src/agent/critic/validators.ts` | `Decision`, `CaseBrief` |
| G | Critic context | `src/agent/critic/critic.ts`, `src/agent/critic/critic.test.ts` | `CaseBrief`, `Skill` |
| R | Rendering | `src/agent/report.ts`, `src/agent/report.test.ts` | `Decision`, `FailureClass` |
| T | Eval taxonomy and coverage cases | `src/eval/**`, `cases/practice/91..100/**` (new; 25-60 are taken by uncommitted work in the main checkout) | `Layer` |

**Integrator-only files:** `src/agent/caseAgent.ts`, `src/agent/harness/**`, `cases/splits.json`, this plan, `src/agent/*.test.ts` files that test `caseAgent.ts` hooks (`caseAgent.test.ts`, `caseAgent.abort.test.ts`, `criticHook.test.ts`, `policyHooks.test.ts`, `jevGate.test.ts`).

**Subagent prompt template** (fill in `<ws>`; each prompt must be self-contained):

```text
Repo worktree: <path>, branch h2/<ws> (from h2/base). Read docs/plans/harness-v2-implementation-plan.md: the
sections "Proposed approach", "Contracts", "Parallel execution model" and "Wave 1 / WS <ws>". Also read AGENTS.md.
You own ONLY these files: <ownership row>. Do not edit any other file. src/agent/harness/contracts.ts is read-only:
if you need a contract change, describe it in your final report and work around it locally.
Do: implement every deliverable in WS <ws>, add the named tests, run `npx -y pnpm@8 install --frozen-lockfile` once,
then `pnpm verify` until it exits 0. LLM runs: at most `pnpm cases --only <=3 ids> --profile quick`, dev-split ids only,
never holdout ids (practice 04 09 14 19 22; public 031 036 041 045 048 050). Commit on your branch with messages
prefixed "h2(<ws>):". Do not push, do not merge, do not touch main.
Final report: files changed; tests added (names); `pnpm verify` tail output; acceptance criteria met / not met with
evidence; contract change requests; discoveries (unexpected behaviour with evidence).
```

## Implementation plan

### Wave 0: contracts and seams (integrator, sequential, about 45 min, plan mode)

1. Create `src/agent/harness/{contracts.ts,flags.ts}` exactly as specified above. Re-export `ParseInfo`, `FailurePlan`, `Decision`, and read-only views of the ledger and ops state from their current modules. Prove by: `pnpm typecheck`.
2. Create the stub entry points from the seam table. Each stub preserves today's behaviour:
   - `ingest` wraps `loadCase` and fills `documents` and `manifest` from `LoadedCase.inputs`;
   - `compileBrief` wraps `reconstructState`, and `renderBrief` returns `hintsFor`;
   - the other stubs are empty.

   Prove by: `pnpm verify`.
3. Wire `caseAgent.ts` and `run.ts` to the seams, each behind its flag:
   - `run.ts` calls `ingest` (always) and `toLoadedCase`.
   - With `brief` on, the user turn gets `renderBrief` instead of `hintsFor`.
   - With `skills` on, `selectSkills(classify(...))` bodies are appended and `loadSkillTool` is registered.
   - With `guardsV2` on, `GUARDS` run in `beforeToolCall` after the existing `toolset.guard`; blocks share the existing per-tool block counter and are logged in `policyLog` with the rule id.
   - With `completionV2` on, `COMPLETION_CHECKS` run in the `submit_decision` branch next to `preCriticProblems`, under the same cap.
   - With `criticContext` on, the critic gets `{ brief, redFlags }`.

   Prove by: `pnpm verify`; a new test `src/agent/harness/flags.test.ts` (parses `HARNESS=all`, `--harness brief,skills`, defaults off).
4. Extend `Decision` with `escalations?`, `follow_ups?` and `unknowns?`, and add one sentence to the `submit_decision` tool description saying what each is for. Prove by: existing `report.test.ts` and `caseAgent.test.ts` green.
5. Generate fixture bundles for Wave 1 with `src/agent/fixtures/bundles/<id>.json` (a script, `tsx src/agent/harness/dumpBundles.ts`). Use stub `ingest` output for practice 03, 05, 12, 17, 20, 23 and public 002, 025, 047 (all dev). WS B regenerates them with the real ingest when it lands. Prove by: the files exist and parse.
6. Flags-off equivalence. Prove by: `pnpm cases --in cases/practice --only 05,40 --out runs/h2-w0 --profile quick`, then `pnpm cases --in "HackatonPublicCases/Property Management" --only 002 --at auto --out runs/h2-w0-pub --profile quick`. Both decide; `result.json` shows `harness: {}` with all flags false.
7. `/code-review` (or the Bugbot subagent) on the diff, then commit to `h2/base`. Launch Wave 1.

### Wave 1: nine parallel workstreams

**WS A: Supervisor** (owns `src/run.ts`, `src/runner/**`, `src/agent/models.ts`)
- A1. A malformed `tool_failures.json` (or any other optional harness file) is ignored with a manifest note instead of crashing the case. Test: a new case in `src/runner/runner.integration.test.ts`.
- A2. The crash fallback is deterministic. Using whatever ingest produced (or a raw directory listing if ingest itself threw), the fallback `ANSWER.md` states:
  - "escalated (system failure)";
  - the input manifest;
  - the parties;
  - the last 5 timeline events;
  - the case questions, each answered "not processed".

  Test: `src/runner/fallback.test.ts`.
- A3. Temperature is pinned through `models.ts` (0 where the provider allows it, otherwise documented as unsupported). Model ids, thinking level and temperature are written to `run.json`. Test: `src/agent/models.test.ts`, plus `jq '.temperature' run.json` on a smoke run.
- A4. A timed-out case is aborted, not abandoned: its `AbortController` fires and no tool call appears in `trace.jsonl` after the timeout. Test: `src/runner/runner.integration.test.ts` with a fake slow agent.
- A5. `--harness` is passed through to `result.json` (the flags are parsed in Wave 0).

**WS B: Ingest** (owns `src/agent/ingest/**`, `cases.ts`, `publicCases.ts`, `attachments.ts`)
- B1. `ingest()` returns a `CaseBundle` for every folder under `cases/practice`, `cases/public-cuts`, `cases/walks` and `HackatonPublicCases/Property Management` (excluding holdout ids). Every file that is not hidden appears in `manifest`; no file is silently dropped. Test: `src/agent/ingest/ingest.golden.test.ts`.
- B2. `.eml` parsing: From, To, Date and Subject; quoted-printable and base64 bodies decoded; HTML stripped to text; attachments listed in the manifest and passed through `readAttachment`. Test: fixtures in `src/agent/ingest/fixtures/`.
- B3. Practice-format timeline: events extracted with timestamps and sender from `whatsapp.txt`, call transcripts, `.eml`, `call_log.json`, `message_log.json`, `activity_log.txt` and `ai_phone_line_actions.json`. `now` is taken from the case's "Today" line. Parties come from `crm.json` and the message senders, each with sources. Test: the practice 23 bundle has `now` set, at least 2 parties with sources, and events from at least 2 documents. The practice 05 bundle has the landlord, the contractor and the quote email as an event.
- B4. Unknown binaries (`.docx`, `.xlsx`, `.zip`, anything that fails utf8 sanity) are recorded as `kind: 'unknown'`, `parse: 'unparsed'` and flagged; garbage text never reaches the prompt. Test.
- B5. Generic folders: a folder with neither `case.md` nor `index.md` becomes `format: 'generic'`, with a brief built from the file list and the first readable document. Test, plus one smoke run on `src/agent/ingest/fixtures/generic-case/`.
- B6. With `ingestV2` off, `run.ts` calls `fromLoadedCase(loadCase(...))`, so `loadCase` output must stay byte-identical. Put the new parsing behind `ingest()`; don't change `loadCase`. With `ingestV2` on, `toLoadedCase(ingest(dir))` may differ only by additions: decoded `.eml` text, flagged unknown files, generic folders. Test: snapshot equality of `loadCase` before and after the change on all golden folders, plus a test listing the expected differences.

**WS C: Brief** (owns `src/agent/brief/**`, `stateReconstruct.ts`, `dateChecks.ts`, `decisionPoints.ts`)
- C1. `compileBrief` works on practice, organiser and generic bundles. The organiser path reuses `reconstructState`. Test on the fixture bundles in `src/agent/fixtures/bundles/`:
  - practice 05 has a `spend_limit` conflict (quote above the landlord's limit), with the quote and the CRM as sources;
  - practice 20 lists the open water job and the parties from `crm.json`;
  - public 047 still reports the address mismatch.
- C2. Conflict detectors, each with one positive and one negative fixture:
  - `name` (a party name differs between sources);
  - `company` (invoice issuer is not the assigned provider);
  - `amount` (invoice above the approved quote);
  - `spend_limit` (quote above the CRM limit);
  - `gate_order` (provider assigned before approval; invoice dated before the visit);
  - `crm_vs_history` (contact details differ);
  - the existing address, past-date, weekday and missing-attachment detectors, ported to the `Conflict` shape.

  Test: `src/agent/brief/conflicts.test.ts`.
- C3. Money reconciliation (quotes, approvals, invoices, spend limit) with sources. Test on fixtures 05 and 17.
- C4. Deadlines: promised dates, hold review dates, and statutory or SLA deadlines from a table in `src/agent/brief/deadlines.ts`. Every statutory entry cites a section of `research/uk-lettings-rules.md`; nothing is invented. Test.
- C5. `renderBrief` puts the questions first, then conflicts (each with its source ids), deadlines, money, parties and stage. Output is at most 8,000 characters, with conflicts kept when truncating. It never throws: a fuzz test with 200 random partial bundles. Test: `src/agent/brief/render.test.ts`.
- C6. Every `SourceId` in a brief resolves to a document or event in its bundle. Test across all fixture bundles.

**WS D: Skills and constitution** (owns `src/agent/skills/**`, `systemPrompt.ts`, `maintenance-policy.md`, `policy.md`)
- D1. At least 14 skill files `src/agent/skills/<id>.md`, each with front matter (`id`, `title`, `tags`, `when_to_use`, `red_flags`) and the sections `## Procedure`, `## Required actions` (named tools), `## Red flags` and `## Escalate when`:
  - `landlord-approval`, `quote-invoice`, `contractor-chase`, `closure`;
  - `gas-emergency`, `co-alarm`, `water-electrical-fire`, `out-of-hours`;
  - `damp-mould-awaab`, `legal-claim`, `deposit-tenancy-end`, `arrears-breathing-space`;
  - `identity-privacy`, `vulnerable-occupant`, `void-keys-access`, `unrelated-issue-split`, `fraud-injection`.

  Content comes from `maintenance-policy.md`, `research/uk-lettings-rules.md`, `research/agent-tools.md` §2 and `research/pm-case-data-analysis.md` §3, never from holdout cases. Test: `src/agent/skills/skills.lint.test.ts` checks the structure, that tag values are valid `SituationTag`s, and that every tool named under Required actions exists in the ops toolset.
- D2. `classify(bundle, brief)` is deterministic and multi-label (keywords, brief conflicts, CRM fields and "now" outside office hours). Test on dev fixtures:
  - practice 23 gets `gas` and `identity_privacy`;
  - 20 gets `water`;
  - 12 gets `arrears`;
  - 17 gets `quote_invoice` and `fraud_injection`;
  - 05 gets `quote_invoice` and `landlord_approval`;
  - 03 gets `access_entry`;
  - public 047 gets `landlord_approval`.

  Precision guard: public 002 (a routine quote approval) gets no emergency tag.
- D3. `selectSkills` caps the injected skills at 3, ordered by safety first, then legal, then workflow. `load_skill(id)` returns the body; an unknown id returns the list of ids. Test.
- D4. Slim constitution:
  - `maintenance-policy.md` keeps the state machine, the decision vocabulary and the hard rules; procedures move into skills.
  - The always-on prompt drops to at most 130 lines.
  - `skills/README.md` maps every removed section of `maintenance-policy.md` to the skill that now holds it.
  - `policy.md` stays valid for voice.

  Test: `systemPrompt.test.ts` asserts the line cap and that every tool name is still mentioned; `pnpm typecheck` covers `src/voice`.

**WS E: Tools, guards and failures** (owns `src/agent/guards/**`, `opsTools.ts`, `opsChecks.ts`, `opsSeed.ts`, `ledger.ts`, `jev.ts`, `adapters/toolMap.ts`, `src/core/executor.ts`, `src/core/failures.ts`)
- E1. New ops tools:
  - `verify_identity(party, evidence_quote)`: the quote must appear in the inputs;
  - `share_tenant_contact(ticket, provider, consent_quote)`: the consent quote must appear in the inputs;
  - `update_ticket` gains `priority`, which can only go up (a lower priority is blocked with the current value, and a repeat is not counted as a loop).

  Each tool has read-back and a `toolMap.ts` entry. Test: `opsTools.test.ts`.
- E2. `TOOL_TIERS` covers every ops tool; the test fails if any tool is missing. A tier-3 tool (approve, close, cancel, `hold_payment`, `share_tenant_contact`) needs a `justification` argument that cites a `SourceId` or a verbatim quote found in the bundle. Test: `src/agent/guards/tiers.test.ts`.
- E3. `GUARDS` check outgoing messages (`send_message`, `request_information`, `request_landlord_approval`) against the brief. A message is blocked if it:
  - names a person who is not in `brief.parties`;
  - cites a job ref that is not in the tickets;
  - states an amount that is not in `brief.money`;
  - gives a visit date in the past or a weekday that doesn't match its date;
  - discloses tenant contact details to a provider without a verified `share_tenant_contact`.

  Each block has a rule id and a fix hint. Test: `src/agent/guards/message.test.ts`, one positive and one negative per rule.
- E4. Deterministic prohibited-content guard at tier 2. It blocks messages that do any of the following, with a rule id:
  - threaten eviction outside the legal process;
  - announce entry without 24 hours' notice for a non-emergency;
  - tell a tenant to withhold rent;
  - admit liability or offer compensation on a letter of claim;
  - promise deposit deductions;
  - change bank details.

  Test: `src/agent/guards/prohibited.test.ts`. Patterns are kept narrow: each rule has 3 negative sentences that must pass.
- E5. Typed failures. `executor.ts` maps `error`, `timeout` and `silent_drop` (and real exceptions) to a `FailureClass`:
  - a transient failure on its first attempt is `retry`;
  - a channel or provider failure where another route exists is `alternative_route` (another channel, another provider, `log_call`);
  - anything else is `record_and_escalate`.

  The tool result names the class and the next step; the ledger stores it. Test: `src/core/executor.test.ts`.
- E6. Loop detector: the same tool with the same normalised arguments failing twice, or the same read repeated three times, is blocked with "change approach or submit". Test: `src/agent/guards/loop.test.ts`.

**WS F: Completion checks** (owns `src/agent/completion/**`, `critic/validators.ts`)
- F1. `safety_addressed`: if the brief or classifier tags `gas`, `co`, `water`, `electrical` or `fire` (or severity is emergency), the decision must cite a verified emergency action (`escalate_to_human` with `priority` urgent, an emergency contractor or service contact, or a safety message to the occupant), or explain in `assumptions` why none applies.
- F2. `review_dates_valid`: every WAIT, `follow_ups[].review_on` and `put_on_hold.review_on` in the ledger is a parseable date on or after `brief.now`.
- F3. `escalation_packet`: each `escalations[]` entry has `to`, `decision_needed`, at least 2 options, a recommendation, a deadline, at least 1 evidence `SourceId` that resolves, `already_done`, and a `ledger_id` of a verified `escalate_to_human`.
- F4. `no_prose_overclaim`: sentences in `summary` and `answers` that claim a completed action ("I have sent / emailed / assigned / approved / booked / closed / cancelled / paid") must match a verified ledger entry of the corresponding tool family.
- F5. `conflicts_acknowledged`: every brief conflict of severity `warn` or `block` appears in `decision.conflicts` or `assumptions` (fuzzy match on its kind and a key token).
- F6. A shared cap of at most 2 bounces per check id. After the cap, the problem is kept for REASONING as "unresolved check". Test: `src/agent/completion/completion.test.ts`, one positive and one negative per check, plus the cap.

**WS G: Critic context** (owns `critic/critic.ts`, `critic/critic.test.ts`)
- G1. `CriticContext { brief?, redFlags? }`. The rendered brief and the selected skills' red flags are added to the critic prompt as a numbered dynamic checklist after the fixed 16 items. Evidence-or-drop still applies.
- G2. One revision only, and only on the first valid draft (unchanged). The default stays off. Test: `critic.test.ts` checks that red flags appear in the prompt and that a finding without evidence is dropped.

**WS R: Rendering** (owns `report.ts`, `report.test.ts`)
- R1. `ANSWER.md` renders:
  - **Escalations** from `decision.escalations`, joined to `escalate_to_human` ledger entries;
  - **Follow-ups** as a table of party, purpose, review date and ledger status;
  - **Unknowns**.
- R2. Anything without a verified ledger id renders as "not done (reason)", never as done. Test: snapshot fixtures for verified, failed, unverifiable and missing entries.
- R3. `REASONING.md` gains sections for:
  - brief conflicts and deadlines;
  - skills loaded (classifier tags, then the ids);
  - guard blocks by rule id;
  - failures by class;
  - completion problems, including unresolved ones;
  - the critic's dynamic checklist hits.
- R4. A `Decision` without the new fields renders byte-identically to today. Test: existing snapshots unchanged.

**WS T: Eval taxonomy and coverage cases** (owns `src/eval/**`, `cases/practice/61..70/**`)
- T1. `src/eval/taxonomy.ts` `classifyMiss` labels each failed rubric item or failed check with a `Layer`, using deterministic rules over `result.json` (`policyLog`, ledger, the brief's conflicts and tags, skills loaded) plus the item text. For example:
  - a failed `tool_not_called` maps to `guard`;
  - a required conflict missing from the brief maps to `brief`;
  - a correct skill not loaded maps to `skill`;
  - a claim not in the ledger maps to `completion`;
  - a file missing from the manifest maps to `ingest`;
  - otherwise `model_judgement` or `unclassified`.

  Test: `src/eval/taxonomy.test.ts` on fixture `result.json` and `grades.json` files.
- T2. `pnpm loop` writes `taxonomy.json` and prints a table of misses per layer. `--harness <flags>` is passed through to `run.ts`, and the flag set is part of the baseline key so on and off runs are compared separately.
- T3. Ten new practice cases (61-70), each with `case.md`, `inputs/`, `rubric.json`, `checks.json` and `tool_failures.json`:
  - damp and mould with a child (Awaab's Law);
  - void property with keys held by a caretaker;
  - invoice from a different company than the one assigned;
  - landlord asks for a priority downgrade;
  - unrelated issue bundled on a closed job;
  - tenant consent needed to share contacts;
  - vulnerable occupant on a non-gas leak;
  - a letter of claim with a request to admit liability;
  - a generic-format folder (no `case.md`);
  - an `.eml` with a base64 PDF quote.

  Each case gets at least one deterministic check. They are not added to `splits.json` by T.

### Wave 2: integration (integrator, sequential, about 45 min)

1. Merge into `h2/base` in this order, running `pnpm verify` after each merge: B, A, C, E, F, R, G, D, T. Swap each stub for the real entry point as it lands.
2. Apply the contract change requests from the Wave 1 reports. Each is a small commit with its tests.
3. Add `cases/practice/61..70` to the `expansion` group in `cases/splits.json` (additive only).
4. `/code-review` on the combined diff for `caseAgent.ts`, `run.ts` and the schema.
5. Smoke test with every flag on: `HARNESS=all pnpm cases --in cases/practice --only 05,25,40,61,69 --out runs/h2-smoke --profile quick`. All decide, and `REASONING.md` shows the brief, skills, guard and completion sections.

### Wave 3: evaluation and default flips (integrator, about 60 min, shares rate limits)

1. Baseline with flags off: `pnpm loop --split dev --profile final --k 3 --chaos 0.15` must match the saved baseline (no regression exit).
2. All flags on: `HARNESS=all pnpm loop --split dev --profile final --k 3 --chaos 0.15`.
3. Ablation, only if (2) regresses: run `HARNESS=all` minus one flag at a time on the dev cases that regressed.
4. Run the expansion split with all flags on, and read the taxonomy table.
5. **Gate to flip a flag's default to on.** Against flags off, with the flag on:
   - the dev mean is not lower by more than 2;
   - required-met is not lower;
   - critical = 0 and prohibited = 0;
   - coverage is 100%;
   - chaos recovery is not lower;
   - escalation precision is at least 0.8 and recall is 1.0.

   Then run `pnpm loop --split holdout` once with the chosen defaults. It must exit 0 (aggregates only). Record each flip in the Decision log with the numbers.
6. Merge `h2/base` to `main` only after step 5 passes. Before 16:15 this needs Marc's explicit go-ahead; otherwise it happens after the freeze.

### Wave 4: fix the misses (parallel, same ownership as Wave 1)

Each layer in `taxonomy.json` with misses becomes a fix ticket for the workstream that owns that layer. Rerun Waves 2 and 3 on the result.

## Acceptance criteria

- [ ] **H1 Flags-off equivalence.** With no `HARNESS`, `pnpm loop --split dev --profile final` on `h2/base` after Wave 2 exits 0 against the current saved baseline. All existing tests are green.
- [ ] **H2 One case type.** `ingest.golden.test.ts` passes over every non-holdout case folder in the repo, with 0 files dropped from manifests.
- [ ] **H3 Any format runs.** The generic-format fixture and practice 69 (generic) decide with `HARNESS=all` and with flags off; neither is a CRASH.
- [ ] **H4 Sources resolve.** Every `SourceId` in every compiled brief and every `escalations[].evidence` resolves (C6, F3).
- [ ] **H5 Guards.** Every rule in E3 and E4 has a positive and a negative test. No new guard blocks the agent's final, correct action on any dev case: `policyLog` blocks with a v2 rule id are at most 1 per case on average in the Wave 3 all-on run, and none appears in a case whose score drops.
- [ ] **H6 Typed failures.** In the `--chaos 0.15` all-on run, every failed ledger entry has a `FailureClass`, and the failure-recovery rate is not lower than with flags off.
- [ ] **H7 No over-claim.** In the all-on run, 0 answers render an action as done without a verified ledger id. The `no_prose_overclaim` check catches the fixture over-claim in `completion.test.ts`.
- [ ] **H8 Skills.** At least 14 skills pass the lint test. The classifier tests in D2 pass, and the always-on prompt is at most 130 lines.
- [ ] **H9 Taxonomy.** `pnpm loop` prints a table of misses per layer, and `taxonomy.json` exists for every run.
- [ ] **H10 Gate.** Each flag whose default is flipped meets every condition in Wave 3 step 5, with numbers recorded in the Decision log. Flags that miss stay off.
- [ ] **H11 Coverage cases.** Ten new practice cases (61-70) exist with rubric and checks, and sit in the `expansion` group.

## Verification

Run from the repo root (or from the workstream's worktree in Wave 1). Show the output for each.

- [ ] `pnpm verify` exits 0 on every Wave 1 branch, after every Wave 2 merge, and on the final `h2/base`.
- [ ] Named tests, each failing before its workstream and passing after:
  - `src/agent/harness/flags.test.ts`;
  - `src/runner/fallback.test.ts`;
  - `src/agent/models.test.ts`;
  - `src/agent/ingest/ingest.golden.test.ts`;
  - `src/agent/brief/conflicts.test.ts`;
  - `src/agent/brief/render.test.ts`;
  - `src/agent/skills/skills.lint.test.ts`;
  - `src/agent/guards/{tiers,message,prohibited,loop}.test.ts`;
  - `src/core/executor.test.ts`;
  - `src/agent/completion/completion.test.ts`;
  - `src/agent/critic/critic.test.ts`;
  - `src/agent/report.test.ts`;
  - `src/eval/taxonomy.test.ts`.
- [ ] Wave 0 smoke: `pnpm cases --in cases/practice --only 05,40 --out runs/h2-w0 --profile quick` decides both, and `result.json` shows every flag false.
- [ ] Wave 2 smoke: `HARNESS=all pnpm cases --in cases/practice --only 05,25,40,61,69 --out runs/h2-smoke --profile quick` gives 5/5 decisions, and `grep -l "Guard blocks\|Skills loaded\|Brief conflicts" runs/h2-smoke/*/REASONING.md` lists 5 files.
- [ ] Wave 3: the `pnpm loop` commands in Wave 3 steps 1 and 2, then the holdout run. The aggregate lines are pasted into Progress.
- [ ] Crash fallback (A2): `chmod 000` a copy of a case's main file under `runs/tmp-crash/`, run `pnpm cases --in runs/tmp-crash --out runs/tmp-crash-out`, and check that `ANSWER.md` lists the manifest and parties.
- [ ] No judge-directed text: `grep -riE "judge|grader|score this" src/agent src/core | grep -v src/eval` returns nothing addressed to an evaluator.

## Progress

- [x] (2026-10-10 15:30 BST) Target architecture agreed with Marc (end state, critic can send back for one revision, all layers accepted). Gap map done by three read-only exploration passes; plan written.
- [x] (2026-10-10 15:30 BST) Wave 0 on `h2/base` (worktree `../dwelly-h2-base`):
  - contracts, flags, `apply.ts`, the stub entry points, flag-gated wiring in `caseAgent.ts` and `run.ts`, the additive `Decision` fields, and 9 fixture bundles;
  - `pnpm verify`: 33 files and 592 tests green;
  - `pnpm cases --in cases/practice --only 05 --out runs/h2-w0-off`: 1/1 decisions, `result.json` `harness.flags` = "none";
  - `HARNESS=all pnpm cases --in "HackatonPublicCases/Property Management" --only 002 --at auto --out runs/h2-w0-all`: 1/1 decisions, all flags recorded in `run.json`;
  - self-review of the hot-file diff found that `ingestV2` gated nothing. Fixed: with it off, `run.ts` uses `loadCase` directly.
- [ ] Wave 1: A · B · C · D · E · F · G · R · T
- [ ] Wave 2
- [ ] Wave 3
- [ ] Wave 4

## Discoveries

- Observation: the brief (`hintsFor`) only runs for organiser-format cases, so practice-format and unknown-format cases get no derived facts at all. Evidence: `stateInputFromDir` returns `undefined` unless `isPublicCase` (gap-map pass, 15:25).
- Observation: `src/core/policy.md` is also loaded by the voice agent (`src/voice/elevenlabs/config.ts` L14), so slimming the constitution must not break voice. Evidence: grep, 15:28.
- Observation: practice cases 25-60 (and the modified `cases/splits.json`) exist only as uncommitted files in the main checkout (`dwelly-agent`, branch `marc/pre-submit-gap-check`). `main` and every `h2/*` worktree have practice 01-24 only. Wave 1 fixtures and tests therefore use committed dev cases, and new cases are numbered 91-100. Evidence: `ls cases/practice` in `dwelly-h2-base` lists 01-24, and the Wave 0 test on practice 40 failed with ENOENT (15:27).
- Observation: about 37 of the 60 practice cases (including the uncommitted ones) are gas or CO; damp, void properties and keys, legal and unrelated-issue situations have one or two cases each. Evidence: practice theme survey, 15:25.

## Decision log

- Decision: Target the end state, not a pre-freeze subset. Rationale: Marc's choice at 15:21. Mitigation: everything sits behind flags that default to off, and `main` is protected by the Wave 3 gate. Date/Author: 2026-10-10, Marc.
- Decision: The critic can send a decision back for one revision and never acts. Rationale: Marc's choice at 15:21; it matches the existing `critic.ts`. Date/Author: 2026-10-10, Marc.
- Decision: Parallelise through module seams (stub entry points created in Wave 0) rather than letting workstreams edit `caseAgent.ts`. Rationale: `caseAgent.ts` is where every layer meets; one writer per wave avoids merge conflicts and keeps the AGENTS.md review rule cheap. Date/Author: 2026-10-10, Claude for Marc.
- Decision: The skill classifier is deterministic, not an LLM. Rationale: it is reproducible, free, and testable on fixtures; `load_skill` covers what the classifier misses. Revisit if the taxonomy shows `skill` misses caused by wrong tags. Date/Author: 2026-10-10, Claude for Marc.
- Decision: The 16:30 Reality Test runs on `main` as it is at 16:15. Harness v2 reaches `main` only after the freeze, through the Wave 3 gate. Rationale: Marc's choice at 15:24. Date/Author: 2026-10-10, Marc.
- Decision: Wave 0 runs in its own worktree (`../dwelly-h2-base`, branch `h2/base` from `main` at `b8b8d89`), so the main checkout and its uncommitted cases are untouched. Date/Author: 2026-10-10, Claude for Marc.

## Final outcome

(Fill in when the plan completes or is abandoned; then mark `superseded` and promote lessons to `research/` or `README.md`.)
