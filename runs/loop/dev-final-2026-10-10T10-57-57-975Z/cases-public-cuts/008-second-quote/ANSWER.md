# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The Alder Compliance estimate of £1,370 was sent to the landlord, who asked for one other contractor to quote for comparison. I recorded the quote, replied to the landlord, held the job with a review date, and asked maintenance to source the second contractor since none is on file.

## Where the case stands
Stage mp_time, on hold (review 2025-04-10). Alder Compliance quote £1,370 recorded and sent to landlord; landlord asked for a second comparison quote. No second contractor identified yet; nothing approved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Replied to landlord: second quote will be sought, nothing proceeds without their decision, and the scope differences were flagged | Langley, landlord | email | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | Asked maintenance to pick and instruct a second contractor, as none is on file | internal maintenance | internal | A4 ✅ |
| 3 | WAIT | Hold until second quote arrives; review 10 Apr | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Langley (landlord) via email, existing thread (event 009 email)** (verified)

> Hi Langley, thanks for your reply. Yes, we'll ask one other contractor to quote for comparison and will send it to you as soon as we have it. Nothing will go ahead until you've decided. For reference, the first estimate (Alder Compliance, £1,370, no VAT shown) leaves the bedroom carpet in place and includes replacing the bathroom tap, which differ from the original request, so we'll ask the second contractor to quote against the full original list.

## Escalation
- **P3 → maintenance** (verified): Landlord wants a second comparison quote; no alternative contractor on file for the property
  - Known: Job NBL-008-3466. Alder Compliance estimate £1,370, no VAT itemised, sent to landlord 6 Apr. Landlord replied 6 Apr asking to try one other subcontractor. Estimate leaves bedroom carpet in place and replaces tap, unlike the original request. Inspection report dates conflict (inspection 5 Jan 2026 vs signed 3 Apr 2025).
  - Missing: Which alternative contractor to use; property record has no contractor list or spend limit; confirmation of VAT on first quote; inspection date discrepancy.
  - Options: Instruct a second contractor for a full-scope quote; Ask Alder to clarify VAT and scope
  - Recommendation: Choose a second contractor, send the original scope and inspection report, and forward both quotes to the landlord.

## What this does not establish
- Recording the quote does not approve it or commit spend
- The reply does not promise a date or price for the second quote
- No second contractor has been instructed yet

## Remaining work
- Maintenance to choose and instruct second contractor with full original scope (ESC-103)
- Forward both quotes to landlord for decision
- Clarify VAT on Alder quote
- Resolve inspection report date discrepancy

## Missing or unavailable information
- Alternative contractor not on file
- Property record has no spend limit or landlord preferences
- VAT status of first quote

## Conflicts between sources
- Estimate leaves the bedroom carpet in place and replaces the tap, contrary to the original request
- Inspection report says 5 January 2026 but was signed 3 April 2025
- Event 009 landlord email says 'Morning' but arrived at 19:37
- Event 006 attached the inspection report instead of the estimate; the estimate is attachment-02

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The first estimate (£1,370, no VAT shown) is with the landlord, who wants a second comparison quote. Outstanding: second contractor quote, then the landlord's decision, then assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Done: email reply to the landlord (existing thread) saying a second quote will be sought. Next: maintenance to instruct a second contractor (ESC-103).

**3. Does anything need a human decision, and why?**

Only a low-priority (P3) choice of which second contractor to instruct, because none is on file. The spend approval stays with the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"NBL-00… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Landlord asked for a second contractor quote for comparison; no seco… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Landlord wants a second comparison quote; no alternative contractor on file for the property… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
