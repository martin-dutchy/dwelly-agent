# Case V040-tenant-self-swapped-machine-gs2den: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine washing machine fault awaiting landlord approval (asked 24 Dec, no reply). Phone report R-4902 treated as a duplicate and noted. Held with review date and tenant updated.

## Where the case stands
Landlord approval gate; landlord emailed 24 Dec 10:02, no reply. Ticket on hold until 29 Dec. No contractor assigned, no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord decision; review 2026-12-29, then chase on a second channel | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the duplicate is merged, no visit confirmed, don't swap machine yet, next update by 29 Dec | Rowan Price, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for your call. Your call and original report are the same job, so we are keeping them together as one. We are still waiting for your landlord to say how they want to proceed, so I can't confirm a visit for tomorrow, and with the bank holiday it may take a little longer. Please don't swap the machine yet; the landlord needs to agree to that, and with no isolation valves it is best done by a professional. Once we hear back we will arrange an engineer. We will update you by 29 December at the latest. Thank you, Langley

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit, contractor or swap is approved or booked
- Tenant's request for 25 Dec is not a booking
- Nothing decides cause or who pays

## Remaining work
- Landlord to choose route (our contractor, own, tenant fix) and consent to tenant's own machine swap
- Then assign contractor and book visit, owner: agency
- Chase landlord on 29 Dec if silent

## Missing or unavailable information
- Landlord decision

## Conflicts between sources
- Tenant's DOB given as 28 Sep then 30 Sep on the call; verified on passport detail; tenant is already on case history.
- Phone call created R-4902, not shown in ticket list; treated as duplicate.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate; landlord has not replied. Outstanding: landlord decision, then contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Wait with review on 29 Dec (then chase landlord by SMS/phone); tenant was emailed an update (A3).

**3. Does anything need a human decision, and why?**

No. Only the landlord's decision is needed, which is routine; not time-critical enough to escalate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-V040-tenant-self-swapped-machine-gs2den","reason":"Waiting for Landlord","comment":"Landlord emailed 2026-12-24 10:02 ask… | 1 | ✅ verified | Ticket NBL-V040-tenant-self-swapped-machine-gs2den read back after put_on_hold |
| A2 | `add_note` | {"entity":"NBL-V040-tenant-self-swapped-machine-gs2den","note":"Tenant phone call (event 007) logged R-4902 for same fault: duplicate, linke… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","body":"Hello Rowa… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
