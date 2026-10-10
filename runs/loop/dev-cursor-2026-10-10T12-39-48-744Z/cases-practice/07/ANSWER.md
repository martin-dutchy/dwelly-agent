# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's email duplicates open job R-4801 (dripping kitchen tap, visit booked 15 Oct). No new job; added the worsening detail to the existing ticket and replied to the tenant with the booked slot.

## Where the case stands
R-4801 at visit stage, contractor Swift Plumbing & Heating booked 2026-10-15 08:00-12:00, confirmed with tenant. Nothing outstanding beyond the visit.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the report is a duplicate of R-4801, visit 15 Oct 8-12 stands, worsening noted | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | OTHER | Added note to R-4801 about worsening drip | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hi Amelia, thanks for letting us know. Your dripping tap is already booked under job R-4801, so we haven't opened a new one. The plumber is booked for Thursday 15 October, 8am-12pm. I've added your note that it's now dripping constantly so they know it's got worse. In the meantime you can turn off the isolation valve under the sink if the drip becomes a problem. If it turns into a leak or flooding, please call us straight away. We'll be in touch if anything changes with the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new ticket created; the note does not change the visit date or severity
- Note does not confirm the cause of the worsening

## Remaining work
- Swift Plumbing & Heating attends 15 Oct; result and invoice handled then

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. It is the same fault already open as R-4801 with a confirmed visit. A constant drip is still routine, not an emergency.

**2. What do you reply to the tenant?**

Told her it is already booked under R-4801 for 15 Oct 8am-12pm, that the worsening is noted, to use the isolation valve if needed and to call if it becomes a leak.

**3. What, if anything, do you change on existing records?**

Only added a note to R-4801 recording the worsening. Stage, contractor and visit unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"Tenant emailed 2026-10-10: tap now drips constantly even when fully closed (worse). Duplicate of this job, no new… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
