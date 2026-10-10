# pi (Earendil) agent framework: research for the Dwelly Real-World Agents Hackathon

Researched 2026-10-09. Sources: the GitHub repo (shallow clone at commit `f1b2e77`, 2026-10-09), the npm registry, and the web pages linked inline.
Labels: **[verified]** means I read it in source/docs or ran it locally. **[unverified]** means docs or secondary sources only, not tested.

---

## 0. TL;DR

- **Name, owner and repo:** "pi" (pi.dev), started by Mario Zechner (badlogic, libGDX author). Earendil, the Vienna PBC of Armin Ronacher and Colin Daymond Hanna, took it over on 2026-04-08. The repo moved from `badlogic/pi-mono` to **`github.com/earendil-works/pi`** (~114k stars). npm scope changed from `@mariozechner/*` to **`@earendil-works/*`**, and the old `@mariozechner/pi-coding-agent@0.73.1` is deprecated. **[verified]**
- **Current version:** **1.1.0** for all packages, published 2026-10-07. 1.0.0 was 2026-10-01. **[verified: npm]**
- **License:** **MIT** for all published packages. You can use it inside an Apache-2.0 project: keep pi's MIT copyright notice in `node_modules` / NOTICE. **[verified]**
- **What to use for the hackathon:** use `@earendil-works/pi-agent-core` (the `Agent` class) together with `@earendil-works/pi-ai` (the providers). This gives a small, typed agent loop with TypeBox tools, parallel tool execution, `beforeToolCall` / `afterToolCall` hooks, an event stream, abort, and per-message token/cost usage. Do **not** use the coding-agent CLI. Its persona is "coding agent with read/bash/edit/write", which we don't want.
- **Tested:** I ran a skeleton end-to-end with the built-in **faux provider** (no API key) and typechecked it with `tsc --strict` (section 7). I did **not** run a live Claude call because no `ANTHROPIC_API_KEY` was available. **[live Claude call unverified]**

---

## 1. What pi is

### 1.1 Provenance
| Fact | Source |
|---|---|
| Started by Mario Zechner as a reaction to Claude Code becoming "a spaceship with 80% of functionality I have no use for" | https://www.implicator.ai/pi-is-not-a-claude-code-rival-it-is-a-harness-rebellion/ , https://mariozechner.at/posts/2025-11-30-pi-coding-agent/ |
| Mario joined Earendil and brought pi with him (2026-04-08). Earendil says it wants pi "to continue to exist as a high-quality, open, extensible piece of software" | https://lucumr.pocoo.org/2026/4/8/mario-and-earendil/ |
| Earendil also launched "Lefos" (an AI assistant product) at the same time | same as above; also implicator.ai |
| pi is the engine behind OpenClaw | https://github.com/earendil-works/pi (coding-agent README) |
| Repo: `earendil-works/pi`, description "AI agent toolkit: unified LLM API, agent loop, TUI, coding agent CLI" | GitHub API **[verified]** |

### 1.2 Packages (monorepo `packages/`, all v1.1.0) **[verified]**
| npm package | Role | Relevant for us? |
|---|---|---|
| `@earendil-works/pi-ai` | Unified multi-provider LLM API: streaming, tools, thinking, usage/cost, abort, faux test provider | **Yes** |
| `@earendil-works/pi-agent-core` | `Agent` class plus `agentLoop`: tool calling, state, events, steering/follow-up queues, hooks | **Yes (core)** |
| `@earendil-works/pi-coding-agent` | The `pi` CLI and SDK (`createAgentSession`): sessions (JSONL), extensions, skills, compaction, retries, print/JSON/RPC modes | Optional |
| `@earendil-works/pi-tui` | Terminal UI with differential rendering | No |
| `@earendil-works/pi-telemetry` | Vendor-neutral spans/telemetry contracts, in-memory reference impl | Maybe |
| `@earendil-works/pi-mcp`, `pi-codemode` | MCP client; "codemode" (model writes JS that calls tools) | Only if tools come as MCP |
| `@earendil-works/pi-durable`, `chord`, `pi-server`, `pi-client`, `pi-protocol`, `pi-env`, `pi-evals` | Durable runtime, app composition, server/client protocol, evals | No (too new and heavy for one day) |

