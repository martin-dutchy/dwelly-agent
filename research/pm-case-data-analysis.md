# Property Management track: research and build recommendation

Written 10 Oct 2026 for the Dwelly Real-World Agents Hackathon. Sources: the 50 public PM cases in this repo, the official rules page, the Luma page, Dwelly's blog and press, and the Anthropic briefing notes.

---

## 1. What actually wins (read this first)

Overall score = 70% technical + 30% demo video. The technical 70 is scored almost entirely on the **unseen Reality Test cases released at 16:30**, with 30 minutes to run them and no time to hand-fix anything.

| Criterion | Weight in technical | Points of 100 | What it means for us |
|---|---|---|---|
| Correct outcomes | 35% | 24.5 | Right decision per case, respecting constraints |
| Coverage | 20% | 14 | Every case must produce an ANSWER.md. A crash on one case loses points |
| Judgement & safety | 20% | 14 | Conflicts, missing context, knowing when to escalate or do nothing |
| Engineering quality | 15% | 10.5 | Autonomous, reproducible, error handling, no manual intervention |
| Real-world applicability | 10% | 7 | Could Dwelly pilot it |
| Demo video (60s) | — | 30 | Working product, clarity, product insight |

Required output per case: `ANSWERS/<n>/ANSWER.md` + `REASONING.md` showing what the system received, actions taken, decisions, escalations, failures, final result. Judged by Claude-based judging agents against required outcomes, acceptable alternatives, red flags, prohibited actions, critical failures. "Quality of the decision matters, not whether the output matches one exact phrase."

Separate awards also reachable from the same build: Best Exception Handling (£1,500), Best Voice Agent (£1,500), Best Engineering (£1,500).

