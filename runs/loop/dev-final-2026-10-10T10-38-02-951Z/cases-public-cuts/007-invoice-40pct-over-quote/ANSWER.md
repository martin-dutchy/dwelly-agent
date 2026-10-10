# Case 007-invoice-40pct-over-quote: ANSWER

**Outcome:** action_taken · **Severity:** routine

Clarke has completed the lounge works. His invoice 2311 is £277.72 + VAT against the approved £198.37 + VAT, about 40% over, with no agreed variation. I held payment, asked the contractor for a breakdown and photos, and asked the landlord to decide on the extra.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Works are done (two spotlights and one ceiling board replaced). Outstanding: the invoice is £277.72 + VAT (£333.26 inc VAT) against the landlord-approved £198.37 + VAT, an extra £79.35 + VAT (about 40%). Also outstanding: the contractor's explanation, the completion photos and the landlord's decision on the overage. Payment is on hold.

**2. What is the next action, who is it for, and through which channel?**

Email to the contractor (Clarke) asking for a breakdown of the extra cost and the photos, with a note that payment is paused. Landlord approval was requested for the overage (APR-102). Payment hold HOLD-101 was placed.

**3. Does anything need a human decision, and why?**

The landlord must decide whether to approve the extra spend, because the approval covered only the quoted amount. I have not escalated to staff. If the landlord does not reply or the contractor cannot justify the extra, the manager should negotiate. Nobody should pay above the quote before then.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, job NBL-007-0235","reason":"Invoice £277.72 + VAT (£333.26 inc VAT) is about 40% over the appro… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A2 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-007-0235","decision_needed":"Contractor completed lounge works (2 spotlights, 1 ceiling board) at F… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","body":"Job Id: NBL-007-0235\nHi Clarke, thanks for completing th… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