Requires **Node >= 22.19**. **[verified: package.json engines]**

### 1.3 Core abstractions
- **Models / providers (pi-ai).** You create a `Models` collection with `createModels()` and register providers on it with `setProvider(anthropicProvider())`. Then call `models.getModel("anthropic", "<id>")`, and `models.stream()`, `complete()`, `streamSimple()` or `completeSimple()`. Each provider owns its catalog, its auth (env var or OAuth) and its wire API (`anthropic-messages`, `openai-responses`, ...). The context is plain serializable data (`{ systemPrompt?, messages, tools }`) and can be handed between providers mid-conversation. **[verified: README + run]**
- **Messages.** `user`, `assistant` (content blocks: `text`, `thinking`, `toolCall`; plus `usage`, `stopReason`, `errorMessage`), `toolResult` (`toolCallId`, `content`, `isError`) and `system` (a leading prompt, which later system messages can patch via `sections`). The agent-level `AgentMessage` can be extended with custom roles through TypeScript declaration merging. A `convertToLlm()` step filters those custom roles out before each call. **[verified]**
- **Agent loop (pi-agent-core).** `new Agent({ initialState: { systemPrompt, model, tools, thinkingLevel }, streamFn })`, then `await agent.prompt(...)`. The loop runs LLM → tool calls → tool results → LLM until there are no more tool calls. **[verified]** Hooks:
  - `beforeToolCall` runs after argument validation. It can **block** a call with a reason, and optionally `terminate`.
  - `afterToolCall` can rewrite the result or details, or set `terminate`.
  - `prepareRequest` rebuilds the context before every provider request.
  - `finishTurn` returns `{action: "end" | "continue"}`.
  - `transformContext` handles pruning and compaction.
- **Events.** `agent_start`, `turn_start`, `message_start`, `message_update` (streaming deltas), `message_end`, `tool_execution_start`, `tool_execution_update`, `tool_execution_end`, `turn_end`, `agent_end`. Subscribe with `agent.subscribe(fn)`. Listeners are awaited in order. **[verified]**
- **Steering and follow-up.** `agent.steer(msg)` injects a message after the current turn. `agent.followUp(msg)` runs after the agent would otherwise stop. **[verified: docs]**
- **Sessions (coding-agent only).** Append-only **JSONL tree** files (`id` / `parentId`, branches, compaction entries) at `~/.pi/agent/sessions/...`, or `SessionManager.inMemory()`. `session.getSessionStats()` returns tokens and cost. `session.exportToHtml()` exists. **[verified: source]**
- **Extensions (coding-agent).** TypeScript modules (`export default (pi: ExtensionAPI) => {...}`) can register tools, commands, providers, event handlers and UI. They are loaded via `jiti`, so no build step is needed. Skills are on-demand instruction files. **[verified: docs]**

### 1.4 Philosophy
Source: https://mariozechner.at/posts/2025-11-30-pi-coding-agent/ and CONTRIBUTING.md.
- System prompt under ~1,000 tokens, and only 4 built-in tools: `read`, `write`, `edit`, `bash`.
- Left out on purpose: MCP (it costs context; Mario prefers CLI tools plus a README), built-in plan mode, to-do lists ("confuse models more than they help"), permission prompts ("full YOLO mode"), background bash, and sub-agents (no visibility). MCP and codemode have since been **added back as optional extensions** (`pi-mcp`, `pi-codemode`). **[verified: repo]**
- "pi's core is minimal. If your feature does not belong in the core, it should be an extension."
- Observability first: everything the agent does should be inspectable. This fits our REASONING/trace requirement.

---

## 2. Install and usage

