# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Riverside Works attended and report that a replacement toilet and cistern are needed. The quote had already gone to the landlord, so I asked the provider for a readable copy and the visit date, updated the tenant, and put the job on hold until 14 Aug for the landlord's decision.

## Where the case stands
Visit done; provider says a new toilet and cistern are needed. Quote forwarded to landlord (event 017) and awaiting approval. Ticket on hold until 14 Aug. Readable quote requested from provider.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord decision on the quote, review 2026-08-14; chase on a second channel if still silent. | Quinn, landlord | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider for a readable quote (amount, VAT, items), the actual visit date, and whether the toilet is usable. | Riverside Works, provider | email | A1 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: quote with landlord, nothing booked, next update by 14 Aug; ask if another toilet is available and about leaks. | Noah Turner, tenant | email | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Please resend the quote for the new toilet and cistern as a readable PDF or plain text, showing the amount, whether VAT is included, and the items covered. The attachments did not open for us.
> - Please confirm the date and time your engineer attended (our records show 08/08/2026 and 09/08/2026).
> - Is the toilet usable at all at the moment, and is there any leak risk until the work is done?
> 
> Why: We need the quote figure to record it and check it against approval; the attachments were unavailable to us. Please do not start work until we confirm approval.

**A2 · send_message → Noah Turner (tenant) via email, existing thread (event 007 email)** (verified)

> Dear Noah, thank you for your patience. Riverside Works have visited and say the toilet can't be safely unblocked as it is, and a replacement toilet and cistern is needed. We've sent their quote to the landlord for a decision. Nothing is booked yet and we can't give a date until the landlord replies. We'll update you by 14 August. Is there another toilet you can use in the meantime? Please let us know, and tell us straight away if there's any leaking.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the quote to the landlord is not approval; no work is authorised.
- I have not seen the quote, so no amount is recorded or checked against any limit.
- The tenant update does not promise a date.

## Remaining work
- Landlord decision on quote (agency, review 14 Aug)
- Record quote once a readable copy arrives
- Provider to confirm visit date and then book the works after approval
- Record the visit result

## Missing or unavailable information
- Quote amount, VAT status and items (attachments unavailable)
- Actual attendance date
- Whether the tenant has another toilet

## Conflicts between sources
- Visit date: event 009 says the next day (09/08), while events 010-013 say 08/08 and also 'tomorrow'. Provider reply requested.
- The ticket stage shows 'visit' although the quote has been sent.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit has happened and a quote for a new toilet and cistern is with the landlord, awaiting approval. Still outstanding: the landlord's decision, a readable copy of the quote, and the works.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord, with a review on 14 Aug. The provider was asked for a readable quote by email, and the tenant was updated by email.

**3. Does anything need a human decision, and why?**

No human is needed now. The decision is the landlord's, and it is not yet overdue. Escalate if the landlord stays silent after a chase and the tenant has no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote (Riverside Works email 12 Aug, attachment-65) sent t… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
_None._
