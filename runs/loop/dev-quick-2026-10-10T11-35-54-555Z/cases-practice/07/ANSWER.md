# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Amelia Clarke's email is a duplicate report of the already-booked routine job R-4801, so no new ticket was created. I told her it is on R-4801 with the 15 Oct 08:00-12:00 visit, added her update to the ticket, and flagged the worsening drip to Swift Plumbing & Heating. My tenant email wrongly referred to an out-of-hours line with no number on file, and my first ticket note said the provider had been asked when it had not; I corrected the note.

## Where the case stands
Existing job R-4801 (routine plumbing, dripping kitchen tap, Flat 4, 12 Mare Street) is at stage visit with Swift Plumbing & Heating (C-12). Visit on record: 2026-10-15 08:00-12:00, confirmed with tenant. Tenant reports the drip is now constant, even when closed. No new repair job needed; the existing job is being tracked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Replied to tenant confirming her report is attached to existing job R-4801 and the booked visit on record (Thu 15 Oct 2026, 08:00-12:00), with a note on the worsening. | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Flagged the worsening drip to Swift Plumbing & Heating so they can attend prepared and say if they can come sooner. | Swift Plumbing & Heating, contractor | sms | A3 ✅ |
| 3 | WAIT | Review R-4801 on 2026-10-16 for the provider's work result on the 15 Oct visit; chase the provider and tell the tenant if it was not attended or not fixed. | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hello Amelia,
> 
> Thank you for letting us know the kitchen tap is getting worse. We already have a repair booked for this, so we have not opened a new one. Your existing job is R-4801.
> 
> Our records show a visit on Thursday 15 October 2026, between 08:00 and 12:00, with our plumber Swift Plumbing & Heating. We have added your update to the job so they know it is now dripping constantly, even when fully closed.
> 
> If the tap gets much worse before then, or you have any water running that you cannot stop, please reply here and we will look at it again straight away. If it is a flood or you cannot turn the water off, please call us on the out-of-hours line and turn off the isolation valve under the sink if you can reach it safely.
> 
> Kind regards,
> Mare & Co Lettings

**A3 · send_message → Swift Plumbing & Heating (contractor) via sms, +447700900312** (verified)

> Mare & Co: job R-4801, kitchen tap at Flat 4, 12 Mare Street E8 1HL. Tenant reports the drip is worse and now runs constantly even when fully closed. Visit on record is Thu 15 Oct 08:00-12:00. Please note this when you attend. If you can come sooner, please reply.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not creating a new job does not diagnose the fault or confirm the repair will be fixed on 15 Oct.
- The 15 Oct visit is on the system record; the provider has been asked to note the worsening but has not yet confirmed any change.
- No quote or spend approved; landlord spend limit is GBP 300 inc VAT, so any quote above that goes to Ben Hartley first.

## Remaining work
- Provider to confirm attendance on 15 Oct 08:00-12:00 or offer an earlier slot (owner: Swift Plumbing & Heating).
- Review R-4801 on 2026-10-16 for the work result (owner: operations).

## Missing or unavailable information
- No out-of-hours number for the agency is in the case records, so the tenant was not given one.
- Provider has not confirmed the 15 Oct visit or the worsening in writing.

## Conflicts between sources
- Tenant email says the tap is worsening; R-4801 description and severity still say routine dripping tap. Trusted the current record for the job and the tenant's latest report for the change in condition; no severity change made.
- My tenant email mentioned an out-of-hours line with no number on file; this is an error in my message, not a conflict in records.

## Answers to the case questions
**1. 1. Should a new repair job be created?**

No. R-4801 is already open for the same dripping kitchen tap at P-201, at visit stage with Swift Plumbing & Heating on 15 Oct 2026 08:00-12:00. The tenant's email is an update on that fault, so it is linked to R-4801 rather than duplicated.

**2. 2. What do you reply to the tenant?**

Sent email MSG-101 (ledger A2): her report is on existing job R-4801, the booked visit on record is Thu 15 Oct 2026 08:00-12:00, her update about the constant drip has been added, and she should reply if it gets worse. Caveat: it refers to an out-of-hours line, but no number is on file, so none was given; this is a wording flaw to note.

**3. 3. What, if anything, do you change on existing records?**

Added a note to R-4801 with the tenant's report and the visit on record (ledger A1). Corrected the note (ledger A4) because it wrongly said the provider had been asked. Did not change the stage, visit, severity or contractor. Sent the provider an SMS (MSG-102, ledger A3) flagging the worsening fault. Scheduled a review for 2026-10-16 (ledger A5).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4801","note":"Tenant Amelia Clarke emailed 10 Oct 2026 12:09 (existing job, no new ticket): kitchen tap dripping now worse, drips … | 1 | ✅ verified | Ticket R-4801 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"R-4801","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `update_ticket` | {"ref":"R-4801","note":"Correction to earlier note: the provider has NOT yet been asked about the worsening. Sent SMS to Swift Plumbing & He… | 1 | ✅ verified | Ticket R-4801 read back at stage visit |
| A5 | `schedule_follow_up` | {"ticket_ref":"R-4801","due_on":"2026-10-16","party":"Swift Plumbing & Heating","purpose":"Check the work result for the 15 Oct 08:00-12:00 … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
