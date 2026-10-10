# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Sawyer's quote (£605 total) was sent to the landlord, and Sawyer then said by email that the landlord approved it by phone. That is hearsay, so I recorded the quote, told Sawyer to wait, asked the landlord for a clear yes/no and held the ticket to 2024-10-11.

## Where the case stands
Stage mp_time, on hold (review 2024-10-11). Quote £605 recorded; landlord approval requested, not received. Provider claims phone approval (hearsay).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear yes/no on the £605 quote | Landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told provider not to order or start until written approval; asked whether prices include VAT | Sawyer, contractor | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-10-11 for landlord reply, then chase on a second channel | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your note. We have no written approval from the landlord on our records yet, so please don't order materials or start work until we confirm in writing. We've asked the landlord directly and will come back to you as soon as we hear. Could you also confirm whether the quote prices include VAT? Thanks.

**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Sawyer says you phoned and said go ahead, but we have nothing in writing. Please reply yes or no: do you approve Sawyer's quote of £605 total (paint £220, carpet £240, bathroom vinyl £100, chrome sink waste £45) for Flat 21, 11 Juniper Mews? (£605)
> 
> Options: Yes, approved as quoted; No / I will use my own contractor; Approved up to a stated cap

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- Provider's phone claim is not landlord authority
- No contractor instruction or spend committed

## Remaining work
- Landlord reply, then record decision and approve quote
- Confirm VAT with provider
- Visit/work scheduling, invoice, close
- Chase landlord on second channel if silent by 2024-10-11

## Missing or unavailable information
- Landlord's written approval
- Whether quote includes VAT
- Quote document not seen
- Landlord name (Oscar vs Ruben)
- Spend limit not on file

## Conflicts between sources
- Landlord named Oscar in event 013 and Ruben in event 014
- Provider says landlord approved by phone; no landlord record of it

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote received and recorded (£605, VAT unconfirmed). Landlord approval is outstanding; only the provider's hearsay claim exists. The flat is empty after the tenant left.

**2. What is the next action, who is it for, and through which channel?**

Landlord yes/no approval request by email (A3); provider told to wait (A2); hold with review 2024-10-11 (A4).

**3. Does anything need a human decision, and why?**

No escalation now. The landlord's own decision is needed. Escalate only if they stay silent after the second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Sawyer, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","decision_needed":"Sawyer says you phoned and said go ahead, but we have nothing in writing.… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on £60… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