### 2.1 Install
```bash
pnpm add @earendil-works/pi-agent-core@1.1.0 @earendil-works/pi-ai@1.1.0
# optional: the full SDK (sessions, retries, extensions)
pnpm add @earendil-works/pi-coding-agent@1.1.0
# CLI (not needed for us):  npm i -g --ignore-scripts @earendil-works/pi-coding-agent
```
TypeBox is re-exported from pi-ai (`Type`, `Static`, `TSchema`, plus the `StringEnum` helper). pi-ai depends on `typebox@1.3.27` (the new `typebox` package name, **not** `@sinclair/typebox`). **[verified]**

**Gotcha:** the packages are ESM and the examples use top-level `await`. Set `"type": "module"` in `package.json`, or tsx/tsc will error. **[verified: I hit this]**

### 2.2 Minimal library usage (pi-agent-core)
From `packages/agent/README.md` **[verified]**:
```ts
import { Agent } from "@earendil-works/pi-agent-core";
import { createModels } from "@earendil-works/pi-ai";
import { anthropicProvider } from "@earendil-works/pi-ai/providers/anthropic";

const models = createModels();
models.setProvider(anthropicProvider());           // reads ANTHROPIC_API_KEY
const model = models.getModel("anthropic", "claude-sonnet-5-5")!;

const agent = new Agent({
  initialState: { systemPrompt: "You are a helpful assistant.", model, tools: [] },
  streamFn: models.streamSimple.bind(models),
});
agent.subscribe((e) => {
  if (e.type === "message_update" && e.assistantMessageEvent.type === "text_delta")
    process.stdout.write(e.assistantMessageEvent.delta);
});
await agent.prompt("Hello!");
```
See section 7 for the full custom-tool skeleton.

### 2.3 Higher-level SDK (pi-coding-agent)
```ts
import { createAgentSession, SessionManager, SettingsManager } from "@earendil-works/pi-coding-agent";
const { session } = await createAgentSession({
  model, thinkingLevel: "medium",
  noTools: "builtin",                 // drop read/bash/edit/write, keep custom tools
  customTools: [/* ToolDefinition via defineTool() */],
  sessionManager: SessionManager.create(cwd, "./traces/sessions"), // JSONL on disk
  settingsManager: SettingsManager.inMemory({ compaction: { enabled: false }, retry: { enabled: true, maxRetries: 2 } }),
  resourceLoader: /* custom loader to replace the coding system prompt; see examples/sdk/03 and 12 */,
});
await session.prompt("...");
session.getSessionStats(); // tokens + cost
session.dispose();
```
- Options are verified in `packages/coding-agent/src/core/sdk.ts` (`noTools`, `tools`, `excludeTools`, `customTools`, `sessionManager`, `settingsManager`, `resourceLoader`). This exact combination was **[unverified: not run]**.
- Benefits over the bare Agent: built-in **retry with backoff** (`retry.maxRetries` defaults to 3, `baseDelayMs` 2000), the `agent_settled` event, JSONL session files, and HTML export.
- Cost: it loads the coding-agent resource discovery. You have to override the system prompt (`systemPromptOverride` + `appendSystemPromptOverride: () => []`) and suppress AGENTS.md and skills discovery, otherwise the coding persona and files from `~/.pi` leak in.

### 2.4 Headless / batch modes (CLI) **[verified: docs]**
| Mode | Command | Output |
|---|---|---|
| Print | `pi -p "prompt"` (also auto-selected when stdout is redirected) | Final assistant text only |
| JSON | `pi --mode json "prompt" > events.jsonl` | Session header + JSONL events, then exits |
| RPC | `pi --mode rpc` | JSONL commands on stdin (`prompt`, `steer`, `abort`, `get_state`, `get_session_stats`, `export_html`, `set_model`, ...), events on stdout |

Useful flags: `--model sonnet:high`, `--tools read,grep`, `--no-session`, `--session-dir`, `--extension ./tools.ts` (custom tools via extension).
- **Gotcha:** parse JSON/RPC output by splitting on `\n` only. The docs warn that Node `readline` is unsafe here because it also splits on Unicode line separators.

For our use case the in-process library is simpler than spawning the CLI.

---

## 3. Anthropic / Claude support, model config, cost

