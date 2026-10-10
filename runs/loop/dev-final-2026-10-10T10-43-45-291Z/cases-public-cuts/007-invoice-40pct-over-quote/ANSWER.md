# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Contractor reports works done but invoiced about 40% over the approved quote. Recorded the result and invoice, held payment, asked the contractor to explain and send photos, and asked the landlord to decide on the extra.

## Where the case stands
Ticket at Result, on hold (review 2025-10-13). Works reported complete; invoice 2311 £333.26 inc VAT vs approved £238.04 inc VAT; payment held; landlord variation approval requested; contractor asked for breakdown and photos. Property void, no tenant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve or refuse the £79.35 + VAT overage | Landlord | email | A5 ✅ |
| 2 | REQUEST_INFORMATION | Ask contractor for breakdown of extra cost and completion photos | Clarke, contractor | email | A4 ✅ |
| 3 | WAIT | Hold until review date 2025-10-13 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for completing the works. Invoice 2311 (£277.72 + VAT) is about 40% above the approved quote of £198.37 + VAT. We can't process it as it stands. Please send a written breakdown explaining the extra cost (e.g. extra materials or time) and the completion photos. We'll put the difference to the landlord; payment is on hold until then. Regards, Maya

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Contractor completed lounge spotlights and ceiling board but invoiced £277.72 + VAT (£333.26 inc) against your approved £198.37 + VAT (£238.04 inc), an extra £79.35 + VAT. Do you approve the higher amount? We've asked the contractor for an explanation and photos. (£333.26)
> 
> Options: Hold at the approved quote £198.37 + VAT until contractor justifies the extra (recommended); Approve full invoice £277.72 + VAT; Other instruction

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work result does not confirm quality; photos are outstanding.
- Holding payment does not decide whether the extra is owed.
- Nothing approves the overage.

## Remaining work
- Landlord decision on overage
- Contractor breakdown and photos
- Then pay approved amount, file invoice/photos, inform landlord, close (no tenant confirmation needed, void)

## Missing or unavailable information
- Reason for 40% overage
- Completion photos

## Conflicts between sources
- record_invoice returned no flags ('matches the approval') but the invoice is clearly about 40% above the approved quote; trusted the figures and held payment.
- Check-out report dated 25 Aug 2026 but signed 27 Sep 2025; contractor refers to 'the studio' for Flat 8. Minor, noted.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works reported complete 8 Oct; invoice £277.72 + VAT (£333.26 inc) against approved £198.37 + VAT. Outstanding: overage explanation, landlord decision, photos, filing, closure.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord requesting approval of the variation (APR-103) and email to Clarke requesting breakdown and photos (MSG-102); payment held (HOLD-101).

**3. Does anything need a human decision, and why?**

Not a human at the agency yet: the landlord owns the decision to pay above the approved quote. If the landlord does not reply or the contractor disputes, escalate to accounts/maintenance at the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-007-0235","outcome":"completed","evidence":"Contractor Clarke email 2025-10-08 (event 031): spotlights and ceiling board … | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_work_result |
| A2 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"invoice_date":"2025-10-08","who_pays":"agency","source":"Em… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A3 | `hold_payment` | {"payee":"Clarke (invoice 2311, NBL-007-0235)","reason":"Invoice £333.26 inc VAT is about 40% above approved quote £198.37 + VAT (£238.04 in… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A4 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-007-0235","amount_gbp":333.26,"decision_needed":"Contractor completed lounge spotlights and ceiling… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Awaiting contractor's explanation of invoice overage and photos; lan… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Failed or unverified actions
_None._
