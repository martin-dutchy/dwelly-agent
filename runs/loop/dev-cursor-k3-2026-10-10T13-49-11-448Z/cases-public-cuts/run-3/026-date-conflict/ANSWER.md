# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant says the oven visit was arranged for 8 Sept, but our records and SMS say 30/08 (a Saturday). I asked the provider to confirm the date and whether anyone attended, told the tenant it is unconfirmed, noted the conflicts and set a follow-up for 1 Sept.

## Where the case stands
Provider assigned (Keystone Compliance), landlord approved. Visit date unresolved: record says 30/08/2025 (a Saturday, already passed today), tenant says 8 Sept. No work result recorded. Waiting on the provider to confirm the date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider to confirm the agreed date (8 Sept vs 30/08), whether anyone attended today, and confirm in writing; reply by 1 Sept | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the date is not confirmed, nobody should be expected on an unconfirmed date, and next update by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider confirmation 1 Sept, then set_visit once confirmed | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Which date have you agreed with the tenant for the oven visit at Flat 3, 3 Willowmere Road: Monday 8 September 2025, or 30/08/2025 (a Saturday; our emails said 'Monday')?
> - Did anyone attend this morning (30/08)? If so, please send what you found; if not, please confirm nobody is expected today.
> - Please confirm the 8 September time window in writing so we can book it.
> 
> Why: The tenant says the visit was arranged for 8 September, but our records and the reminder SMS say 30/08/2025. Only the provider can confirm a booking date. Please reply by Monday 1 September.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 019 email)** (verified)

> Hello, thanks for calling. Sorry for the confusion. Our record and the reminder text said Monday morning, 30/08/2025, but that date is a Saturday, so the details were clearly muddled. You've told us the visit was arranged for 8 September. We haven't yet had that confirmed by the engineers, so I've asked them to confirm the correct date in writing. Please don't expect anyone on a date they haven't confirmed. If anyone does turn up or call today, please let us know. We'll update you by Monday 1 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or changed; 8 Sept is only the tenant's proposal.
- Does not establish whether anyone attended on 30/08 or the cause of the oven fault.
- No quote or spend approved.

## Remaining work
- Provider to confirm date; agency then books with set_visit and tells tenant (owner: agent, review 2025-09-01)
- Record work result after the visit; quote loop if needed; invoice and close

## Missing or unavailable information
- Provider's confirmed visit date
- Attachment at event 014 unavailable
- Oven make/model unknown

## Conflicts between sources
- 30/08/2025 is described as Monday but is a Saturday
- Visit date 30/08 (events 017-020) vs 8 Sept (tenant, event 021); trusted neither until the provider confirms
- Party and provider names vary across events (Clara/Ruben Oakley/Grace Mercer; Keystone Compliance/Riverside Works/Lantern Utilities)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Keystone assigned. The visit date is disputed (30/08 per record vs 8 Sept per tenant) and unconfirmed by the provider. No work result yet.

**2. What is the next action, who is it for, and through which channel?**

Provider asked by email to confirm the date and attendance. Tenant told by email that the date is unconfirmed. Follow-up set for 1 Sept.

**3. Does anything need a human decision, and why?**

No. This is a routine date confirmation that a question to the provider can resolve.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","body":"Hello, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"ticket","note":"Date conflict: record/SMS say 30/08/2025 ('Monday', actually Saturday); tenant says 8 Sept arranged by phone (eve… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Check provider has confirmed the oven visit date (8 Sept vs 30/08); then set_visit and update tenant. If n… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
