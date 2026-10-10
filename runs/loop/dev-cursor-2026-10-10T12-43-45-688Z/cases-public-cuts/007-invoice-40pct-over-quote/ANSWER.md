# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Clarke reported the work done and invoiced £277.72 + VAT, which is about 40% above the approved £198.37 + VAT. I recorded the invoice and the work result and put payment on hold. I asked Clarke to explain the difference, asked the landlord for a decision, and set a follow-up for 10 Oct.

## Where the case stands
Stage: result. Work reported complete by Clarke on 8 Oct; invoice 2311 is £277.72 + VAT (£333.26 inc VAT) against the approved £198.37 + VAT. Payment is held. Waiting on the contractor (explanation, photos, PDF invoice) and the landlord (decision on the extra). Property is void, so there is no tenant to confirm.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the 40% overage, and send photos and a PDF invoice | Clarke, contractor | email | A6 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord whether they will pay the higher invoice amount, recommending we hold at the approved figure until explained | Landlord | email | A5 ✅ |
| 3 | WAIT | Review on 2025-10-10; escalate to accounts if the explanation does not settle it | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · request_information → Clarke (contractor) via email, existing thread (event 031 email)** (failed)

> - Invoice 2311 is £277.72 + VAT against your approved quote of £198.37 + VAT. What accounts for the extra, and was any additional work agreed with us beforehand?
> - Please send the photos of the completed work and the invoice as a PDF.
> 
> Why: Invoice exceeds approved quote; payment is on hold until explained.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> The lounge works are reported complete, but Clarke's invoice is £277.72 + VAT (£333.26 inc VAT) against the £198.37 + VAT you approved. We have put payment on hold and asked him to explain the difference. Are you willing to pay the higher amount if he justifies it? (£333.26)
> 
> Options: Hold at the approved £198.37 + VAT until the contractor explains (recommended); Approve the invoice of £277.72 + VAT; Decline the extra

**A6 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update. Invoice 2311 is £277.72 + VAT, but the approved quote was £198.37 + VAT. Please explain what the extra covers and whether any added work was agreed with us beforehand. Please also send the photos and the invoice as a PDF. Payment is on hold until we hear from you. Regards, Maya

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work result does not confirm the quality of the work; photos are still outstanding.
- Recording the invoice does not approve payment. Payment is held (HOLD-101).
- The landlord's approval covered only £198.37 + VAT.
- The ticket is not closed.

## Remaining work
- Contractor explanation, photos and PDF invoice (contractor)
- Landlord decision on the extra £79.35 + VAT (landlord)
- Release or adjust payment, then close without tenant confirmation as the property is void (agency)
- Escalate to accounts if unresolved on 2025-10-10

## Missing or unavailable information
- Reason for the invoice increase
- Photos of the completed work
- Invoice PDF
- The attachment sent with the quote request (attachment-07) was not seen

## Conflicts between sources
- record_invoice returned no flags ('matches the approval') even though the invoice is 40% above the quote; I trusted the figures in the history and held payment.
- The contractor's email says 'studio' while the property is Flat 8; I treated it as the same job (job ID and address match).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The work is reported complete but unevidenced, because photos are still to come. The invoice is about 40% over the approved quote and payment is held. Outstanding: the contractor's explanation, photos, a PDF invoice, and the landlord's decision on the extra.

**2. What is the next action, who is it for, and through which channel?**

Email Clarke (contractor) for an explanation of the overage, and email the landlord for a decision on the higher amount. Follow-up is set for 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the extra spend. If the contractor's answer and the landlord's reply do not settle it by the review date, escalate to accounts (P2).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Provider email 2025-1… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT (£333.26 inc VAT) is about 40% above the approved… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `record_work_result` | {"ticket_ref":"NBL-007-0235","outcome":"completed","evidence":"Provider email 2025-10-08 (event 031) says spotlights and ceiling board repla… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_work_result |
| A4 | `request_information` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Invoi… | 1 | ❌ failed | REQ-102 was returned but is not in the request_information log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-007-0235","amount_gbp":333.26,"decision_needed":"The lounge works are reported complete, but Clarke… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A6 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","purpose":"Review Clarke's explanation of the invoice overage, photos and landlord reply;… | 2 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
- A4: request_information was NOT APPLIED; I sent the same questions with send_message instead (A6, verified on read-back despite a timeout error).
