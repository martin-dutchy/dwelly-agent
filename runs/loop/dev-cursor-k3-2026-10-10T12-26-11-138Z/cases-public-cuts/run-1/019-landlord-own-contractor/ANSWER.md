# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has been stuck at the landlord gate for two months. An internal note says the landlord approved a £500+VAT quote, but there is no recorded decision and later notes say we are still waiting for the landlord. I re-asked the landlord for a clear decision, updated the tenant and set a hold and follow-up for 2025-03-17.

## Where the case stands
Landlord approval gate (ticket at init, hold). No recorded landlord decision; landlord unresponsive since January. Waiting on landlord; review 2025-03-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a clear written yes/no: approve contractor up to £500+VAT, or arrange own contractor | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: no work booked, landlord asked again, next update 2025-03-17 | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold and follow up with landlord until 2025-03-17 | Jenkins, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: tenant asks for rubbish removal, levelling and gravel. Our notes show a £500+VAT quote (Harbour Compliance) but no written approval from you, and an earlier note mentions your own contractor. Please reply in writing: (a) yes, instruct our contractor up to £500+VAT, or (b) you will arrange your own contractor (name and date please). (£600)
> 
> Options: Yes, instruct our contractor up to £500 + VAT (£600 inc VAT); I will arrange my own contractor (please send name and date); Decline the work

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing about the back garden. We are still waiting for the landlord's written decision, so no work is booked yet. We have just asked them again with a clear yes/no question on a second channel. We will review on 2025-03-17 and update you then, whatever the answer. Sorry for the delay.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking the landlord does not approve spend or assign a contractor
- Nothing is booked; no visit date exists
- The tenant's pictures were unavailable and not seen

## Remaining work
- Obtain landlord written decision (Maya Palmer/property manager)
- Then assign contractor or record own contractor and tell tenant
- Chase by phone/SMS on 2025-03-17; escalate to management if still silent

## Missing or unavailable information
- Landlord's written decision
- Garden photos
- Whether Harbour Compliance quote exists as a document and is the right contractor

## Conflicts between sources
- Event 009 says the landlord approved the £500+VAT quote, but the ticket shows approval required and later notes say we are waiting for the landlord. I treated it as unapproved.
- Notes mention both Harbour Compliance and 'Oakley's contractor' (possibly the landlord's own contractor).

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

At the landlord approval gate. A £500+VAT quote is noted but no verifiable landlord decision is recorded. Landlord has not replied since January; tenant chased on 13 March.

**2. What is the next action, for whom, via which channel?**

Written approval request to the landlord (APR-101, via the agency landlord record) and an email update to the tenant, with a hold and follow-up on 2025-03-17.

**3. Does anything need a human decision?**

Not yet. The landlord's decision is theirs. If they are still silent on 2025-03-17, escalate to maintenance/management; a human should also clarify the contradictory notes.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: tenant… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hello, thank yo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written approval of £500+VAT … | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-17","purpose":"Chase landlord by phone/SMS; update tenant; consider manage… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
