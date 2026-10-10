# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for another subcontractor to quote for comparison. With no other contractor named, I moved the job to double_quotation, sent the scope to operations to source an itemised quote by 10 April, updated the landlord, and put the job on hold to 10 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First estimate (Alder Compliance, £1,370, single line, carpet excluded) is with landlord; landlord asked for a second quote. Operations asked to source provider. No landlord approval; no work.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Move ticket to double_quotation and send scope to operations to source a second itemised quote, reply by 2025-04-10 | Operations team, internal | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell landlord a second quote is being obtained, report back by 10 April, nothing starts without approval | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until second quote arrives, review 2025-04-10 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Operations team / agency manager (internal) via email, internal operations** (verified)

> NBL-008-3466, Flat 5, 55 Lantern Quay: the landlord wants a second quote for comparison. Please source one other contractor (not Alder Compliance) for a quote only. Scope: (1) repaint bedroom and other rooms if needed; (2) replace burnt bedroom carpet; (3) replace bathroom flooring; (4) repair broken plug; (5) repair dripping bath tap; (6) repair damaged bathroom shelf. Please ask for an itemised price per item, with VAT stated. Attachments: attachment-01-check-out-inspection-report.pdf (also attachment-03 copy). Please reply by 2025-04-10 with the quote. Note: the first estimate was a single £1,370 line and excluded the carpet, so itemised pricing matters.

**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, thanks for your reply. We're getting a second quote from another contractor for the same works, itemised, and will hold the first estimate until then. We aim to come back to you by 10 April with both for comparison. No work will start until you've approved. If you already have a contractor you'd prefer us to ask, let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not approve either estimate or any spend
- Does not establish that the first estimate's scope is correct or complete
- No contractor assigned and no visit booked

## Remaining work
- Operations to source second provider and quote by 10 April
- Then send both quotes to landlord for decision
- Clarify first estimate: carpet excluded, tap replaced rather than repaired, no VAT stated

## Missing or unavailable information
- Second contractor identity
- Readable confirmation of first estimate (attachment-02 read from file; the history only shows the landlord email attachments as the inspection report)

## Conflicts between sources
- Inspection report dated 5 January 2026 but case is April 2025 and signed 3 April 2025; estimate says tap replaced although tap only dripping; estimate excludes carpet that was requested; report says carpet burn pre-existing vs request says burnt carpet.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate (Alder Compliance, £1,370) went to the landlord, who asked for a second quote. Outstanding: second itemised quote, then landlord decision. No work approved.

**2. What is the next action, who is it for, and through which channel?**

Operations (internal email) source a second contractor for a quote by 10 April; landlord told by email; hold review 2025-04-10.

**3. Does anything need a human decision, and why?**

No escalation. Routine sourcing is done by operations; the landlord's later choice between quotes is theirs.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email 6 Apr) asked for one other subcontractor to quote for co… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Operations team / agency manager","recipient_role":"internal","channel":"email","contact":"internal operations","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-008-3466","note":"Second quote requested by landlord; stage double_quotation; scope sent to internal to source provider, repl… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second itemised quote sourced by operations for landlord… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
