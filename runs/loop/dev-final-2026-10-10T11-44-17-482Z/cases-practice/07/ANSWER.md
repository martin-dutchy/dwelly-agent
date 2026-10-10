# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's email is a duplicate/update of open job R-4801 (dripping kitchen tap, visit 15 Oct). No new job; added a note about the worsening drip, replied to the tenant and set a follow-up.

## Where the case stands
R-4801 at visit stage, Swift Plumbing & Heating booked 15 Oct 08:00-12:00, confirmed with tenant. Note added about worsening drip. Follow-up set for 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the existing job and 15 Oct visit stand, no new job, isolation valve tip, next update by 12 Oct | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | WAIT | Review 12 Oct: ask contractor for an earlier slot and update tenant | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hi Amelia, thanks for letting us know. Your tap repair is already booked (ref R-4801): Swift Plumbing & Heating are due on Thursday 15 October, 8am-12pm. We haven't opened a second job, but we've added a note that the drip is now constant, and will ask the contractor whether they can come sooner. If there's a isolation valve under the sink (a small slotted screw or lever on the pipe), turning it off will stop the drip until the visit. If the water starts to run rather than drip, or reaches anything electrical, please tell us straight away. We'll update you by Monday 12 October.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new job created; the earlier visit is not requested or confirmed yet.
- Contractor not yet messaged about the worsening.

## Remaining work
- Ask Swift Plumbing & Heating on 12 Oct (or sooner) whether an earlier visit is possible; update tenant.

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. R-4801 already covers the same tap, is assigned and has a confirmed visit. A new job would duplicate it.

**2. What do you reply to the tenant?**

Confirmed the existing booking on 15 Oct 8am-12pm, said no second job is needed, noted the worsening, gave isolation valve advice, and said she will hear from us by 12 Oct.

**3. What, if anything, do you change on existing records?**

Added a note to R-4801 about the worsening drip and set a follow-up for 12 Oct to seek an earlier visit. Nothing else changed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"Tenant emailed 2026-10-10: tap now drips constantly even when fully closed (worse than at logging). Treated as up… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Check whether Swift Plumbing can attend earlier than 15 Oct given tap worsening; update tenant","ticket_re… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
