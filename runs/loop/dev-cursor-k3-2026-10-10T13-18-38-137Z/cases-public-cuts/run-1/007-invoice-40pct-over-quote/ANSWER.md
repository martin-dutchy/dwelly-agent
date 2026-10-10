# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor says the work is done but invoiced about 40% above the approved quote. I recorded the invoice, held payment, asked the contractor to explain and send photos and the visit date, and told the landlord. A follow-up is set for 2025-10-10.

## Where the case stands
Stage: result. Contractor reports works done and invoiced £333.26 inc VAT vs £198.37 + VAT approved quote. Payment held. Waiting on provider for explanation, photos, attendance date. Landlord informed. Property is void so no tenant messages.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the £79.35 + VAT overage and send photos and attendance date | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Tell the landlord about the invoice difference; payment on hold pending their agreement | Landlord | email | A4 ✅ |
| 3 | WAIT | Review on 2025-10-10; escalate to accounts if the explanation does not settle it | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update. Invoice 2311 is £277.72 + VAT against your approved quote of £198.37 + VAT for the two spotlights and one ceiling board. Please send an itemised explanation of the extra £79.35 + VAT and any extra work approved. Please also send the date you attended and the photos of the completed work. Payment is on hold until we have these. Regards, Maya

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, Clarke reports the lounge works (two spotlights and ceiling board) at Flat 8, 168 Alder Lane are done. His invoice is £277.72 + VAT (£333.26 inc VAT), against the £198.37 + VAT quote you approved. We have not paid it. We've asked him to explain the difference and send photos and the attendance date. We'll update you once we hear back, and won't pay the extra without your agreement. Regards, Maya

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve payment
- Completion is not verified: no photos, no recorded visit date
- The landlord's 'Pls go ahead' covered the £198.37 + VAT quote only; nothing approves the extra

## Remaining work
- Provider explanation, photos and attendance date (Clarke)
- Landlord decision on any extra above the quote
- Keys back from the caretaker; confirm with provider
- Close ticket after the checks

## Missing or unavailable information
- Reason for the 40% overage
- Photos
- Attendance date
- Confirmation of key return

## Conflicts between sources
- The record_invoice check returned no flags, but the invoice is above the quote the landlord saw; I treated it as over-quote and held payment.
- The ticket says the property is not tenanted, while the contractor refers to 'the studio'. Likely naming only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works reported done on 8 Oct. The invoice of £277.72 + VAT (£333.26 inc VAT) exceeds the £198.37 + VAT quote. Outstanding: the explanation, photos, attendance date, the landlord's view on the extra, and the final checks.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke asking for an explanation of the overage, photos and the visit date (done). Email to the landlord telling them about the difference (done). Review on 10 Oct.

**3. Does anything need a human decision, and why?**

Not yet. The provider's explanation and the landlord's answer come first. If the explanation does not settle it by 10 Oct, escalate P2 to accounts.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor), invoice no. 2311","amount_gbp":333.26,"who_pays":"agency","source":"Provider ema… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor) - invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT (£333.26 inc) is about 40% above approved quote … | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Chase explanation of invoice 2311 overage, photos and attenda… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
