# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider quoted £605 in total for repainting, carpet, bathroom vinyl and a sink waste. The provider says the landlord approved by phone, but that is hearsay. I recorded the quote and asked the landlord for written approval. I told the provider to hold off ordering, and the ticket is on hold until 2024-10-11.

## Where the case stands
Stage mp_time, on hold waiting for the landlord's written decision on the £605 quote. The provider says the landlord agreed by phone, but there is no written record. Review 2024-10-11.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord for a written yes/no on the £605 quote by 2024-10-11 | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told the provider not to order materials until written approval arrives, and asked whether the prices include VAT | Sawyer, Cedar Utilities (provider) | email | A3 ✅ |
| 3 | WAIT | Hold for landlord approval, review 2024-10-11 | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (Oscar per event 013) (landlord)** (verified)

> Yes/no: do you approve Cedar Utilities' quote of £605 in total (paint £220, carpet £240, bathroom vinyl £100, chrome sink waste £45; VAT not stated) for Flat 21, 11 Juniper Mews? The contractor says you agreed by phone, but we have no written record, so please reply in writing by 2024-10-11. (£605)
> 
> Options: Yes, approved up to £605; No / I will arrange my own contractor

**A3 · send_message → Sawyer, Cedar Utilities (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your note. We can't treat a phone conversation as approval until we hold it in writing from the landlord, so please don't order the carpet or parts yet. We've asked the landlord to confirm in writing and will let you know as soon as we have it. Could you also confirm whether your prices include VAT?

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The quote is recorded but not approved; no spend committed.
- The provider's phone claim is hearsay and is not recorded as a landlord decision.
- Nothing here confirms the VAT status or a start date.

## Remaining work
- Landlord's written decision (agency, chase after 2024-10-11 on a second channel)
- Provider's VAT answer
- Landlord decision then record_landlord_decision, approve_quote, a start date, invoice and closing

## Missing or unavailable information
- Written landlord approval
- Whether the quote includes VAT
- Start date

## Conflicts between sources
- The landlord is called Oscar in event 013 but Ruben in the hold note at event 014; I used the landlord record contact.
- The provider says the landlord approved by phone; the agency has no written approval, so I trusted the record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The quote of £605 is recorded (Q-101) and the landlord was asked for approval at event 013 but has not replied in writing. The provider claims phone approval, which is unverified. Still outstanding: the landlord's written decision, the VAT status, and the start date.

**2. What is the next action, who is it for, and through which channel?**

A written yes/no approval request to the landlord by email (APR-102), and a hold-off message to Sawyer at Cedar Utilities by email (MSG-103). The ticket is on hold until 2024-10-11.

**3. Does anything need a human decision, and why?**

No human decision is needed yet. The landlord's approval is routine and is already requested. Escalate only if the landlord stays silent after a chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Cedar Utilities (Sawyer)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (Oscar per event 013)","ticket_ref":"NBL-006-provider-says-landlord-approved","decision_needed":"Yes/no: do you approv… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Sawyer, Cedar Utilities","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","t… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-006-provider-says-landlord-approved","note":"Provider (event 015) claims verbal landlord approval; hearsay, not recorded as d… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Written landlord approval of £605 quote; … | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
