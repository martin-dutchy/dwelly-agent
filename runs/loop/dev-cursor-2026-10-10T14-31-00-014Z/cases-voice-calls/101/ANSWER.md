# Case 101: Dishwasher Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider attended beyond the inspection-only approval, fixed a loose connection and quoted £95 inc VAT for a missing dial. The quote is recorded, the work result is recorded as partial, and the ticket is held awaiting the landlord (already asked in event 020). The provider and tenant were updated. I did not approve the spend.

## Where the case stands
Result stage (partial). Provider tightened a loose connection and the dishwasher tested OK. A missing dial needs ordering, quote £95 inc VAT. Waiting on the landlord's decision; the question went to them in event 020. Ticket on hold, review 9 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord decision on the £95 dial quote; chase on a second channel 9 Dec if no reply | Landlord (Turner) | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on the result and pending approval; ask whether the dishwasher now completes its cycle | Amelia Nolan, tenant | email | A5 ✅ |
| 3 | CHASE_PROVIDER | Tell provider not to order or do further work until landlord approves; ask for invoice/quote and photos | Ashford, Oakfield Homes, contractor | email | A4 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Ashford, Oakfield Homes (contractor) via email, existing thread (event 021 call)** (verified)

> Hi Ashford, thanks for the update. We've recorded your £95 inc VAT quote for the replacement dial and sent it to the landlord. We can't approve spend ourselves, so please don't order the part or do further work until we confirm approval. The landlord's earlier go-ahead covered inspection only, so any extra work done without approval isn't guaranteed payment. Please also send us a written invoice/quote and photos of the dishwasher and the missing dial, and confirm the dishwasher now completes its cycle. We'll update you once the landlord replies.

**A5 · send_message → Amelia Nolan (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Amelia, thanks for arranging the visit. The engineer reports he tightened a loose connection and the dishwasher ran correctly on test, but a dial is missing and needs replacing. We've asked the landlord to approve that part and will update you by 9 December. Could you let us know whether the dishwasher is now finishing its cycle? Please let us know if anything still isn't right.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- The landlord's earlier 'go ahead' is not approval of the £95
- The tenant has not yet confirmed the fix
- Agency did not approve spend; no spend limit is on the property record

## Remaining work
- Landlord decision on £95 dial (event 020 request, chase 9 Dec)
- Tenant confirmation that the dishwasher works
- Provider invoice and photos
- Final checks and close

## Missing or unavailable information
- Landlord's decision
- Provider's written quote or invoice and photos
- The attachment in event 013 was unavailable
- Call 021 was cut off before the fault was explained

## Conflicts between sources
- Provider names differ across events (Oakfield Homes, Cedar, Alder, Juniper Surveying); treated as the assigned provider
- Provider says the agency can approve under £100; no such limit is on record
- Hold says waiting for provider/appointment, but the visit has since happened

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit has happened. The connection is fixed and tested OK. The £95 dial quote awaits the landlord. Tenant confirmation and the provider invoice and photos are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's reply, with a chase on a second channel on 9 Dec. Updates have gone to the tenant by email and to the provider by email.

**3. Does anything need a human decision, and why?**

No. The landlord's decision is routine to wait on, and the agency has no spend authority on file. The provider's claim that the agency can approve anything under £100 is not supported by the property record, so I refused it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-101","provider":"Oakfield Homes (Ashford)","amount_gbp":95,"vat":"included","items":["Replacement dial (missing), parts a… | 1 | ✅ verified | Ticket NBL-101 read back after record_quote |
| A2 | `record_work_result` | {"ticket_ref":"NBL-101","outcome":"partial","evidence":"Provider (Ashford) note 2026-12-07 event 019: water removed, loose heater connection… | 1 | ✅ verified | Ticket NBL-101 read back after record_work_result |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-101","reason":"Waiting for Landlord","comment":"Waiting for landlord decision on £95 inc VAT replacement dial quote (aske… | 1 | ✅ verified | Ticket NBL-101 read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Ashford, Oakfield Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 021 call)","ti… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Amelia Nolan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-101","due_on":"2026-12-09","party":"Landlord","purpose":"Chase landlord on £95 dial quote by SMS/phone if no reply; confi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A7 | `add_note` | {"entity":"NBL-101","note":"Provider did repair beyond inspection-only approval; £95 inc VAT dial awaits landlord. No spend limit on propert… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
