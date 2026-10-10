# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

The provider attended and says the toilet needs replacing; the quote was already sent to the landlord. I asked the provider for a readable copy of the quote and photos, updated the tenant, and put the job on hold awaiting the landlord with review on 2026-08-13.

## Where the case stands
Visit done; provider reports toilet needs replacing (new toilet and cistern quote). Quote sent to landlord (event 017), awaiting approval. Quote/photos not visible to us; amount unknown. Ticket on hold, review 2026-08-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to resend quote (total, VAT) and photos as PDF/plain text | Riverside Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: quote with landlord, no date promised | Noah Turner, tenant | email | A3 ✅ |
| 3 | WAIT | Hold awaiting landlord decision; chase on a second channel (SMS/phone) if no reply by review date | Quinn, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Please resend the quote for the new toilet and cistern as a PDF or in plain text, showing the total and whether VAT is included, as the attachment did not reach us.
> - Please resend the photos from the visit.
> 
> Why: The quote and photos referenced in your email are unavailable on our side, so we cannot record the amount or confirm the scope.

**A3 · send_message → Noah Turner (tenant) via email, existing thread (event 007 email)** (verified)

> Dear Noah, thank you for your patience. The engineer from Riverside Works has visited and found the toilet needs replacing, as removing it risks damage. We have sent the quote to your landlord for approval and will update you as soon as we have their answer. We cannot confirm a date for the work until then. If anything changes or the toilet becomes unusable in the meantime, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing approves the quote or spend; no work is authorised yet
- I have not seen the quote amount, scope or photos
- Tenant message does not promise a date

## Remaining work
- Landlord to approve or decline quote; agency to chase 2026-08-13 on a second channel
- Provider to resend readable quote; then record_quote
- After approval, provider books work; then result, invoice, close
- Toilet-out-of-use impact on tenant to be monitored; urgent if no other toilet

## Missing or unavailable information
- Quote amount, VAT status and scope (attachments unavailable)
- Photos

## Conflicts between sources
- Appointment date: call (event 009) says next day (09/08), system and emails say 08/08/2026 10:30. Provider confirms the visit happened, so it is moot.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At quote approval stage: the landlord has the quote (event 017) and has not replied. Outstanding: landlord decision, readable quote/photos from provider, the work itself.

**2. What is the next action, who is it for, and through which channel?**

Ask Riverside Works for the quote and photos in readable form (email, done); update the tenant (email, done); wait for landlord with review 2026-08-13, then chase by SMS/phone.

**3. Does anything need a human decision, and why?**

No. The landlord's approval is the decision needed and it is routine; no escalation yet. Escalate P2 if the landlord stays silent after a second-channel chase, since a toilet out of use is urgent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `resume_auto` | {"ticket_ref":"R-4815"} | 1 | ❌ failed | Ticket R-4815 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"R-48… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-002-quote-approval"} | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after resume_auto |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord at event 017 awaiting approval; als… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
- A1: resume_auto used a wrong ticket ref; looked up the real ref NBL-002-quote-approval and retried successfully (A4).
