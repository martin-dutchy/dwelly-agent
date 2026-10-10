# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a comparison quote from another subcontractor before deciding on the £1,370.00 Alder Compliance estimate. I told the landlord by email (MSG-101) that we will get the comparison, asked for the subcontractor's name, and held the job until 2025-04-09 with a follow-up scheduled. Nothing has been approved, instructed or paid.

## Where the case stands
Check-out works job NBL-008-3466 at 'mp_time'/hold. Alder Compliance estimate of £1,370.00 (3 Apr 2025, no VAT itemised) was sent to landlord Langley on 6 Apr 2025 (event 006). Landlord replied (event 009) asking to try one other subcontractor for a comparison quote. Nothing approved or instructed. Waiting on landlord to name the subcontractor or agree that we source one.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Reply to landlord confirming a comparison quote will be sought, asking for the subcontractor's name, and listing the full scope for the second quote. | Langley, landlord | email | A1 ✅ |
| 2 | CHASE_LANDLORD | Hold job for landlord reply, review 2025-04-09; chase if nothing arrives, then source a second quote for the full scope. | Langley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Langley (landlord) via email, existing thread (event 009 email)** (verified)

> Hi Langley, thanks for your message about Flat 5, 55 Lantern Quay. Yes, we are happy to get a comparison quote from another subcontractor. Could you let us know the name and contact details of the subcontractor you would like us to use? If you don't have one in mind, we will source a second quote ourselves. Please note the current estimate of £1,370.00 has not been approved yet, and nothing has been instructed. For the comparison we will ask for a quote covering: repainting the bedroom and any other rooms needed, replacing the burnt bedroom carpet, replacing the bathroom flooring, repairing the broken basin plug, repairing the dripping bath tap, and repairing the damaged bathroom shelf. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the comparison request does not approve the £1,370.00 Alder estimate or any spend.
- No contractor has been assigned or instructed for the second quote.
- The estimate's scope has not been verified against the inspection report; this does not confirm the cause or who pays (tenant deposit deduction is not decided here).
- The job is on hold for the landlord, not closed.

## Remaining work
- Landlord to name a second subcontractor or agree that Northbridge sources one (owner: landlord, chase 2025-04-09).
- Obtain second quote covering the full scope, then compare with the £1,370.00 estimate and seek landlord approval.
- Clarify estimate scope: bedroom carpet omitted; bath tap replacement included though the report describes a dripping tap needing repair; main-room paint wording vs bedroom.
- Check report dates: inspection dated 5 Jan 2026 and signed 3 Apr 2025, which is after today's date of 6 Apr 2025 for the inspection; confirm the correct date with the assessor before any deposit claim.
- Confirm whether the tenant's deposit is relevant; any deduction needs a human decision.

## Missing or unavailable information
- Name of the comparison subcontractor requested by the landlord.
- Landlord's approval of any spend.
- Correct inspection date (report says 5 Jan 2026, signed 3 Apr 2025, while the case is dated 6 Apr 2025).
- Whether VAT is included in the £1,370.00 estimate.

## Conflicts between sources
- Request asked to replace the burnt bedroom carpet, but the Alder estimate says the main-room carpet can stay. Trusted the estimate only as a quote; the request and the inspection report (pre-existing burn damage, multiple stains) stand, so the carpet is unresolved.
- Estimate includes replacing the bath tap, but the inspection report and request describe a dripping tap needing repair. Trusted the request and report.
- Inspection report says appointment 5 January 2026 and signature 3 April 2025, both inconsistent with the case dates (created 3 Apr 2025, today 6 Apr 2025). Two versions of the report differ slightly in wording but list the same defects. Not resolved.
- Estimate header names Alder Compliance as supplier, but it is issued by Northbridge Lettings; event 006 shows it was sent to the landlord. Assumed Alder is the contractor quoting.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Estimate issued and sent to the landlord; landlord has asked for a second subcontractor quote. The job is waiting on the landlord to name that subcontractor or agree we source one. Outstanding: the second quote, landlord approval, and fixing estimate scope and report-date inconsistencies.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Langley on the existing thread (event 009) asking for the comparison subcontractor's name and setting out the full scope (MSG-101). Chase on 2025-04-09 (FUP-102) if no reply.

**3. Does anything need a human decision, and why?**

Not yet. Approving spend is the landlord's decision, and the landlord has not yet answered. Escalate only if the landlord declines or the scope/deposit questions need a manager ruling.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"NBL-00… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord asked for a comparison quote from another subcontractor (ev… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A3 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Re-applied after resume_auto cleared the earlier hold. Waiting for l… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-04-09","party":"Langley (landlord)","purpose":"Chase landlord for comparison subcontractor name.… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
- A3: resume_auto cleared the hold set in A2. Re-applied the hold (A4) with the same review date so the job does not stall.
