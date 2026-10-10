# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Contractor says the work is done but invoiced about 40% above the approved quote. I recorded the result and invoice, held payment, asked the contractor to explain, told the landlord, and set a follow-up for 2025-10-10.

## Where the case stands
Work reported complete 2025-10-08. Invoice 2311 (£277.72 + VAT, £333.26 inc) exceeds approved quote (£198.37 + VAT). Payment held. Waiting on provider explanation, PDF invoice and photos. Ticket not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the invoice overage (about 40%), and send PDF invoice and photos | Clarke, contractor | email | A4 ✅ |
| 2 | OTHER | Inform landlord of the invoice discrepancy and that payment is held | Landlord | email | A5 ✅ |
| 3 | WAIT | Review 2025-10-10; escalate to accounts (P2) if provider's answer does not settle it | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update on NBL-007-0235 (Flat 8, 168 Alder Lane). Invoice 2311 is £277.72 + VAT, but the quote approved by the landlord was £198.37 + VAT for two spotlights and one ceiling board. Please explain the difference in writing, with a breakdown of any extra work or materials, and send the invoice as a PDF plus the photos. Payment is on hold until this is cleared. Please don't treat any extra cost as approved. Regards, Maya

**A5 · send_message → Landlord (landlord) via email, existing thread (event 011 email)** (verified)

> Good afternoon. Clarke reports the two lounge spotlights and the ceiling board at Flat 8, 168 Alder Lane are replaced. His invoice is £277.72 + VAT (£333.26 inc VAT), against the £198.37 + VAT quote you approved. We have put payment on hold and asked him to explain the difference. Please don't agree to the higher amount yet. We'll come back to you once he replies. Regards, Maya

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work result does not confirm quality; photos are not yet seen
- Payment hold does not decide whether the extra cost is valid
- Landlord has not approved anything above £198.37 + VAT

## Remaining work
- Provider to explain overage and send PDF invoice and photos (owner: provider/agency)
- Landlord decision on any extra if justified
- Close ticket after invoice resolved, keys confirmed back from caretaker, landlord informed

## Missing or unavailable information
- Reason for invoice overage
- PDF invoice and photos
- Confirmation caretaker keys returned

## Conflicts between sources
- record_invoice returned no flags ('matches the approval') although the invoice is above the quote; I trusted the figures in the events and held payment.
- Contractor refers to 'the studio' while the property is Flat 8; the check-out report is dated 25 August 2026, after the case date. Treated as typos/template noise.
- Attachment-07 referenced at event 005 is not in the case files.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Work reported done; invoice £333.26 inc VAT vs approved £198.37 + VAT (£238.04 inc). Outstanding: overage explanation, PDF invoice, photos, key return, landlord decision, closure.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke asking for an explanation and documents (done), email to landlord informing them (done); follow-up 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. Escalate to accounts (P2) if the provider's answer doesn't settle the overage. Any approval above the quote is the landlord's decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Provider email 2025-1… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT is about 40% above the approved quote of £198.37 … | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `record_work_result` | {"ticket_ref":"NBL-007-0235","outcome":"completed","evidence":"Provider email 2025-10-08 (event 031) says two spotlights and ceiling board r… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_work_result |
| A4 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke (contractor)","purpose":"Check for explanation of invoice 2311 overage, P… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
