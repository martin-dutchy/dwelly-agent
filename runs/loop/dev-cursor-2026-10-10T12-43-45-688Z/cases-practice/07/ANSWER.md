# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's email reports the same dripping tap already covered by R-4801, booked for 15 Oct. I created no duplicate, added a note that it is worsening, and replied with the booking and interim advice.

## Where the case stands
R-4801 at visit stage, Swift Plumbing & Heating booked 2026-10-15 08:00-12:00, confirmed with tenant. Nothing outstanding beyond the visit.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the tap is already booked under R-4801 for 15 Oct 8-12, with interim advice | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | OTHER | Noted worsening drip on R-4801 | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hi Amelia, thanks for letting us know. Your tap is already booked in under job R-4801: Swift Plumbing & Heating are due on Thursday 15 October, 8am-12pm. I've added a note that it is getting worse so the plumber knows. In the meantime, you can turn off the isolating valve under the sink if the drip gets bad, and put a bowl under it. If it turns into a proper leak or water gets near electrics, please tell us straight away. We'll be in touch after the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new ticket created; the existing job is unchanged apart from a note.
- The note does not move the visit date earlier or notify the contractor directly.

## Remaining work
- Swift Plumbing & Heating attend 15 Oct; ops to review the result afterwards.

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. It is the same fault as open job R-4801, which has a confirmed visit. A new job would duplicate it.

**2. What do you reply to the tenant?**

I told her the tap is booked under R-4801 for Thu 15 Oct 8am-12pm with Swift, that the worsening is noted, to use the isolating valve and a bowl meanwhile, and to tell us if it becomes a leak.

**3. What, if anything, do you change on existing records?**

I added a note to R-4801 recording the worsening drip. The stage, contractor and visit are unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"Tenant emailed 2026-10-10: kitchen tap worsening, now drips constantly even when fully closed. Duplicate of this … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