- **Provider:** `anthropicProvider()` from `@earendil-works/pi-ai/providers/anthropic`. It uses the `anthropic-messages` API through `@anthropic-ai/sdk@0.129.0`. Auth comes from `ANTHROPIC_API_KEY` or `ANTHROPIC_OAUTH_TOKEN`. **[verified]**
- **Claude model IDs in the bundled catalog** (pi-ai 1.1.0 dist) **[verified]**: `claude-opus-5-5`, `claude-sonnet-5-5`, `claude-haiku-5-5` (new in 1.1.0), `claude-fable-5-1`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-sonnet-4-6`, `claude-haiku-4-5`, and others. All 5.x entries list a 1M-token context, 128k max output and `reasoning: true`.
- **Catalog prices (USD per 1M tokens, input/output)** **[unverified: copied from pi's catalog, which a 2026-10-08 commit sources from models.dev; confirm against Anthropic's pricing page before quoting]**:

  | Model | Input | Output |
  |---|---|---|
  | opus-5-5 | 4 | 20 |
  | sonnet-5-5 | 2 | 10 |
  | haiku-5-5 | 0.10 | 0.50 (tiered above 100k input) |
  | fable-5-1 | 10 | 50 |
- **Thinking:** `thinkingLevel: "off" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max"`, clamped to what the model supports. You can set custom `thinkingBudgets`. Claude 5.5 models use adaptive thinking (changelog). **[verified: docs]**
- **Strict tool schemas:** `constrainedSampling: { type: "json_schema", strict: "prefer" }` on a tool turns on provider-side strict schemas. The README lists Anthropic as supported. Useful for the `submit_decision` tool. **[verified: docs; not run against Claude]**
- **Prompt caching:** pass `sessionId` to the Agent for provider caching. Usage reports `cacheRead` / `cacheWrite` (and `cacheWrite1h` for Anthropic). **[verified: types]**
- **Token and cost tracking:** every `AssistantMessage.usage` has `{input, output, cacheRead, cacheWrite, reasoning?, totalTokens, cost: {input, output, cacheRead, cacheWrite, total}}`. Sum it over `agent.state.messages`, or use `session.getSessionStats()` in the SDK. **[verified: ran it; faux cost was 0]**

---

## 4. Tools, errors, abort/timeouts, parallelism

### 4.1 Tool format **[verified: ran]**
```ts
const Params = Type.Object({ query: Type.String({ description: "..." }) });
const tool: AgentTool<typeof Params> = {
  name: "lookup_tenant", label: "Lookup tenant", description: "...",
  parameters: Params,
  executionMode: "parallel" | "sequential",      // optional per-tool override
  execute: async (toolCallId, params, signal, onUpdate) => ({
    content: [{ type: "text", text: "..." }],    // what the model sees
    details: { ... },                            // structured data for us/UI/traces (not sent to model)
    terminate?: true,                            // hint: stop the loop after this batch
  }),
};
```
- Arguments are validated against the TypeBox schema before `execute` runs. Validation failures go back to the model as tool errors.
- Use the `StringEnum([...])` helper rather than `Type.Enum` (the docs recommend it for Google compatibility; it is harmless for Claude).
- In the coding-agent SDK the equivalent is `ToolDefinition` / `defineTool()`. It adds an `outputSchema`, `promptSnippet` / `promptGuidelines` (extra system-prompt lines) and a `ctx` argument. **[verified: types.ts]**

### 4.2 Error handling **[verified: ran]**
- **Throw** from `execute` to signal failure. The agent catches the error and sends the model a `toolResult` with `isError: true` and the error message, and the model can retry or adapt. In my run, a simulated `CRM 503` came back as an error result, and the scripted model retried and then escalated.
- LLM/request errors **never throw** from the stream. The final assistant message gets `stopReason: "error" | "aborted"` and an `errorMessage`, and `agent.state.errorMessage` is set. Check this after `await agent.prompt()`.
- **Retries:** the bare `Agent` has no automatic LLM retry (only `maxRetryDelayMs` to cap provider-requested delays), so wrap `prompt()` yourself or use the SDK session (`retry.*` settings, default 3 retries with exponential backoff). **[verified: settings.md, agent.ts]**

