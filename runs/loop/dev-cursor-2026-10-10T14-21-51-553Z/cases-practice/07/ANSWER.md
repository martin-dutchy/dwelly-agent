# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's email duplicates open job R-4801 (dripping kitchen tap, visit booked 15 Oct). No new job was created. I added her worsening report to the existing ticket, replied with the booking and valve advice, and set a follow-up to seek an earlier slot.

## Where the case stands
R-4801 open at visit stage, Swift Plumbing & Heating booked 15 Oct 08:00-12:00, confirmed with tenant. Follow-up set for 12 Oct to ask the contractor for a sooner slot.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the tap is already logged under R-4801 with the 15 Oct visit, gave isolating-valve advice, asked if the date is acceptable | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | WAIT | Follow-up on 12 Oct to ask Swift for an earlier slot given the worsening drip and update the tenant | Swift Plumbing & Heating, contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hello Amelia, thanks for letting us know. Your dripping tap is already logged (ref R-4801) and Swift Plumbing & Heating are booked to visit on Thursday 15 October, 8am-12pm. I haven't opened a second job, but I've added your update that it's now dripping constantly to the existing one and will ask the plumber if they can come sooner. I'll only confirm a new date once they agree it. In the meantime, if there's a small valve on the pipe under the sink, you can turn it off to stop the drip, and a bowl underneath will help. If water ever starts running or leaking elsewhere, please tell us straight away. Is the 15th still OK for you? You'll hear from us again by Monday 12 October.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new job created; this does not change the booked date
- No sooner visit is confirmed; it is only a request
- Nothing here decides who pays

## Remaining work
- Ops to ask Swift (phone on file only) about an earlier slot by 12 Oct and update tenant
- Visit on 15 Oct then result

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. It is the same fault as open ticket R-4801 with a visit already booked. Creating another would duplicate it.

**2. What do you reply to the tenant?**

I confirmed the existing job and the 15 Oct 8am-12pm visit. I said her update was added and that we'd ask for a sooner slot, without promising one. I gave isolating-valve and bowl advice, asked if the date suits, and said she'll hear from us by 12 Oct.

**3. What, if anything, do you change on existing records?**

I added a note to R-4801 about the worsening drip and set a follow-up for 12 Oct. Stage, contractor and visit are unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"10 Oct 12:09 tenant emailed again: tap now drips constantly even when fully closed (worse than at booking). Dupli… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"R-4801","due_on":"2026-10-12","party":"Swift Plumbing & Heating","purpose":"Confirm whether sooner slot than 15 Oct is possib… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
