# M5 (adapter half): organiser API adapter stub with mock fallback

Status: ready to implement once the open questions are accepted · Shape: default plan · Owner: Marc · Written 2026-10-10 12:20 BST by Claude for Marc · Window: steps 1 and 2 are new files and can be built in parallel from 12:45 by whoever is free; step 3 (the `run.ts` wiring) waits for the runner plan's step 3 and lands by 14:30. Time box 45 minutes for steps 1 to 3; step 4 only if time is left; hard stop 15:05.

Parent: [docs/plans/dwelly-case-worker-master-plan.md](../../../../docs/plans/dwelly-case-worker-master-plan.md) (M5 row; section 6 "Format fallback at 16:30": "If an organiser API is supplied, the adapter is switched on by env var; if it fails in the first case, fall back to the mock toolset and say so in REASONING"; section 8 "Are tools supplied?"). Runbook: [.claude/skills/reality-test-run/SKILL.md](../../../../.claude/skills/reality-test-run/SKILL.md) Step 6. Sibling: [src/plans/reality-runner-implementation-plan.md](../../../plans/reality-runner-implementation-plan.md). Conventions: `AGENTS.md`, `docs/plans/README.md`.

---

## Open questions for Marc

Each has a recommended default; if Marc accepts the defaults, the plan is executable as written. Answers go in the Decision log.

