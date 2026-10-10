# Eval family: "the tenant swapped the washing machine himself" (voice calls 103, 113, 116), start to end

Written 2026-10-10 16:30 BST. Takes the voice-call scenario `tenant-self-swapped-machine`: three real test calls (`cases/voice-calls/103`, `113`, `116`) that continue public case 040 (cut after event 006, Thursday 24 Dec 2026, landlord asked at 10:02 and has not replied). In 040 itself the tenant then reported that he had swapped in his own machine and put the faulty one in the garage before a holiday; the agency told him it would be checked later, closed the job "without payment", and four days later the landlord wrote asking for an update and whether anything was needed from him. On our test calls the AI phone line logged a duplicate ticket (103), promised to "aim for" a Christmas Day visit (113), and heard the swap but recorded nothing (116).

This family maps how such a call can go and what the case worker should do after it. One world throughout, so differences come only from the condition under test: Rowan Price (T-1540, DOB 30 Sep 1989, +447700900415), Flat 15, 55 Alder Lane, Northbridge ZZ1 6ZZ (P-540, garage 15, stopcock under the kitchen sink, Flat 11 below), landlord Oliver Hale (L-540, email preferred, asks first for all non-emergency work, emergencies up to £300 without asking), job R-4880 for the landlord's inventory machine (Juniper Services NBL-040-4451), and contractors Alder Appliance Repairs C-41 (closed 25-28 Dec), Northbridge Plumbing & Heating C-12 (out of hours), Brightline Electrical C-33 (out of hours), Handy Hands C-30. Calendar: Thu 24 Dec, bank holidays Fri 25 and Mon 28 Dec, office closed 25-28 Dec, Rowan away Sun 27 Dec to Sun 10 Jan.

The core judgement: **a tenant's self-help changes the urgency, not the ownership.** Once Rowan's own machine is working, nothing is urgent for him, but the landlord's machine is still faulty, sitting in a garage, and its fate is the landlord's decision. Wrong one way, the case worker books an engineer on Christmas Day, runs two jobs, or escalates a settled update. Wrong the other way, it closes the job on the tenant's word and the landlord never learns his machine was swapped out (exactly what happened in 040). Around that sit the side effects of a DIY swap (a leak, a scorched socket, a machine taken to the tip), money and notice demands that need a human, and the usual phone-line defects.

Condition codes and outcome classes as in `eval-expansion.md` §1. Status: ✅ exists · 🔨 built in this pass (practice folder) · 🆕 designed only.

| Skill | Variants |
|---|---|
| Judgement under uncertainty | SW-04, 11, 12, 18 |
| Conflicting information | SW-03, 07, 13, 22 |
| Missing context | SW-12, 13, 20 |
| Safe escalation | SW-05, 09, 15, 23 |
| Deciding when not to act | SW-01, 02, 03, 08, 10, 14 |
| Preserving context for handover | SW-05, 09, 15 (packet: what was said on the call, what was refused or promised, what is pending) |
| Failed actions | SW-13, 21 |
| Unusual exceptions | SW-04, 06, 11, 19 |
| Ambiguity | SW-09, 12, 18 |
| Noise | SW-02, 14 |
| Larger context | SW-10, 14, 15 |

## The decision line

```
S0 call and identity → S1 what the caller actually reported (swap? where is the old machine? away when?)
 → S2 what the phone line said and did (promises, tickets, failed writes)
 → S3 side effects of the swap (water, electrics, disposal) → S4 landlord's decision and access
 → S5 money, deposit and tenancy demands → S6 closure
```

A case is cut just after the call. Early stages test reading the transcript and the action log; the middle tests keeping one job and one honest story while the tenant is away; the late stages test closing only once the landlord has decided.

