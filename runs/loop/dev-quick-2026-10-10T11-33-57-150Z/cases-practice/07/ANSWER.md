# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Amelia Clarke's email reports the kitchen tap drip (already job R-4801, visit recorded for 15 Oct 08:00-12:00 with C-12) has worsened. No new job was created because it is a duplicate of R-4801; the worsening was added to that job, the tenant was told the existing booking and what to do if water spreads, and the provider was told of the worsening and asked to confirm the visit.

## Where the case stands
Existing job R-4801 (kitchen tap dripping, routine, plumbing) is at visit stage with C-12 Swift Plumbing & Heating. Visit on record: 2026-10-15 08:00-12:00, marked confirmed with tenant. Tenant's new email says the drip has worsened to constant flow even when closed. No new job; the existing job is the one to act on.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Link the tenant's email to R-4801 as a worsening report, not a new job. | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant we already have R-4801 booked for 15 Oct 08:00-12:00, that the worsening is passed on, and what to do if water spreads. | Amelia Clarke, tenant | email | A2 ✅ |
| 3 | CHASE_PROVIDER | Ask Swift Plumbing to confirm the 15 Oct visit and note the worsened leak. | Swift Plumbing & Heating, contractor | sms | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hello Amelia,
> 
> Thanks for letting us know the kitchen tap is now dripping constantly. We already have a repair booked for this tap (reference R-4801). Our records show a visit on Thursday 15 October between 8am and 12pm with our plumber, Swift Plumbing & Heating. I have passed on that it has got worse, so they know before they attend.
> 
> Please keep the water supply under the sink as it is, and do not try to repair the tap yourself. If the leak becomes heavy or water starts to spread, turn off the water at the stopcock and contact us straight away.
> 
> Kind regards,
> Lettings team

**A3 · send_message → Swift Plumbing & Heating (contractor) via sms, +447700900312** (verified)

> Swift Plumbing: job R-4801, Flat 4, 12 Mare Street E8 1HL, kitchen tap. Tenant reports the drip has worsened and now runs constantly even when fully closed. Visit on record is Thu 15 Oct 08:00-12:00. Please confirm the visit by reply.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the update does not confirm the provider will attend on 15 Oct; the provider has not yet confirmed it in this run.
- Does not approve any repair spend or change the job's severity; the worsened drip is still a routine plumbing job.
- Landlord not contacted in this run: the worsened report does not yet change the quote or spend question.

## Remaining work
- Swift Plumbing to confirm the 15 Oct 08:00-12:00 visit (owner: contractor; chase if no reply by next working day, Mon 12 Oct).
- If the visit is confirmed and the job needs a quote, send it to landlord Ben Hartley for approval (spend limit £300 inc VAT).
- Visit and result to be recorded after 15 Oct.

## Missing or unavailable information
- Provider confirmation of the 15 Oct visit in the provider's own words (the record shows it only as confirmed with tenant).

## Conflicts between sources
- The tenant's email says the tap is getting worse, but R-4801 still records routine severity. Kept routine: no flooding, electrical or safety risk reported. Provider and tenant were told; the severity can be raised if the provider or tenant reports water spreading.

## Answers to the case questions
**1. Should a new repair job be created?**

No. The tenant reports the same kitchen tap drip already logged as R-4801, which has a visit recorded for 15 Oct 2026 08:00-12:00. The only change is that it is worse, so it is recorded as an update on R-4801.

**2. What do you reply to the tenant?**

Sent by email (A2): the repair is already booked as R-4801 for Thu 15 Oct 08:00-12:00 with Swift Plumbing & Heating; the worsening has been passed on; do not attempt a repair; turn off the stopcock and call us if water spreads. The reply does not promise the provider's attendance beyond the record.

**3. What, if anything, do you change on existing records?**

Added a note to R-4801 recording the worsened report and the source email (A1). No stage, severity or contractor change. Provider told via SMS (A3) and asked to confirm the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"10 Oct 2026, tenant Amelia Clarke email (12:09): kitchen tap dripping is getting worse and now drips constantly e… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"R-4801","… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