| # | Question | Recommended default |
|---|---|---|
| Q1 | Env var names. The runbook says "an env var named in its plan". | `ORGANISER_API_URL` switches the adapter on (unset or empty = today's mock, unchanged). Optional: `ORGANISER_API_KEY` (sent as `Authorization: Bearer <key>`), `ORGANISER_API_TRANSPORT` (`http`, the default, or `mcp`), `ORGANISER_TOOL_MAP` (JSON, see "Mapping table"). British spelling, matching the repo. All four go in `.env.example` with a comment. |
| Q2 | The code is frozen at 16:30. Is filling `ORGANISER_API_URL`, `ORGANISER_API_KEY` and `ORGANISER_TOOL_MAP` in `.env` at 16:33 allowed? | Yes: it is configuration of the submitted system, not a code change, and the README documents it. The rule we hold ourselves to: env values only, no edits to any file under `src/`. If the organiser API needs more than tool renames and argument renames, we do not use it: the run uses the mock and REASONING says so. Marc confirms this reading of rules §6D and §16 at the 16:30 triage if in doubt. |
| Q3 | Support MCP? | Only MCP over HTTP (JSON-RPC `initialize`, `tools/list`, `tools/call`, with a JSON or SSE response), and only as step 4, which is cut first. A stdio MCP server, or anything needing a new npm dependency, means mock. No new dependencies after 15:00. |
| Q4 | Does the fallback trip for the whole run or per case? | For the whole process, on the first transport failure (network error, timeout, HTTP 4xx/5xx, non-JSON). A broken API is usually broken for everyone, and a run that flips between systems per case is harder to explain. Calls made to the organiser before the trip stay recorded as such. |
| Q5 | How is a write to the organiser API verified, when we do not know its read endpoints? | Shadow write: every mapped write is sent to the organiser API **and** executed on the local mock, and the ledger's read-back runs against the mock as today. Evidence lines say `organiser API accepted (HTTP 200)` plus the mock read-back, and REASONING states plainly that read-back is against the local mirror. Claimed actions therefore keep the same verified-ledger guarantee as the mock run. |
| Q6 | Is the adapter worth building at all? The master plan assumes no API is supplied. | Yes, but small: its `run.ts` wiring goes after the runner flags and before the runner's Ctrl-C step, 45 minutes maximum, dropped at 15:05 if not green. If it is dropped, the runbook's Step 6 answer is "mock" whatever the release contains (already written that way). |
| Q7 | HTTP calling convention when the organisers give a base URL and nothing else? | `POST {ORGANISER_API_URL}/tools/{name}` with the arguments as the JSON body; a JSON response. `ORGANISER_TOOL_MAP` can override the method and path per tool (`"POST /messages"`). This is a guess, and the tool map is the escape hatch. |
| Q8 | What does REASONING say when no API is configured? | One line: `Toolset: local mock environment (no organiser API configured).` It is honest, and it lets the runbook's Step 6 pass signal ("REASONING names the toolset") work in both modes. |

---

## Goal

If the organisers hand us a tool API at 16:30, let the frozen system act through it by setting environment variables, with no code change; and if that API fails, finish every case on the local mock toolset and say so in each affected case's REASONING. If they hand us nothing, nothing changes.

## User-visible outcome

- No `ORGANISER_API_URL`: identical behaviour to today, plus the one-line "Toolset: local mock environment" in REASONING and the run's start line.
- `ORGANISER_API_URL` set and working: the start line reads `toolset: organiser API at <host> (http), 12 of 28 tools mapped`; each case's REASONING says `Toolset: organiser API at <host>: 7 calls sent (5 writes, 2 reads), 3 tools local only (add_note, schedule_follow_up, log_call). Writes were also applied to the local mirror, and read-back is against that mirror.`
- `ORGANISER_API_URL` set and failing: the first failure trips the adapter for the rest of the run. That case's REASONING says `Toolset: organiser API at <host> failed on call 2 (send_message: HTTP 404); this and all later calls ran on the local mock environment.` Later cases say `Toolset: local mock environment (organiser API disabled after a failure in case 016: HTTP 404).` `result.json.toolset` carries the same facts as data.
- No case ever fails or stalls because of the adapter.

## Context / current state (main at 46a0dc6, 12:20 BST)

- `src/agent/opsTools.ts` exports `type Toolset = { tools: ToolDef[]; execute(name, args, ctx): Promise<ToolResult>; verify(name, args, result, ctx): Verification; state: OpsState; guard?(name, args) }` and `createOpsToolset(seed)`, the per-case mock with 28 tools. `ToolDef` has `name`, `description`, `parameters` (zod), `kind: 'read' | 'write'`.
- `src/agent/caseAgent.ts` only ever sees a `Toolset`: it calls `execute`, then `verify` after every write, and records the ledger. So an adapter that returns a `Toolset` needs **no change to `caseAgent.ts`**.
- `src/run.ts` builds the toolset per case: `createOpsToolset(seedFromCase(c))`, and passes extra facts to `renderReasoning` through its `checks` bag (screen, gate log, policy log, chaos). PR #11 keeps that bag. The runner-flags plan edits `run.ts` first; this plan's two lines in `run.ts` go in after it.
- Node 22's global `fetch` and `AbortSignal.timeout` are available; no HTTP or MCP library is installed, and none will be added.
- The runbook's Step 6 already detects a supplied toolset (`grep` for URLs, keys, `mcp`) and says what to do if the adapter has not landed. It currently tells the operator to unset the env var and re-run on the mock if the first case errors; with the automatic trip, that manual step becomes unnecessary (updated in step 3).

## Requirements

1. **R1 Off by default.** With `ORGANISER_API_URL` unset or empty, `withOrganiserApi(mock, env)` returns the mock object itself (same reference), and every existing test passes unchanged.
2. **R2 Thin mapping.** A built-in table maps our tool names to likely organiser names (identity by default); `ORGANISER_TOOL_MAP` overrides or extends it per tool with a target name, an optional `"METHOD /path"` and optional argument renames. Tools without a mapping run on the mock only and are reported as "local only".
3. **R3 Fallback on first failure.** A network error, a 10 s timeout, an HTTP status ≥ 400, or a non-JSON body trips the adapter for the whole process; the failing call is then executed on the mock and its result returned to the agent, and every later call goes straight to the mock.
4. **R4 Business refusals are not failures.** A 2xx response whose JSON has `ok: false` or an `error` field is returned to the agent as a failed tool result (no trip, no shadow write), so the ledger records the action as not applied.
5. **R5 Verified ledger unchanged.** Successful mapped writes are shadow-executed on the mock; `verify` is the mock's, with the organiser's HTTP status and returned id prepended to the evidence (Q5).
6. **R6 Say so.** A per-case `AdapterReport` (`mode`, `host`, `transport`, `sent`, `localOnly`, `tripped?: { caseId, call, tool, reason }`) is written to `result.json.toolset` and rendered as one line in REASONING. The run's start line names the toolset.
7. **R7 MCP over HTTP (step 4, optional).** `ORGANISER_API_TRANSPORT=mcp` uses JSON-RPC over HTTP: `initialize` (keeping any `Mcp-Session-Id` header), `tools/list` once to learn names (identity matches and the built-in synonyms map onto them), `tools/call` per call; a JSON body or the first matching `data:` line of an SSE body.
8. **R8 Secrets.** The key is read from the environment only, never logged, never written to `result.json`, REASONING or the trace; error reasons are truncated to 200 characters and scrubbed of the key.

## Non-goals

- Discovering an unknown API's shape automatically (beyond MCP's `tools/list`).
- Reading back state from the organiser API to verify writes.
- Any change to `caseAgent.ts`, the `Decision` schema, the tools' parameter schemas, or the agent prompt. The agent keeps seeing our tool names and descriptions.
- stdio MCP, OAuth flows, websockets, retries against the organiser API (a failure trips; the mock finishes the job).
- Per-case re-enabling after a trip.

