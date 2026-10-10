# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's email reports the same dripping tap already covered by open job R-4801, which is booked for 15 Oct. I did not create a duplicate. I noted the worsening on the ticket and replied to the tenant with the booking and interim advice.

## Where the case stands
R-4801 at visit stage, Swift Plumbing & Heating booked 15 Oct 08:00-12:00, confirmed with tenant. Nothing outstanding beyond the visit.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the existing job and visit stand, no duplicate, and gave interim tips | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | OTHER | Added note to R-4801 recording the worsening drip | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hi Amelia, thanks for letting us know. Your tap is already booked under job R-4801, with Swift Plumbing & Heating on Thursday 15 October, 8am-12pm. We haven't opened a second job, but we've added a note that it's getting worse so the plumber knows. In the meantime, a bowl under the drip helps, and you can turn off the small valve under the sink if it gets worse. If water starts to leak elsewhere or spreads, please let us know straight away. We'll update you if anything changes before the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new job created; the existing booking is unchanged.
- Severity stays routine; this does not confirm the cause or who pays.
- The contractor has not been messaged directly, only the ticket note.

## Remaining work
- Visit 15 Oct by Swift Plumbing & Heating
- Re-assess urgency if the tenant reports a leak or spread of water

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. It is the same fault as open job R-4801, which already has a contractor and a confirmed visit. A duplicate would risk a double booking.

**2. What do you reply to the tenant?**

I told her the tap is already booked under R-4801 for Thu 15 Oct 8am-12pm with Swift Plumbing & Heating. I said the worsening has been noted, suggested a bowl and the isolation valve, and asked her to tell us if water spreads.

**3. What, if anything, do you change on existing records?**

I added a note to R-4801 recording the worsening drip. Stage, contractor and visit are unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"10/10 tenant emailed: tap now drips constantly even when fully closed, getting worse. Duplicate of this job, no n… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
