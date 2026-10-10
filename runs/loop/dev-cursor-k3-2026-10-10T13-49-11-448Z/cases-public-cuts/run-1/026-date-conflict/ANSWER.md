# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The visit date conflicts: records say Monday 30/08/2025, which is a Saturday, while the tenant says it was arranged for 8 Sept. I asked the provider to confirm, told the tenant the date is not yet confirmed, noted the conflicts and set a follow-up for 2 Sept.

## Where the case stands
Provider assigned (Keystone Compliance), landlord approved ("Yes go ahead"). Visit date disputed: record says 30/08/2025 (a Saturday, labelled Monday), tenant says 8 Sept 2025 (a Monday). Awaiting provider confirmation. No result recorded yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the true visit date/slot and whether anyone attended today, by 1 Sept | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant record date looks wrong, 8 Sept unconfirmed until provider confirms, update by 2 Sept | Tenant (Clara) | email | A2 ✅ |
| 3 | WAIT | Follow up 2 Sept on provider confirmation, then set_visit if confirmed | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please confirm the date of the oven repair visit at Flat 3, 3 Willowmere Road. Our record holds "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday, and the tenant says the visit was arranged for Monday 8 September 2025. Please reply by end of Monday 1 September to confirm the exact date and time slot you agreed, and whether anyone attended today. Please do not attend on any date you have not confirmed with the tenant. Our earlier messages also named different companies (Riverside Works, Lantern Utilities), so please confirm which company is attending.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 021 call)** (verified)

> Hello, thank you for letting us know, and sorry for the confusion. Our record shows the visit as Monday morning 10-12 "30/08/2025", but that date is a Saturday, so the record looks wrong. You've said it was arranged for Monday 8 September. We have asked the contractor to confirm that date in writing; until they do, it is not confirmed, and nobody should be expected on any other date. We will update you by Tuesday 2 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or rebooked; 8 Sept is only the tenant's proposal until the provider confirms.
- Does not establish the oven fault's cause or cost.
- Landlord approval 'Yes go ahead' covers sending the contractor, not any quote.

## Remaining work
- Provider to confirm date; agency to set_visit then (owner: agency, review 2 Sept)
- Record result after visit
- Quote loop to landlord if needed
- Invoice and closing checks

## Missing or unavailable information
- Provider's confirmed visit date
- Whether anyone attended on 30/08
- Attachment at event 014 unavailable
- Oven make/model

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday
- Tenant says 8 Sept vs record 30/08; trusted neither until provider confirms
- Provider/tenant names inconsistent across events (Keystone/Riverside Works/Lantern Utilities; Ruben/Clara/Grace)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Keystone Compliance assigned. The visit date is disputed (30/08, a Saturday, versus tenant's 8 Sept). Provider confirmation is outstanding and no work result exists.

**2. What is the next action, who is it for, and through which channel?**

Email the provider to confirm the date (done), and email the tenant that the 8 Sept date is unconfirmed (done). Follow up on 2 Sept.

**3. Does anything need a human decision, and why?**

No. A provider confirmation request resolves it; the case is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","body":"Hello, thank you… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"Flat 3, 3 Willowmere Road oven repair","note":"Date conflict: system/SMS say Monday 30/08/2025 (a Saturday); tenant says 8 Sept 2… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-02","purpose":"Check provider confirmed visit date (tenant says 8 Sept); if not, set_visit once confirmed or chase on ano… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
