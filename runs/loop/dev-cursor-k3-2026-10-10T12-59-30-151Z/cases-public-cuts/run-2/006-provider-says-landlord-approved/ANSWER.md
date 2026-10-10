# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider Sawyer said the landlord approved by phone, but there is no written approval, so I treated it as hearsay. I recorded the quote, asked the landlord for a yes/no, told Sawyer not to order or start, and put the job on hold to 2024-10-11.

## Where the case stands
Quote (£605 total) recorded and with landlord since event 013. The provider claims phone approval, which is hearsay. Landlord asked for a yes/no. Ticket on hold, review 2024-10-11. Provider told not to order or start.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear yes/no on the £605 quote | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell provider not to order or start until written landlord approval | Sawyer, provider | email | A3 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-10-11 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (name in records: Oscar / Ruben conflict) (landlord)** (verified)

> Sawyer says you approved by phone, but we have no written approval. Please reply yes or no: do you approve the quote totalling £605 (paint £220, carpet £240, bathroom vinyl £100, chrome waste £45; VAT not stated) for Flat 21, 11 Juniper Mews? (£605)
> 
> Options: Yes, approve £605 and instruct Sawyer; No / use your own contractor

**A3 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for the update. We have no written approval from the landlord yet, so please do not order materials or start work until we confirm in writing. We've asked the landlord to confirm and will come back to you as soon as we hear. Please also confirm whether your prices include VAT.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- No contractor instruction or spend was committed
- VAT status unconfirmed

## Remaining work
- Landlord reply, then record decision and approve/assign (agency)
- Confirm VAT with Sawyer
- Chase landlord on second channel if silent after review date

## Missing or unavailable information
- Landlord's written approval
- VAT status
- Quote document itself not seen; figures from event 013

## Conflicts between sources
- Landlord addressed as Oscar in event 013 but hold note names Ruben; the approval request went to the landlord record
- Event 015 claims phone approval with no record of it

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Quote of £605 awaiting landlord approval; provider claims phone approval, unverified. Tenant has vacated, so no tenant message is needed.

**2. What is the next action, who is it for, and through which channel?**

Landlord asked for a yes/no by email (APR-102); Sawyer told to wait by email (MSG-103); hold to 2024-10-11.

**3. Does anything need a human decision, and why?**

No. This is routine waiting on the landlord. Escalate only if the landlord stays silent after a chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (name in records: Oscar / Ruben conflict)","ticket_ref":"NBL-006-provider-says-landlord-approved","decision_needed":"S… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on £60… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
