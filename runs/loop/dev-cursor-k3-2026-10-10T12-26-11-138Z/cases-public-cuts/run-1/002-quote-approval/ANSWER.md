# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and reported the toilet needs replacing, with a quote. The quote already went to the landlord. I asked the provider to resend the unreadable quote, updated the tenant and put the job on hold to 14 Aug.

## Where the case stands
Visit done; provider says toilet needs replacing and sent a quote. Quote sent to landlord (event 017) and awaiting approval. Ticket on hold until 2026-08-14. Quote amount and scope not seen.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to resend quote as PDF or plain text with total, VAT and scope | Riverside Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: quote with landlord, next update by 14 Aug, no repair date promised | Noah Turner, tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting landlord decision on quote, review 2026-08-14; chase on second channel if silent | Quinn, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Thanks for attending. The quote and photos did not come through on our side. Please resend the quote as a PDF, or reply in plain text with the total, whether VAT is included, and what it covers (new toilet and cistern, repiping).
> - Is the toilet currently usable, or is the tenant without a working toilet? Please give your earliest start date if approved.
> 
> Why: Attachments unavailable, so the amount and scope cannot be recorded or confirmed.

**A2 · send_message → Noah Turner (tenant) via email, tenant email on file (as used in event 007)** (verified)

> Dear Noah, thank you for your patience. Riverside Works have visited and say the toilet needs replacing, so they have sent us a quote. We have passed it to your landlord for approval, and we will update you by 14 August. We cannot give a repair date until it is approved. If the toilet is unusable or anything leaks, please tell us straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or any spend
- No contractor start date is confirmed
- Quote amount and contents are unverified as attachments were unavailable

## Remaining work
- Landlord decision on quote (owner: landlord; agency chases 14 Aug)
- Provider to resend quote; then record_quote
- On approval: approve_quote and arrange works with tenant
- Check whether tenant has a usable toilet

## Missing or unavailable information
- Quote amount, VAT and scope
- Photos and report
- Whether the tenant has another working toilet

## Conflicts between sources
- Appointment date: event 009 says the next day (09/08), while events 010-013 say 08/08. The provider confirmed attending, so I did not rebook.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit done and quote received but unseen. Landlord approval of the quote is pending. The quote still needs recording and the works need booking after approval.

**2. What is the next action, who is it for, and through which channel?**

Ask Riverside Works by email to resend the quote, and update the tenant by email. Then wait for the landlord, with a review on 14 Aug.

**3. Does anything need a human decision, and why?**

No. The landlord is the decision maker on the quote and the routine chase is in hand. Escalate only if the landlord stays silent after the chase, or the toilet is the tenant's only one and unusable.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (as used in event 007)","body":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"Flat 3, 15 Willowmere Road","reason":"Waiting for Landlord","comment":"Quote sent to landlord 12/08 (event 017) for approval;… | 1 | ❌ failed | Ticket Flat 3, 15 Willowmere Road not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord 12/08 (event 017) for approval; quo… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
- A3: First hold attempt used the address instead of the ticket ref. Retried with NBL-002-quote-approval, verified as A4.
