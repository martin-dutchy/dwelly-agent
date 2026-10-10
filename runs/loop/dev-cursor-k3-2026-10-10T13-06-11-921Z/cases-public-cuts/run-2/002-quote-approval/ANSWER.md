# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and says the toilet needs replacing; the quote already went to the landlord. I asked the provider for a readable copy, updated the tenant, and put the job on hold with a 13 Aug review. No human decision is needed yet.

## Where the case stands
Visit done; provider quoted a new toilet and cistern. Quote sent to landlord (event 017) and awaiting approval. Job on hold until 2026-08-13. We have not seen the quote amount.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord decision on the quote, review 13 Aug; chase on a second channel if no reply | Quinn, landlord | internal | A4 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to resend quote as PDF or text with total, VAT and completion time | Riverside Works, contractor | email | A1 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant on the quote and next steps, no date promised, next update by 14 Aug | Noah Turner, tenant | email | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Thanks for attending. The quote and photos did not come through on our side. Please resend the quote as a PDF or in plain text, with the total, whether VAT is included, and what it covers.
> - What is the estimated completion time once approved?
> - Can the toilet be used in the meantime, or is it out of use?
> 
> Why: We have not seen the quote amount, so we cannot record it or confirm it matches what the landlord is deciding on.

**A2 · send_message → Noah Turner (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Noah, thank you for your patience. Riverside Works have visited and say the toilet can't be cleared safely without replacing it (the old fixings are rusted). They have sent a quote, which we've passed to your landlord for a decision. Once we have an answer we'll arrange the work with you; we can't give a date until then. We'll update you by 14 August at the latest. If you have no other working toilet or things get worse, please reply and let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved and the quote is not recorded
- No contractor work is authorised yet
- Tenant told nothing about timing or cost

## Remaining work
- Landlord decision on the quote (owner: landlord, chased by agency 13 Aug)
- Record quote once amount is received
- Book works and then collect result, invoice and close

## Missing or unavailable information
- Quote amount, VAT and scope (attachments unavailable)
- Photos and report
- Whether tenant has another working toilet

## Conflicts between sources
- Visit date: call (event 009) says next day, 09/08; system events say 08/08. Provider attended per event 016, so it was not pursued.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit done, quote sent to landlord at event 017 and awaiting approval. Outstanding: landlord decision, readable quote, then booking works, invoice and closure.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord (hold to 13 Aug, then chase by SMS or phone). Provider asked by email to resend the quote. Tenant updated by email.

**3. Does anything need a human decision, and why?**

No. The landlord's approval is routine and being awaited. Escalate P2 if the landlord stays silent after the second-channel chase and the tenant has no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Noah,… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Quote sent to landlord (event 017) for approval to replace toilet and cist… | 1 | ❌ failed | Ticket R-4815 not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord (event 017) for approval to replace… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-002-quote-approval","note":"Date conflict: call (event 009) says visit next day (09/08); system/emails say 08/08 \"tomorrow\"… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
- A3: First hold used wrong ticket ref R-4815; retried with NBL-002-quote-approval as A4, verified.
