# Demo script: "Friday 6pm, no hot water at Flat 9"

The pitch in one line: **Dwelly already runs the workflow engine, WhatsApp Business and telephony. We plug an AI case worker into "auto mode" that does the routine work end to end, proves every action, and only hands staff the decisions that need a person, as a one-screen brief.**

Everything shown runs the real agents (`/ops/demo` on the voice server): the same case worker, tools, policy checks and read-back as the batch runner. Reset with "Start the demo again".

## Before recording

- Server up: `pnpm voice:serve` (or the Fly deployment). Locally: `.claude/launch.json` → `ops-portal-local`.
- Open `/ops/demo` in a clean browser window at 1440×900, dark or light mode, zoom 110%.
- Live landlord call needs the deployed server (ElevenLabs must reach our tools) with `ELEVENLABS_PHONE_NUMBER_ID` set; Ben's phone is whoever plays him. Offline, use **Play the recorded call** and say so.
- Rehearse once end to end (about 4 minutes of agent time, $0.30).

## 60-second video

| Time | Screen | Voiceover |
|---|---|---|
| 0–8s | `/ops/demo`, empty phone | "It's Friday, 6pm. Priya has no hot water. At a lettings agency, that's the start of a week of emails, calls and holds." |
| 8–20s | Send the WhatsApp. "Typing…", the reply lands; right panel: *HeatRight booked, landlord emailed*, all ✓ Confirmed | "Our case worker answers on WhatsApp, checks it's safe, books the landlord's preferred contractor and tells the landlord. Every action is read back from the system before it's reported." |
| 20–30s | Send HeatRight's quote. Panel: *Asked landlord for approval £640*, *On hold until Sun* | "The quote is £640. Ben's limit is £300, so the agent can't spend it. That's a rule in code, not a prompt." |
| 30–45s | Call Ben (live, or the recorded call with its transcript). Panel: approval recorded with his words, quote approved, Priya updated; **⊘ Denied by policy: set visit** | "The voice agent calls Ben, reads the approval back, and books the repair. When it tries to confirm Monday before HeatRight has, the policy stops it." |
| 45–55s | Decisions inbox → the decision page: question, why, what's done and not done, evidence, then the recommendation | "Ben also asked to move his rent to a new account. That's never automated. It lands with one person, with everything they need on one screen." |
| 55–60s | Eval run page: 50 cases, mean 86, 1 handed to a person, $0.05 a case | "Across 50 real Dwelly cases: one needed a person. Five pence a case. It plugs into the systems you already run." |

## The numbers (and where they come from)

| Claim | Source |
|---|---|
| 50 public cases contain 89 "human, please decide" prompts and 236 holds | `research/pm-case-data-analysis.md` |
| 1 of 50 cases handed to a person, mean judge score 86, 1 critical | Eval run `eval--vE-uIR9`, 10 Oct 14:03 (`/ops/evals`) |
| $2.59 model cost for 50 cases (about 4p each), plus about $3 to grade | Same run |
| Dwelly ran 1,000+ maintenance tasks in August; at ~1.8 "please decide" prompts per case and ~3 minutes each, that's roughly 90 staff hours a month the agent can take on | Estimate: 1,000 × 1.8 × 3 min. Say "roughly", it's an estimate |

## Why it's easy to put into production

- **Same workflow:** the agent works on Dwelly's own job stages and system prompts ("Please complete landlord approval step first", "No work results", "3+ reminders…"). It runs where "auto mode" runs today.
- **Same channels:** WhatsApp Business API, Twilio/Vonage telephony and email are already in Dwelly's stack. Our WhatsApp adapter is Twilio-compatible (`/ops/whatsapp/webhook`, env vars only).
- **Swap the mock for their API:** every tool goes through one adapter with read-back verification (`src/agent/adapters/`, `src/agent/opsTools.ts`). Nothing claims success until the system confirms it.
- **One container + Postgres:** the voice server, portal and case worker deploy together (Fly today).
- **People stay in charge:** hard rules in code for money, bank details, landlord approval and wrong addresses; anything else that needs judgement goes to Decisions with a one-screen brief and comes back to the agent.

## Two-minute live version (judging)

1. Start on Decisions: "Nothing needs you right now. The agents are handling every open case."
2. Run the demo steps live on `/ops/demo` (above), narrating the right-hand panel.
3. Open the case timeline: who did what, ✓ on every action, the ⊘ denial with its reason, the call transcript.
4. Decide the bank-change task on screen: no option pre-selected, evidence first, the money options need a reason. Show the agent acting on the decision.
5. Close on the eval run page and the four production points above.
