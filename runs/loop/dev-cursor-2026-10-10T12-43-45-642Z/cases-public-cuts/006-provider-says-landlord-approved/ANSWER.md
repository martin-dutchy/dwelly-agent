# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says the landlord approved by phone, which is hearsay. I recorded the quote, asked the landlord for written yes/no, told the provider not to order or start, and held the ticket for review on 2024-10-11.

## Where the case stands
Quote (£605, VAT unstated) recorded and sent to landlord at event 013; landlord has not replied. Provider claims phone approval (hearsay). Ticket on hold, review 2024-10-11.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a yes/no written approval of the £605 quote | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told provider not to order or start until written approval; asked for VAT status and quote document | Sawyer, provider | email | A3 ✅ |
| 3 | WAIT | Hold awaiting landlord reply, review 2024-10-11 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (Flat 21, 11 Juniper Mews) (landlord)** (verified)

> Sawyer says you approved by phone, but we have nothing in writing. Please reply yes or no: do you approve the quote totalling £605 (paint £220, carpet £240, bathroom vinyl £100, chrome waste £45; VAT not stated) for Flat 21, 11 Juniper Mews? (£605)
> 
> Options: Yes, approve £605 and instruct our contractor; No / I will arrange my own contractor

**A3 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your email. We have no written approval from the landlord yet, so please do not order materials or start work. We have asked the landlord to confirm in writing and will tell you as soon as we hear. Please also confirm whether the quote includes VAT, and send the quote document if you have it.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- Provider's phone claim is not landlord authority
- No contractor instruction or spend committed

## Remaining work
- Landlord written decision (owner: landlord; agency chases 2024-10-11)
- Then record decision, approve quote, arrange work and tell tenant/provider
- Confirm VAT and quote document from provider

## Missing or unavailable information
- Landlord's written approval
- VAT status of quote
- Quote document/photos
- Visit/appointment details

## Conflicts between sources
- Provider says landlord approved by phone vs no landlord reply on record; trusted the record.
- Landlord addressed as Oscar (event 013) vs Ruben (event 014); provider is Cedar Utilities but quote signed Sawyer.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote of £605 awaits landlord approval; only the provider's unverified phone claim exists. Outstanding: written approval, VAT confirmation, scheduling.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (A2), provider told to hold off by email (A3), hold until 2024-10-11 (A4).

**3. Does anything need a human decision, and why?**

No. The decision is the landlord's and is routine to chase; no escalation needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities assigned)","amount_gbp":605,"vat":"none","items"… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (Flat 21, 11 Juniper Mews)","ticket_ref":"NBL-006-provider-says-landlord-approved","decision_needed":"Sawyer says you … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Written landlord approval of £605 quote; … | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
