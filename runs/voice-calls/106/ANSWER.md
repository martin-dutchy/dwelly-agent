# Case 106: Dishwasher Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Contractor fixed a loose heater connection and found a missing dial costing £95. The quote was recorded, the landlord had already been asked (event 020), the tenant was updated, and the ticket is on hold with a review date of 10 Dec.

## Where the case stands
Visit done 7 Dec; heater connection fixed and dishwasher running. Missing control dial needs ordering: £95 incl. VAT quote sent to landlord (event 020), no reply yet. Ticket on hold waiting for landlord, review 2026-12-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord's yes/no on the £95 dial quote; chase by SMS on 10 Dec if no answer, then tell Ashford and tenant. | Landlord (Turner) | internal | A5 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the dishwasher is running, dial pending landlord approval, next update by 10 Dec. | Amelia Nolan, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Nolan (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Amelia, thanks for letting the contractor in today. They tightened a loose connection and the dishwasher is now running properly. They also found the control dial is missing and a replacement needs ordering at £95. We've asked your landlord to approve this and are waiting for their answer. We'll update you by Thursday 10 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it; the earlier 'Yes please go ahead' covered the inspection only.
- The contractor was not told to order the dial; no spend committed.
- Dishwasher working is the contractor's claim; tenant has not confirmed.

## Remaining work
- Landlord decision on £95 (agency, chase 10 Dec)
- Tell Ashford the outcome, then order and fit dial
- Tenant confirmation, invoice, close

## Missing or unavailable information
- Landlord reply to the quote
- Tenant confirmation the dishwasher works

## Conflicts between sources
- Contractor names vary (Oakfield Homes assigned; calls mention Cedar/Alder Maintenance; note addressed to Juniper Surveying); treated as the assigned provider Oakfield Homes, same visitor Ashford.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Result recorded as needs_quote. £95 dial quote awaits landlord approval; tenant confirmation, invoice and closure outstanding.

**2. What is the next action, for whom, via which channel?**

Wait for the landlord's reply to the email of event 020; chase by SMS on 10 Dec. Tenant already updated by email.

**3. Does anything need a human decision?**

No. The landlord decides on the spend; the agent could not approve it, as the contractor asked. No escalation needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-106","outcome":"needs_quote","evidence":"Ashford (Oakfield Homes) by phone, event 021, 2026-12-07: loose heater connectio… | 1 | ✅ verified | Ticket NBL-106 read back after record_work_result |
| A2 | `record_quote` | {"ticket_ref":"NBL-106","provider":"Oakfield Homes","amount_gbp":95,"vat":"included","items":["Replacement control dial incl. parts, labour … | 1 | ✅ verified | Ticket NBL-106 read back after record_quote |
| A3 | `send_message` | {"recipient_name":"Amelia Nolan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-106","reason":"Waiting for Landlord","comment":"Waiting for landlord approval of £95 (incl. VAT) replacement dial quote f… | 1 | ✅ verified | Ticket NBL-106 read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-106","due_on":"2026-12-10","party":"Landlord","purpose":"Chase landlord on second channel (SMS) for yes/no on £95 dial qu… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
