# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant disputes the visit date: record says 30/08/2025 (worded 'Monday', actually a Saturday), tenant says 8 Sept (a Monday). I asked the provider to confirm, told the tenant the new date is not yet confirmed, and set a follow-up for 1 Sept.

## Where the case stands
Provider assigned (Keystone Compliance), landlord approved. Visit recorded as 30/08/2025 10-12; tenant says 08/09/2025 was agreed. Waiting on provider to confirm the date. No work result recorded.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to confirm in writing the correct visit date (30/08 vs 08/09) and whether anyone attended today | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant record holds 30/08, 8 Sept not yet confirmed, provider being asked, next update by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow-up on 2025-09-01 to chase provider confirmation and then book the visit | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Which date have you confirmed with the tenant for the oven repair at Flat 3, 3 Willowmere Road: Saturday 30/08/2025 (our record, though it was worded as 'Monday') or Monday 08/09/2025 (the date the tenant says was agreed)?
> - Did anyone attend this morning (30/08/2025)? If not, please confirm that and the time slot for the agreed date.
> - Please confirm in writing so we can book it.
> 
> Why: Tenant says the visit was arranged for 8 September, but our record and reminders say 30/08/2025. Only the provider can confirm the date.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call; event 019 email)** (verified)

> Hi Clara, thanks for letting us know. Our record currently shows the oven visit as 30/08/2025 (10-12), but we've noted you arranged 8 September with the engineer. We haven't confirmed 8 September yet, so I've asked Keystone Compliance to confirm in writing which date is correct and whether anyone was due today. Please don't worry about the mix-up. We'll update you by Monday 1 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms 8 September as booked; set_visit not used as only the tenant gave that date.
- Does not establish the oven fault cause or cost.
- Does not establish whether a visit happened today.

## Remaining work
- Provider to confirm date; then set_visit and tell tenant (agency, 1 Sept)
- Record work result after visit; quote/invoice and landlord update if needed
- Missed-appointment record if provider confirms 30/08 was due and nobody came

## Missing or unavailable information
- Provider's confirmed visit date
- Whether anyone attended 30/08
- Attachment from event 014 unavailable

## Conflicts between sources
- Visit date 30/08/2025 (events 017-020) vs 08/09/2025 (tenant, event 021); 30/08/2025 is a Saturday though described as Monday; trusted the record until the provider confirms.
- Provider and party names vary across events (Keystone Compliance, Riverside Works, Lantern Utilities; Clara, Ruben, Grace, Harriet).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned to Keystone Compliance; visit date disputed (30/08 on record vs 08/09 per tenant); provider confirmation outstanding, no work result yet.

**2. What is the next action, who is it for, and through which channel?**

Ask Keystone Compliance by email to confirm the date (done, A1), and update Clara by email (done, A2); chase on 1 Sept (A3).

**3. Does anything need a human decision, and why?**

No. It is a routine date confirmation the provider can settle; escalate only if the provider does not answer after chasing.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call; event 019 email)"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Chase Keystone Compliance for written confirmation of visit date (30/08 vs 08/09); then set_visit and upda… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"026","note":"Date conflict: record/events 017-020 say 'Monday' 30/08/2025 (a Saturday); tenant (event 021) says arranged 08/09/20… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
