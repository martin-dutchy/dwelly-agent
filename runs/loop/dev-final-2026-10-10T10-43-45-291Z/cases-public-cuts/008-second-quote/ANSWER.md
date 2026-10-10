# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied to the first estimate (£1,370, Alder Compliance) asking for one more quote for comparison. I recorded the quote, replied to the landlord and put the job on hold. Maintenance has been asked to pick a second contractor, because none is on file.

## Where the case stands
Ticket NBL-008-3466 on hold (review 2025-04-10). Alder Compliance quote £1,370 recorded; the landlord has asked for a second comparison quote. Nothing approved or booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Replied to landlord: second quote will be sought, first quote differs from the original scope, nothing approved | Langley, landlord | email | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | Maintenance to nominate a second contractor, because none is on file and I can't contact one | internal maintenance | internal | A4 ✅ |
| 3 | WAIT | Hold until second quote; review 2025-04-10 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Langley (landlord) via email, existing thread (event 009 email)** (verified)

> Hi Langley, thanks for your reply. Yes, we'll ask one other contractor to quote so you can compare. Nothing has been approved or booked on the first estimate (£1,370, no VAT shown). Please note it leaves the bedroom carpet as is and replaces the bathroom tap, so it differs from the original request. We'll ask the second contractor to price the full original list, and send you both once we have them. We can't promise a date for the second quote yet.

## Escalation
- **P3 → maintenance** (verified): Landlord wants a second comparison quote; no alternative contractor or contact on file for this property
  - Known: Ticket NBL-008-3466. Alder Compliance quoted £1,370 (no VAT shown) on 3 Apr; it leaves the carpet and replaces the tap, so differs from the request. Landlord email 6 Apr asked for one other subcontractor to quote. Nothing approved. Check-out report attached (the date in it, 5 Jan 2026, conflicts with the signature date 3 Apr 2025; it also says the carpet burn is pre-existing, which matters for who pays).
  - Missing: Second contractor choice and contact; property record has no landlord spend limit or contractors; VAT status of the first quote.
  - Options: Send the original scope to another approved contractor; Ask Alder to clarify the VAT and the carpet scope
  - Recommendation: Pick a second contractor, send the full original scope with the inspection report, and ask both quotes to state VAT.

## What this does not establish
- Recording the quote does not approve it or commit spend
- Telling the landlord we will seek a second quote does not mean one has been requested from a named contractor
- Nothing here decides who pays (landlord or tenant deposit)

## Remaining work
- Maintenance: choose a second contractor and send the full original scope
- Send both quotes to the landlord for a decision
- Clarify VAT and the carpet/tap scope with Alder
- Resolve who pays given the pre-existing carpet burn noted in the report

## Missing or unavailable information
- No second contractor on file
- No landlord spend limit on the property record
- VAT status of the quote

## Conflicts between sources
- The inspection report is dated 5 January 2026, but it was signed on 3 April 2025 and the case is April 2025; I treated the date as a typo.
- The quote leaves the carpet and replaces the tap, against the request to replace the carpet and repair the tap.
- The report calls the carpet burn pre-existing, but the request says it is burnt.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The first quote is recorded and sent to the landlord, who wants a second quote for comparison. Outstanding: the second quote, then the landlord's decision. Nothing is approved.

**2. What is the next action, who is it for, and through which channel?**

Email reply to the landlord (done, on the existing thread). Internal handoff to maintenance to source a second contractor.

**3. Does anything need a human decision, and why?**

Only a low-priority one: choosing the second contractor, since none is on file. The approval and spend decision stays with the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","body":"Hi Langley, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Landlord asked for a second comparison quote (event 009). No second … | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Landlord wants a second comparison quote; no alternative contractor or contact on file for t… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