### 4.3 Abort / timeouts
- `agent.abort()` cancels the run. Tools receive an `AbortSignal`, so pass it to `fetch`. Aborted messages have `stopReason: "aborted"`. **[verified]**
- There is **no per-run wall-clock timeout** built in. Use `setTimeout(() => agent.abort(), ms)` (done in the skeleton).
- The SDK has HTTP-level settings: `httpIdleTimeoutMs` (300 s) and `retry.provider.timeoutMs`. **[verified: settings.md]**
- For per-tool timeouts, use `AbortSignal.any([signal, AbortSignal.timeout(10_000)])` inside `execute`.

### 4.4 Parallelism
- **Within one agent:** tool calls from a single assistant message run in **parallel by default** (`toolExecution: "parallel"`). If any tool in the batch is marked `executionMode: "sequential"`, the whole batch runs sequentially. Tool results are persisted in source order. Mark state-mutating tools (`create_ticket`, `send_email`) as sequential. **[verified: docs]**
- **Across cases:** create one `Agent` instance per case and run N in parallel with a small concurrency pool (e.g. `p-limit(5)`). Agents share no state, but the `Models` collection can be shared. **[design; concurrency itself not tested]**
- `terminate: true` is honoured only if **every** tool result in the batch sets it. **[verified: docs + ran]**

---

## 5. Logging / tracing for REASONING.md

- **Bare Agent:** subscribe to all events and write them as JSONL (`trace.jsonl`). Drop `message_update` deltas, since `message_end` holds the full message. Use `tool_execution_start` / `tool_execution_end` for tool calls and results, and `turn_end` for per-turn boundaries. `agent.state.messages` is the full transcript, including `thinking` blocks when thinking is on. Turning these into a human-readable REASONING.md (timeline of steps, tools, errors and decision) takes about 30 lines of code. **[verified: ran]**
- **SDK session:** persisted JSONL tree (`type: "session"` header, then `message`, `model_change`, `compaction`, `custom` entries, ...), documented in `docs/session-format.md`. `session.exportToHtml(path)` gives a clickable trace, which is nice for the demo. **[verified: source; HTML export not run]**
- **pi-telemetry:** `TelemetryContext` / spans with an in-memory reference adapter, if we want OpenTelemetry-style spans. Probably overkill for a single day.

---

## 6. License, maturity, gotchas, recent changes

- **License:** MIT, "Copyright (c) 2025 Mario Zechner". All published packages say MIT (`pi-evals` has no license field and is not needed). MIT dependencies inside an Apache-2.0 project are fine: keep the MIT notice (e.g. add a THIRD_PARTY_NOTICES section). Our own code stays Apache-2.0. **[verified]**
- **Maturity:** very active.
  - 1.0.0 shipped 2026-10-01, followed by five releases in one week up to 1.1.0 (10-07). Commits landed daily (the latest on 10-09).
  - About 114k stars. Used in production by OpenClaw.
  - The **API churns**: the 0.8x → 1.0 line removed `shouldStopAfterTurn` (now `finishTurn`), moved the system prompt into transcript system messages, and introduced the `createModels()` collection that replaced the old global `getModel()` (still available via `@earendil-works/pi-ai/compat`).
  - **Pin exact versions** (`1.1.0`).
- **Gotchas found:**
  1. ESM-only. `"type": "module"` is needed for top-level await.
  2. Blog posts, older tutorials and LLM memory use `@mariozechner/*` names and the global `getModel()` API. Use the new scope and `createModels()`.
  3. `createAgentSession` defaults to a coding agent: built-in tools, AGENTS.md, `~/.pi` settings and skills. Override them all, or use the bare `Agent`.
  4. The bare Agent has no automatic retry.
  5. The SDK starts with persistent sessions in `~/.pi/agent/sessions`. Pass `sessionDir` or `inMemory()`.
  6. New-contributor issues and PRs are auto-closed, so don't count on upstream fixes during the event.
  7. The JSON/RPC stream must be split on LF only.
  8. Partial `message_update` events carry a mutable shared `partial` object. Don't store it; use `message_end`.
