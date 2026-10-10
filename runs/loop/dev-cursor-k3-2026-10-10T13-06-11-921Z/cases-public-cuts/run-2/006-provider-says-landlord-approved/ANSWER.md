# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says the landlord approved by phone, which is hearsay. I recorded the quote, asked the landlord for written confirmation, told the provider not to order or start, and put the job on hold to 2024-10-11.

## Where the case stands
Quote (£605 total, VAT unstated) recorded and sent to landlord at event 013; awaiting landlord's written approval. Provider's claim of phone approval (event 015) is unverified. Ticket on hold, review 2024-10-11.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm in writing, yes/no, approval of the £605 quote | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told contractor not to order or start, and asked whether the quote includes VAT | Sawyer, contractor | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-10-11 for landlord reply, then chase on a second channel | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> The contractor says you approved the quote by phone. We have no written record, so please confirm in writing: do you approve the quote of £605 total (paint £220, carpet £240, bathroom vinyl £100, chrome waste £45; VAT not stated) for Flat 21, 11 Juniper Mews? Please reply yes or no. (£605)
> 
> Options: Yes, approve the £605 quote; No / I will use my own contractor

**A3 · send_message → Sawyer (Cedar Utilities) (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your email. We have no record of the landlord's approval yet, so please do not order materials or start work. We have asked the landlord to confirm in writing and will let you know once we have it. Could you also confirm whether the quote of £605 is inclusive of VAT?

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or authorises work
- Recording the quote does not confirm VAT or the scope
- Provider's phone claim is not landlord authority

## Remaining work
- Landlord written decision (agency to chase 2024-10-11 on second channel)
- Provider to confirm VAT status
- Then record decision, approve quote, book visit/access with tenant (vacated) or keys, invoice and close

## Missing or unavailable information
- Landlord's written approval
- VAT status of quote
- No attachment/photos seen

## Conflicts between sources
- Landlord named Oscar (event 013) vs Ruben (event 014)
- Provider Cedar Utilities vs Sawyer
- Provider says landlord approved by phone vs no recorded approval; trusted the record

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote of £605 awaits landlord approval. The provider claims phone approval but nothing is recorded. Outstanding: landlord's written decision, VAT status, and the visit/access arrangements.

**2. What is the next action, who is it for, and through which channel?**

Written yes/no approval request to the landlord by email (sent), a hold message to the provider by email (sent), and a chase on a second channel on 2024-10-11.

**3. Does anything need a human decision, and why?**

No escalation now. The landlord's decision is theirs and is routine to chase. Escalate only if they stay silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-006-provider-says-landlord-approved","decision_needed":"The contractor say… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Sawyer (Cedar Utilities)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written approval of £… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-006-provider-says-landlord-approved","note":"Conflicts: landlord addressed as Oscar (event 013) but hold note says Ruben (eve… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
