# Case 24: A verified tenant's repair the system dropped (AI phone line): ANSWER

**Decision:** action_taken · **Severity:** routine

The phone line verified Priya but lost the verification when its server restarted, so ticket creation failed and E-4901 was raised with no ticket. I created JOB-101 by hand, assigned the usual contractor within the landlord's limit, and emailed Priya the reference and timescale.

## Where the case stands
JOB-101 at visit stage, assigned to East London Appliance Repairs with a proposed 13 Oct morning window awaiting contractor confirmation. Tenant told. Follow-up set for 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Confirm contractor accepts the 13 Oct window, then update tenant | East London Appliance Repairs / Priya Shah | internal | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the ticket reference, target timescale, unconfirmed window and cat note | Priya Shah, tenant | email | A3 ✅ |
| 3 | ASSIGN_PROVIDER | Assigned usual appliance contractor within the landlord's £250 limit | East London Appliance Repairs | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, sorry about the glitch on our call. Your oven repair is now logged: reference JOB-101 (door hinge broken, door hangs open and won't shut). We've passed it to East London Appliance Repairs, our usual appliance contractor. Our target is a visit within 14 days. We've pencilled in Tuesday 13 October, 8am-12pm, since you're in weekday mornings, but the contractor hasn't confirmed it yet, so please don't treat it as booked. We'll confirm or give you a new time by Monday. We've noted you have a cat, so please keep it away from the oven and the contractor when they arrive. Please avoid using the oven until it's fixed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The window is not a confirmed booking until the contractor confirms.
- No cost is approved or quoted; any quote over £250 must go to the landlord.
- Landlord has not been messaged: routine job within his standing approval.

## Remaining work
- Confirm the visit with the contractor (ops, 12 Oct)
- Get work result and invoice, then close

## Missing or unavailable information
_None._

## Conflicts between sources
- Caller first said 'Shaw', then confirmed 'Shah'. The CRM name and DOB match, so identity is accepted.
- The ticket's 'routine' urgency matches the policy, since the oven is an appliance with no safety hazard.

## Answers to the case questions
**1. What does the tenant need, and what did the phone line actually get done?**

She needs her oven door hinge repaired (door hangs open, won't shut). The phone line verified her and confirmed details, but ticket creation failed, so no ticket existed.

**2. Why was E-4901 raised, and what do you do about it?**

The server restarted mid-call, which lost the verification and caused a 'not_verified' rejection. Her identity matches the CRM (name and DOB), so I completed the ticket myself as JOB-101. E-4901 needs no human decision.

**3. What actions do you take, and what do you tell the tenant?**

I created JOB-101 (routine), assigned East London Appliance Repairs, and set a follow-up. I emailed Priya the reference, the 14-day target, and the unconfirmed 13 Oct morning window. I also noted the cat and advised her not to use the oven.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","tenant":"Priya Shah (T-1003)","category":"appliance","severity":"routine","description":"Oven door hinge snapped this m… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"East London Appliance Repairs","visit_window":"2026-10-13 08:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"JOB-101","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Confirm East London Appliance Repairs has accepted the 13 Oct 08:00-12:00 window for JOB-101; update tenan… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
- phone-line create_repair_ticket: Redone by hand as JOB-101 (A1). The phone line's escalate_to_human raised E-4901, which is now covered by this work.
