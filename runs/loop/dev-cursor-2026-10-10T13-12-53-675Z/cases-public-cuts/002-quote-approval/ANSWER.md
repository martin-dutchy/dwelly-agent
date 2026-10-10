# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and says the toilet must be replaced; the quote went to the landlord but we haven't seen its contents. I recorded the result, asked the provider to resend the documents, updated the tenant and put the job on hold to 2026-08-14.

## Where the case stands
Visit done, result needs_quote. Quote sent to landlord (event 017) awaiting approval. Ticket on hold, review 2026-08-14. Provider asked to resend quote/photos.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord decision on the quote; chase on a second channel if no reply by 2026-08-14 | Quinn, landlord | internal | A4 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to resend quote (total, VAT, scope), photos and confirm visit date | Riverside Works, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant on status and ask whether they have another working toilet | Noah Turner, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Please resend the quote as a PDF or plain text, stating the total and whether VAT is included, and the scope (new toilet and cistern, repiping).
> - Please resend the photos and give an estimated completion time.
> - Please confirm the date and time of your visit, as our record shows 08/08/2026 10:30 but the call note says the following day.
> 
> Why: The quote attachments were unavailable to us, so we cannot record the amount. Please do not start work until we confirm landlord approval.

**A3 · send_message → Noah Turner (tenant) via email, tenant email on file** (verified)

> Dear Noah, Riverside Works have visited and say the toilet needs replacing, as it can't safely be removed to clear the blockage. They have sent a quote, which we have passed to your landlord for approval. No work will start until that is agreed. We'll update you by 2026-08-14. If you have no other working toilet, please tell us today so we can look at what we can do sooner.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or any spend
- Quote amount not recorded because attachments were unavailable
- No work is booked

## Remaining work
- Landlord decision on quote (landlord)
- Provider to resend quote and photos, then record_quote
- Assign/book works after approval
- Tenant reply on toilet access

## Missing or unavailable information
- Quote amount, VAT and scope
- Photos and report
- Whether tenant has another toilet

## Conflicts between sources
- Visit date: event 009 says next day (09/08) but events 010-013 say 08/08 10:30; asked provider to confirm.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit done and quote requested from landlord; approval, legible quote and photos outstanding.

**2. What is the next action, who is it for, and through which channel?**

Wait for landlord approval (held to 2026-08-14); email provider for the quote documents; email tenant update.

**3. Does anything need a human decision, and why?**

No. The landlord decides on the quote. Escalate P2 if the landlord is silent beyond a chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Provider email event 016 (2026-08-12): engineer attended, toilet … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file","body":"Dear Noah, Riverside Wo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017 awaiting approval; also w… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
_None._
