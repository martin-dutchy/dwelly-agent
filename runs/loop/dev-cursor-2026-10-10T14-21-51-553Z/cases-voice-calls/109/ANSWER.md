# Case 109: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven still unrepaired after first inspection. The provider now says a manufacturer's warranty covers a free element, but no firm date exists. I recorded the landlord's conditional decision, asked the provider for written confirmation, updated tenant and landlord, and set a hold and follow-up for 10 June.

## Where the case stands
Ticket NBL-109, stage visit, on hold (Waiting for Provider, review 2024-06-10). First inspection happened but oven not fixed. Provider verbally claims a 2-year manufacturer warranty gives a free heating element; suggested a visit in about two weeks, no firm date. Awaiting written confirmation from Harbour Services.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm in writing by 7 June a firm date, warranty terms/install date and no-charge | Clara, Harbour Services (contractor) | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant that the date is unconfirmed, ask if two weeks is acceptable, next update by 10 June | Leo Bennett, tenant | email | A3 ✅ |
| 3 | OTHER | Update landlord on warranty claim (as provider's claim), conditional charge-free approval, no booking yet | Felix, landlord | email | A4 ✅ |
| 4 | WAIT | Hold and follow-up on 10 June for provider reply | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Clara, Harbour Services (contractor) via email, existing thread (event 022 email)** (verified)

> Hi Clara, thanks for speaking today about the oven at Flat 2, 176 Lantern Quay. The call cut off before we could fix a date, so please confirm in writing by Friday 7 June: (1) a firm date and time window for the heating element replacement (you mentioned about two weeks; we have not booked anything yet); (2) that the work is free under the manufacturer's two-year warranty, with the brand, the install/purchase date and the warranty terms; (3) that no charge will be made without our landlord's written approval first. Earlier emails gave 21 June and 22 May as appointment dates, which don't fit; please ignore those. Please also send the engineer's findings from the first visit. Thank you.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 029 email)** (verified)

> Dear Leo, sorry for the wait on your oven. Harbour Services' engineer inspected it but couldn't fix it. The provider now says the manufacturer's warranty should cover a free replacement heating element. They've suggested a visit in about two weeks, but that is not confirmed and nobody should be expected on a date yet; our earlier emails quoting 21 June were wrong, sorry. We've asked them for a firm date in writing and will update you by Monday 10 June. Is waiting about two weeks without a working oven acceptable? If not, tell us and we'll push for a sooner slot.

**A4 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Dear Felix, update on the oven at Flat 2, 176 Lantern Quay. I spoke to Harbour Services today. Their engineer couldn't fix it on the first visit. Clara now says a two-year manufacturer's warranty should cover a free heating element replacement, and suggested a visit in about two weeks. This is their claim and we are checking it: we've asked for the brand, install date, warranty terms and a firm date in writing. Nothing is booked yet. We are treating your approval as covering charge-free warranty work only; any charge will come back to you first. Our records have inconsistent dates for the fitting and visits, which we are also clarifying. We'll update you by Monday 10 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is booked; the roughly 19 June date is only Clara's vague suggestion
- Warranty cover is the provider's unverified claim
- Conditional approval covers charge-free work only; any charge returns to the landlord

## Remaining work
- Harbour Services: firm date and warranty evidence
- Then set_visit once provider confirms
- Chase 10 June; tenant asked about a sooner slot
- Record work result, close without payment if free

## Missing or unavailable information
- Firm visit date from provider
- Warranty brand, install date and terms
- Engineer's first-visit findings

## Conflicts between sources
- Oven fitted 'March 2025' (events 014, 025) is after today's date 2024-06-05 and conflicts with 'last year'; install date to be confirmed with provider
- Appointment dates 22/05/2024 vs 21/06/2024 with 'tomorrow' wording; 21/06 treated as erroneous
- Landlord's reply names Keystone Works while the oven was replaced by Harbour Services
- Provider said out of warranty (events 020, 022, call) then a two-year manufacturer warranty (event 034)
- Tenant contact numbers differ (07700 900426 vs 07700 900444)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspected but unfixed; provider claims free warranty element replacement, vague 'two weeks'. Outstanding: firm date, warranty proof, no-charge confirmation.

**2. What is the next action, who is it for, and through which channel?**

Email to Clara at Harbour Services requesting a written firm date and warranty details, plus updates by email to tenant and landlord.

**3. Does anything need a human decision, and why?**

No. It is routine, within the landlord's charge-free approval; any charge would return to the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"109","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works for the oven replac… | 1 | ❌ failed | Ticket 109 not found on read-back |
| A2 | `send_message` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 022 email)","t… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 029 email)","ticket_ref":"109"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"109","body":"Dear F… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"109","reason":"Waiting for Provider","comment":"Awaiting Harbour Services' written firm date, warranty terms/install date and… | 1 | ❌ failed | Ticket 109 not found on read-back |
| A6 | `schedule_follow_up` | {"ticket_ref":"109","due_on":"2024-06-10","party":"Harbour Services","purpose":"Chase firm date and warranty confirmation; update tenant and… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A7 | `record_landlord_decision` | {"ticket_ref":"NBL-109","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works for the oven re… | 1 | ✅ verified | Ticket NBL-109 read back after record_landlord_decision |
| A8 | `put_on_hold` | {"ticket_ref":"NBL-109","reason":"Waiting for Provider","comment":"Awaiting Harbour Services' written firm date, warranty terms/install date… | 1 | ✅ verified | Ticket NBL-109 read back after put_on_hold |

## Failed or unverified actions
- A1: Used wrong ref '109'; retried with NBL-109 as A7, verified
- A5: Used wrong ref '109'; retried with NBL-109 as A8, verified