- **Recent changes (1.1.0, 2026-10-07):** Claude Haiku 5.5 added, `agent_settled.aborted`, `durationMs` on `tool_execution_end` (extension events), `+name` / `-name` tool selection, OSC 7501 status. Unreleased: Mistral timeout fix, AGENTS.md symlink fix. Source: `packages/coding-agent/CHANGELOG.md`.

---

## 7. Hackathon plan

### 7.1 Architecture
```
cases/ (calls, emails, docs, CRM, tickets)  ──►  batch-runner.ts
                                                   │  p-limit(N) concurrency, per-case timeout + 1 retry
                                                   ▼
                                     runCase(case) ── new pi Agent per case
                                       ├─ system prompt: PM policy + escalation rules + output contract
                                       ├─ domain tools (TypeBox): read-only lookups (parallel)
                                       │     get_case_materials, search_crm, get_lease, get_ticket,
                                       │     get_property, search_docs, check_vendor_availability
                                       ├─ action tools (sequential, idempotency key, dry-run guard):
                                       │     create_ticket, update_ticket, dispatch_vendor, send_message,
                                       │     schedule_visit, log_note
                                       ├─ escalate_to_human (sequential; reason, urgency, owner)
                                       ├─ submit_decision (sequential, strict schema, terminate:true)
                                       ├─ beforeToolCall: safety policy (block payouts > X, legal threats,
                                       │     emergencies must escalate, no PII leaks) → returns block reason to model
                                       └─ subscribe → trace.jsonl
                                                   ▼
                                     writers: ANSWERS/<n>/ANSWER.md, REASONING.md, trace.jsonl, usage.json
```
Design notes, mapped to the scoring:
- **Correct outcomes and coverage (38.5):**
  - Force a single `submit_decision` call with an enum `outcome` (resolved / action_taken / escalated / needs_info). If the model ends without calling it, `finishTurn` returns `{action: "continue"}` once with a reminder, which guarantees every case writes an ANSWER.
  - Wrap the whole runner in try/catch so a crash still writes an ANSWER that says "escalated: agent failure".
- **Judgement and safety (14):**
  - Encode the escalation policy in `beforeToolCall`. Blocked calls return a reason, and the model adapts. That makes it deterministic and visible in the trace.
  - Require `confidence` and `assumptions[]` in the decision. Escalate automatically below a threshold.
- **Engineering quality (10.5):**
  - Typed tools, tests with `fauxProvider` (deterministic scripted runs, no API cost), and retries/timeouts.
  - Use a mutating-tool idempotency key, since recovering from failed actions is explicitly judged.
- **Applicability (7) and demo (30):**
  - Stream events to a small live view (terminal or web) showing tool calls as they happen.
  - Show `usage.json` with cost per case.

Model choice:
- `claude-sonnet-5-5` with `thinkingLevel: "medium"` for case agents.
- Optionally a `claude-opus-5-5` second-pass "reviewer" on escalations or low-confidence cases.
- Use a cheap model (`claude-haiku-5-5`) for triage/classification if volume is high.

All of these choices are **[design, unverified]**.

