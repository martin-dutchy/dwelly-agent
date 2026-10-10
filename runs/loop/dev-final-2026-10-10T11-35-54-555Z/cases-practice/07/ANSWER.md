# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's email is a duplicate of open job R-4801 (same tap, contractor booked 15 Oct). No new ticket; added a note about the worsening drip, replied to the tenant and informed the contractor.

## Where the case stands
R-4801 at visit stage, Swift Plumbing booked 15 Oct 08:00-12:00, confirmed with tenant. Waiting on contractor to attend/advise on earlier slot.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the existing job R-4801 covers this, visit date, interim isolation advice | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Told Swift the tap is worsening and asked if they can attend earlier | Swift Plumbing & Heating, contractor | sms | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hi Amelia, thanks for letting us know. We already have a job open for your kitchen tap (R-4801), so we haven't opened a new one. Swift Plumbing & Heating are booked for Thursday 15 October, 08:00-12:00. We've added a note that the drip is getting worse and will ask them whether they can come sooner; I can't promise that yet. In the meantime, you can turn the small isolation valve under the sink (a slot you turn a quarter turn with a screwdriver) to stop the water to the tap, and put a bowl under it. If water starts leaking elsewhere or you can't stop it, please call us straight away.

**A3 · send_message → Swift Plumbing & Heating (contractor) via sms, +447700900312** (verified)

> R-4801 Flat 4, 12 Mare Street: tenant reports the kitchen tap is worse, now dripping constantly when fully closed. Visit is booked 15 Oct 08:00-12:00. Please bring washers/cartridge, and tell us if you can attend earlier.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new job created; does not change the 15 Oct booking
- No earlier visit is promised or confirmed

## Remaining work
- Swift to confirm whether an earlier attendance is possible; ops to review if tap escalates to a leak

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. R-4801 is open for the same tap with a confirmed visit; a new job would duplicate it. The worsening is a routine drip, not a flood.

**2. What do you reply to the tenant?**

Said the existing job covers it, gave the 15 Oct 08:00-12:00 visit, said we'd ask for an earlier slot without promising one, and gave isolation-valve advice.

**3. What, if anything, do you change on existing records?**

Added note NOTE-101 to R-4801 recording the worsening; no stage, contractor or visit changes.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"Tenant emailed 2026-10-10: tap now drips constantly even when fully closed (worsening). Duplicate of this job, no… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"R-4801","… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
