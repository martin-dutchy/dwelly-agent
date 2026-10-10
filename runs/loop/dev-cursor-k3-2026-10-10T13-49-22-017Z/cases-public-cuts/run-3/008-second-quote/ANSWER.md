# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one more quote for comparison. With no other contractor named, I moved the job to double_quotation, told the landlord, flagged the estimate's scope gaps, and held to 10 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First estimate (Alder Compliance £1,370) recorded, not approved. Landlord asked for a second comparison quote. Second provider still to be sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Email landlord that a second quote is being obtained, flag estimate scope gaps | Langley, landlord | email | A2 ✅ |
| 2 | WAIT | Hold for second quote, review 2025-04-10 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, yes, we're getting a second quote from another contractor for the same scope, for comparison only. Nothing is approved or instructed yet. Two things on the first estimate (Alder Compliance, £1,370, no VAT shown): it says the bedroom carpet can stay, though we asked for replacement, and it includes a new bathroom tap rather than a repair. Our last email attached the inspection report twice rather than the estimate, so we'll resend the estimate. We'll update you once the second quote is in, and will check in with you by Thursday 10 April at the latest. Regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing approved or instructed; second quote not yet requested from a named firm.
- Moving to double_quotation does not decide which quote is used or who pays.

## Remaining work
- Source second contractor and send same scope plus inspection report for quote only (agency ops).
- Resend estimate to landlord.
- Review 2025-04-10.

## Missing or unavailable information
- No second contractor named in case.
- Estimate attachment not seen by landlord per event 006; no VAT shown; scope differs from request (carpet, tap).

## Conflicts between sources
- Estimate says carpet can stay and includes tap replacement; request asked for carpet replacement and tap repair.
- Inspection report dated 5 Jan 2026, after the 2025 case dates; carpet burn described as pre-existing.

## Answers to the case questions
**1. Where does this case stand?**

Estimate from Alder Compliance (£1,370) received; landlord wants a second comparison quote. Job now in double_quotation, on hold to 2025-04-10. Outstanding: second quote, landlord decision.

**2. Next action?**

Landlord emailed (MSG-101) that a second quote is being obtained; stage moved and hold set.

**3. Human decision needed?**

No. Routine second-quote handling.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second quote (same scope) from a new contractor; first e… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
