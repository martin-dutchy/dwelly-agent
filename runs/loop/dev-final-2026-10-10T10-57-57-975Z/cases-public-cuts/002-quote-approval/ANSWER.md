# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Riverside Works attended and found the toilet needs replacing; their quote went to the landlord for approval. I recorded the result, put the job on hold with a review date, set a chase and updated the tenant.

## Where the case stands
Result stage: visit done, needs a quote. Quote sent to landlord Quinn (event 017); ticket on hold waiting for landlord, review 2026-08-14. Tenant informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord approval of the quote; chase on 2026-08-14 | Quinn, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the quote is with the landlord, no date promised | Noah Turner, tenant | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Noah Turner (tenant) via email, existing thread (event 007 email)** (verified)

> Dear Noah, thank you for letting the engineer in. He found the toilet needs replacing to clear the blockage, so we have sent the quote to the landlord for approval. We will update you as soon as we hear back and will aim to arrange the work promptly after that. We can't promise a date yet. If the toilet is your only one, or anything gets worse (leaks), please tell us straight away. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result does not approve the quote or spend
- The quote amount is not recorded because the attachment is unavailable
- No repair date is confirmed

## Remaining work
- Landlord to approve or decline the quote (agency chases 2026-08-14)
- Then record the quote, approve it, book the visit, and handle invoice and closing

## Missing or unavailable information
- Quote amount, VAT and scope: the attachments are unavailable
- Whether the tenant has another working toilet

## Conflicts between sources
- The event 017 email to the landlord addresses 'Quinn', but no landlord contact is on the property record.
- The ticket stage shows 'visit' although the visit happened; I moved it to the result stage.
- The event 009 call says the visit is 'the next day' while the appointment is dated 08/08.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit is done and the quote has been sent to the landlord. Landlord approval of the quote is outstanding, and the quote has not yet been recorded because the amount is not visible.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's reply and chase on 2026-08-14. The tenant has been updated by email.

**3. Does anything need a human decision, and why?**

Not at this point. The landlord must decide on the quote. A human should step in only if the landlord does not reply, or if the quote exceeds the limit and the attachments stay unreadable.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord Quinn 2026-08-12 (event 017); await… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A2 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"Dear Noah,… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-14","party":"Quinn, landlord","purpose":"Chase landlord approval of Riverside Works… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A4 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email 2026-08-12 (event 016): engineer attended, … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |

## Failed or unverified actions
_None._
