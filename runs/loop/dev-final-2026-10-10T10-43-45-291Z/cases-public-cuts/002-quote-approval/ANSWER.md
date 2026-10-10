# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Contractor attended and found the toilet needs replacing; quote was sent to the landlord for approval. I recorded the result, put the job on hold with a review date, updated the tenant, asked the contractor for the quote figures and set a chase. No human decision is needed yet.

## Where the case stands
Stage: result (needs_quote). Visit done 8 Aug; Riverside Works quoted a new toilet and cistern. Quote sent to landlord for approval (event 017); on hold waiting for landlord, review 14 Aug. Quote amount unreadable to us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord approval of the quote; chase on 14 Aug | Quinn, landlord | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Updated tenant that quote is with landlord and asked to flag if the toilet is unusable | Noah Turner, tenant | email | A3 ✅ |
| 3 | REQUEST_INFORMATION | Asked contractor to confirm quote amount, VAT, scope and timescale, and not to proceed before approval | Riverside Works, contractor | email | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Noah Turner (tenant) via email, existing thread (event 007 email)** (verified)

> Dear Noah, thank you for your patience. The engineer has visited and found the toilet needs replacing to clear the blockage. We have sent the quote to the landlord for approval and will update you as soon as we hear back. We will then aim to get the work booked promptly. If the toilet is your only one and it is unusable, please tell us so we can treat it as more urgent.

**A5 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Please confirm the total quote amount and whether it includes VAT
> - Please confirm the itemised scope (new toilet, cistern, repiping, labour) and estimated completion time
> 
> Why: The quote attachment is not readable on our side, so we cannot record it accurately. Please do not proceed until we confirm landlord approval.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result does not approve the quote or any spend
- Landlord's earlier approval was only to send a contractor to attend, not for replacement
- Tenant update does not promise a date

## Remaining work
- Landlord decision on quote (chase 14 Aug, FUP-102)
- Record quote once figures are confirmed
- Approve quote, book works, invoice, close

## Missing or unavailable information
- Quote amount, VAT and scope (attachments unavailable)
- Whether the tenant has another working toilet

## Conflicts between sources
- Event 009/010 say visit 'next day' but dated 08/08; the contractor email confirms attendance. Ticket stage showed 'visit' before update.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Visit done, replacement quote with landlord awaiting approval. Outstanding: landlord decision, quote figures recorded, works booking, invoice.

**2. What is the next action, for whom, via which channel?**

Wait for/chase landlord Quinn on approval (email, 14 Aug); tenant updated by email; contractor asked for quote details by email.

**3. Does anything need a human decision?**

No, not now. The landlord decides on spend. Escalate only if the landlord does not reply, or if the tenant has no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email 2026-08-12 (event 016): engineer attended; … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord (event 017) for approval to raise o… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"Dear Noah,… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-14","party":"Landlord (Quinn)","purpose":"Chase landlord approval of Riverside Work… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A5 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
_None._
