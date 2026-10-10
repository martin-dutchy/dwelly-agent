# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Sawyer says the landlord approved by phone, but the case holds no landlord reply, so this is hearsay. I recorded the £605 quote, asked the landlord for a clear yes/no, told the provider to wait, and put the ticket on hold until 2024-10-11.

## Where the case stands
Quote recorded (£605). Landlord approval requested, not received. Provider claims phone approval, which is hearsay. Ticket on hold until 2024-10-11. No contractor instruction given.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear yes/no on the £605 quote | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told provider not to order or start until written landlord approval, and asked about VAT | Sawyer, contractor | email | A3 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-10-11, then chase on a second channel | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (name on file; our earlier email said Oscar, a hold note said Ruben) (landlord)** (verified)

> The contractor says you approved his quote by phone, but we have no record of it. Please confirm yes or no: do you approve Sawyer's quote of £605 in total (paint £220, carpet £240, bathroom vinyl £100, chrome sink waste £45; VAT not stated) for Flat 21, 11 Juniper Mews? (£605)
> 
> Options: Yes, approve the quote as listed (reply with a cap if you wish); No / I will use my own contractor

**A3 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your quote. We have no record of the landlord's approval, so please don't order materials or start work yet. We've asked the landlord to confirm in writing and will let you know as soon as we have it. Please also confirm whether your prices include VAT.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- Nothing here authorises spend or work
- The tenant has vacated, so no tenant message was sent

## Remaining work
- Landlord decision (owner: landlord/agency)
- Confirm VAT with provider
- On approval: approve quote, tell provider; then invoice and close

## Missing or unavailable information
- Landlord's written approval
- Whether the quote includes VAT
- Landlord's name: Oscar in event 013, Ruben in event 014
- Original quote document was not seen; figures come from the agency's forwarded email

## Conflicts between sources
- Provider says the landlord approved by phone; the record shows no landlord reply, so I trusted the record.
- The landlord is named Oscar in event 013 and Ruben in event 014.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The quote is with the landlord and unapproved. The provider's phone-approval claim is unverified. Still outstanding: landlord decision, VAT confirmation, work, invoice and closure.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request to the landlord by email (A2). The provider was told by email to wait (A3). The hold review is 2024-10-11 (A4).

**3. Does anything need a human decision, and why?**

No escalation now. The landlord decides on approval, and this is routine. Escalate only if the landlord stays silent after a chase on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (name on file; our earlier email said Oscar, a hold note said Ruben)","ticket_ref":"NBL-006-provider-says-landlord-app… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on Saw… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