### 7.2 Code skeleton (verified with faux provider + `tsc --strict`)
```ts
// src/case-agent.ts   (package.json: "type": "module")
import { Agent, type AgentTool, type AgentEvent } from "@earendil-works/pi-agent-core";
import { createModels, Type, StringEnum, type Static } from "@earendil-works/pi-ai";
import { anthropicProvider } from "@earendil-works/pi-ai/providers/anthropic";

const models = createModels();
models.setProvider(anthropicProvider());
export const MODEL = models.getModel("anthropic", "claude-sonnet-5-5")!;

const LookupParams = Type.Object({ query: Type.String({ description: "Name, email, phone or unit" }) });
const lookupTenant: AgentTool<typeof LookupParams> = {
  name: "lookup_tenant", label: "Lookup tenant",
  description: "Find tenant and lease records in the CRM.",
  parameters: LookupParams,
  execute: async (_id, p, signal) => {
    const res = await fetch(`${process.env.CRM_URL}/tenants?q=${encodeURIComponent(p.query)}`,
      { signal: AbortSignal.any([signal ?? new AbortController().signal, AbortSignal.timeout(10_000)]) });
    if (!res.ok) throw new Error(`CRM ${res.status}: ${await res.text()}`);   // -> isError tool result
    const data = await res.json();
    return { content: [{ type: "text", text: JSON.stringify(data) }], details: data };
  },
};

export const DecisionParams = Type.Object({
  outcome: StringEnum(["resolved", "action_taken", "escalated", "needs_info"]),
  summary: Type.String(),
  actions: Type.Array(Type.String()),
  escalation: Type.Optional(Type.Object({
    to: Type.String(), reason: Type.String(),
    urgency: StringEnum(["low", "medium", "high", "emergency"]) })),
  assumptions: Type.Array(Type.String()),
  confidence: Type.Number({ minimum: 0, maximum: 1 }),
});
export type Decision = Static<typeof DecisionParams>;

export async function runCase(caseId: string, caseText: string) {
  let decision: Decision | undefined;
  const submitDecision: AgentTool<typeof DecisionParams> = {
    name: "submit_decision", label: "Submit decision",
    description: "Call exactly once at the end with the final structured outcome.",
    parameters: DecisionParams, executionMode: "sequential",
    execute: async (_id, p) => { decision = p;
      return { content: [{ type: "text", text: "recorded" }], details: p, terminate: true }; },
  };

  const trace: AgentEvent[] = [];
  let nudged = false;
  const agent = new Agent({
    initialState: { systemPrompt: SYSTEM_PROMPT, model: MODEL, thinkingLevel: "medium",
                    tools: [lookupTenant, /* ...domain tools */ submitDecision] },
    streamFn: models.streamSimple.bind(models),
    sessionId: caseId,                                   // prompt caching
    beforeToolCall: async ({ toolCall, args }) => policyCheck(toolCall.name, args), // {block:true, reason} or undefined
    finishTurn: async ({ message }) => {
      if (message.stopReason === "error" || message.stopReason === "aborted") return;
      if (!decision && message.stopReason === "stop" && !nudged) {
        nudged = true;
        agent.followUp({ role: "user", content: "You must call submit_decision now.", timestamp: Date.now() });
      }
      return undefined;
    },
  });
  agent.subscribe((e) => { if (e.type !== "message_update") trace.push(e); });

  const timer = setTimeout(() => agent.abort(), 4 * 60_000);
  try { await agent.prompt(caseText); } finally { clearTimeout(timer); }

  const assistant = agent.state.messages.filter((m: any) => m.role === "assistant") as any[];
  const usage = assistant.reduce((a, m) => ({ input: a.input + m.usage.input,
    output: a.output + m.usage.output, cost: a.cost + m.usage.cost.total }), { input: 0, output: 0, cost: 0 });
  return { decision, trace, messages: agent.state.messages, usage, error: agent.state.errorMessage };
}
```
- The `followUp` nudge inside `finishTurn` is **[unverified]**. The faux run covered tools, a thrown error, `terminate` and usage, but not the nudge. A simpler fallback: after `prompt()` resolves without a decision, call `agent.prompt("Call submit_decision now")` once.
- `SYSTEM_PROMPT` and `policyCheck` are yours to write.

```ts
// src/batch-runner.ts
import pLimit from "p-limit";
import { mkdir, writeFile } from "node:fs/promises";
import { runCase } from "./case-agent.js";
const limit = pLimit(Number(process.env.CONCURRENCY ?? 5));
await Promise.all(cases.map((c) => limit(async () => {
  const dir = `ANSWERS/${c.id}`; await mkdir(dir, { recursive: true });
  let r; try { r = await runCase(c.id, renderCase(c)); }
  catch (e) { r = { decision: fallbackEscalation(e), trace: [], messages: [], usage: null, error: String(e) }; }
  await writeFile(`${dir}/ANSWER.md`, renderAnswer(r.decision));
  await writeFile(`${dir}/REASONING.md`, renderReasoning(r));      // timeline from tool_execution_* events
  await writeFile(`${dir}/trace.jsonl`, r.trace.map((e) => JSON.stringify(e)).join("\n"));
  await writeFile(`${dir}/usage.json`, JSON.stringify(r.usage));
})));
```

