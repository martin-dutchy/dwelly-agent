# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote for comparison. I recorded the first estimate (£1,370), told the landlord it is unapproved and asked for a preferred contractor, then put the job on hold until 9 April.

## Where the case stands
Stage mp_time; first quote (Alder Compliance £1,370) recorded, not approved. Landlord asked for a second quote. Ticket on hold awaiting the landlord's preferred contractor, review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Agreed to a second quote; asked landlord for a preferred contractor, resent estimate details and noted the earlier email attached the wrong file | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold until 9 April for landlord reply; then send scope to a contractor if none is named | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we can get a second quote for comparison for Flat 5, 55 Lantern Quay. Do you have a preferred contractor you'd like us to ask? If not, please say so and we'll find another one on our side. Please also note our earlier email attached the inspection report rather than the estimate. For reference, the first estimate (Alder Compliance, dated 3 April 2025) is £1,370.00 in total, with no VAT itemised. It covers painting the bathroom and main room walls and ceiling, replacing the bathroom lino, and repairing the plug socket and shelf. It also covers replacing the bathroom tap. It says the main-room carpet can stay as it is, although we had asked about replacing the burnt carpet. Please treat this as not yet approved; we'll hold it while the comparison is arranged. We'll chase you on 9 April if we haven't heard.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or any spend
- No second contractor has been instructed yet
- Nothing says the landlord has seen the estimate document

## Remaining work
- Obtain second quote (landlord's contractor or ours, no other is on file)
- Landlord decision after comparing quotes
- Clarify with the first provider why the carpet is excluded and the tap is replaced, and whether VAT applies

## Missing or unavailable information
- Landlord's preferred second contractor
- VAT status of the quote
- Event 006 attachments were the inspection report, not the estimate

## Conflicts between sources
- Event 006 says an estimate was attached, but the files were inspection reports.
- Inspection report dates (Jan 2026) postdate the case dates; the estimate omits the carpet replacement requested and includes a tap replacement.
- The estimate was issued 3 April, but the history shows no provider email delivering it.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Quote loop: the first quote is in and the landlord wants a second for comparison. The second quote and the landlord's decision are outstanding.

**2. What is the next action, for whom, via which channel?**

Email to the landlord asking for a preferred contractor (sent). Chase on 9 April, then send the scope to a contractor if none is named.

**3. Does anything need a human decision?**

No. This is routine; the landlord makes the spend decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord asked for a second quote; awaiting whether they have a pref… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
