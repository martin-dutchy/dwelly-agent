# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and reported the toilet needs replacing; the quote has gone to the landlord for approval. I asked the provider for a readable copy, updated the tenant and put the job on hold to 14 Aug. No human decision is needed yet.

## Where the case stands
Visit took place; provider reported toilet needs replacing and sent a quote. Quote forwarded to landlord (event 017) and awaiting approval. Quote contents unseen (attachments unavailable), so not recorded. Ticket on hold until 2026-08-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to resend quote as PDF/plain text with total, VAT, scope; not to start work before approval | Riverside Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: quote with landlord, no date yet, next update by 14 Aug, tell us if no usable toilet | Noah Turner, tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting landlord approval; review 14 Aug, then chase landlord on SMS/phone | Quinn, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Thanks for attending. The quote and photos did not come through on our side. Please reply with the quote as a PDF or in plain text: total, whether VAT is included, scope, and estimated completion time.
> - Is the toilet usable at the moment, or is the property without a working toilet?
> 
> Why: We cannot record the quote or confirm the amount without seeing it; please do not start work until we confirm approval.

**A2 · send_message → Noah Turner (tenant) via email, tenant email on file (as used in event 007)** (verified)

> Dear Noah, thank you for letting Riverside Works in. They have reported that the toilet needs replacing and have sent a quote, which we have passed to the landlord for approval. We can't give a date for the work until that's agreed. We'll update you by 14 August. If the toilet is unusable and you have no other toilet, please tell us straight away so we can look at what we can do sooner.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval exists for the quote; no work instructed
- Quote amount and scope not seen, not recorded
- Sending the quote to the landlord does not establish that they approve

## Remaining work
- Landlord decision on quote (chase 14 Aug on second channel)
- Record quote once received from provider
- Work, invoice, tenant confirmation, close

## Missing or unavailable information
- Quote amount, VAT, scope and photos (attachments unavailable)
- Whether the tenant has a working toilet

## Conflicts between sources
- Appointment date: event 009 says next day (09/08), events 010-013 say 08/08; the visit evidently happened per provider's email.

## Answers to the case questions
**1. Where does this case stand?**

Visit done, quote sent to landlord awaiting approval; quote not seen by us; no work approved.

**2. Next action?**

Provider asked to resend the quote (email); tenant updated (email); landlord approval awaited, review 14 Aug with chase on second channel.

**3. Human decision needed?**

No. Escalate only if the landlord stays silent after the chase and the tenant has no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (as used in event 007)","body":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord 12/08 (event 017) awaiting approval… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
_None._
