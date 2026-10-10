# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant disputes the recorded 30/08 visit, saying 8 Sept was agreed. I asked the provider to confirm the date and attendance, told the tenant 8 Sept is unconfirmed, noted the conflicts and set a follow-up for 1 Sept.

## Where the case stands
Provider assigned (Keystone Compliance), landlord approved. Visit date disputed: record says 30/08/2025 (already past at 14:02 today); tenant says 8 September was arranged. Waiting on provider to confirm the date and whether they attended.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to confirm the correct visit date (30/08 vs 08/09) and whether they attended today | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30/08, 8 Sept is unconfirmed, we are checking with provider, update by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider reply on 2025-09-01 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Did you attend Flat 3, 3 Willowmere Road on Saturday 30/08/2025 (the system slot said 'Monday morning 10-12 (30/08/2025)', but 30/08 is a Saturday)?
> - The tenant says she arranged the oven repair with you for 8 September 2025. Please confirm in writing the exact date and time window you have for this visit.
> - Please reply by end of Monday 1 September 2025.
> 
> Why: The record holds 30/08/2025 but the tenant says 8 September was agreed; only the provider can confirm a booking date.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara, thanks for letting us know. Our record shows the visit as 30/08/2025 (the messages said "Monday", but 30 August is a Saturday), while you have 8 September agreed with the engineer. We have asked Keystone Compliance to confirm the correct date in writing. 8 September is not confirmed yet, so please don't treat it as booked until we tell you. We will update you by Monday 1 September. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here books 8 September; only the provider can confirm it
- Does not establish whether the 30/08 visit happened or the cause of the oven fault
- Landlord's 'Yes go ahead' covers sending the contractor, not any quote

## Remaining work
- Provider to confirm date; then set_visit and tell tenant (agency, 1 Sept)
- If 30/08 was missed, record_work_result missed_appointment
- Diagnosis, any quote needing landlord approval, invoice, closure

## Missing or unavailable information
- Provider confirmation of date and attendance
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday
- Record 30/08 vs tenant's 8 Sept; trusted record until provider confirms
- Names/companies inconsistent (Ruben Oakley/Clara/Grace Mercer; Keystone/Riverside Works/Lantern Utilities)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned; visit date in dispute (30/08 on record, which was a Saturday and is already past, vs tenant's 8 Sept). Provider confirmation outstanding, then diagnosis/quote/invoice.

**2. What is the next action, who is it for, and through which channel?**

Ask Keystone Compliance by email to confirm the date and attendance; update Clara by email that 8 Sept is unconfirmed. Done, follow-up 1 Sept.

**3. Does anything need a human decision, and why?**

No. It is a routine date confirmation that one question to the provider can settle; escalate only if the provider does not answer.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Clar… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"026","note":"Date conflict: events 017-020 record 30/08/2025 (described as Monday; it is a Saturday). Tenant call (event 021) say… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Check provider's confirmation of visit date (30/08 vs 08/09) and whether 30/08 visit happened; then set_vi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
