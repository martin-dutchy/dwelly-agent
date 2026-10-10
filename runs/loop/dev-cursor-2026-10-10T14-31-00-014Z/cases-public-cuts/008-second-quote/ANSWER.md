# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a comparison quote. No other contractor is named, so I moved the job to double_quotation and asked operations to source one by 10 April. I told the landlord, resent the correct estimate (event 006 had attached the inspection report twice) and put the job on hold.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First estimate (Alder Compliance, £1,370, no VAT itemised) with landlord, undecided. Second quote being sourced by operations.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Source a second contractor quote for the same scope, due 10 April | Operations team / Maya Langley, internal | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Confirm second quote is being obtained, report back by 10 April, and resend the correct estimate | Langley, landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 10 April for the second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Operations team / Maya Langley (internal) via email, internal operations team** (verified)

> Job NBL-008-3466, Flat 5, 55 Lantern Quay. Landlord wants a comparison quote from one other contractor. Please source one and ask for an itemised quote per item: 1) repaint bedroom (and other rooms if needed); 2) replace burnt bedroom carpet; 3) replace bathroom flooring; 4) repair broken plug; 5) repair dripping bath tap; 6) repair damaged bathroom shelf. Also price bathroom boxing repaint/repair for water damage as noted in the report. Attachment: attachments/attachment-01-check-out-inspection-report.pdf. For comparison, the first estimate is attachments/attachment-02-estimate.pdf (Alder Compliance). Please get the quote back by 2025-04-10. First estimate stays on hold meanwhile.

**A3 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, yes, we're getting a second quote from another contractor for the same scope and will report back by 10 April. Sorry, our earlier email attached the check-out inspection report twice instead of the estimate. The correct estimate from Alder Compliance is attached now. Please note it covers painting, bathroom lino, plug, shelf and tap, and says the bedroom carpet can stay, which differs from our request to replace it. Nothing is approved yet, and no work will start until you tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved and no spend committed
- The estimate has not been recorded as a formal quote or checked against any limit; no limit is on file
- Does not establish which quote is better

## Remaining work
- Operations to source the second quote by 10 April
- Then send both quotes to the landlord for a decision
- Clarify scope differences (carpet, tap) with the first provider

## Missing or unavailable information
- No other contractor named in the case
- Landlord's spend limit not on file
- Whether the 'provider assigned' (Alder Compliance) is confirmed as the issuer of the estimate

## Conflicts between sources
- Event 006 said the estimate was attached but attached the inspection report twice
- Estimate says the carpet can stay and the tap is replaced, against the request to replace the carpet and repair the tap
- Inspection report dated 5 Jan 2026 but signed 3 April 2025; it says the carpet burn was pre-existing

## Answers to the case questions
**1. Where does this case stand?**

Estimate received and sent to the landlord, who wants a second quote. Job is in double_quotation on hold to 10 April.

**2. Next action?**

Operations (internal email) source the second quote; landlord emailed with the update and the correct estimate.

**3. Human decision needed?**

No. This is routine; the landlord decides on approval once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, 06/04) asked for one other subcontractor to quote for comparis… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Operations team / Maya Langley","recipient_role":"internal","channel":"email","contact":"internal operations team","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second comparison quote (sourced by operations); first e… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
