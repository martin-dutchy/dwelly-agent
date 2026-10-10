# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Sawyer's quote went to the landlord and he says the landlord approved by phone. That is hearsay, so I recorded the quote, asked the landlord for a written yes/no, told Sawyer to hold off ordering, and put the job on hold to 11 Oct.

## Where the case stands
Quote recorded (£605, VAT unstated). Landlord approval requested, no written reply. Provider claims phone approval, unverified. Ticket on hold, review 2024-10-11. No visit result or tenant contact (tenant vacated).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a written yes/no on the £605 quote | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell Sawyer not to order or start until written approval; ask about VAT | Sawyer, contractor | email | A3 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-10-11 (second-channel chase then) | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Yes or no: do you approve Sawyer's quote of £605 in total (paint £220, carpet £240, bathroom vinyl £100, chrome sink waste £45; VAT not stated), so we can instruct him? The contractor says you agreed by phone, but we have no record of that, so we need your written yes. (£605)
> 
> Options: Yes, approve the quote as listed; No / I will arrange my own contractor

**A3 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your message. We have no record of the landlord's approval yet, so please don't order the carpet or parts or start work until we confirm in writing. We've asked the landlord to confirm directly and will come back to you as soon as we hear. Please also confirm whether your prices include VAT.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval recorded; no spend committed
- Quote recording does not approve it
- Provider's phone claim is hearsay

## Remaining work
- Landlord written decision
- Confirm VAT with Sawyer
- Then approve quote, schedule works, invoice and close

## Missing or unavailable information
- Landlord's written approval
- VAT status of quote
- Quote attachment/photos not seen
- Works start date

## Conflicts between sources
- Landlord named Oscar in event 013 but Ruben in event 014
- Provider says landlord approved by phone; no landlord record of it

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Quote received and sent to landlord; awaiting landlord's written approval. Provider claims verbal approval, unverified. Works, invoice and closure outstanding.

**2. What is the next action, for whom, via which channel?**

Written approval request to the landlord by email (A2) and a hold-off message to Sawyer by email (A3); chase the landlord on a second channel at review on 11 Oct.

**3. Does anything need a human decision?**

No. The approval is the landlord's to give, and I have asked. A human is needed only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-006-provider-says-landlord-approved","decision_needed":"Yes or no: do you … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written approval of £… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
