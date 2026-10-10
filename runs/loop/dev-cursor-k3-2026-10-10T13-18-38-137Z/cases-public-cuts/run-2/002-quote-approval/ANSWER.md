# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and says the toilet needs replacing; quote went to the landlord but attachments were unavailable to us. I recorded the result, asked the provider for a readable quote, updated the tenant and put the job on hold to 13 Aug.

## Where the case stands
Visit done, result needs_quote. Quote sent to landlord (event 017), awaiting approval. Ticket on hold, review 2026-08-13. Quote amount not visible to us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to resend quote (amount, VAT, scope), photos and report in readable form; no work before approval | Riverside Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: quote with landlord, no work until approved, next update by 13 Aug | Noah Turner, tenant | email | A3 ✅ |
| 3 | WAIT | Wait for landlord decision; review 13 Aug, then chase on a second channel | Quinn, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Please resend the quote as a PDF or plain text, stating the amount, whether VAT is included, and the scope (new toilet and cistern, repiping).
> - Please resend the visit photos and report, as the attachments did not reach us.
> - Is the toilet currently usable, and what is your estimated completion time once approved?
> 
> Why: The attachments were unavailable so we cannot record the quote amount. Please do not start work until we confirm landlord approval.

**A3 · send_message → Noah Turner (tenant) via email, tenant email on file** (verified)

> Dear Noah, Riverside Works have attended and say the toilet needs replacing, as it can't safely be removed to clear the blockage. We've sent their quote to your landlord for approval and are getting the details from the contractor. No work will start until that's approved. We'll update you by 13 August at the latest. If the toilet is unusable or anything leaks, please tell us straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or any spend
- The quote amount and contents are unseen
- Recording the result does not confirm the cause or who pays

## Remaining work
- Landlord decision on quote (agency chases 13 Aug)
- Provider to resend readable quote and photos; then record_quote
- After approval: approve_quote, schedule works, invoice, close

## Missing or unavailable information
- Quote amount, VAT status and scope
- Photos and report
- Whether the toilet is usable meanwhile

## Conflicts between sources
- Appointment date: event 009 says next day (9 Aug) but events 010-013 say 8 Aug and 'tomorrow'; the provider attended, so moot.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Visit done; quote awaiting landlord approval; quote details unseen by us; provider reply and landlord decision outstanding.

**2. What is the next action, for whom, through which channel?**

Provider asked by email for a readable quote; tenant updated by email; wait for landlord with review 13 Aug.

**3. Does anything need a human decision?**

No. The landlord's approval is the decision needed and it is pending. Escalate P2 if they stay silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Provider email event 016 (2026-08-12): engineer attended; toilet … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-002-quote-app… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017; awaiting approval. Also … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
_None._
