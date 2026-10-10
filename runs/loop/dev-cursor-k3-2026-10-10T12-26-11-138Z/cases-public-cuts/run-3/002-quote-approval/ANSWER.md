# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and reported the toilet needs replacing; the quote has gone to the landlord, whose decision is pending. I told the tenant, asked the provider to resend the quote readably, set a follow-up for 13 Aug and returned the job to auto mode.

## Where the case stands
Stage: visit done, quote sent to landlord (event 017) awaiting approval. Provider visited and says toilet needs replacing. Quote amount unseen (attachments unavailable). No work started.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord decision on the quote; follow-up 13 Aug to chase on a second channel if silent | Quinn, landlord | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to resend quote as PDF or plain-text figure plus photos | Riverside Works, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: quote with landlord, no date confirmed, next update by 13 Aug | Noah Turner, tenant | email | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Noah Turner (tenant) via email, tenant email on file (thread of event 007)** (verified)

> Dear Noah, thank you for your patience. Riverside Works have visited about the blocked toilet and say it needs to be removed, with a new toilet and cistern fitted. They have sent a quote, which we have passed to your landlord for approval. Until we have their answer we can't confirm a date for the work. We will update you by 13 August at the latest. If the toilet is your only one and this is causing you real difficulty, please let us know.

**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Please resend the quote as a PDF, or state the total, whether it includes VAT, and the scope in plain text, as the attachments did not open for us.
> - Please send the visit photos again and an estimated completion time.
> 
> Why: We have not been able to open the quote attachments and need the figure before the landlord decides.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or any spend
- No repair date is booked
- Quote contents are unseen and unverified

## Remaining work
- Landlord to approve or decline quote (owner: landlord; agency chases 13 Aug)
- Record the quote once the amount is seen
- After approval: approve quote, book work, invoice, close

## Missing or unavailable information
- Quote amount, VAT and scope (attachments unavailable)
- Whether this is the tenant's only toilet

## Conflicts between sources
- Appointment date: event 009 says next day (9 Aug), events 010-013 say 8 Aug; provider confirms attending, so not material.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Visit done; quote sent to landlord 12 Aug, awaiting approval. Outstanding: landlord decision, quote figure unseen, then the work.

**2. What is the next action, who for, which channel?**

Wait for the landlord with a chase on 13 Aug on a second channel; tenant updated by email; provider asked by email to resend the quote.

**3. Does anything need a human decision?**

No. The landlord decides on the quote; no escalation needed yet. Escalate P2 if the landlord is silent after the second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (thread of event 007)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `schedule_follow_up` | {"ticket_ref":"002-quote-approval","due_on":"2026-08-13","party":"Landlord (Quinn)","purpose":"Chase landlord approval of Riverside Works qu… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"002-quote-approval"} | 1 | ❌ failed | Ticket 002-quote-approval not found on read-back |
| A5 | `resume_auto` | {"ticket_ref":"NBL-002-quote-approval"} | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after resume_auto |

## Failed or unverified actions
- A4: Used the wrong ticket ref; retried with NBL-002-quote-approval and it verified (A5).
