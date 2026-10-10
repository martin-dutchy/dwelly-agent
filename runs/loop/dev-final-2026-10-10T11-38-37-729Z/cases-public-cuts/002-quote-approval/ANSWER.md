# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and says the toilet needs replacing; the quote went to the landlord at event 017. I asked the provider to resend a readable quote, told the tenant what is pending, and set a hold and follow-up for 2026-08-13. No human decision is needed yet.

## Where the case stands
Stage: visit done, quote sent to landlord (event 017) and awaiting approval. Job on hold for landlord, review 2026-08-13. Quote amount not seen (attachments unavailable); provider asked to resend.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord decision on the quote; chase on a second channel on 2026-08-13 if no reply | Quinn, landlord | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to resend quote with total, VAT status and items, and not to start before approval | Riverside Works, contractor | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant that the quote is with the landlord, no date until approved | Noah Turner, tenant | sms | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Noah Turner (tenant) via sms, 07700 900422** (verified)

> Hello Noah, Northbridge Lettings here. Riverside Works have visited about your blocked toilet and say it needs replacing. We've sent their quote to your landlord for approval and will update you once we have an answer. We can't give a date until it's approved. If the toilet is your only one, please tell us if you have no other access to one.

**A4 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Thanks for attending (ref NBL-002-quote-approval). The quote and photos did not come through on our side. Please resend the quote as a PDF or plain-text reply, stating the total, whether it includes VAT, and the items covered.
> - Please also give your estimated completion time. Please do not start work until we confirm approval.
> 
> Why: Quote attachment unavailable so amount cannot be recorded; landlord decision pending.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or any spend
- The quote has not been recorded because its amount has not been seen
- No repair date is booked or promised
- The visit result has not been formally recorded

## Remaining work
- Landlord decision on the quote (landlord)
- Receive the readable quote, record it, and relay figures to the landlord if needed (agency)
- On approval, approve quote and have provider book the work (agency)
- Chase landlord 2026-08-13; escalate P2 if still silent after a second-channel chase, as no toilet is urgent

## Missing or unavailable information
- Quote amount, VAT status and scope (attachment unavailable)
- Photos and report (unavailable)
- Whether the tenant has another working toilet
- Landlord contact details are not on the property record

## Conflicts between sources
- Appointment date: the call summary (event 009) says the next day (09/08), while the system and emails say 08/08 with 'tomorrow'. The provider attended, so the visit is not in dispute; the date was not otherwise resolved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit is done and the quote has gone to the landlord. The landlord's approval of the quote is outstanding. The quote amount has not been seen, and the work is not booked.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord, with a chase on 2026-08-13 on a second channel. The provider has been asked by email for a readable quote, and the tenant has been updated by SMS.

**3. Does anything need a human decision, and why?**

Not yet. The landlord was asked less than a day ago. If the landlord stays silent after the chase, escalate P2 because the tenant may have no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"sms","contact":"07700 900422","body":"Hello Noah, Northbridge Lettings … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord 12/08 (event 017); awaiting approva… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-13","party":"Landlord","purpose":"Chase landlord for quote decision (urgent: blocke… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A4 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
_None._
