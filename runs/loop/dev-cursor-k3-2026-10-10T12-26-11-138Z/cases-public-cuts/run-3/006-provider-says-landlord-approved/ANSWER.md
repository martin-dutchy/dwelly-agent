# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider quote £605 awaits landlord approval. Provider says landlord agreed by phone, but that is not authority. Recorded the quote, told the provider to wait, re-asked the landlord for a written yes/no, and set a hold and follow-up for 2024-10-11.

## Where the case stands
Quote from Sawyer (£605 total) sent to landlord at event 013; no landlord reply. Provider claims phone approval (event 015), which is hearsay. Ticket on hold awaiting landlord, review 2024-10-11.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a written yes/no on the £605 quote | Landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told provider not to order or start until written landlord approval; asked whether quote includes VAT | Sawyer, provider | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-10-11, then chase landlord by SMS/phone | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Sawyer (Cedar Utilities) (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your note. We can't treat a phone conversation as approval, as we have no written confirmation from the landlord on our record. Please don't order materials or start work yet. We've asked the landlord to confirm in writing and will tell you as soon as we have it. Could you also confirm whether your quote (£220 paint, £240 carpet, £100 bathroom vinyl, £45 sink waste) includes VAT? Thanks.

**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Our contractor says you agreed by phone to go ahead. Please confirm in writing: do you approve Sawyer's quote of £605 in total (paint £220, carpet £240, bathroom vinyl £100, sink waste £45; VAT not stated)? Yes or no. (£605)
> 
> Options: Yes, approve the £605 quote; No / I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- Nothing authorises the provider to order or start work
- VAT status and spend limit unknown

## Remaining work
- Landlord written decision (agency chases 2024-10-11)
- Confirm VAT with provider
- Assign/approve only after recorded approval; then work, invoice, close

## Missing or unavailable information
- Landlord written approval
- Whether quote includes VAT
- Landlord spend limit

## Conflicts between sources
- Landlord is addressed as Oscar in event 013 but the hold at event 014 says Ruben; the provider claims phone approval that is not on record. Trusted only written records.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote recorded, awaiting the landlord's written approval. The provider's phone claim is unverified. VAT status is also outstanding.

**2. What is the next action, who is it for, and through which channel?**

Written yes/no request to the landlord by email (done), provider told to hold off by email (done), and a chase on a second channel on 2024-10-11.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord's decision is pending. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Sawyer (Cedar Utilities)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-006-provider-says-landlord-approved","decision_needed":"Our contractor say… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on £60… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","due_on":"2024-10-11","purpose":"Chase landlord on second channel (SMS/phone) if no … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
