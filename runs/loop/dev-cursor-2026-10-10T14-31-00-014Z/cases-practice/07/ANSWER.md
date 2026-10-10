# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's email duplicates open job R-4801 (dripping kitchen tap, visit booked for 15 Oct). I created no new job, added her worsening report as a note on R-4801, and replied with the booking details and an offer of a sooner slot.

## Where the case stands
R-4801 at visit stage, Swift booked 15 Oct 08:00-12:00. Waiting on tenant's reply about a sooner slot; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the job is already booked, gave a stop-gap tip and offered an earlier slot | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | WAIT | Follow-up 12 Oct to see if tenant wants a sooner slot | Amelia Clarke, tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hi Amelia, thanks for letting us know. Your tap is already logged (ref R-4801) and Swift Plumbing & Heating are booked to visit on Thursday 15 October, 08:00-12:00. I've added your update that it's getting worse and now drips constantly, so we haven't opened a second job. In the meantime, if there's a small valve on the pipe under the sink, turning it a quarter turn clockwise should stop the drip until the visit; put a bowl or towel under the tap if not. If the drip turns into a proper leak or water gets near any electrics, tell us straight away. Is the 15th still OK, or would you like us to ask for an earlier slot? We'll update you by Monday 12 October.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new job created; the existing booking is unchanged
- Worsening drip is not an emergency but may bring the visit forward if the tenant asks

## Remaining work
- Swift Plumbing & Heating visit 15 Oct
- Agency to chase an earlier slot if tenant asks

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. Same fault, same tenant, and R-4801 is already open with a confirmed visit. A second job would duplicate it.

**2. What do you reply to the tenant?**

Told her it is logged as R-4801 with Swift booked for 15 Oct 08:00-12:00 and her update is added. Suggested closing the isolation valve, asked whether the date suits or she wants an earlier slot, and said we'd update her by 12 Oct.

**3. What, if anything, do you change on existing records?**

Added a note to R-4801 about the worsening drip and set a follow-up for 12 Oct. Urgency stays routine and the booking is unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4801","note":"Tenant emailed 10 Oct 12:09: tap now drips constantly even when fully closed (worse). Linked as duplicate, no new jo… | 1 | ✅ verified | Ticket R-4801 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Check tenant reply on R-4801: sooner slot wanted? If so ask Swift Plumbing & Heating for earlier date.","t… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
