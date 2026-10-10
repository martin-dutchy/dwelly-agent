# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant chased a dishwasher door fault that already has an open job and a booked visit on 29/04. I replied on the existing thread with the booking, added a note on the duplicate and the record inconsistencies, and returned the job to auto mode.

## Where the case stands
Stage: visit. Engineer visit booked 29/04/2026 (slot 8-12, system 08:00). Tenant's 28/04 email is a duplicate chase. Waiting on the visit and its result.

## Next action
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the job is already open and the visit is booked for 29 April 8-12, with the provider number to rearrange | Leo Turner, tenant | email | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for your message. No need to report it again: an engineer is already booked to look at the dishwasher door on Wednesday 29 April, between 8am and 12 noon. If that doesn't suit, please call the provider on 07700 900410 to rearrange. If anything changes or the visit doesn't happen, let us know and we'll chase it. We'll update you after the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the fault is fixed or what it costs.
- It does not establish who pays or whether a quote is needed.
- No new ticket was opened, because this is a duplicate.

## Remaining work
- Provider attends 29/04; record the work result afterwards, and take any quote to the landlord.
- If there is no result after the visit date, ask the provider and tenant what happened.
- Tidy the provider and tenant name inconsistencies in the record.

## Missing or unavailable information
- Provider name is inconsistent across records (Riverside Compliance / Cedar Utilities / Harbour Homes).
- Landlord approval is only noted as 'LL already agreed for GS to go out' (an internal note), with no formal recorded decision.

## Conflicts between sources
- Provider named as Riverside Compliance (events 014/015/018), Cedar Utilities (016) and Harbour Homes (020). I trusted the assigned provider in the system record, Riverside Compliance.
- Tenant named Leo Turner vs Leo Kendall (016). I trusted Turner.
- Visit shown as 08:00 in the system vs an 8-12 window from the provider call. I used the 8-12 window.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Open routine job at the visit stage. The engineer visit is booked for 29/04/2026 (8-12). Still outstanding: the visit, then the result, any quote and approval, and the invoice.

**2. What is the next action, who is it for, and through which channel?**

Reply to Leo Turner (tenant) by email confirming the existing booking. This is done (A1). After that, wait for the visit.

**3. Does anything need a human decision, and why?**

No. This is a duplicate of an open job with a visit already booked, so no escalation is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28/04 (event 021) is a duplicate chase of this open job; no new ticket. Visit held… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
