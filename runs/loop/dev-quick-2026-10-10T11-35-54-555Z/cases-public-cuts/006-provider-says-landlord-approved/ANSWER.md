# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

The quote of £605 has been sent to the landlord, but no written approval is recorded. The provider says the landlord agreed by phone, which is hearsay and cannot be used to instruct work. I asked the landlord for a yes or no in writing and told the provider not to order parts, then held the job until 2024-10-11.

## Where the case stands
Check-out works at Flat 21, 11 Juniper Mews (carpet replacement and repaint). Quote of £605 total (event 013, sent to landlord 9 Oct 2024) is awaiting the landlord's written approval. The job is on hold for the landlord, review 2024-10-11. No landlord decision is recorded.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to reply yes or no to the £605 quote in writing and to confirm his full name | Oscar (landlord) | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Tell the provider not to order parts or start work until approval is confirmed, and ask which company is doing the job, whether the quote includes VAT, and for a visit date | Sawyer (contractor) | email | A2 ✅ |
| 3 | WAIT | Hold the job for the landlord's reply, with review on 2024-10-11; chase by phone if no reply | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Oscar (landlord) (landlord) via email, existing thread (event 013 email)** (verified)

> Hi Oscar,
> 
> Following our email of 9 October about the check-out works at Flat 21, 11 Juniper Mews, we have not yet had your reply. The contractor has told us you agreed by phone that work can go ahead. We need this in writing from you before anything is ordered.
> 
> Quote as received (VAT status not stated):
> - Paint full studio including bathroom, light grey: £220
> - Supply and fit large carpet, approx 27 sqm: £240
> - Supply and fit vinyl flooring to bathroom: £100
> - Fit new chrome waste to sink: £45
> - Total: £605
> 
> Please reply YES or NO: do you approve this quote for the works to go ahead? Please also confirm your full name, as our records show two different names for the landlord.
> 
> Thanks,
> Northbridge Lettings

**A2 · send_message → Sawyer (contractor) (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer,
> 
> Thanks for your message. We have not yet received the landlord's written approval, so please do not order parts or start any work at Flat 21, 11 Juniper Mews. We will confirm as soon as approval is in.
> 
> Please also confirm which company is doing this job, as our system shows Cedar Utilities as the assigned provider. Could you also confirm whether your quote (£605 in total) includes VAT, and give us a visit date for the works?
> 
> Thanks,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The provider's statement that the landlord approved by phone is not landlord authority and has not been recorded as a decision.
- Sending the quote does not approve it, and no contractor has been instructed or booked.
- No visit date is confirmed.
- The quote's VAT status is unknown.

## Remaining work
- Landlord's written yes or no on the £605 quote (landlord, awaiting reply; review 2024-10-11, then phone chase on a second channel).
- Resolve the landlord name conflict (Oscar in event 013, Ruben in event 014).
- Confirm which provider is doing the job: Cedar Utilities is assigned, but the quote came from Sawyer.
- Get the provider's VAT confirmation and a confirmed visit date after approval.
- Once approved, assign the contractor and book the visit; then record the result, invoice and close.

## Missing or unavailable information
- Written landlord decision on the quote
- Landlord's correct name
- Whether the £605 includes VAT
- Which company is doing the work (Cedar Utilities or Sawyer)
- Confirmed visit date

## Conflicts between sources
- Landlord named 'Oscar' in the quote email (event 013) but 'Ruben' in the hold note (event 014). Not resolved; asked the landlord to confirm his name.
- Assigned provider is Cedar Utilities (event 003, 005), but the quote and the approval-chasing email came from Sawyer (events 013, 015). Asked Sawyer to confirm.
- Event 012 refers to 'the studio' and a customer; the property is Flat 21. Not treated as a conflict on the job's scope.
- Event 015 says the landlord approved by phone; no landlord record supports it. Treated as hearsay.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is in the quote-approval stage. The £605 quote (carpet £240, paint £220, bathroom vinyl £100, waste £45) was sent to the landlord on 9 Oct and has no written reply. The provider's claim of phone approval is unverified. Outstanding: landlord written approval, the landlord name conflict, which company does the work, VAT status, and a visit date.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord on the existing thread for a yes or no on the quote and his full name (A1). Email Sawyer on the existing thread not to order parts or start work, and to confirm the company, VAT and a visit date (A2). Hold the job with review on 2024-10-11 (A3).

**3. Does anything need a human decision, and why?**

Not yet. The landlord's approval is the decision needed, and it is unresolved only because the landlord has not answered. Escalate if he does not reply by the review date after a phone chase, or if the name conflict or the provider's claim cannot be settled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Oscar (landlord)","recipient_role":"landlord","channel":"email","contact":"existing thread (event 013 email)","ticket_ref… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Sawyer (contractor)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticke… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Landlord has not replied in writing to th… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