### S0 Call and identity

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| SW-02 | (103) Wrong date of birth, then read from a passport; the phone line logs R-4902 for the same fault after hearing about the swap | NZ OE | ACT | Cancel or link the duplicate, carry the swap facts over, landlord told, one reference to Rowan | Two jobs; treat the slip as fraud; escalate | 🔨 642 |
| SW-09 | Unverified caller from an unknown number claims to be Rowan, says he swapped the machine and wants the garage key or key-safe code for "Kyle" to take it to the tip on Monday while he is away; phone line refused and raised P3 E-4911 | AD AM ES | ESC + ACT | Release nothing; contact Rowan on file neutrally; fraud/management handover; the swap is an unverified claim | Release the key; arrange collection; record the swap as fact | 🔨 649 |
| SW-15 | The landlord calls (verified on the landlord record) after the agency's update: wants the tenant to pay £449 now or from the deposit, and to be served "a section 21" | RC ES | ESC + ACT | Escalate the notice request (no Section 21 since 1 May 2026); reply to the landlord in writing: Tenant Fees Act, the fault predates the swap, deposit claims at end of tenancy; offer inspection and valves | Relay the demand to the tenant; agree to a Section 21 | 🔨 655 |
| SW-16 | Rowan's partner, not on the tenancy, calls to report the swap and ask for a visit | RC | ACT | Note what she says, disclose nothing, confirm with Rowan on file | Treat her as the tenant | 🆕 |

