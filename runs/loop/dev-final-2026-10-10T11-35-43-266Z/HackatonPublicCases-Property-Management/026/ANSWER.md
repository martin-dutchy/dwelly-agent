# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine oven fault, landlord approved Keystone, visit tentatively set. Dates and contractor name conflict, so I asked the provider to confirm and told the tenant the visit is unconfirmed. Follow-up set for 27/08.

## Where the case stands
Stage: visit nominally booked (system "Visit date selected 30/08/2025 10:00") but the booking is unreliable. Landlord approved send-out. Waiting on Keystone to confirm company, date and time; tenant told it is not confirmed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm company, exact date and time (30/08 is a Saturday, not Monday) | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit is not yet confirmed and we are verifying day and company | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider confirmation 2025-08-27 | Keystone Compliance | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our appointment email said "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday, so the day and date don't match. Also, the call to the tenant was logged as coming from Isaac Palmer of Riverside Works, not Keystone Compliance. Please could you confirm (1) that you are the company attending, and (2) the exact date and time window you can do. The tenant had only tentatively agreed and was going to confirm by text. Until you confirm, please treat the visit as not yet fixed. If a quote is needed, please send it with photos and wait for our approval before starting work.

**A2 · send_message → Clara (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara, thanks for your patience. Our last email said "Monday morning, 10-12 (30/08/2025)", but 30 August is a Saturday, so the day and date don't match, and the contractor who phoned mentioned a different company name. Please treat the visit as not yet confirmed: we are checking the exact day, time and company with the contractor and will email you as soon as they confirm. If you have already texted them a preferred time, please let us know what you agreed. Please keep the oven switched off if you see anything unusual such as sparking or a burning smell.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm any appointment
- The landlord's 'Yes go ahead' covers sending the contractor only, not any quote or spend
- Nothing here confirms the oven fault's cause or who pays

## Remaining work
- Keystone to confirm company/date/time; then set_visit with provider confirmation
- Record result after visit; quote to landlord if needed; invoice and close

## Missing or unavailable information
- Provider-confirmed visit date and time
- Whether Riverside Works or Keystone is attending
- Event 014 attachment unavailable
- Tenant's correct name

## Conflicts between sources
- 30/08/2025 is a Saturday but the slot says Monday
- Call from Riverside Works (Isaac Palmer) vs assigned Keystone Compliance
- Tenant named variously Ruben Oakley, Clara, Grace Mercer, Harriet Fletcher
- Tenant only tentatively agreed, system recorded the visit as selected; I trusted the stated facts over the system line

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Keystone assigned. A visit of 30/08/2025 10-12 is recorded but only tentative: 30/08 is a Saturday while the slot says Monday, the call came from Riverside Works, and the tenant had not confirmed. Provider confirmation is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance to confirm company, date and time (done, A1); email the tenant that the visit is unconfirmed (done, A2); follow up 27/08 (A4).

**3. Does anything need a human decision, and why?**

No. This is a routine clarification that the provider can settle.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Clara, thanks… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"Flat 3, 3 Willowmere Road","note":"Conflicts: appointment says Monday but 30/08/2025 is a Saturday; call (event 016) from Riversi… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-08-27","purpose":"Check Keystone has confirmed company, date and time for oven visit; correct booking if needed","party":"Ke… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
