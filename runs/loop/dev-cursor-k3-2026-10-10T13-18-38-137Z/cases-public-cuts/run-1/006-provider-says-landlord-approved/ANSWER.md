# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says the landlord approved by phone, which is hearsay. I recorded the quote, re-asked the landlord for a clear yes/no, told the provider not to order or start, and put the job on hold to 2024-10-11.

## Where the case stands
Quote (£605 total) recorded and with landlord for approval since event 013; provider claims verbal approval (hearsay). Ticket on hold awaiting landlord, review 2024-10-11. No visit date recorded.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a yes/no on the £605 quote, reply by 2024-10-11 | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told provider not to order or start until landlord confirms; asked VAT and attendance date | Sawyer, contractor | email | A3 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-10-11 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (Flat 21, 11 Juniper Mews) (landlord)** (verified)

> The contractor says you phoned and said go ahead, but we have no written approval. Please reply yes or no: do you approve the quote of £605 in total (paint £220, carpet £240, bathroom vinyl £100, chrome waste £45; VAT not stated)? Please reply by 2024-10-11. (£605)
> 
> Options: Yes, approve the quote as listed; No, do not proceed / I will arrange my own contractor

**A3 · send_message → Sawyer (Cedar Utilities) (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your email. We have not had approval from the landlord in writing, so please do not order materials or start work yet. We have asked the landlord to confirm directly and will tell you as soon as we hear. Please also confirm whether your prices include VAT, and the date you attended the flat.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it.
- The provider's phone claim is not landlord authority; no contractor instruction or spend approved.
- Nothing confirms VAT treatment or that a site visit occurred.

## Remaining work
- Landlord decision (record_landlord_decision when written reply arrives); then approve quote and tell provider
- Confirm VAT and visit date with provider
- Chase landlord on second channel if silent after 2024-10-11

## Missing or unavailable information
- Landlord's written approval
- Whether quote includes VAT
- Visit date/attendance evidence
- Original quote attachment not seen (only a summary)

## Conflicts between sources
- Landlord named Oscar in event 013 but Ruben in the hold note (event 014); flagged in the hold comment.
- Provider says landlord approved by phone; no landlord record of this, so I treated it as unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote of £605 awaits landlord approval; the provider's claimed verbal approval is unverified. Outstanding: written approval, VAT clarity, visit evidence.

**2. What is the next action, who is it for, and through which channel?**

Landlord yes/no approval request by email (A2); provider told to hold off by email (A3); hold to 2024-10-11 (A4).

**3. Does anything need a human decision, and why?**

No. The decision is the landlord's, and it is routine to wait for it. Escalate only if the landlord stays silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (Flat 21, 11 Juniper Mews)","ticket_ref":"NBL-006-provider-says-landlord-approved","decision_needed":"The contractor s… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Sawyer (Cedar Utilities)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on £60… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
