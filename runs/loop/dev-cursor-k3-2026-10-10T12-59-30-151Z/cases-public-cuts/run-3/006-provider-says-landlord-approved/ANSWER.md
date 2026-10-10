# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider claims the landlord approved the quote by phone, but nothing on record backs this up. I recorded the £605 quote, told Sawyer to hold off on ordering or starting, asked the landlord for a clear yes/no, and put the ticket on hold until 2024-10-12.

## Where the case stands
Quote from Sawyer (£605 total) recorded and sent to landlord (event 013) with no landlord reply. Provider says landlord approved by phone (event 015); this is hearsay. Ticket on hold waiting for landlord, review 2024-10-12. Property is void, so there is no tenant to message.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear yes/no on the £605 quote, noting the contractor's claim of phone approval | Landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell Sawyer not to order materials or start until written landlord approval; ask whether prices include VAT | Sawyer, contractor | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-10-12 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your message. We have no written approval from the landlord on our records yet, so please don't order materials or start work until we confirm. We've asked the landlord for a clear yes and will tell you as soon as we have it. Could you also confirm whether your prices include VAT? Thanks.

**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> The contractor says you approved the £605 quote (paint £220, carpet £240, bathroom vinyl £100, chrome waste £45) by phone. Please confirm by reply: do you approve this quote, yes or no? (£605)
> 
> Options: Yes, approve the quote of £605 as listed; No / I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- The provider's phone claim is not landlord authority
- No contractor instruction or spend committed

## Remaining work
- Landlord to confirm approval in their own words; then record decision and approve quote
- Provider to confirm VAT status
- If no reply by 2024-10-12, chase landlord on a second channel
- Check landlord name (Oscar vs Ruben)

## Missing or unavailable information
- Landlord's own approval
- VAT status of the quote
- Quote document/photos not seen; only figures in event 013
- Landlord's name (Oscar or Ruben)

## Conflicts between sources
- Provider claims phone approval vs no landlord reply on record; trusted the record
- Landlord addressed as Oscar (event 013) vs Ruben (event 014)
- Assigned provider Cedar Utilities vs quote from Sawyer

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A quote of £605 has been sent to the landlord and is awaiting the landlord's own approval. The provider says approval was given by phone, but that is unverified. Visit/appointment details were never confirmed and VAT is unstated.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for a clear yes/no (done), and email to Sawyer telling them not to proceed (done). Then wait until 2024-10-12 and chase on a second channel if there is no reply.

**3. Does anything need a human decision, and why?**

No. The landlord's approval is routine to obtain and nothing needs escalating yet. Escalate only if the landlord stays silent after the chase or the name conflict can't be resolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-006-provider-says-landlord-approved","decision_needed":"The contractor say… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's own written confirmat… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-006-provider-says-landlord-approved","note":"Event 015: Sawyer says landlord approved by phone - not accepted as authority. L… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
