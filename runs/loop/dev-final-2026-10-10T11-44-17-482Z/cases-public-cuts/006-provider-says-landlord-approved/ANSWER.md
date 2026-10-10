# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider Sawyer says the landlord verbally approved a £605 quote. That isn't valid authority, so I recorded the quote, told the provider not to order or start, and held the ticket for the landlord's own answer, with review on 2024-10-11.

## Where the case stands
Quote recorded (£605, VAT unstated); landlord asked at event 013, no reply. Provider's claim of verbal approval is hearsay. Ticket on hold until 2024-10-11; no contractor instruction given.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Told Sawyer not to order or start until written landlord approval, and asked for VAT status | Sawyer, provider | email | A2 ✅ |
| 2 | WAIT | Wait for landlord's own reply to the event 013 request; review 2024-10-11, then chase on SMS/phone | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for the quote. We have no approval from the landlord on our record yet, and a phone conversation we haven't seen isn't enough for us to instruct. Please don't order materials or start work until we confirm in writing. We've asked the landlord and will update you once we hear. Please also confirm whether your prices include VAT.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- Nothing says the landlord approved; the provider's phone claim is not authority
- VAT status and total incl. VAT unconfirmed

## Remaining work
- Landlord to give clear yes (then record decision and approve quote)
- Chase landlord on second channel if silent by 2024-10-11
- Confirm VAT with provider
- Check landlord name (Oscar vs Ruben)

## Missing or unavailable information
- Landlord's written decision
- VAT status of quote
- Appointment/visit details (property vacated, no tenant to contact)

## Conflicts between sources
- Landlord called Oscar in event 013 but Ruben in event 014
- Provider says the landlord approved by phone; the record shows no landlord reply

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote of £605 (four items) is awaiting landlord approval, requested in event 013. The provider's verbal-approval claim is unverified. The landlord's written yes is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Done: email to Sawyer (provider) not to proceed. Next: wait for the landlord, then chase by SMS/phone on 2024-10-11 if silent.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord holds the decision. No escalation is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Quote £605 sent to landlord event 013; pr… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
