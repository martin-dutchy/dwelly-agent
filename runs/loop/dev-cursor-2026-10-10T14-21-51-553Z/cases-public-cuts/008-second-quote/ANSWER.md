# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second quote. No other contractor is named, so the job moved to double_quotation and operations were asked to source one. The landlord was told, and was sent the correct estimate because the earlier email attached the inspection report by mistake. The job is on hold to 10 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. Landlord has Alder Compliance's £1,370 estimate (re-sent correctly) and has asked for a second quote; operations asked to source it. No approval, no work booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved ticket to double_quotation and sent scope to operations to source a second contractor, reply by 10 April | Operations team, internal | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord second quote is being obtained, report by 10 April, and sent the correct estimate | Langley, landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 2025-04-10 for second quote | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Operations team / Maya Langley (internal) via email, internal operations** (verified)

> Landlord has asked for a second quote for comparison on NBL-008-3466, Flat 5, 55 Lantern Quay. Please source one other contractor (not Alder Compliance) and ask for an itemised quote per item, stating whether VAT is included: 1) repaint bedroom (and other rooms if needed); 2) replace burnt bedroom carpet; 3) replace bathroom flooring; 4) repair broken plug; 5) repair dripping bath tap; 6) repair damaged bathroom shelf. Attach attachments/attachment-01-check-out-inspection-report.pdf. Note the report also records bathroom boxing water damage and bedroom ceiling water ingress; ask them to comment. Note the report dates read 5 Jan 2026 but signature is 3 Apr 2025 - please check. Reply by 2025-04-10.

**A3 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, yes, we're getting a second quote from another contractor for the same scope, and will report back by 10 April. Sorry, our earlier email attached the check-out report instead of the estimate. The correct estimate is attached: Alder Compliance, £1,370.00 in total (no VAT shown). Please note it leaves the bedroom carpet in place and replaces the bathroom tap, which differs from what we asked for. Nothing is approved yet, so no work will start until you tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; no spend committed.
- Recording the quote does not mean it is acceptable: it omits the carpet and includes a tap replacement, and shows no VAT.
- Second quote not yet obtained.

## Remaining work
- Operations to source second quote by 10 April
- Then send both to landlord for decision
- Check provider assignment status (no provider reply seen)

## Missing or unavailable information
- Second contractor's quote
- Whether the Alder estimate includes VAT
- Landlord's decision

## Conflicts between sources
- Event 006 attached the inspection report rather than the estimate; corrected by re-sending attachment-02.
- Inspection report dated 5 Jan 2026 but signed 3 Apr 2025.
- Estimate keeps the carpet and replaces the tap, differing from the request and the inspection report.
- History shows provider assigned but no provider reply; the estimate came from Alder Compliance.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A single estimate (Alder Compliance, £1,370) is with the landlord, who wants a comparison quote. The second quote and the landlord's decision are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Operations (internal email) source the second quote by 10 April. The landlord was emailed that this is under way, with the correct estimate attached.

**3. Does anything need a human decision, and why?**

No escalation. Only the landlord's later choice between quotes is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. Fir… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Operations team / Maya Langley","recipient_role":"internal","channel":"email","contact":"internal operations","ticket_ref… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second quote being sourced by operations for landlord comparison; fi… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
