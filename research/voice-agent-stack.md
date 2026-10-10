# Voice Agent Stack: Research and Recommendation (Dwelly hackathon, Sat 10 Oct 2026)

Researched 9 Oct 2026. Sources are cited inline. **[UNVERIFIED]** marks claims that come from third-party blogs or my own prior knowledge and were not confirmed in official docs today. Check these before you rely on them.

---

## TL;DR

- **Yes, use ElevenLabs Agents (ElevenAgents).** It is not the best on every axis. It is the best fit for this event: it is a sponsor, everyone gets free Creator tier, and the prize includes ElevenLabs Scale. It runs Claude natively (Sonnet 5.5, Haiku 4.5 and others), calls our TypeScript server through webhook tools, does warm transfer to a human through Twilio, and sends post-call transcription webhooks with structured data extraction. Those cover every part of the "voice inside an operational system" story with the least glue code.
- **Do not build voice on OpenAI Realtime.** It is speech-to-speech on GPT models, so the brain would not be our Claude core. That splits the agent in two and goes against the sponsor (Anthropic).
- **LiveKit Agents (Node)** gives the most control and is the best engineering pick for production. It is too much surface area for 6 hours alongside the main text-case scoring work.
- **Vapi** is the closest substitute: it supports Claude natively and has good tooling. Use it only if ElevenLabs breaks on the day.
- **Architecture:** a thin voice layer in ElevenLabs uses the same Node tool endpoints as the text agent. The post-call webhook sends the transcript into the same Claude case pipeline that handles the unseen text cases. Escalation goes through ElevenLabs `transfer_to_number` (warm, with a handover message) plus our own `escalate_to_human` tool that writes a handover summary.
- **Demo:** the primary path is a browser call (WebRTC widget/SDK), which carries no telecom risk. A Twilio phone number is a bonus.

---

## 1. Context that shapes the choice

