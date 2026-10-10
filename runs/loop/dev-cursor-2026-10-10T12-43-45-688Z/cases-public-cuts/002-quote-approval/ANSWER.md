# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

The engineer attended and found the toilet needs replacing. The quote had already gone to the landlord. I asked the provider to resend the quote readably, updated the tenant, put the job on hold with a review date of 14 Aug, and scheduled a chase follow-up.

## Where the case stands
Visit done; provider reports toilet and cistern need replacing and has sent a quote. Quote sent to landlord (event 017) and awaiting approval. Ticket on hold until 2026-08-14. Quote amount not seen.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord decision on the quote; chase on a second channel on 14 Aug if silent | Landlord (Quinn) | internal | A5 ✅ |
| 2 | REQUEST_INFORMATION | Ask Riverside Works to resend the quote as PDF or plain-text total, VAT and scope | Riverside Works, contractor | email | A1 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: quote with landlord, next update by 14 Aug | Noah Turner, tenant | email | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - The quote and photos did not come through on our side. Please resend the quote as a PDF, or reply in plain text with the total, whether VAT is included, and what it covers (new toilet and cistern, repiping, labour).
> - Please confirm the estimated completion time and that you will not start until we confirm landlord approval.
> 
> Why: Attachments unavailable; we cannot record the quote amount or confirm the scope the landlord is deciding on.

**A2 · send_message → Noah Turner (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Noah, thank you for letting the engineer in. Riverside Works found the toilet needs replacing, as removing it risks damage. They have sent a quote, which we have passed to your landlord for a decision. Once the landlord replies we will arrange the work. We will update you by Friday 14 August at the latest. If the toilet becomes unusable or leaks, tell us straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or authorises the replacement work
- Quote amount, VAT and scope not seen or recorded
- No new visit booked

## Remaining work
- Landlord decision on the quote (owner: landlord; chase 14 Aug)
- Record the quote once the provider resends it
- Record the landlord decision, then instruct Riverside Works and book the visit
- Record the work result, invoice and close

## Missing or unavailable information
- Quote amount, VAT and scope (attachments unavailable)
- Landlord spend limit not on property record
- Landlord reply

## Conflicts between sources
- Visit date recorded as 08/08 (events 010-013) vs next day 09/08 (event 009); the provider says the visit happened, so no rebooking.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit has happened and the provider quoted a new toilet and cistern. The landlord has been asked to approve and has not replied. The quote content is unseen, and the work is not yet approved.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's reply, with a chase on a second channel on 14 Aug. A request has gone to Riverside Works by email for the readable quote, and the tenant was updated by email.

**3. Does anything need a human decision, and why?**

No. The decision on the quote belongs to the landlord, not to the agency's staff. Escalate only if the landlord stays silent after the second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"Case… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"Case 002","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017; awaiting approval. Also awaiting quote… | 1 | ❌ failed | Ticket Case 002 not found on read-back |
| A4 | `schedule_follow_up` | {"ticket_ref":"Case 002","due_on":"2026-08-14","party":"Landlord","purpose":"Chase landlord on second channel (SMS/phone) if no reply on quo… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017; awaiting approval. Also … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A6 | `add_note` | {"entity":"NBL-002-quote-approval","note":"Provider email event 016 read; quote/photos attachments unavailable so amount not recorded. Landl… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
- A3: First hold attempt used a wrong ticket ref; retried with NBL-002-quote-approval and it verified as A5.
