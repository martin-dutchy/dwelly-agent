# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Riverside Works attended and found the toilet needs replacing; the quote has gone to the landlord. I put the job on hold pending their reply, asked the provider to resend a readable quote, updated the tenant and set a follow-up for 2026-08-13.

## Where the case stands
Visit done; provider says toilet needs replacing and sent a quote. Quote sent to landlord for approval (event 017); no reply. Ticket on hold waiting for landlord, review 2026-08-13. Quote amount not visible to us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord decision on the quote; hold with review 2026-08-13, then chase by SMS/phone. | Quinn, landlord | internal | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask Riverside Works to resend the quote (amount, VAT, items) as PDF or plain text, plus availability. | Riverside Works, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant that the quote is with the landlord, nothing booked yet. | Noah Turner, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Your quote and photos did not come through on our side. Please resend the quote as a PDF or state the amount, whether VAT is included, and the items covered in a plain-text reply.
> - Please confirm the toilet is currently usable or not, and your earliest availability if the quote is approved.
> 
> Why: We need to record the quote exactly and the landlord's decision depends on it.

**A3 · send_message → Noah Turner (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Noah, the Riverside Works engineer has visited about your blocked toilet. The toilet needs replacing, and they've sent a quote. We've passed it to your landlord for approval and will update you as soon as we hear back. Nothing is booked yet. If the toilet is unusable or anything gets worse, such as a leak, please tell us straight away. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or spend or books any works.
- Quote amount not recorded because the attachment was unavailable.
- The tenant was not told any date or cost.

## Remaining work
- Landlord decision on quote (landlord; chase 2026-08-13)
- Provider to resend readable quote (Riverside Works)
- After approval: approve quote, book works, invoice, tenant confirmation, close

## Missing or unavailable information
- Quote amount, VAT status and items; attachments 04, 75, 13, 88, 21, 33, 65 unavailable
- Whether the tenant has another working toilet

## Conflicts between sources
- Appointment date: call (event 009) says next day (09/08) but system and emails say 08/08/2026; the provider attended, so no further action needed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit complete, quote with the landlord awaiting approval since 2026-08-12. Outstanding: landlord decision, readable quote, works, invoice, close.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord (Quinn) with a chase on a second channel on 2026-08-13; meanwhile the provider has been asked by email to resend the quote and the tenant has been updated by email.

**3. Does anything need a human decision, and why?**

No escalation now. The landlord's approval is routine and pending; escalate P2 if still silent after the chase, as the toilet is an urgent repair.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote from Riverside Works sent to landlord (event 017) fo… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Noah,… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-13","party":"Landlord","purpose":"Chase landlord on quote approval via second chann… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