## Constraints / invariants

- The adapter never throws out of `execute` or `verify`; every path ends in a mock result.
- The mock's state is always updated for successful writes, so `verify` and later reads behave as in a mock-only run.
- No text addressed to an evaluator in any REASONING line (AC15); the lines state facts about which system was used.
- `.env.example` documents every new variable; the README's external-services section names "organiser-supplied tool API, only if provided at the Reality Test" (M7 owns the README text).
- `run.ts` changes go through `/code-review` with the runner-flags diff or on their own (AGENTS.md rule 8).

## Proposed approach

```
src/agent/adapters/
  organiserApi.ts        # readOrganiserEnv(env) -> Config | undefined; withOrganiserApi(mock, cfg, caseId) -> { toolset, report() }
                         # module-level trip state shared by every case in the process; resetTrip() for tests
  toolMap.ts             # DEFAULT_TOOL_MAP + parseToolMap(json) with zod; resolve(ourName, cfg, remoteNames?) -> Target | undefined
  transport.ts           # httpCall(cfg, target, args) and (step 4) mcpCall(cfg, target, args); both -> { ok, status, body } | throws
  organiserApi.test.ts   # against a fake node:http server on port 0
  toolMap.test.ts
src/run.ts               # cfg read once at start; toolset = withOrganiserApi(createOpsToolset(seed), cfg, c.id); report into result.json and checks.toolset
src/agent/report.ts      # one "Toolset:" line from checks.toolset
.env.example             # the four variables, commented
```

### Mapping table

```ts
// toolMap.ts: our name -> candidate organiser names, first match wins against tools/list (MCP) or used as-is (HTTP)
export const DEFAULT_TOOL_MAP: Record<string, string[]> = {
  send_message: ['send_message', 'send_email', 'send_sms', 'message'],
  request_information: ['request_information', 'send_message', 'send_email'],
  request_landlord_approval: ['request_landlord_approval', 'request_approval', 'send_email'],
  escalate_to_human: ['escalate_to_human', 'escalate', 'handover'],
  list_tickets: ['list_tickets', 'list_jobs', 'search_tickets'],
  get_ticket: ['get_ticket', 'get_job'],
  create_ticket: ['create_ticket', 'create_job'],
  update_ticket: ['update_ticket', 'update_job'],
  assign_contractor: ['assign_contractor', 'assign_provider', 'assign_supplier'],
  approve_quote: ['approve_quote'],
  close_ticket: ['close_ticket', 'close_job', 'complete_job'],
  add_note: ['add_note', 'create_note'],
  // every other tool: identity only
};
```

For HTTP, the first candidate (our own name unless overridden) is used. `ORGANISER_TOOL_MAP` example:

```json
{ "send_message": { "tool": "send_email", "route": "POST /emails", "args": { "body": "text", "recipient_name": "to" } },
  "add_note": null }
```

`null` forces a tool to local only. Argument renames are shallow; unknown keys are passed through. A malformed `ORGANISER_TOOL_MAP` makes `readOrganiserEnv` return `undefined` with a printed warning (`organiser API disabled: ORGANISER_TOOL_MAP is not valid JSON`), so the run proceeds on the mock rather than crashing.

