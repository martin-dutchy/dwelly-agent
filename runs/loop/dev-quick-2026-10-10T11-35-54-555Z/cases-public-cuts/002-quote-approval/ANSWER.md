# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Riverside Works attended and found the toilet needs replacing; their quote was sent to the landlord at 06:17 UTC today for approval, but its amount and photos are not readable in the case. I recorded the visit as needs_quote, asked the provider to resend the quote and photos, updated the tenant by SMS, and put the job on hold for the landlord until 2026-08-13.

## Where the case stands
Visit attended by Riverside Works (provider email, event 016, 2026-08-12). Engineer found the toilet needs replacing (repipe and rusted screws risk damage on removal). Quote for new toilet and cistern sent to landlord Quinn at 06:17 UTC today (event 017) asking for approval to raise the order. Waiting on landlord decision. Ticket is on hold until 2026-08-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Asked Riverside Works to resend the quote with a readable total (VAT status and itemised scope), the visit photos, and to confirm the visit date (08/08 vs 09/08). | Riverside Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant Noah Turner the toilet needs replacing, the quote is with the landlord for approval, and we will update him. No date promised. | Noah Turner, tenant | sms | A3 ✅ |
| 3 | WAIT | Hold the job for the landlord's decision on the quote; review 2026-08-13. If no reply by then, chase Quinn by phone or SMS (second channel). | Quinn, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 008 email; event 016 email from provider)** (verified)

> - Please resend the quote for the new toilet and cistern as a PDF or plain-text reply, showing the total amount, whether VAT is included or added, and the itemised scope. The quote we have on file shows no readable amount.
> - Please resend the visit photos (they did not come through to us).
> - Please confirm the date of the visit you attended at Flat 3, 15 Willowmere Road, as our records show both 08/08/2026 and 09/08/2026.
> 
> Why: We have sent the quote to the landlord for approval but cannot see its contents or amount in the case file, and the photos and report did not attach. The visit date also differs across our records.

**A3 · send_message → Noah Turner (tenant) via sms, 07700 900422** (verified)

> Hello from Northbridge Lettings. Riverside Works has attended about your blocked toilet. They found the toilet needs replacing, as the old one is hard to remove safely. We have sent their quote to your landlord for approval. We will let you know as soon as we hear back. Nothing else is needed from you for now.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The visit outcome is recorded from the provider's email; it does not confirm the quote amount, which we have not seen.
- Sending the quote to the landlord does not mean they approved it; no approve_quote or assignment has been made.
- Landlord approval on the ticket ('confirmed') covers only the original provider instruction (event 002), not this replacement spend.
- Nothing establishes who pays for the replacement toilet beyond the landlord's approval still pending.

## Remaining work
- Landlord (Quinn) to approve or decline the replacement quote; review 2026-08-13, chase by phone/SMS if silent.
- Riverside Works to resend the readable quote, photos and confirm the visit date (REQ-101).
- Once approved: instruct Riverside Works with the approved amount, book a visit, then invoice and final checks.

## Missing or unavailable information
- Quote total and VAT status (attachment-65 unavailable).
- Visit photos and report (attachments unavailable).
- Confirmed visit date: 08/08/2026 (events 010-013) vs 09/08/2026 (event 009); the provider attended a scheduled appointment, but the date is not confirmed.
- Landlord decision on the quote.

## Conflicts between sources
- Visit date: event 009 says 09/08/2026 'after 10:30'; events 010-013 say 08/08/2026 10:30. Not resolved; asked provider to confirm.
- Landlord 'confirmed' approval on the ticket relates to the original provider instruction (event 002/003), not to the replacement quote.
- Event 017 lists attachments as unavailable; the quote may not have reached the landlord with its contents.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit attended; quote for replacement sent to landlord, awaiting approval. Outstanding: landlord decision, readable quote and photos from provider, confirmed visit date.

**2. What is the next action, who is it for, and through which channel?**

Provider (Riverside Works) by email for resent quote, photos and visit date (A2). Tenant Noah Turner by SMS with status (A3). Landlord Quinn is waiting; review 2026-08-13, chase by phone/SMS if no reply.

**3. Does anything need a human decision, and why?**

Not yet. The spend decision belongs to the landlord, who has been asked and has not had 3 days to respond. No escalation is needed now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email to agency (event 016, 2026-08-12 04:45 UTC)… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 008 email; event 016 e… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"sms","contact":"07700 900422","body":"Hello from Northbridge Lettings. … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Waiting for Quinn (landlord) to approve or decline the Riv… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
_None._
