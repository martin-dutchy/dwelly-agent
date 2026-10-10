# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Riverside Works attended and reported the toilet needs replacing, with a quote. The quote went to the landlord at event 017 but its attachments were unavailable to us. I recorded the result, asked the provider to resend the quote, updated the tenant, and set a hold and follow-up for 14 Aug.

## Where the case stands
Stage: result (needs_quote). Provider visited and sent a quote; agency asked landlord to approve at event 017 (no reply yet). Ticket on hold, review 2026-08-14. Quote figure and photos unseen.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord approval of the quote; chase on a second channel on 2026-08-14 if no reply | Quinn, landlord | internal | A5 ✅ |
| 2 | REQUEST_INFORMATION | Ask Riverside Works to resend quote (amount, VAT, scope), photos and report in readable form, and not to start before approval | Riverside Works, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: quote with landlord, no work until agreed, next update by 14 Aug | Noah Turner, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Please resend the quote as a PDF or plain text, stating the amount, whether VAT is included, and the scope (new toilet, cistern, repiping).
> - Please resend the photos and report from the visit, as the attachments did not reach us.
> - Please give an estimated completion time once approved.
> 
> Why: The quote, photos and report attachments were unavailable to us, so we cannot record the figure. Please do not start work until we confirm approval.

**A3 · send_message → Noah Turner (tenant) via email, tenant email on file** (verified)

> Dear Noah, thank you for your patience. Riverside Works have visited and say the toilet needs replacing, so they have sent a quote. We have passed it to your landlord for approval and will not start work until it is agreed. We will update you by 14 August at the latest. If the toilet is your only one and you have any difficulty, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or any spend.
- Quote amount, scope and photos have not been seen, so none is recorded.
- No repair date is booked.

## Remaining work
- Landlord decision on quote (owner: landlord; agency chases 14 Aug)
- Provider to resend readable quote; then record_quote
- After approval, approve_quote, arrange the works visit, invoice and close

## Missing or unavailable information
- Quote amount, VAT status and scope (attachments unavailable)
- Visit photos and report

## Conflicts between sources
- Visit date: event 009 says the next day (09/08), while events 010–013 say 08/08 and call it 'tomorrow'. The provider confirmed attendance at the scheduled appointment, so the date no longer matters.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit has happened and the result is that a quote is needed. The quote is with the landlord for approval with no reply yet. Outstanding: the landlord's decision, a readable quote and photos from the provider, and the works themselves.

**2. What is the next action, who is it for, and through which channel?**

Wait for landlord approval, with a chase on 14 Aug. Email Riverside Works for a readable quote. Email the tenant an update.

**3. Does anything need a human decision, and why?**

No. The landlord's approval is pending and routine chasing covers it. Escalate only if the landlord stays silent after the chase on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email (event 016, 2026-08-12): engineer attended;… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-002-quote-app… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017; awaiting approval. Also … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-14","party":"Landlord (Quinn)","purpose":"Chase landlord approval of quote on secon… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
