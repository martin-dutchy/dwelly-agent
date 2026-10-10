# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's email duplicates open job R-4801 (same tap, booked 15 Oct). No new job; added the worsening to the ticket, asked the provider about an earlier slot and updated the tenant.

## Where the case stands
R-4801 at visit stage, Swift booked 15 Oct 08:00-12:00; provider asked about earlier slot; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the job is already booked, interim advice, next update by 12 Oct | Amelia Clarke, tenant | email | A3 ✅ |
| 2 | CHASE_PROVIDER | Asked Swift to consider an earlier visit given worsening | Swift Plumbing & Heating, contractor | email | A2 ✅ |
| 3 | WAIT | Review provider answer on 12 Oct | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Swift Plumbing & Heating (contractor) via email, contractor record C-12** (verified)

> Update on R-4801 (kitchen tap, visit booked 15 Oct 08:00-12:00): the tenant reports it is now dripping constantly even when fully closed. Please keep the 15 Oct visit, and let us know if you can attend earlier. Please bring a spare cartridge/washer in case.

**A3 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hi Amelia, thanks for letting us know. Your tap is already logged (ref R-4801) and a plumber from Swift Plumbing & Heating is booked for Thursday 15 October, 8am-12pm. I've added that it's now dripping constantly and asked them if they can come sooner. I'll only confirm an earlier time once they agree to it. In the meantime, a bowl under the tap helps, and if you can turn off the small isolation valve under the sink that should stop it. If water starts to leak elsewhere, let us know straight away. We'll update you by Monday 12 October.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new job created; the existing booking is not changed or confirmed earlier.
- Severity left routine; a constant drip is not a flood.

## Remaining work
- Agency: check Swift reply by 12 Oct and tell tenant if earlier date confirmed.
- Swift: attend repair.

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. It is the same fault as open job R-4801, already assigned and booked. A new job would duplicate it.

**2. What do you reply to the tenant?**

That it is already logged as R-4801 with a plumber booked 15 Oct 8am-12pm, that we have flagged it is worse and asked for an earlier slot (not confirmed), interim advice (bowl, isolation valve), and next update by 12 Oct.

**3. What do you change on existing records?**

Added a note to R-4801 about the worsening, left the visit unchanged, and set a follow-up for 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4801","note":"Tenant emailed 10 Oct: tap now drips constantly even when fully closed (worse). Duplicate report linked, no new job.… | 1 | ✅ verified | Ticket R-4801 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"email","contact":"contractor record C-12","ticket_ref"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"R-4801","due_on":"2026-10-12","purpose":"Check whether Swift can attend earlier than 15 Oct and update tenant","party":"Swift… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