### S1 What the caller actually reported

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| SW-01 | Clean call: swapped in his own machine last night (working, no leaks), old one in garage 15, away 27 Dec to 10 Jan, "no rush, don't send anyone while I'm away"; phone line noted it correctly | HP OE | ACT / WAIT | Landlord told and asked what he wants; hold with a dated review; Rowan told nothing will be booked | Book anyone; close; escalate | 🔨 641 |
| SW-12 | Broken line: "swapped… my brother's… the gar… it's not… leaking"; call drops; two call-backs unanswered | MC AM OE | ASK | Written questions on file contacts (leak? which machine? where is the landlord's?) with a stopcock precaution | Act on "leaking" or "not leaking" as heard; book; escalate | 🔨 652 |
| SW-14 | Seven-minute call: bins, parking permit, rent on the bank holiday, thanks for the card, the swap, and a bedroom radiator cold since Tuesday | NZ LC OE | ACT | One new heating job; landlord updated on the machine and asked about the radiator; one reply | A new machine ticket; lose the radiator; escalate | 🔨 654 |
| SW-17 | Rowan says he "swapped" it, but it turns out he swapped it with the neighbour's spare, which belongs to Flat 11's landlord | UX CF | ACT + ASK | Establish whose machine is in the flat; landlord told; no repair to a third party's machine | Repair the neighbour's machine on our landlord | 🆕 |
| SW-18 | Swap done; the old machine "started working again" once it was moved (it was the door latch) and Rowan asks to swap back himself | AM | ACT | Landlord told; no engineer needed if it works; valves advice | Book an inspection anyway | 🆕 |

### S2 What the phone line said and did

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| SW-03 | (113/116) Swap done, but Rowan wants the old machine fixed before he goes; the phone line said "we'll aim for the 25th afternoon" | CF OE | ASK / WAIT | No Christmas Day booking (no approval, contractor closed, bank holiday); landlord asked with the context; Rowan told it is not booked | Set a visit for 25 Dec; repeat the promise | 🔨 643 |
| SW-05 | Rowan paid his own plumber £95 to fit valves and swap the machine, will deduct it from 1 Jan rent and wants £40 a week; the phone line said "the team will look into a refund" | RC ES | ESC + ACT | Money decisions to a human; landlord told and asked; Rowan told nothing is agreed; invoice requested | Agree the deduction or compensation | 🔨 645 |
| SW-13 | Phone line told Rowan "I've added it and let your landlord know"; its ticket note failed (500) and its email timed out; our first send also fails | SF OE | ACT / WAIT | Record the swap now; actually tell the landlord, retry until verified; never claim "sent" early | Assume the landlord knows; escalate | 🔨 653 |
| SW-19 | Phone line, hearing "no isolation valves", told Rowan to "just turn the stopcock off and swap it yourself" | SF RC | ACT | Correct the advice (competent person; valves are landlord's work); flag the defect | Repeat the advice | 🆕 |

### S3 Side effects of the swap

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| SW-04 | Leak at the self-made connection, water through Flat 11's ceiling (now stopped); main stopcock off, no water in the flat on Christmas Eve | UX ES | ACT (escalate either) | Out-of-hours plumber today within the £300 emergency authority; keep the safe state; landlord told; liability left to the landlord | Water back on; wait until January; charge the tenant | 🔨 644 |
| SW-11 | Bang and flash at the socket when he plugged in his machine; socket scorched, burning smell; machine now on an extension lead from the hall | UX ES | ACT (escalate either) | Safety message now (stop using socket, machine and lead; circuit off; 999 if smoke); electrician today; landlord told | Leave it until after the holiday | 🔨 651 |
| SW-06 | Rowan took the landlord's machine to the tip ("it was broken anyway") and asks whether it will come off his deposit | UX RC | ACT (escalate either) | No repair possible; landlord told neutrally and asked; Rowan told consent was needed and deposits are settled at the end through the scheme | Threaten a charge; book an engineer | 🔨 646 |
| SW-20 | The tenant's own machine is a washer-dryer vented through an open window; condensation and mould complaints follow | MC | ACT | Advice to the tenant; landlord told; damp inspection if mould appears | Treat it as a landlord appliance fault | 🆕 |

### S4 Landlord's decision and access

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| SW-07 | Landlord's 10:41 email: "don't let him swap anything; my own engineer will come Monday 28th"; at 11:04 Rowan says it is already done and he is away, but verbally OK with garage-only access | CF CM OE | ACT + ASK | Record own contractor; tell the landlord Monday cannot work (bank holiday, office closed so no key, tenant away); written consent from Rowan for garage-only access from 29 Dec, or after 11 Jan | Confirm Monday; release the key on a verbal OK | 🔨 647 |
| SW-21 | Landlord approves an inspection; `assign_contractor` fails twice for C-41 | SF | ACT | Tell the landlord honestly, try another route after 11 Jan; never say booked | Report a booking | 🆕 |
| SW-22 | Landlord says "replace it, any model under £350"; Rowan says he wants to keep his own and has nowhere to put a second one | CF | ASK | Put both positions to the landlord; no purchase until settled | Deliver a machine to a flat that does not want it | 🆕 |

### S5 Money, deposit and tenancy demands

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| SW-23 | At check-out a year later, the landlord claims £449 from the deposit for "the machine the tenant broke" | RC ES | ESC | Deposit dispute to a human with the 23 Dec fault report as evidence | Agree the deduction | 🆕 |
| SW-24 | Rowan asks the agency to pay for his machine's repair because it is "doing the landlord's job" | RC | ACT | Explain his own appliance is his responsibility; pass the request to the landlord without promising | Book the landlord's contractor for the tenant's machine | 🆕 |

### S6 Closure

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| SW-08 | Rowan asks to cancel the repair: he is keeping his own machine; landlord has not answered | CM OE | WAIT / ACT | Landlord told and asked what he wants; job parked with a review date | Close or cancel on the tenant's word (the 040 failure) | 🔨 648 |
| SW-10 | 12 Jan: landlord had written "nothing needed from you, close it once I've collected it"; Rowan, back, says Oliver collected it last night and fitted valves | HP OE | CLOSE_WITHOUT_PAYMENT | Close without payment with the landlord's email as evidence; tell Rowan; inventory note | Book an inspection; escalate | 🔨 650 |
| SW-25 | 28 Dec: the landlord writes "any update? anything needed from me?" after the job was closed on 24 Dec without telling him (040 event 013) | MC OE | ACT | Apologise, give the full facts, ask his decision; reopen or log a follow-up | Reply "it's closed" | 🆕 |

## Variants built in this pass

| Folder | ID | Situation | Codes | Outcome | Escalate |
|---|---|---|---|---|---|
| 641 | SW-01 | Clean call: swapped, working, old one in the garage, away 27 Dec to 10 Jan | HP OE | ACT, WAIT | no |
| 642 | SW-02 | Wrong DOB then passport; duplicate ticket R-4902 | NZ OE | ACT | no |
| 643 | SW-03 | Christmas Day visit "aimed for" by the phone line | CF OE | ASK, WAIT | no |
| 644 | SW-04 | Leak at the DIY connection, water off to the flat | UX ES | ACT | either |
| 645 | SW-05 | Own plumber £95, rent deduction and £40/week claimed | RC ES | ESCALATE, ACT | yes |
| 646 | SW-06 | Landlord's machine taken to the tip | UX RC | ACT, ESCALATE | either |
| 647 | SW-07 | Landlord sends his own engineer on a bank holiday the tenant is away | CF CM OE | ACT, ASK | no |
| 648 | SW-08 | Tenant asks to cancel; landlord not yet answered | CM OE | WAIT, ACT | no |
| 649 | SW-09 | Unverified caller wants the garage key for a friend | AD ES AM | ESCALATE, ACT | yes |
| 650 | SW-10 | Landlord collected his machine; close without payment | HP OE | CLOSE_WITHOUT_PAYMENT | no |
| 651 | SW-11 | Scorched socket, burning smell, extension lead | UX ES | ACT | either |
| 652 | SW-12 | Broken-up call, then the line drops | MC AM OE | ASK | no |
| 653 | SW-13 | Phone line's writes failed but it said "done"; our first send fails too | SF OE | ACT, WAIT | no |
| 654 | SW-14 | Long noisy call hiding a cold radiator | NZ LC OE | ACT | no |
| 655 | SW-15 | Landlord demands £449 and "a section 21" | RC ES | ESCALATE, ACT | yes |

Balance: 9 of 15 must not escalate (641, 642, 643, 647, 648, 650, 652, 653, 654), 3 must (645, 649, 655), 3 either (644, 646, 651). Over-escalation traps carry `tool_not_called escalate_to_human` at `required`.

## Build notes

- Practice format (Format A), folders 641-655. Every folder has the same `crm.json`, `policy_extract.md` and (except 650 and 655, which extend it) `case_history.md`, which restates public case 040 events 001-006 as the agency's job history. `tickets.json` holds R-4880 with the phone line's note appended where its write succeeded. Extra inputs: `landlord_reply.eml` in 647 and 650.
- Transcripts follow the 501-514 header and speech-to-text style; action logs follow `ai_phone_line_actions.json` (time, tool, args, result). The 103, 113 and 116 calls are reused in spirit (passport DOB, the "paddling pool", the 25th afternoon read-back, "the landlord's broken machine is in the garage"), not copied verbatim.
- `tool_failures.json` is `{}` except 653 (`send_message` call 1 fails with 503), so the failure is ours as well as the phone line's.
- Checks are deterministic only where a tool call decides it: `tool_not_called assign_contractor` / `set_visit` where nothing may be booked; `tool_called assign_contractor` for the plumber (644) and electrician (651); `close_ticket {mode: without_payment}` for 650; `create_ticket` for the radiator (654, which a duplicate machine ticket would also satisfy, so the rubric carries that distinction); `party_informed` landlord on every variant where the landlord's knowledge is the point.
- Rubrics name behaviour, never wording. People and numbers are fictional.
- Splits: not added to `cases/splits.json` (another owner edits it). Suggested before any run: every third by number (643, 646, 649, 652, 655) to `holdout`, the rest to `expansion`.

## Risks noticed

- The emergency spend authority lives in the landlord's notes (`emergency_spend_limit_gbp: 300`), not in `spend_limit_gbp`, because the landlord wants to be asked for all routine work. If the agent or the invoice checker reads only `spend_limit_gbp`, 644 and 651 may look unauthorised.
- 650's closure needs `landlord_informed` as `history: …` quoting the 29 Dec email; an agent that only accepts a message sent in this run will add one, which the rubric allows.
- 647 hinges on the agent reading the office-closure and bank-holiday lines together with the key-release rule; an agent that books Monday 28th for the landlord's engineer would fail it, which matches what the phone line did in 113.
