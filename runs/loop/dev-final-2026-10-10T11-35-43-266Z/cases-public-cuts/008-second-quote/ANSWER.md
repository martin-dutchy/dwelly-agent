# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a comparison quote. I recorded the first quote, asked the landlord who they'd like us to approach (none on file), and put the job on hold with a review date of 9 April.

## Where the case stands
Quote loop. Alder Compliance quote £1,370 recorded and sent to landlord. Landlord asked for a second quote. No other contractor on file. Ticket on hold waiting for landlord until 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord for a preferred second contractor's details; first quote stays on hold | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold for landlord reply, review 2025-04-09 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, existing thread (event 009 email)** (verified)

> Hello, thanks for your reply. Yes, we can get a second quote for comparison for Flat 5, 55 Lantern Quay. We don't have another contractor on file for this property. Do you have a subcontractor you'd like us to ask? If so, please send their name and contact details and we'll send them the scope. If not, let us know and we'll look at other options. The first estimate (£1,370, no VAT itemised) stays on hold and nothing will be booked until you decide. Regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved and no work is booked
- Recording the quote does not approve it
- The scope in the quote differs from the request: the carpet is not replaced and the tap is replaced rather than repaired

## Remaining work
- Landlord to name a second contractor, or agency to find one
- Send the scope to that contractor and collect the second quote
- Landlord decision on the quotes

## Missing or unavailable information
- Second contractor details
- Whether the £1,370 includes VAT
- The invoice attachment (attachment-04) was not provided in the case text

## Conflicts between sources
- Quote scope says the carpet can stay and the tap is replaced, which differs from the request
- The inspection report is dated 5 Jan 2026 but signed 3 April 2025, which is after the case date; treated as a data quirk
- Event 009 says 'Morning' but was sent in the evening; not material

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The Alder Compliance quote of £1,370 is with the landlord, who wants a second quote. The second contractor and the landlord's decision are outstanding.

**2. What is the next action, for whom, and through which channel?**

Email to the landlord asking for a preferred second contractor (sent). The job is on hold until 2025-04-09.

**3. Does anything need a human decision?**

No. Escalate only if the landlord stays silent after the review date and a chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord asked for a second quote; waiting for their preferred contr… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
