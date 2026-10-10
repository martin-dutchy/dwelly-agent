# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider's quote of £605 was forwarded to the landlord, and the provider now says the landlord approved it by phone. That is unverified, so I recorded the quote, told the provider not to order or start, requested written landlord approval and put the job on hold.

## Where the case stands
Ticket at mp_time, on hold (Waiting for Landlord, review 2024-10-11). Quote £605 recorded (Q-101); landlord approval requested (APR-103); contractor told not to order or start.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for written approval of the £605 quote | Landlord | email | A3 ✅ |
| 2 | OTHER | Tell Sawyer not to order materials or start on a verbal approval; ask about VAT and access dates | Sawyer, contractor | email | A2 ✅ |
| 3 | WAIT | Hold until landlord replies; review 2024-10-11 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your message. We can't accept a verbal approval relayed by phone, so please don't order materials or start work yet. We've asked the landlord to confirm in writing and will tell you as soon as we have it. Could you also confirm whether the £605 total is with or without VAT, and send your proposed dates for access? Thanks.

**A3 · request_landlord_approval → Landlord of Flat 21, 11 Juniper Mews (named Oscar in event 013; event 014 says Ruben) (landlord)** (verified)

> Written approval of the contractor quote totalling £605 (paint £220, carpet £240, bathroom vinyl £100, chrome waste £45). The contractor says you approved by phone, which we can't verify. (£605)
> 
> Options: Approve the £605 quote in writing (recommended if you did agree by phone); Decline or ask for changes; Arrange your own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it.
- The contractor's report of a phone call is not landlord approval.
- No spend committed and no work authorised.
- VAT status unknown.

## Remaining work
- Landlord to approve in writing (agency awaiting reply)
- Then approve the quote, book the visit and works, and handle the invoice
- Escalate to a human if there is no reply by the 2024-10-11 review

## Missing or unavailable information
- No landlord contact or spend limit on the property record
- Whether the quote includes VAT
- Works dates

## Conflicts between sources
- Landlord named Oscar (event 013) vs Ruben (event 014)
- Provider Cedar Utilities vs Sawyer
- Contractor claims phone approval; no landlord record of it
- Event 012 mentions a 'studio'; the property is a flat

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The quote is received (£605) and sent to the landlord. Written landlord approval is outstanding; only the contractor's hearsay of a phone approval exists. No visit or works are booked. The tenant has vacated, so no tenant message is needed.

**2. What is the next action, for whom, and by which channel?**

Landlord: written approval request by email (APR-103). Contractor Sawyer: email telling them to wait, and asking about VAT and dates (MSG-102).

**3. Does anything need a human decision?**

Not yet. Approval is the landlord's decision. A human should step in if there is no reply by the 2024-10-11 review, or to clear up the name mismatches (Oscar vs Ruben; Cedar Utilities vs Sawyer).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (assigned provider Cedar Utilities)","amount_gbp":605,"vat":"none… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord of Flat 21, 11 Juniper Mews (named Oscar in event 013; event 014 says Ruben)","decision_needed":"Written approval of t… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written approval of £… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
