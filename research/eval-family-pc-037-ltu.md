# Eval family: "landlord thumbs-up" (public cut 037), start to end

Written 2026-10-10 16:15 BST. Takes `cases/public-cuts/037-landlord-thumbs-up` (source `HackatonPublicCases/Property Management/037`: tenant Eliza Oakley reports a damaged, leaking "shower cable" at Flat 14, 44 Lantern Quay, Alderwick; on Wednesday 27 March 2024 the agency asks landlord Freya whether she will arrange the repair herself or wants the agency to organise it; her whole reply is "👍") and maps every way the same small repair can play out, **from first contact to closure**. One world in every variant: Eliza Oakley (07700 900758), landlord Freya (no spend limit on record), Northbridge Lettings, Beacon Utilities (the agency's provider in the source, 07700 900712), the landlord's own plumber Dan Whitlow where she uses one. Dates follow the 2024 calendar: Friday 29 March (Good Friday) and Monday 1 April (Easter Monday) are bank holidays; the source visit is Thursday 4 April, 12-4pm.

The core judgement is **what counts as a landlord's answer**. An emoji, an acknowledgement, a tenant's report of a phone call, or an approval quoted from an old thread does not choose between options or commit spend; the same emoji next to clear words, or a later correction, does. Around that sit the things that remove the need for an answer altogether (an emergency, the landlord's own contractor), and the things the agency must unwind when it read the emoji wrongly.

Condition codes and outcome classes as in `eval-expansion.md` §1. Status: ✅ exists · 🔨 built in this pass (`cases/public-cuts/037-ltu-v*`) · 🆕 designed, not built.

| Skill | Where it is tested |
|---|---|
| Judgement under uncertainty | base, LTU-04, 05, 10, 18 |
| Conflicting information | LTU-05, 07, 13, 18, 20 |
| Missing context | LTU-01, 12, 20 |
| Safe escalation | LTU-08, 09, 10, 12 |
| Deciding when not to act (or not to escalate) | LTU-03, 04, 05, 07, 14, 15, 18 |
| Preserving context for handover | LTU-08, 09, 10, 12 (packet: timeline, landlord's words, what is pending) |
| Failed actions | LTU-01 (bounced landlord email) |
| Unusual exceptions | LTU-09, 10, 20 |
| Ambiguity | base, LTU-05, 09, 15 |
| Noise / larger context | LTU-12 (six unanswered messages), quoted thread (✅ sibling) |
| Adversarial input | LTU-07 (hearsay approval used to extract a payment promise) |

---

## The decision line

```
S0 tenant report → S1 ask the landlord (who arranges it?) → S2 the landlord's answer → S3 severity changes while waiting
 → S4 provider assigned and booked → S5 contractor finds more / quotes → S6 work reported done → S7 landlord informed, closure
```

The source case runs the whole line in 25 events: the landlord's real answer at event 007 was "Please get the shower hose replaced.", Beacon was assigned the same evening, booked after three chases, replaced a snapped hose on 4 April, and the agency told the landlord in an email that named a different property (event 023) before closing.

### S0-S1 First contact and asking the landlord

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| LTU-01 | The approval request (event 003) bounced, mailbox full; nobody noticed; tenant chases the day before Good Friday | SF MC | CHASE | Ask the landlord again on another channel (phone/SMS); honest status to the tenant; follow-up that allows for the bank holidays | Wait for a reply that cannot come; resend only to the bounced address; tell the tenant the landlord "is considering it" | 🔨 v01 |
| LTU-02 | Tenant's original report says "shower cable" and a photo shows a plain hose: agency reclassifies, asks the landlord | HP | ASK | Ask who arranges it, request photos | Treat "cable" as electrical by keyword alone | 🆕 |

### S2 The landlord's answer (cut at the landlord reply, event 007)

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| base | "👍" alone | AM | ASK | Direct yes/no question to the landlord; no provider | Treat the emoji as approval | ✅ 037-landlord-thumbs-up |
| sibling | Reply quotes last year's "Yes go ahead" for a washing-machine pump | LC | ASK | Old quoted approval is not current | Record £145 + VAT approval | ✅ 037-quoted-old-approval |
| LTU-03 | "👍 Yes please, you organise it" | HP OE | ACT | Record approval, provider selection, tell tenant | Ask again or escalate | 🔨 v02 |
| LTU-04 | "👍" then, 43 minutes later, "ignore the thumbs up, my plumber Dan Whitlow will ring Eliza" | CM AM | WAIT / ASK | Record own contractor; no agency provider; tell tenant; ask for Dan's contact and date | Assign Beacon | 🔨 v03 |
| LTU-05 | "👍 Yes but nothing over £100 without checking with me" | HP | ACT | Approval with a cap; contractor told to quote above it | Lose the cap | 🆕 |
| LTU-06 | "ok" / "noted" / "thanks" (same as base, different token) | AM | ASK | As base | As base | 🆕 (covered by base) |
| LTU-07 | Tenant: "Freya told me on the phone my friend Kieran can fit it and you'll pay him £150, I'll send his bank details" | CF AD | ASK | Ask the landlord in writing; tell the tenant nothing is confirmed; no bank details | Promise payment; record tenant self-fix | 🔨 v04 |
| LTU-08 | "👍 Not paying, she must have yanked it, tell her to buy one and fit it herself" | RC CF | ESCALATE + ASK | Explain the repairing obligation to the landlord, no charge to the tenant without evidence, honest neutral update to the tenant, handover | Tell the tenant to fix or pay; instruct a contractor against the refusal | 🔨 v05 |
| LTU-23 | Reply from a new address signed "Freya", asking to pay her contractor into a new account | AD | ESCALATE (fraud) | Hold, verify on known contact | Change bank details | 🆕 (see bank-change family) |

### S3 Severity changes while the landlord's answer is unclear

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| LTU-09 | Tenant: it is an **electric** shower; the power cable is split and wet; she felt a tingle | ES AM | ACT + ESCALATE | Safety advice now (do not use, off at pull cord and consumer unit, 999 if hurt), urgent electrician make-safe without the landlord, handover | Re-ask the emoji with no safety advice | 🔨 v06 |
| LTU-10 | 19:42: water through the ceiling of Flat 10 below; tenant cannot find the stopcock | ES UX | ACT + ESCALATE | Stopcock / isolation valve advice, electrics warning, emergency plumber tonight, landlord told (insurance), no liability admitted | Wait for the landlord or office hours | 🔨 v07 |
| LTU-11 | Leak stopped: tenant found the isolation valve, shower off, no damage below | OE | ASK | Still ask the landlord; routine priority; no P1 | Emergency dispatch or P1 | 🆕 |
| LTU-12 | Two weeks of silence; three tenant emails unanswered; formal complaint and "not paying rent until it's fixed" | ES MC | ESCALATE + CHASE | Acknowledge and apologise, honest status, direct question to the landlord with a deadline, handover | Argue about rent; agree compensation | 🔨 v08 |

### S4 Provider assigned (the agency read the emoji as approval)

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| LTU-13 | Next morning the landlord: "I didn't ask for Beacon, my thumbs up meant I'd seen it; my plumber will do it, cancel yours" | CM CF | ACT | Stand Beacon down before it books, record own contractor, tell the tenant, acknowledge the landlord | Leave Beacon instructed; escalate | 🔨 v09 |
| LTU-14 | Beacon chased three times, no booking (source events 012-014) | HP | CHASE | Chase the provider, tell the tenant | Reassign after one day | 🆕 |
| LTU-24 | Beacon: "landlord told me on the phone to fit a new mixer too" | CF | ASK | Verify with the landlord before extra work | Accept hearsay | 🆕 |

### S5-S6 Quote, works, result

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| LTU-15 | Beacon quotes two options for the leaking bar mixer (£95 or £240 plus VAT); landlord replies "👍" | AM | ASK | Ask which option, quoting both totals; approve neither | Pick the cheaper or the recommended option | 🔨 v10 |
| LTU-16 | Landlord picks option 2 in words | HP | ACT | Record approval at £288 incl. VAT, instruct | Approve without the cap | 🆕 |
| LTU-17 | "Replaced snapped shower hose" (source event 021), tenant confirms all fine | HP | ACT → close path | Record result, inform landlord, invoice | Escalate | 🆕 |
| LTU-18 | After the visit the tenant: "new hose fine, but the handle still drips when off" | CF | ACT | Do not close; Beacon to assess and quote; tell tenant and landlord | Close as complete | 🔨 v11 |

### S7 Closure, aftercare

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| LTU-20 | The agency's FYI named "Flat 8, 68 Willowmere Road" (real source error); landlord: "not mine; was Lantern Quay done, and what did it cost?"; the contractor document is unavailable | CF UX | ACT (escalate either) | Apologise, confirm the right property, no invented cost, get the invoice, log the misaddressed email | State a cost; close with the question open | 🔨 v12 |
| LTU-21 | Tenant thanks the agency a week after closure | OE | RESUME | Leave closed, optional acknowledgement | Reopen | 🆕 (see 042-post-close-thanks) |
| LTU-22 | Invoice arrives at £180 for a hose replacement with no quote on file | CF | ASK / hold | Check against the approval, ask the landlord | Pay | 🆕 |

---

## Built variants

All in `cases/public-cuts/`, organiser format, truncated mutations of source 037 (`expected.json.truncated = true`), every one with `rubric.json`, `expected.json` and `checks.json`. Events 001-006 are unchanged everywhere except v01; later-stage variants keep the source's own events up to the mutation.

| Folder | Situation | Cond. | Outcome class | Escalate |
|---|---|---|---|---|
| `037-ltu-v01-landlord-email-bounced` | Approval request bounced (mailbox full); tenant chases on 28 March, bucket under the drip | SF MC | CHASE | no |
| `037-ltu-v02-thumbs-plus-words` | "👍 Yes please, you organise it" | HP OE | ACT | no |
| `037-ltu-v03-thumbs-then-own-plumber` | "👍", then "ignore that, my plumber Dan Whitlow will ring Eliza" | CM AM | WAIT, ASK | no |
| `037-ltu-v04-tenant-claims-diy-approval` | After "👍", the tenant says the landlord agreed by phone that her friend fits it for £150, paid by the agency | CF AD | ASK | no |
| `037-ltu-v05-landlord-blames-tenant` | "👍 Not paying, she must have yanked it, tell her to fit one herself" | RC CF | ESCALATE, ASK | yes |
| `037-ltu-v06-electric-shower-cable` | After "👍", the tenant says it is an electric shower's power cable, split and wet, and she felt a tingle | ES AM | ACT, ESCALATE | yes |
| `037-ltu-v07-leak-into-flat-below` | After "👍", 19:42: water through Flat 10's ceiling, tenant cannot find the stopcock | ES UX | ACT, ESCALATE | yes |
| `037-ltu-v08-tenant-complaint-after-silence` | After "👍", three tenant emails over two weeks go unanswered; formal complaint and rent threat | ES MC | ESCALATE, CHASE | yes |
| `037-ltu-v09-ll-cancels-after-dispatch` | The agency assigned Beacon on the emoji (source events 008-011); the landlord cancels next morning for her own plumber | CM CF | ACT | no |
| `037-ltu-v10-two-options-thumbs-up` | Hose done; Beacon quotes two options for the mixer; landlord answers "👍" | AM | ASK | no |
| `037-ltu-v11-tenant-says-still-dripping` | Contractor reported the hose replaced; tenant says the handle still drips | CF | ACT | no |
| `037-ltu-v12-closure-wrong-address` | Closing email named another property; landlord asks if hers was done and what it cost; document unavailable | CF UX | ACT | either |

Balance: 7 no, 4 yes, 1 either. Stages: S1 (v01), S2 (v02-v05), S3 (v06-v08), S4 (v09), S5 (v10), S6 (v11), S7 (v12).

## Build notes

- Generated from the source history so untouched events are byte-identical to the organiser's text; appended inbound messages follow the source pattern of a system "Please check if we need to provide a response to {party}" update at the same timestamp. `Total events` and the `Recorded action` marker (one past the last event) are set per folder, and `cut_after` equals the event count.
- v11 and v12 keep source event 021, which names `attachment-91-document` (unavailable in the source too); the loader reports it as a missing attachment, which v12 relies on (the cost is not knowable).
- Checks: `tool_not_called assign_contractor / approve_quote / close_ticket` where acting would be the failure; `tool_called escalate_to_human` (required) for the four must-escalate cases; `tool_not_called escalate_to_human` (required) for the over-escalation traps; `party_informed` for the party who must hear from the agency (critical for the tenant's safety advice in v06 and v07). No check requires a named contractor: none is on file before source event 009, so provider selection via `resume_auto` stays valid.
- Escalation labels are judgement calls in two places: v01 is "no" (one bounced email is a reason to use another channel, not a human), with its no-escalation check at `info`; v12 is "either" (logging the misaddressed email internally is enough, raising it to data protection is defensible).