Testing without API cost: swap in `fauxProvider()` and script responses with `fauxAssistantMessage([fauxToolCall(...)])` for Vitest. This is what I ran, verified.

### 7.3 pi vs alternatives

| | **pi (agent-core + ai)** | **Anthropic SDK directly** (`@anthropic-ai/sdk`, incl. Tool Runner) | **Claude Agent SDK** (`@anthropic-ai/claude-agent-sdk`) |
|---|---|---|---|
| Loop and tool plumbing | Built in: validation, parallel/sequential, hooks, events, abort | Tool Runner gives a basic loop; hooks, events and policy are DIY | Built in (Claude Code engine) |
| Typed tools | TypeBox with runtime validation | Zod helpers / JSON schema | Zod via in-process MCP tools (`tool()` + `createSdkMcpServer`) |
| Safety hook | `beforeToolCall` block + reason, `afterToolCall` | DIY | `canUseTool` and hooks (PreToolUse, etc.) |
| Persona / system prompt | Fully yours, tiny | Fully yours | Claude Code-flavoured defaults with filesystem/bash tools (configurable; must be locked down) |
| Cost/token tracking | Per message, with cost $ computed | Raw usage only (compute cost yourself) | Result message includes cost/usage |
| Traces | Event stream → JSONL, easy | DIY | Message stream; Claude Code transcripts |
| Testability | `fauxProvider` deterministic scripted runs | Mock the client | Harder (spawns a CLI subprocess) |
| Batch concurrency | Lightweight in-process objects | Lightweight | Each query spawns a Claude Code process: heavier |
| Risk | Third-party, fast-moving API, less common in LLM training data (I can't autocomplete it from memory) | Most stable, best documented, judges likely familiar | Official; heavier runtime; coding-agent semantics |
| Provider flexibility | Any provider, cross-provider handoff | Claude only | Claude only |

The Agent SDK details are from general knowledge, not re-checked today: **[unverified]**.

**Recommendation:** pi-agent-core is a good fit. It is about 100 lines more structured than a hand-written Anthropic loop, and it gives us `beforeToolCall` policy blocking, parallel read tools, abort, cost accounting and a faux provider for tests, all of which map straight onto the judging criteria. Mitigate the risk:
- Pin `1.1.0`.
- Do a 15-minute live smoke test with a real key first thing.
- Keep tools as plain async functions so you can fall back to the raw `@anthropic-ai/sdk` Tool Runner if something breaks.

Avoid the Claude Agent SDK for this. Its process-per-query model and coding-agent defaults add weight and risk for 30-minute batch processing.

---

## 8. Sources
- Repo: https://github.com/earendil-works/pi (cloned; READMEs `packages/agent/README.md`, `packages/ai/README.md`, `packages/coding-agent/README.md`, docs `sdk.md`, `how-pi-works.md`, `json.md`, `cli.md`, `rpc-commands.md`, `session-format.md`, `settings.md`, `extensions.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE`)
- SDK examples: https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/sdk
- npm: https://www.npmjs.com/package/@earendil-works/pi-agent-core , https://www.npmjs.com/package/@earendil-works/pi-ai , https://www.npmjs.com/package/@earendil-works/pi-coding-agent , https://www.npmjs.com/package/@mariozechner/pi-coding-agent (deprecated)
- Old repo URL (redirects): https://github.com/badlogic/pi-mono
- Design post: https://mariozechner.at/posts/2025-11-30-pi-coding-agent/
- Earendil announcement: https://lucumr.pocoo.org/2026/4/8/mario-and-earendil/
- Commentary: https://www.implicator.ai/pi-is-not-a-claude-code-rival-it-is-a-harness-rebellion/ , https://www.eesel.ai/blog/pi-coding-agent , https://urandom.io/blog/2026-03-07-pi-dev-deep-dive
- Site: https://pi.dev
