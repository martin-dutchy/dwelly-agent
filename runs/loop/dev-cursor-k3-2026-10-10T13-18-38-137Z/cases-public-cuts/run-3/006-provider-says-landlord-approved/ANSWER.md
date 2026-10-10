# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says landlord approved by phone, but there is no record of it. I recorded the quote, re-asked the landlord for a written yes/no, told the provider not to order or start, and put the job on hold to 11 Oct.

## Where the case stands
Quote (£605, four lines) sent to landlord at event 013; no landlord reply. Contractor claims phone approval (event 015) – unverified. Held waiting for landlord, review 2024-10-11. Property vacant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a yes/no written approval of the £605 quote by 2024-10-11 | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told provider not to order or start without written landlord approval; asked about VAT | Sawyer, Cedar Utilities (provider) | email | A3 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-10-11 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Please reply yes or no: do you approve Sawyer's quote for Flat 21, 11 Juniper Mews (paint £220, carpet £240, bathroom vinyl £100, chrome sink waste £45; £605 in total, VAT not stated)? The contractor says you agreed by phone, but we have no written approval from you. Please reply by 2024-10-11. (£605)
> 
> Options: Yes, approved up to £605 - go ahead; No / I will use my own contractor

**A3 · send_message → Sawyer, Cedar Utilities (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your message. We have no written approval from the landlord yet, so please do not order materials or start work. We have asked the landlord to confirm in writing and will tell you as soon as we hear, target 11 October. Please also confirm whether your prices include VAT. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- The provider's phone claim is hearsay, not landlord authority
- No contractor instruction or spend committed

## Remaining work
- Landlord written decision, then record_landlord_decision and approve_quote
- Chase landlord on a second channel after 3 days if silent
- Confirm VAT with provider
- Visit/work booking, invoice, close

## Missing or unavailable information
- Landlord written approval
- Whether quote includes VAT
- Quote scope also includes vinyl and sink waste beyond original request

## Conflicts between sources
- Provider says landlord approved by phone vs no landlord reply on record; treated as unapproved
- Landlord named Oscar (event 013) vs Ruben (event 014)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote of £605 awaits landlord approval; the provider's claim of phone approval is unverified. Outstanding: written landlord decision, VAT confirmation, work booking.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (agency landlord record) for a reply by 11 Oct; provider told by email to wait.

**3. Does anything need a human decision, and why?**

No. This is routine waiting on the landlord; escalate only if they stay silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `request_landlord_approval` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","landlord":"Landlord (agency landlord record)","decision_needed":"Please reply yes o… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Sawyer, Cedar Utilities","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","t… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Waiting for landlord written approval of … | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-006-provider-says-landlord-approved","note":"Event 015: provider says landlord approved by phone; no landlord record, not aut… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