From the event page ([luma.com/ja5x0m76](https://luma.com/ja5x0m76)) and the local rules file:

- Judging ("Reality Test"): 35% correct outcomes, 20% coverage, 20% judgment & safety (ambiguity, escalation), 15% engineering quality, 10% real-world applicability. Most of the score comes from the core text agent, so voice must not eat the day.
- Best Voice Agent (£1,500 plus 3 months ElevenLabs Scale): "Voice should be part of a functioning operational system rather than simply a standalone voice demo."
- Partners are Anthropic, ElevenLabs, General Catalyst and EQT. All participants get 1 month ElevenLabs Creator.
- Synthetic data includes "calls, emails, documents, CRM records, maintenance tickets". The call data suggests the judges value transcript-to-case processing.

Implication: what wins is a phone or web call that creates or updates real tickets in the same system, escalates correctly with a handover, and shows up on the same dashboard as text cases. Voice quality matters less than that integration.

---

## 2. Platform comparison (October 2026)

| Platform | Claude as brain? | Our TS tools | Phone | Transcripts / evidence | Time to demo | Cost (indicative) | Verdict |
|---|---|---|---|---|---|---|---|
| **ElevenLabs Agents** | Native: Opus 5.5/5/4.8/4.7, Sonnet 5.5/5/4.6/4.5, Haiku 4.5 ([LLM docs](https://elevenlabs.io/docs/agents-platform/customization/llm)); or Custom LLM (OpenAI-compatible SSE endpoint) ([custom LLM](https://elevenlabs.io/docs/agents-platform/customization/llm/custom-llm)) | Webhook tools (HTTP, JSON schema, bearer/OAuth auth), client tools, MCP tools, code tools ([tools](https://elevenlabs.io/docs/agents-platform/customization/tools)) | Native Twilio import (inbound + outbound), SIP trunk, outbound-call API ([Twilio](https://elevenlabs.io/docs/agents-platform/phone-numbers/twilio-integration/native-integration)) | Post-call transcription webhook with transcript, summary, evaluation and data collection, HMAC signed ([webhooks](https://elevenlabs.io/docs/agents-platform/workflows/post-call-webhooks)) | ~1–2 h | ~$0.08/min platform + LLM pass-through; Free 15 min, Starter $6/75 min, Creator $22/275 min **[UNVERIFIED, third-party]** ([cloudzero](https://www.cloudzero.com/blog/elevenlabs-pricing/)) | **Pick.** Sponsor fit, best voice quality, all features needed |
| **Vapi** | Native Anthropic (Sonnet 5, 4.6, 4.5, Haiku 4.5, Opus 4.6) ([docs](https://docs.vapi.ai/providers/model/anthropic)); custom LLM | Server URL tools | Native SIP/numbers | Strong (call logs, tracing) | ~1–2 h | $0.05/min + pass-through, real ~$0.20–0.30 **[UNVERIFIED]** ([morphllm](https://www.morphllm.com/best-ai-voice-agent-platforms)) | Best fallback |
| **Retell** | Built-in Claude (Sonnet 4.6) per changelog ([llms.txt](https://docs.retellai.com/llms.txt)); custom LLM through a per-call WebSocket ([docs](https://docs.retellai.com/integrate-llm/overview)) | Function calls / custom LLM WS | Strong telephony | Good | ~2 h | $0.07–0.31/min **[UNVERIFIED]** | Good for latency-focused call centres, but no sponsor fit |
| **OpenAI Realtime (gpt-realtime-2 / 2.1)** | **No.** GPT speech-to-speech only | Function calling, MCP | SIP (native endpoint reported beta; Twilio bridge common) ([noqta](https://noqta.tn/en/blog/openai-gpt-realtime-voice-agents-sip-mcp-2026)) | You build it | ~2–3 h | ~$0.04/min (mini) to ~$0.30/min **[UNVERIFIED]** ([ecorpit](https://ecorpit.com/gpt-realtime-2-1-voice-agents-reasoning-cost-build-guide-2026/)) | Reject: splits the brain from Claude |
| **LiveKit Agents (Node/Python)** | Yes (Anthropic plugin, any LLM) | Native function tools in-process, so the core code is shared directly | SIP | Built-in transcripts & traces on Cloud ([docs](https://docs.livekit.io/agents/)) | ~3–4 h to a robust result | Infra + per-provider | Best for production control; too heavy today |
| **Pipecat** | Yes (Anthropic service) | In-process (Python) | Via Twilio/Daily | DIY | ~3–4 h, and **Python** | Per-provider | Mismatch with a TS stack |
| **Deepgram Voice Agent API** | Yes, managed `anthropic` provider: claude-sonnet-5, 4-6, 4-5, haiku-4-5, with fallback chains ([docs](https://developers.deepgram.com/docs/voice-agent-llm-models)) | Function calls over WebSocket (client-side) | Bring your own Twilio bridge | DIY | ~2–3 h | Tiered per min **[UNVERIFIED]** | Solid, but you write the telephony bridge |
| **Cartesia Line** | Yes (LlmAgent with Anthropic model) ([skills.sh](https://www.skills.sh/cartesia-ai/skills/line-voice-agent)) | Python SDK | Managed telephony | Managed | ~2–3 h, **Python** | Per-min **[UNVERIFIED]** | Strong TTS latency; Python |
| **Hume EVI** | Yes, Claude is a supported external LLM ([Hume blog](https://www.hume.ai/blog/hume-anthropic-claude-voice-interactions)) | Tool use | Twilio | Emotion analytics | ~2 h | **[UNVERIFIED]** | Interesting for distressed tenants, but off-sponsor |
| **Bland** | Own models mainly | Pathways | Strong outbound telephony | Good | ~2 h | **[UNVERIFIED]** | Not suited to a Claude-core design |
| **Newer: Layercode, Ultravox Realtime** | Layercode wraps your own text agent with voice through a webhook ([startuphub](https://www.startuphub.ai/startups/layercode)); Ultravox has its own speech-native model | | | | | **[UNVERIFIED]** | Worth watching. Layercode's "voice in front of your text agent" pattern is close to what we want, but it is unproven for us |

Market consensus from 2026 roundups: Retell leads on hosted latency, ElevenLabs on voice quality (sub-500 ms claimed end-to-end), Vapi on flexibility, and LiveKit on control ([ElevenLabs blog](https://elevenlabs.io/blog/vapi-alternatives), [futureagi](https://futureagi.com/blog/best-ai-voice-agent-platforms-inbound-support-2026/), [braintrust](https://www.braintrust.dev/articles/best-ai-voice-agent-platforms-2026)). Treat vendor-authored latency claims as marketing **[UNVERIFIED]**.

### Is ElevenLabs the best pick here? Yes, for these reasons

1. **Claude-native.** You pick `Claude Haiku 4.5` (fastest) or `Claude Sonnet 5.5` (ElevenLabs recommends "high intelligence models like … Claude Sonnet 5.5" when using tools ([server tools](https://elevenlabs.io/docs/agents-platform/customization/tools/server-tools.md))) from a dropdown.
2. **Our tools stay ours.** Webhook tools are plain HTTPS calls to our Node server, using the same handlers as the text agent.
3. **Operational primitives are built in:** `transfer_to_number` with a warm `agent_message` to the human (native Twilio) ([transfer](https://elevenlabs.io/docs/agents-platform/customization/tools/system-tools/transfer-to-human)), `end_call`, the `system__caller_id` dynamic variable for CRM lookup ([dynamic variables](https://elevenlabs.io/docs/agents-platform/customization/personalization/dynamic-variables)), and data collection fields that are extracted post-call ([data collection](https://elevenlabs.io/docs/agents-platform/customization/agent-analysis/data-collection)).
4. **Evidence for judges.** Conversation history, audio, transcripts and analysis are available in the dashboard and through webhooks.
5. **Sponsor fit and free credits.** The prize itself is ElevenLabs Scale, and the judges include ElevenLabs.

When it would **not** be the best: at high call volume where cost per minute dominates, when you need full control of the pipeline (LiveKit), or when you want one codebase with in-process tools and no webhook hop (LiveKit/Pipecat).

---

## 3. Recommended architecture

```
               ┌──────────────────────────── ElevenLabs Agent ─────────────────────────────┐
 Caller ──►    │ ASR → turn-taking → LLM (Claude Haiku 4.5 / Sonnet 5.5) → TTS             │
 (web WebRTC   │   tools: webhook → our API      system: transfer_to_number, end_call      │
  or Twilio #) └───────────────┬───────────────────────────────────┬──────────────────────┘
                               │ HTTPS (bearer secret)             │ post_call_transcription webhook (HMAC)
                               ▼                                   ▼
            ┌──────────────── Node/TS "core" (single source of truth) ──────────────────┐
            │  tools/: findTenant, getTenancy, listTickets, createTicket, logArrearsNote │
            │          escalateToHuman(summary, priority, reason)                         │
            │  policy.md  (shared rules: what needs a human, safety, verification)        │
            │  caseAgent(input) — Claude tool loop used for BOTH text cases and calls     │
            └──────────────┬──────────────────────────────────────────────┬─────────────┘
                           ▼                                              ▼
                   CRM / tickets store (synthetic)              Human queue + dashboard
                                                                (handover summary, transcript link)
```

Key design decisions:

- **Tools are shared, and the brain is mirrored.** The voice LLM (inside ElevenLabs) and the text agent call the same `/tools/*` handlers. The policy text in `policy.md` is injected into both system prompts, with the ElevenLabs prompt pushed through the CLI/API from the same file. That keeps one set of business rules.
- **Writes are idempotent and guarded server-side.** For example, `createTicket` dedupes on `(tenantId, category, day)`. Do not trust the voice LLM for invariants: the server enforces verification state (tools refuse until `verifyIdentity` succeeded for that `conversation_id`).
- **Every call becomes a case.** The post-call webhook triggers `caseAgent({ channel: "voice", transcript, data_collection_results })`, which reconciles the transcript with what was done live (ticket created? escalation needed?) and writes a structured case record. That is the "functioning operational system" story, and it reuses the pipeline that is scored on text cases.
- **Optional, stretch goal: Custom LLM mode.** Point ElevenLabs at our `/v1/chat/completions` (OpenAI-compatible SSE), which runs `caseAgent` directly. This gives one brain, but you own streaming, latency and the tool-loop format. ElevenLabs suggests returning a buffer such as `"... "` first for slow models ([custom LLM](https://elevenlabs.io/docs/agents-platform/customization/llm/custom-llm)). Only do this if everything else is done.

---

## 4. Six-hour integration plan (voice is an add-on; protect the core)

Assume the core text agent and tools are built in parallel by the rest of the team. The voice owner can work alone.

| Time | Task | Done when |
|---|---|---|
| 0:00–0:30 | Create ElevenLabs agent (dashboard or `npm i -g @elevenlabs/cli`, `elevenlabs auth login`, `elevenlabs agents init`) ([CLI](https://elevenlabs.io/docs/agents-platform/operate/cli.md)). Choose Claude Haiku 4.5, a UK English voice, first message, and `policy.md` excerpt as the prompt. Expose the local server with ngrok/cloudflared or deploy to Vercel/Fly. | Talking to the agent in the dashboard test widget |
| 0:30–1:45 | Expose `/tools/:name` routes that wrap the shared handlers. Register 4–6 webhook tools: `find_tenant`, `verify_identity`, `get_account_summary` (arrears/tickets), `create_repair_ticket`, `escalate_to_human`. Bearer-secret auth. Return short, speakable JSON. | Voice call creates a real ticket visible in our store/dashboard |
| 1:45–2:30 | Post-call webhook `/webhooks/elevenlabs`: verify HMAC, store transcript, run `caseAgent` to produce a structured case and handover, and show it in the dashboard. Add data-collection fields: `intent`, `urgency`, `property_address`, `callback_number`, `needs_human`. | Hanging up produces a case card with summary within ~10 s |
| 2:30–3:15 | Escalation: `escalate_to_human` tool (writes handover summary to the human queue) plus the `transfer_to_number` system tool for emergencies (gas, flood, no heat with vulnerable tenant) with `agent_message` = handover. | Saying "I smell gas" triggers the safety script, then transfer or escalation with a summary |
| 3:15–4:00 | Embed a browser call (`@elevenlabs/react` or the widget) in our dashboard: a "Call as tenant" button next to the live case feed, so judges see the ticket appear while you talk. | One-screen demo works |
| 4:00–4:45 | Telephony bonus: import a Twilio number (Account SID + token) and assign the agent ([Twilio](https://elevenlabs.io/docs/agents-platform/phone-numbers/twilio-integration/native-integration)). Optionally make an **outbound** call (agent calls a contractor or tenant) through `POST /v1/convai/twilio/outbound-call` ([API](https://elevenlabs.io/docs/api-reference/twilio/outbound-call)). | Judge can ring a number |
| 4:45–5:30 | Hardening: turn eagerness, soft-timeout filler, tool timeouts, a readback rule, interruption off during the safety script. Run the 3 scripted demo calls plus 3 adversarial ones (wrong name, noisy, silence). | No dead air longer than 2 s; no unverified data disclosed |
| 5:30–6:00 | Freeze. Record a backup video of the demo call. Write the voice section in SUBMISSION.md with links to transcripts and cases. | Backup video saved |

**Demo script (90 s):**
1. A tenant calls about a leaking boiler. The agent verifies identity, finds the tenancy, creates a P2 ticket and reads back the reference and address.
2. A second caller has arrears and asks for a payment plan. That needs a human decision, so the agent escalates with a handover summary, and the dashboard shows the queue item.
3. The caller reports a gas smell. The safety script runs, then a warm transfer.

Show the case cards appearing live.

---

## 5. Key code and config

### 5.1 Webhook tool definition (push with the CLI or API)

Shape per API reference: `response_timeout_secs` min 5, max 120, default 20 **[from third-party API mirror; verify in the dashboard]** ([withone.ai](https://www.withone.ai/knowledge/elevenlabs/conn_mod_def%3A%3AGJ2aa8lpuFo%3A%3AKtqhMrzITBeY-1ZBwH7Xlw)).

```json
{
  "type": "webhook",
  "name": "create_repair_ticket",
  "description": "Create a maintenance ticket for a VERIFIED tenant after the caller has confirmed the readback of issue, location and access details. Never call before verify_identity succeeded.",
  "api_schema": {
    "url": "https://<our-host>/tools/create_repair_ticket",
    "method": "POST",
    "request_body_schema": {
      "type": "object",
      "properties": {
        "conversation_id": { "type": "string", "description": "Always pass {{system__conversation_id}}" },
        "tenant_id": { "type": "string", "description": "tenant_id returned by find_tenant" },
        "category": { "type": "string", "enum": ["plumbing","heating","electrical","damp_mould","security","other"] },
        "urgency": { "type": "string", "enum": ["emergency","urgent","routine"] },
        "description": { "type": "string", "description": "One-sentence plain description" },
        "access_notes": { "type": "string", "description": "When the contractor can enter, pets, keys" }
      },
      "required": ["conversation_id","tenant_id","category","urgency","description"]
    }
  },
  "response_timeout_secs": 10
}
```

Configure auth as a Bearer secret in the tool's auth settings ([server tools](https://elevenlabs.io/docs/agents-platform/customization/tools/server-tools)).

### 5.2 Tool router (Express/Hono style; uses the same handlers as the text agent)

```ts
// src/voice/toolRoutes.ts
import { Hono } from "hono";
import { tools } from "../core/tools"; // the SAME registry the Claude text agent uses
import { requireVerified } from "../core/guards";

export const voiceTools = new Hono();

voiceTools.use("/tools/*", async (c, next) => {
  if (c.req.header("authorization") !== `Bearer ${process.env.VOICE_TOOL_SECRET}`) return c.text("unauthorized", 401);
  await next();
});

voiceTools.post("/tools/:name", async (c) => {
  const name = c.req.param("name");
  const args = await c.req.json();
  const tool = tools[name];
  if (!tool) return c.json({ ok: false, say: "I can't do that from here, I'll pass you to a colleague." }, 404);

  // Server-side invariant: no data or writes until identity verified for this conversation
  if (tool.requiresVerification && !(await requireVerified(args.conversation_id))) {
    return c.json({ ok: false, say: "Before I can do that I need to confirm your identity." });
  }

  try {
    const result = await tool.run(args, { channel: "voice", conversationId: args.conversation_id });
    await auditLog({ channel: "voice", name, args, result }); // evidence trail for judges
    return c.json({ ok: true, ...result.speakable }); // short, voice-friendly fields only
  } catch (e) {
    return c.json({ ok: false, say: "I'm having trouble with our system right now, I'll log this for a colleague." });
  }
});
```

Return small, speakable payloads (for example `{ ticket_ref: "R-4821", eta: "within 24 hours" }`), not raw CRM rows. Large JSON slows the LLM and leaks data.

### 5.3 Post-call webhook → case pipeline

```ts
// src/voice/postCall.ts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { caseAgent } from "../core/caseAgent";

const el = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

app.post("/webhooks/elevenlabs", async (c) => {
  const raw = await c.req.text(); // RAW body required for HMAC
  const sig = c.req.header("ElevenLabs-Signature")!;
  // Docs: JS SDK exposes webhooks.constructEvent(rawBody, sigHeader, secret) — [verify exact signature / async]
  const event = await el.webhooks.constructEvent(raw, sig, process.env.EL_WEBHOOK_SECRET!);
  if (event.type !== "post_call_transcription") return c.text("ok");

  const { conversation_id, transcript, analysis, metadata } = event.data;
  // Respond 200 fast; process async (webhooks auto-disable after repeated failures)
  queueMicrotask(() => caseAgent({
    channel: "voice",
    externalId: conversation_id,
    transcript: transcript.map((t: any) => `${t.role}: ${t.message}`).join("\n"),
    extracted: analysis?.data_collection_results,
    summary: analysis?.transcript_summary,
    callerId: metadata?.phone_call?.external_number, // [UNVERIFIED field path]
  }).catch(console.error));
  return c.text("ok");
});
```

Payload contents (transcript array, `analysis.transcript_summary`, data collection, HMAC header `ElevenLabs-Signature`) per [post-call webhooks](https://elevenlabs.io/docs/agents-platform/workflows/post-call-webhooks).

### 5.4 Structured case output (Claude tool or structured output in `caseAgent`)

```ts
const CaseRecord = z.object({
  channel: z.enum(["voice","email","sms","text"]),
  tenant_id: z.string().nullable(),
  identity_verified: z.boolean(),
  intents: z.array(z.enum(["repair","arrears","complaint","tenancy_query","emergency","other"])),
  actions_taken: z.array(z.object({ tool: z.string(), ref: z.string().optional() })),
  outstanding_actions: z.array(z.string()),
  escalation: z.object({
    required: z.boolean(),
    reason: z.string().optional(),
    priority: z.enum(["P1","P2","P3"]).optional(),
    handover_summary: z.string().optional() // 3–5 lines: who, what, done, needs-decision, risk
  }),
  safety_flags: z.array(z.enum(["gas","fire","flood","no_heat_vulnerable","threat","safeguarding"])),
  evidence: z.array(z.object({ quote: z.string(), speaker: z.enum(["user","agent"]) }))
});
```

Using the same schema for text and voice means the voice calls can be scored with the same evaluator.

### 5.5 Browser call in the dashboard

```tsx
// server: GET /conversation-token → fetch(`https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${AGENT_ID}`, { headers: { "xi-api-key": KEY } })
import { Conversation } from "@elevenlabs/client";

const { token } = await (await fetch("/conversation-token")).json();
const convo = await Conversation.startSession({
  conversationToken: token,
  connectionType: "webrtc",
  dynamicVariables: { demo_tenant_hint: "none" },
  onMessage: (m) => appendToLiveTranscript(m),
});
```

From the [JS SDK docs](https://elevenlabs.io/docs/agents-platform/libraries/java-script) and [React SDK docs](https://elevenlabs.io/docs/agents-platform/libraries/react) (`@elevenlabs/react`, `useConversation`, which needs a `ConversationProvider`).

### 5.6 Turn and flow settings to set

From [conversation flow](https://elevenlabs.io/docs/agents-platform/customization/conversation-flow):
- `conversation_config.turn.turn_eagerness`: `"patient"` for tenants giving addresses and stories; `"normal"` otherwise.
- `conversation_config.turn.soft_timeout_config`: ~3.0 s filler while tools run (default is disabled).
- `conversation_config.turn.turn_timeout`: ~7–10 s, then a re-prompt ("Are you still there?"). End the call after 2 re-prompts.
- `conversation_config.conversation.max_duration_seconds`: default 600. Keep 600 for the demo.
- Interruptions: keep enabled in general, but **disable** them during the safety script and the final readback.

### 5.7 System prompt skeleton (voice)

```
# Personality
You are Dwelly's tenant line. Calm, brief, British English. One question at a time.

# Goal
1. Identify caller (find_tenant using {{system__caller_id}} first, then name + address).
2. Verify identity: confirm full name + first line of address + date of birth OR tenancy ref. This step is important.
3. Classify: repair / arrears / complaint / other. Check safety first.
4. Act with tools. Before any write, READ BACK the details and get an explicit "yes".
5. Close: read back reference number digit by digit and next step.

# Guardrails
- SAFETY: gas smell, fire, flooding, electrical burning, no heat with vulnerable occupant → give the safety instruction, then transfer_to_number immediately. This step is important.
- Never agree payment plans, rent reductions, legal matters or compensation → escalate_to_human with a handover summary.
- Never disclose balance or tenancy details before verification.
- If a tool fails, say so plainly and escalate; never invent references or dates.
- Speak numbers as words; spell references in groups ("R, four eight, two one").
```

The format follows the ElevenLabs prompting guide: a dedicated `# Guardrails` section and "This step is important" for emphasis ([prompting guide](https://elevenlabs.io/docs/agents-platform/best-practices/prompting-guide)).

---

## 6. Production voice-agent engineering best practices

**Latency budget.** Target 500–800 ms voice-to-voice. 800 ms–1.2 s is acceptable, and more than 1.5 s feels like being on hold. A typical budget: VAD 50 ms, STT 150 ms, LLM TTFT 400 ms, TTS first chunk 150 ms, network 50 ms. Each tool call adds its own latency on top. Measure p95, not the average ([futureagi](https://futureagi.com/blog/sub-500ms-voice-ai-guide-2026/), [smallest.ai](https://smallest.ai/blog/designing-voice-assistants-stt-llm-tts-tools-and-latency-budget)). In practice:
- Use Haiku 4.5 for live turns. Use Sonnet/Opus post-call, where latency does not matter.
- Keep tool handlers under 300 ms (in-memory synthetic data). Set the tool timeout to 10 s, not the default 20.
- Speak before slow tools ("Let me pull up your account"). Use soft-timeout filler.
- Keep the system prompt short and keep tool results small.

**Interruption and barge-in.** Allow barge-in for normal dialogue. Make safety instructions, legal disclosures and final readbacks uninterruptible. After an interruption, do not repeat the whole previous turn; acknowledge it and continue.

**Confirm critical actions.** Use an explicit readback and a "yes" before any write: ticket creation, arrears note, appointment booking, transfer. Enforce it server-side too, for example with a `confirmed: true` parameter that the tool requires, plus the prompt rule. Make tools idempotent, because confirmation loops cause duplicate calls.

**Readback of numbers and addresses.**
- Phone numbers and references: read in chunks, digit by digit.
- Postcodes: use the phonetic alphabet for ambiguous letters ("S for Sierra").
- Money: say it in words ("two hundred and fifty pounds").
- Normalise before tools. Tool parameter descriptions should show the canonical format, for example `"postcode in standard UK format, e.g. 'E1 6AN'"` ([prompting guide](https://elevenlabs.io/docs/agents-platform/best-practices/prompting-guide)).
- Consider the ElevenLabs text normaliser for TTS.

**Identity verification.** Use caller ID only as a *hint* (`system__caller_id`), never as proof. Use two factors from records, such as name + address + DOB or tenancy ref. Track the verified state server-side per `conversation_id`. Allow 3 attempts, then escalate. Never read data back for the caller to confirm ("Is your DOB 3 March?") because it leaks data; ask the caller to state it instead.

**Escalation and warm handoff.**
- Define clear escalation triggers: safety, legal, financial decisions, vulnerability, repeated failure, explicit request, or anger.
- The handover summary covers who, verified status, issue, actions already taken with refs, what decision is needed, and risk flags.
- Use `transfer_to_number` conference mode with `agent_message` so the human hears the summary before joining. This works only with native Twilio; SIP REFER does not pass the message ([transfer docs](https://elevenlabs.io/docs/agents-platform/customization/tools/system-tools/transfer-to-human)).
- Always also write the handover to the queue, so it survives if the transfer fails. Out of hours, create a callback ticket instead of a transfer.

**Silence and noise.**
- Silence: re-prompt after the turn timeout, then offer a callback and end politely.
- Noise and low ASR confidence: ask the caller to repeat, then switch to spelling mode for names and postcodes. Avoid acting on low-confidence entities; confirm them.
- Detect voicemail on outbound calls (`voicemail_detection` system tool) ([custom LLM system tools](https://elevenlabs.io/docs/agents-platform/customization/llm/custom-llm)).

**Transcripts to structured case data.**
- Do the extraction post-call with a stronger model. Use a strict schema (section 5.4) with evidence quotes, so every field has a supporting line in the transcript.
- Reconcile with the tool audit log, which is the source of truth for actions, rather than the LLM's narrative.
- Add data-collection fields in ElevenLabs as a cheap first pass, and cross-check them.
- Store `conversation_id` on every ticket so judges can click through to the audio and transcript.

**Testing.** Script around 6 calls (happy path, wrong person, arrears, gas, silence, noisy or accented speech). Also run text-only simulation through the same agent (ElevenLabs CLI supports tests, `tests.json` ([CLI](https://elevenlabs.io/docs/agents-platform/operate/cli.md))). Log p95 turn latency.

---

## 7. Pitfalls (hackathon-specific)

1. **Telephony red tape.** UK Twilio numbers typically need a regulatory bundle with an address, and approval can take time. Trial accounts play a trial message and can only call verified numbers **[UNVERIFIED, from prior knowledge]**. Make the browser call the primary demo, and use a US number or an existing number if needed. Verified caller IDs are outbound-only and cannot be assigned to agents ([Twilio docs](https://elevenlabs.io/docs/agents-platform/phone-numbers/twilio-integration/native-integration)).
2. **Venue Wi-Fi and localhost.** ElevenLabs must reach your tool URLs. Use a deployed URL (Vercel/Fly) or a stable tunnel, and pre-test from mobile data.
3. **Two brains drifting.** The voice prompt and the text agent policy diverge. Generate both from `policy.md`, and enforce invariants in tool code.
4. **Free-tier minutes.** Free is 15 min and Creator about 275 min **[UNVERIFIED]**. Test with text mode or short calls, and confirm the credit allocation at onboarding.
5. **Webhook body parsing.** The HMAC check fails if middleware already parsed JSON, so read the raw body. Return 200 fast; webhooks are auto-disabled after 10+ consecutive failures and more than 7 days without success ([webhooks](https://elevenlabs.io/docs/agents-platform/workflows/post-call-webhooks)).
6. **Spoken-form values in tool args.** The LLM may pass the spoken form ("john at gmail dot com"). Put format examples in parameter descriptions and normalise server-side.
7. **Over-scoping voice.** Most of the score comes from the unseen text cases. Cap voice work at one person for about 6 hours and share the tools.
8. **Custom LLM mode** looks elegant but adds streaming, SSE format and tool-loop latency risk. Skip it unless you are ahead of schedule.
9. **OpenAI Realtime temptation.** It has great latency, but it is not Claude, and the voice brain would not share reasoning with the core.
10. **Hallucinated refs.** The agent must never speak a ticket ref unless it came back from a tool, so return the ref in the tool response and instruct the agent to read it verbatim.

---

## 8. Fallback plan

If ElevenLabs is down or blocked, switch to **Vapi**. Set `model.provider = "anthropic"` with `model.model = "claude-haiku-4-5"` (or Sonnet). The same `/tools/*` endpoints work as server-URL tools, and Vapi has its own end-of-call report webhook ([Vapi Anthropic](https://docs.vapi.ai/providers/model/anthropic)). Expect about 1–1.5 h to port. Exact tool payload shapes differ **[verify]**.

---

## Sources
- ElevenLabs docs: [LLMs](https://elevenlabs.io/docs/agents-platform/customization/llm), [Custom LLM](https://elevenlabs.io/docs/agents-platform/customization/llm/custom-llm), [Server tools](https://elevenlabs.io/docs/agents-platform/customization/tools/server-tools), [Tools overview](https://elevenlabs.io/docs/agents-platform/customization/tools), [Client tools](https://elevenlabs.io/docs/agents-platform/customization/tools/client-tools), [Transfer to human](https://elevenlabs.io/docs/agents-platform/customization/tools/system-tools/transfer-to-human), [Dynamic variables](https://elevenlabs.io/docs/agents-platform/customization/personalization/dynamic-variables), [Post-call webhooks](https://elevenlabs.io/docs/agents-platform/workflows/post-call-webhooks), [Data collection](https://elevenlabs.io/docs/agents-platform/customization/agent-analysis/data-collection), [Conversation flow](https://elevenlabs.io/docs/agents-platform/customization/conversation-flow), [Twilio native](https://elevenlabs.io/docs/agents-platform/phone-numbers/twilio-integration/native-integration), [Outbound call API](https://elevenlabs.io/docs/api-reference/twilio/outbound-call), [JS SDK](https://elevenlabs.io/docs/agents-platform/libraries/java-script), [React SDK](https://elevenlabs.io/docs/agents-platform/libraries/react), [CLI](https://elevenlabs.io/docs/agents-platform/operate/cli.md), [Prompting guide](https://elevenlabs.io/docs/agents-platform/best-practices/prompting-guide)
- Others: [Vapi Anthropic](https://docs.vapi.ai/providers/model/anthropic), [Vapi custom LLM](https://docs.vapi.ai/customization/custom-llm/using-your-server), [Retell custom LLM](https://docs.retellai.com/integrate-llm/overview), [Retell llms.txt](https://docs.retellai.com/llms.txt), [LiveKit Agents](https://docs.livekit.io/agents/), [Deepgram Voice Agent LLMs](https://developers.deepgram.com/docs/voice-agent-llm-models), [Cartesia Line skill](https://www.skills.sh/cartesia-ai/skills/line-voice-agent), [Hume + Claude](https://www.hume.ai/blog/hume-anthropic-claude-voice-interactions)
- Third-party (treat as unverified): [cloudzero ElevenLabs pricing](https://www.cloudzero.com/blog/elevenlabs-pricing/), [morphllm comparison](https://www.morphllm.com/best-ai-voice-agent-platforms), [futureagi inbound 2026](https://futureagi.com/blog/best-ai-voice-agent-platforms-inbound-support-2026/), [braintrust 2026](https://www.braintrust.dev/articles/best-ai-voice-agent-platforms-2026), [ElevenLabs blog: Vapi alternatives](https://elevenlabs.io/blog/vapi-alternatives), [noqta OpenAI SIP](https://noqta.tn/en/blog/openai-gpt-realtime-voice-agents-sip-mcp-2026), [ecorpit gpt-realtime-2.1](https://ecorpit.com/gpt-realtime-2-1-voice-agents-reasoning-cost-build-guide-2026/), [futureagi latency](https://futureagi.com/blog/sub-500ms-voice-ai-guide-2026/), [smallest.ai latency budget](https://smallest.ai/blog/designing-voice-assistants-stt-llm-tts-tools-and-latency-budget), [withone.ai API mirror](https://www.withone.ai/knowledge/elevenlabs/conn_mod_def%3A%3AGJ2aa8lpuFo%3A%3AKtqhMrzITBeY-1ZBwH7Xlw), [Luma event](https://luma.com/ja5x0m76), [Layercode](https://www.startuphub.ai/startups/layercode)
