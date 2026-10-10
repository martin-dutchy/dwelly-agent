# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's email duplicates open job R-4801, which already has a confirmed visit on 15 Oct. I created no new job. I added a note about the worsening drip and replied to the tenant with the booking and interim advice.

## Where the case stands
R-4801 at visit stage, booked 2026-10-15 08:00-12:00 with Swift Plumbing & Heating, confirmed with tenant. Nothing outstanding from us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the tap is already booked under R-4801 for 15 Oct 8-12, noted the worsening, gave isolation valve advice | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | OTHER | Added note to R-4801 recording the duplicate report and worsening drip | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hi Amelia, thanks for letting us know. Your tap is already booked in under job R-4801: Swift Plumbing & Heating are due on Thursday 15 October, 8am-12pm. I've added a note that it's now dripping constantly so the plumber knows. In the meantime, you could turn off the isolation valve under the sink if it's easy to find. If the leak becomes a steady flow or water reaches anything electrical, please tell us straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not move the visit date or change severity.
- No contractor was contacted directly; the note is on the ticket only.

## Remaining work
- Visit on 15 Oct by Swift Plumbing & Heating; the ops team should pass on the worsening if the contractor is not already aware.

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. R-4801 is an open job for the same tap, with a contractor assigned and a visit booked. A new job would be a duplicate.

**2. What do you reply to the tenant?**

Reply sent: the tap is already booked under R-4801 for Thu 15 Oct 8am-12pm with Swift Plumbing & Heating. The worsening is noted. She can turn off the isolation valve under the sink. She should tell us at once if it becomes a steady flow or reaches anything electrical.

**3. What, if anything, do you change on existing records?**

Added a note to R-4801 about the duplicate report and the worsening drip. Stage, visit and severity are unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"2026-10-10: tenant emailed again (duplicate report, no new job). Says tap now drips constantly even when fully cl… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