**Implications**
1. The product is a **batch-runnable agent**: `run.py --cases <dir>` → ANSWERS folder. No UI needed for scoring. A UI only matters for the 60s demo.
2. **Coverage is 14 points of free money**: never crash, always emit an answer, time-box each case, retry on API failures, degrade gracefully to "ESCALATE: could not process" rather than nothing.
3. **Escalation is a scored outcome, not a failure.** 14 points ride on judging ambiguity correctly, and a whole award is for it.
4. **Build the eval loop first** (Anthropic's own advice at the briefing). The README of this repo literally describes the test: cut a case history at a decision point, hide the future, compare the agent's decision to what the later evidence shows.

---

## 2. What the data is

All 50 PM cases are **reactive maintenance requests at a UK lettings agency** ("Northbridge Lettings", managing on behalf of landlords). This is Dwelly's actual core workflow, and the public cases are clearly exports from their case system. Expect the Reality Test to be the same shape, only messier.

**Case shape**
- `index.md`: initial request, created/updated/completed dates, property, Overview and Outcome (hidden in the test).
- `history.md`: 13 to 64 time-ordered events (1,505 total). Channels: Email 506, Update 443 (system state changes), Hold 236, Note 192, Call 74 (as transcript summaries), SMS 54.
- Attachments: only 16 PDFs across 7 cases (checkout inspection reports, cleaning quotes, invoices). Most referenced photos/invoices are "unavailable", so the agent must cope with missing evidence.

**Case mix**: 40 tenant-raised repairs (dishwashers, ovens, washing machines, showers, taps, toilets, windows, doors, locks, gardens), 8 agency-manager-raised check-out works (cleaning, carpets, repainting, quotes and invoices), 1 inspection, 1 recurring solar-meter photo request.

**The workflow the data encodes** (derive the state machine from this):

```
Tenant report → [AI Intake Classification] → "Please complete landlord approval step first"
→ Email landlord: send our contractor or yours? → Hold: Waiting for Landlord
→ "Landlord approval confirmed. Proceed to provider selection." → "Please approve selection of provider and category"
→ Provider assigned → emails to contractor + tenant → contractor books with tenant → "Visit date selected"
→ confirmation emails + SMS reminder → Hold: Waiting for Provider
→ contractor reports: fixed / needs quote → quote to landlord → "Need confirmation from landlord" → approved
→ works done → completion photos + invoice → "Request marked as completed, lets do the final checks"
→ key return check, documents check → "All checks have been completed; the request is now closed"
   (or "Task has been completed without payment" when landlord's own contractor / warranty / tenant fixed it)
```

**Where humans get pulled in today** (these are the system's own escalation prompts, counted across 50 cases):

| System prompt | Count | What the human actually does |
|---|---|---|
| Put on hold (Waiting for Provider / Landlord) | 236 | Decides to wait, chase, or move on |
| "Please check if we need to provide a response to landlord/provider/tenant. If not, return to auto mode." | 53 | Reads an inbound message and decides next step |
| "Need confirmation from landlord" | 27 | Chases or interprets approval |
| "Manually updated via Change Mode" | 28 | Human overrides state |
| "No work results; we need to check what is happening" | 16 | Chases contractor |
| "Message received from landlord/tenant. Please review and proceed manually." | 8 | Interprets free-text reply |
| "Email received from provider, but expected data could not be extracted." | 6 | Parses a weird email (one was just "😀") |
| "3+ reminders have been sent to provider. Please check what's happening." | 6 | Phones contractor or swaps provider |
| "Task has been completed by supervisor" | 5 | Forces closure |

Case duration: median about 16 days, range 0 to 111 days. The long tail is almost entirely waiting on landlords and contractors.

Dwelly's own blog (Sept 2026) says their agents now handle maintenance end to end but still raise **about 5 escalations per task** for a human, and that "when the system cannot safely determine the next step, it asks our human agent for help". **That sentence is the hackathon problem statement.** The thing worth building is the component that decides the next step well, and escalates only when it genuinely should.

---

## 3. The messy patterns already in the public data (your eval seeds)

These are real decision points in the 50 cases where a naive agent goes wrong. The Reality Test will contain harder versions of these.

| Case | Pattern | Right behaviour |
|---|---|---|
| 047 | Landlord replies "I've arranged a plumber to visit **Flat 18, 88 Alder Lane**" but the case is **Flat 24, 150 Copperfield Walk**. Tenant also withdrew half the request (mum fixed the toilet). | Flag address mismatch, do not assume approval applies; confirm with landlord; update scope to window only |
| 025 | Oven "just out of 12-month warranty" then found inside 2-year manufacturer warranty. Appointment dates contradict each other (21 Apr, 14 May, 21 Jun, 25 Jun). Case took 32 days with 10 holds. | Ask warranty question before paying for repair; detect date conflicts and re-confirm with both parties rather than propagating one |
| 040 | Tenant fixes it themselves (swaps machine), agency closes case. Landlord had approved a visit and **4 days later asks for an update**. | Closing is fine, but the landlord must be told. Prohibited: closing with a party uninformed |
| 038 | Tenant wants to install their own washing machine and take it when leaving. | Needs landlord consent, record ownership/liability note, small removal cost ownership. Not a standard repair |
| 014 | AI Intake classified a **front door** as "Appliances" and asked fridge questions (tenant mentioned the fridge man). Landlord suggested a workaround, tenant accepted. | Reclassify from content, not keywords; security-relevant (front door) so severity is not purely ROUTINE; workaround acceptable only with tenant confirmation and a monitor note |
| 024 / 026 | 024: tenant raises a fence and a conservatory roof leak on a closed oven thread. 026: provider and tenant disagree on the appointment date (and the recorded visit date is a Saturday while every notice says Monday). | Split into separate requests, do not lose the leak; confirm the date with the party who has authority |
| 045 | Tenant asks for window works the landlord never requested; landlord uses his own contractors; later emails about **a different property**. | Hold, do not instruct provider; do not merge the other-property message into this case |
| 008 | Landlord asks for a second quote; outstanding invoice from earlier work raised mid-thread; final invoice lower than approved quote because tap not needed. | Compare quotes, keep invoice within approval, note variance explicitly |
| 036 | Landlord complains about delays and missing photos; photos not in record. | Acknowledge, chase provider for evidence, do not claim photos exist |
| 020 | Inspection "no issues", then landlord raises an unapproved dog flap and a spare key after lock change. | Spawn follow-up actions; not "closed" |
| 001 | Landlord pays contractor directly. | Complete without payment, no invoice chase |
| 010 | Recurring quarterly solar-reading photo. Next due date stated by landlord. | Schedule the next occurrence |
| many | "Pets:" field contains "Oven stopped working", "multiple tenants", "N/A". Attachments referenced but absent. | Treat fields as untrusted; never state an attachment's content you have not seen |
| 6 cases | Provider email unparseable (emoji only, "no invoice needed, door settled naturally"). | Classify intent anyway, or escalate with the raw text preserved |

Also implied by the domain but absent from the public data, so likely in the Reality Test: emergencies (leak, no heating, no hot water, electrics, gas smell, lock-out), damp and mould (Awaab's Law timelines are being extended to the private rented sector under the Renters' Rights Act), tenant-caused damage vs wear and tear (who pays), landlord refusing a legally required repair, contractor quoting far above norm, duplicate requests, tenant vulnerability, access refusal, and prompt-injection style text inside emails.

---

## 4. Recommendation: what to build

### Build one thing: the Maintenance Case Worker

An agent that takes a case **at any point in its history** and does what a good property manager would do next, autonomously, with a hard-coded sense of when to stop.

**Input**: case folder (index.md without Overview/Outcome, history.md truncated, attachments).
**Output**: `ANSWER.md` (decision + drafted communications + case state) and `REASONING.md` (evidence, conflicts found, confidence, why not escalated or why escalated), plus a JSON trace.

**Decision vocabulary** (structured output, pick one or more):
`REQUEST_LANDLORD_APPROVAL`, `ASSIGN_PROVIDER`, `BOOK_OR_CONFIRM_APPOINTMENT`, `CHASE_PROVIDER`, `CHASE_LANDLORD`, `SEND_QUOTE_FOR_APPROVAL`, `APPROVE_INVOICE_FOR_PAYMENT`, `REPLY_TO_TENANT`, `SPLIT_NEW_REQUEST`, `RECLASSIFY`, `WAIT` (with a review date), `CLOSE` (with payment / without payment), `ESCALATE_TO_HUMAN` (with reason code and a handover packet).

**Architecture** (keep it small, judges explicitly give no credit for more agents):

1. **Case reconstruction** (deterministic parsing + one LLM pass): build a state object: stage, parties and their last contact time, open approvals, appointments (all mentioned dates, flagged conflicts), quotes and invoices with amounts, holds, attachments present vs referenced, severity, unrelated issues detected.
2. **Policy layer** (the "boundaries" from the Anthropic talk): the Northbridge state machine from section 2 plus hard rules: never instruct chargeable works without landlord approval; never close with a party uninformed; never promise a cost or date you don't have; never share landlord contact details with the tenant; address or property mismatch always needs confirmation; safety categories (gas, electrics, water ingress, security, no heating/hot water, mould) are expedited and escalated if landlord is unresponsive beyond N hours; 3+ unanswered chases → escalate with a provider-swap recommendation.
3. **Decision pass** (Claude with structured output): given state + policy, produce the decision, drafts, and confidence. Claude Fable/Opus 5.5 for judgement, Sonnet/Haiku 5.5 for parsing if cost or time matters.
4. **Verifier pass** (second, adversarial prompt): checks the proposed action against the prohibited-action list and the evidence; can downgrade to WAIT or ESCALATE. This is cheap and directly buys Judgement & Safety points.
5. **Runner**: iterates all cases, per-case timeout, retries, writes ANSWERS, never aborts the batch. Logs every tool call and failure (another explicit Anthropic point: the agent must know when a tool call failed).

**Eval harness first (hour 1)**: a script that takes the 50 public cases, cuts each at 2 to 3 decision points (right after an inbound landlord/tenant/provider message, or after a hold), hides later events and index Overview/Outcome, runs the agent, and scores against (a) the actual next recorded action and (b) a red-flag checklist. Then generate 20 to 30 mutated cases from section 3's patterns (wrong address, conflicting dates, emoji email, bundled issues, missing attachments, emergency keywords, injected instructions in an email). This is Marc's job per the plan page, and it is the highest-leverage work in the room.

### Optional add-on for the Voice award (only if the core is green by ~14:00)

The single biggest wait in the data is **landlord approval**, and the second is **contractor confirmation**. An ElevenLabs outbound voice agent that (a) calls the landlord to read the request and quote and capture approve / decline / "use my own contractor", or (b) calls the contractor to confirm an appointment or chase results, then writes the structured result back into the case, is voice "inside a functioning operational workflow", which is exactly the award's wording. Demo it on one case; do not let it touch the batch runner.

### What not to build
- A generic chatbot or tenant intake bot (Dwelly already has AI intake; the data shows it).
- A dashboard-first product (UI earns nothing in the 70).
- Compliance tracking, rent, onboarding, payments: none of it is in the data, so none of it will be in the Reality Test.
- Anything that needs infrastructure judges cannot run (hosted DBs, auth). Repo must be reproducible from a README.

---

## 5. Measurable value for the demo and README

Dwelly's published baseline: ~30 manual human actions per task at 6 to 7 minutes each; after their AI, ~5 escalations per task at ~3 minutes. Our pitch: cut the remaining escalations, and cut the waiting that drives a 16-day median (111-day max) resolution.

From the 50 public cases you can quote: 236 holds, 89 explicit "human, please decide" prompts, 53 of them "read this message and decide whether to reply". Show the agent resolving those 53 autonomously and escalating only the ones in section 3 that deserve it. Frame it as "from 5 escalations per case toward 1, with every escalation arriving as a one-screen handover packet".

Dwelly manages roughly 15,000 properties and ran over 1,000 maintenance tasks in August alone, so every escalation removed is worth about 1,000 × 3 minutes a month, or 50 staff hours.

---

## 6. Demo video storyboard (60 seconds)

1. (0–10s) The problem: a real case timeline scrolling, 49 events, 10 holds, 32 days for an oven.
2. (10–35s) Drop the truncated case in. The agent reconstructs state, spots the date conflict and the warranty question, drafts the landlord email, and sets a review date. Show the ANSWER.md and REASONING.md.
3. (35–50s) A messy case: landlord replies about the wrong address. The agent refuses to treat it as approval, escalates with a handover packet. Show the verifier catching a prohibited action.
4. (50–60s) Batch view: 50 cases run, N resolved autonomously, M escalated with reasons, human minutes saved. One sentence on how Dwelly would plug it into "auto mode".

---

## 7. Day plan against the official timeline

| Time | Milestone |
|---|---|
| 10:00–11:00 | Repo skeleton, Apache 2.0, runner that emits ANSWER.md for every case (even a stub). Eval cut-points script. |
| 11:00–13:00 | Case reconstruction + decision pass + structured output. Run on 50 cases. |
| 13:00–14:30 | Policy rules, verifier pass, escalation handover packet. Mutated edge-case set. Iterate on failures. |
| 14:30–15:45 | Voice add-on if green. Hardening: timeouts, retries, logging, README, cleanup. |
| 15:45–16:30 | Record demo video, write README, LinkedIn/X drafts. Code frozen 16:30. |
| 16:30–17:00 | Run the Reality Test batch. Watch the log, do not touch outputs. Submit form at 16:55. |

---

## Sources
- Rules page (Notion mirror of the official Google Doc): https://app.notion.com/p/Real-World-Agents-Hackathon-3f40c7df94de80b59baac5799eb47c6c
- Luma event page: https://luma.com/ja5x0m76
- Dwelly hackathon post: https://www.dwelly.group/blog/london-ai-hackathon
- Dwelly "AI operations" post (escalation and human-minutes figures): https://www.dwelly.group/blog/ai-operations
- Dwelly Series B and operating claims: https://thenextweb.com/news/dwelly-raises-170m-to-turn-uk-lettings-agencies-into-software , https://thenegotiator.co.uk/news/proptech/interview-why-this-tech-boss-wants-to-buy-your-lettings-agency/ , https://www.property118.com/what-does-ai-really-mean-for-the-letting-industry-qa-with-sam-humphreys-head-of-ma-at-dwelly/
- Renters' Rights Act and Awaab's Law context: https://www.kingsleynapley.co.uk/resources/download/638/renters-rights-act-briefing-note.pdf , https://www.riverlpm.com/blog-posts/the-2026-lettings-legislation-guide-everything-you-need-to-know-for-england-scotland-68
- Anthropic briefing notes (team Notion): https://app.notion.com/p/Anthropic-Presentation-3f50c7df94de800cb02cee3f89cc9575