### Call flow in `execute(name, args, ctx)`

1. Tripped, or no target for `name` → `mock.execute(name, args, ctx)`; count as local.
2. Call the organiser (10 s timeout).
3. Transport failure → trip with `{ caseId, call, tool, reason }`, then `mock.execute(...)`.
4. 2xx with `ok: false` or `error` → return `{ ok: false, error: <their message>, organiser: { status } }` (R4).
5. 2xx otherwise → if the tool is a write, `mock.execute(...)` as the shadow; return the mock result merged with `{ organiser: { status, id: body.id ?? body.ref ?? undefined } }`. For reads, return `{ ok: true, ...body }`.

`verify(name, args, result, ctx)` delegates to `mock.verify`, prefixing evidence with `organiser API accepted (HTTP <status>${id ? `, id ${id}` : ''}); ` when `result.organiser` is present. `guard` and `state` delegate to the mock.

## Implementation plan

Order across both M5 plans: new-file steps (runner 1, 2, 5; adapter 1, 2) run in parallel with anything. Edits to `run.ts` are serialized: PR #11, then runner step 3, then adapter step 3, then the runner's Ctrl-C step. Adapter step 4 comes last.

| # | Step | Est. | Prove by (named test) |
|---|---|---|---|
| 1 | `toolMap.ts` and `readOrganiserEnv` (R1, R2, R8) | 10 min | `pnpm test -- src/agent/adapters/toolMap.test.ts`: env without URL → `undefined`; URL plus valid map → config with the override applied; `null` entry → local only; invalid JSON → `undefined` and a warning; the key never appears in `JSON.stringify(config.public)` |
| 2 | `transport.ts` (HTTP) and `organiserApi.ts` (R3 to R6) | 25 min | `pnpm test -- src/agent/adapters/organiserApi.test.ts` against a fake `node:http` server: (a) no URL → the returned toolset `===` the mock; (b) mapped write with 200 → the server received `POST /tools/send_message` with the renamed args and the bearer header, the mock state has the message, `verify` is `verified` with "organiser API accepted (HTTP 200"; (c) server returns 500 on the first call → tripped, the result is the mock's, a second call never reaches the server (request count stays 1), `report().tripped.reason` contains "HTTP 500"; (d) 200 with `{ ok: false, error: "unknown ticket" }` → result `ok: false`, not tripped, mock state unchanged; (e) unmapped tool → server request count 0, `localOnly` lists it; (f) server that never responds → tripped with "timeout" within 11 s (test uses a 200 ms timeout override) |
| 3 | Wiring and wording (R6): two lines in `run.ts`, `result.json.toolset`, the REASONING line, the start line; `.env.example`; runbook Step 6 text (automatic fallback, env var names, pass signal) | 10 min | `pnpm test -- src/agent/adapters/organiserApi.test.ts -t "runCase"`: `runCase` with the faux model, the adapter over the fake server, one `send_message` and a `submit_decision` → ledger entry `verified`, decision accepted; `renderReasoning` with each report shape renders the three expected lines. Then `pnpm verify` |
| 4 | MCP over HTTP (R7, cut first) | 20 min | `organiserApi.test.ts › mcp`: the fake server answers `initialize` with an `Mcp-Session-Id`, `tools/list` with `send_email`, `tools/call` with an SSE body; our `send_message` maps to `send_email`, the session header is sent on `tools/call`, the result is parsed, the ledger entry is verified |

Total: 45 minutes for steps 1 to 3; 65 with step 4. Cut at 15:05: whatever is not green is reverted, and the runbook keeps "mock".

## Acceptance criteria

