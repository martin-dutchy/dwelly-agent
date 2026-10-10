# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says the landlord approved by phone, but nothing is recorded. I asked the landlord for a written yes/no by 14 Oct and told the provider not to order. I also updated the agency manager and put the job on hold with a review date.

## Where the case stands
Stage mp_time, on hold until 14 Oct. Quote (£220+£240+£100+£45) sent to landlord on 9 Oct. No written landlord approval. Provider's claim of phone approval is unverified.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a written yes/no on the quote and say the provider claims phone approval | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell Sawyer not to order until written approval, and ask for a readable quote showing VAT | Sawyer, provider | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 14 Oct | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Sawyer (Cedar Utilities) (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your email. We can't take a phone conversation as approval, and we have no landlord approval on record yet for Flat 21, 11 Juniper Mews. The quote is with the landlord now. Please don't order the carpet or parts until we confirm in writing. Could you also send your quote as a PDF or plain-text reply, showing whether the prices include VAT, so we can file it? We'll be in touch as soon as the landlord replies.

**A2 · request_landlord_approval → Landlord (Oscar / Ruben - name to be confirmed on record) (landlord)** (verified)

> Please confirm in writing, yes or no: do you approve Sawyer's quote for Flat 21, 11 Juniper Mews (paint studio and bathroom £220, carpet approx 27 sqm £240, bathroom vinyl £100, chrome sink waste £45; VAT not yet confirmed)?
> 
> Options: Yes, approve the quote and instruct Sawyer; No / use your own contractor
> 
> Update: Sawyer emailed at 19:37 on 9 Oct saying you approved by phone and that he will order the carpet tomorrow. We can't treat that as approval, so I've asked him to hold off ordering until we hear from you. Please reply by 14 Oct. We're also asking him for the quote in writing with VAT shown.

**A3 · send_message → Agency manager (internal) via email, existing thread (event 001 request)** (verified)

> Update on check-out works, Flat 21, 11 Juniper Mews: Sawyer's quote (£605 in total before any VAT) went to the landlord on 9 Oct. Sawyer says the landlord approved by phone, but we have nothing in writing, so I've asked the landlord to confirm and told Sawyer not to order yet. Records also disagree on names (landlord Oscar vs Ruben in the hold note; Sawyer vs Cedar Utilities). I'll review on 14 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or any spend
- The quote is not recorded because VAT and the original document are unseen
- Provider's phone claim is not landlord authority

## Remaining work
- Landlord reply due by 14 Oct: record the decision, then assign or approve the quote
- Provider to send a readable quote showing VAT
- Resolve name mismatches

## Missing or unavailable information
- Landlord's written approval
- Quote VAT status and original document
- Spend limit not on property record

## Conflicts between sources
- Landlord named Oscar (event 013) vs Ruben (event 014)
- Provider named Cedar Utilities vs Sawyer
- Provider says landlord approved by phone; no record. Trusted the record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The quote is with the landlord for approval and no written approval has been received. The provider's phone-approval claim is unverified. Outstanding: the landlord's decision, the provider's quote with VAT, and the check-out works themselves.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for a written yes/no, and email to Sawyer telling him not to order until approved. The job is held until 14 Oct.

**3. Does anything need a human decision, and why?**

No escalation now. The landlord decides the spend. Escalate only if there is no reply after the 14 Oct review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Sawyer (Cedar Utilities)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (Oscar / Ruben - name to be confirmed on record)","ticket_ref":"006","decision_needed":"Please confirm in writing, yes… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Agency manager","recipient_role":"internal","channel":"email","contact":"existing thread (event 001 request)","body":"Upd… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"006","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on Sawyer's quote. Provider claims phone a… | 1 | ❌ failed | Ticket 006 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on Saw… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
- A4: put_on_hold used the wrong ticket ref; retried with the correct ref (A5), which verified.
