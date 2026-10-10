# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for one other contractor to quote for comparison. I recorded the first estimate, replied to the landlord with the correct attachment and a question about a preferred contractor, and held the job with a review on 2025-04-09.

## Where the case stands
Provider estimate (Alder Compliance £1,370, recorded as Q-101) sent to landlord; landlord asked for a second quote. Job on hold waiting for landlord's preferred contractor, review 2025-04-09. No approval or spend.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Confirm a second quote is fine, ask for a preferred contractor otherwise we approach another, resend the correct estimate attachment | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold job until 2025-04-09 for landlord's reply, then approach another contractor if none named | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, thanks for your reply on Flat 5, 55 Lantern Quay. Yes, we can get a second quote for comparison. Do you have a preferred contractor you would like us to ask? If not, please tell us and we will approach another contractor ourselves. Nothing will go ahead until you approve a quote. Also, the email we sent earlier had the wrong attachment, so I have attached the first estimate (Alder Compliance, £1,370.00, no VAT itemised). It covers bathroom and main-room repainting, bathroom lino, plug socket, shelf and tap, and says the main-room carpet can stay, whereas the original request was to replace the burnt carpet. We will hold the first estimate while we wait for the second and will check in with you again on 2025-04-09.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or any spend
- Asking for a second quote does not mean a second contractor has been instructed
- No visit booked

## Remaining work
- Obtain second quote (landlord's contractor or one we choose) after 2025-04-09 review
- Send both quotes to landlord for decision
- Clarify scope differences: carpet replacement and tap replacement

## Missing or unavailable information
- Landlord's preferred second contractor
- VAT status of the estimate
- The attachment-04 invoice mentioned in hints is not in the history

## Conflicts between sources
- Event 006 attached the inspection report rather than the estimate
- Estimate scope (carpet stays, tap replaced) differs from the request
- Inspection report is dated Jan 2026 but signed April 2025

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The first estimate of £1,370 has gone to the landlord, who wants a second quote. The job is on hold. Outstanding: a second quote, then a landlord decision.

**2. What is the next action, who for, which channel?**

Email to the landlord asking for a preferred contractor (done, A2). Then wait until the 2025-04-09 review and approach another contractor if none is named.

**3. Does anything need a human decision?**

No. Asking for a second quote is routine. The landlord decides on the spend.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord asked for a second quote for comparison; first estimate (Al… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-008-3466","note":"Event 006 attached the inspection report twice instead of the estimate; correct estimate resent. Inspection… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