- [ ] **AC-AD-1 (R1).** With `ORGANISER_API_URL` unset, `withOrganiserApi(mock, readOrganiserEnv(process.env), id).toolset === mock`, and `pnpm verify` passes with no other test changed. Named test: `organiserApi.test.ts › off by default`.
- [ ] **AC-AD-2 (R2, R5).** Given a fake server and `ORGANISER_TOOL_MAP` renaming `body` to `text`, when the agent's `send_message` runs, then the server receives the renamed argument, the ledger entry is `verified`, and its evidence starts with "organiser API accepted (HTTP 200". Named test: `organiserApi.test.ts › mapped write`.
- [ ] **AC-AD-3 (R3, master plan section 6).** Given a server answering 500, then the first call trips the adapter, that call and every later call (in this and later cases in the same process) run on the mock, the server sees exactly one request, and the case still reaches a decision. Named test: `organiserApi.test.ts › trips on first failure`.
- [ ] **AC-AD-4 (R4).** Given a 200 with `ok: false`, the agent gets a failed result, the adapter is not tripped, and the ledger records the action as not applied. Named test: `organiserApi.test.ts › business refusal`.
- [ ] **AC-AD-5 (R6, runbook Step 6 pass signal).** `REASONING.md` has exactly one line starting `Toolset:` in each of the three modes (mock, organiser, tripped), and `result.json.toolset.mode` is `mock` or `organiser` with `tripped` present after a trip. Named test: `organiserApi.test.ts › reasoning line`.
- [ ] **AC-AD-6 (R8).** With `ORGANISER_API_KEY=sk-test-123`, the string `sk-test-123` appears in no file the run writes. Named test: `organiserApi.test.ts › key never written` (renders the report and REASONING line and searches them); plus the manual grep in Verification.
- [ ] **AC-AD-7 (R7, only if step 4 ships).** Named test: `organiserApi.test.ts › mcp`.

## Verification

Run from the repo root and show the output.

- [ ] `pnpm verify` exits 0.
- [ ] `pnpm test -- src/agent/adapters/` passes (AC-AD-1 to AC-AD-6, and AC-AD-7 if built), offline.
- [ ] Mock mode, live: `pnpm cases --in cases/practice --only 01 --out runs/ad-mock` then `grep -c "^Toolset: local mock" runs/ad-mock/01/REASONING.md` prints `1` (needs a key).
- [ ] Tripped mode, live: `ORGANISER_API_URL=http://127.0.0.1:9 pnpm cases --in cases/practice --only 01,02 --out runs/ad-trip --concurrency 1` (port 9 refuses connections; concurrency 1 makes the order deterministic) shows a decision for both cases, the start line names the organiser API, `01`'s REASONING names the failure and `02`'s says the API was disabled after a failure in case 01; `jq .toolset runs/ad-trip/*/result.json` shows `tripped` (needs a key).
- [ ] `ORGANISER_API_KEY=sk-test-123 ORGANISER_API_URL=http://127.0.0.1:9 pnpm cases --in cases/practice --only 01 --out runs/ad-key; grep -r "sk-test-123" runs/ad-key` prints nothing (AC-AD-6).
- [ ] `grep -E "ORGANISER_API_(URL|KEY|TRANSPORT)|ORGANISER_TOOL_MAP" .env.example` lists all four.
- [ ] `/code-review` on the `run.ts` and `report.ts` diff before the PR.

## Risks

| Risk | Mitigation |
|---|---|
| The organiser API's shape is nothing like our guess | That is the expected case; the trip makes it harmless, and Q2 limits what we will configure at 16:30. |
| Shadow writes make the mock and the organiser disagree | Read-back is stated as against the local mirror; the ANSWER's claims are about actions the agent took, which both systems received. |
| A slow organiser API eats the case budget | 10 s per-call timeout, and the first timeout trips the adapter for the whole run. |
| The trip state leaks between tests | `resetTrip()` in `beforeEach`. |
| Time: the adapter competes with the rehearsal | Hard stop at 15:05; it is the lowest-value M5 item unless the release supplies an API. |

## Decision log

- Decision: the adapter wraps the mock `Toolset` rather than replacing it, so `caseAgent.ts` is untouched and the verified ledger keeps working.
  Rationale: the agent loop only ever sees the `Toolset` interface; a wrapper is the smallest change that keeps every invariant. Date/Author: 2026-10-10 12:20, Claude for Marc.
- Decision: open questions Q1 to Q8 are pending Marc's answers; the defaults are the plan of record until he answers.
  Rationale: hackathon exception in `docs/plans/README.md`. Date/Author: 2026-10-10 12:20, Claude for Marc.
