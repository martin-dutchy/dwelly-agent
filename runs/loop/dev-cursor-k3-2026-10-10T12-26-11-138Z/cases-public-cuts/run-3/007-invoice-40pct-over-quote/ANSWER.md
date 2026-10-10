# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Clarke reports the works done but invoiced £277.72 + VAT against an approved £198.37 + VAT. I recorded the invoice, held payment, asked Clarke to explain, asked the landlord to decide, and set a review for 2025-10-10.

## Where the case stands
Stage: result, work reported done by Clarke (event 031). Invoice 2311 (£333.26 inc VAT) is about 40% above the approved quote. Payment is held. Waiting on Clarke's explanation and photos, and on the landlord's decision. Property is void, so no tenant to tell. Ticket not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the £79.35 + VAT overage, itemise it, and send the photos and a PDF invoice | Clarke, contractor | email | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord whether to accept the higher invoice or hold to the quote | Landlord | email | A4 ✅ |
| 3 | WAIT | Review on 2025-10-10; escalate to accounts if unresolved | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update on NBL-007-0235 (Flat 8, 168 Alder Lane). Invoice 2311 is £277.72 + VAT, but the approved quote was £198.37 + VAT for two spotlights and one ceiling board. Please explain the difference and itemise any extra work, and send the photos and invoice as a PDF. We can't pay above the approved figure without the landlord's agreement, so payment is on hold meanwhile. Regards, Maya

**A4 · request_landlord_approval → Landlord (landlord)** (verified)

> Clarke has completed the works but invoiced £277.72 + VAT (£333.26 inc VAT) against the approved quote of £198.37 + VAT. We have asked him to explain. Do you agree to the higher amount, or should we hold to the quoted price? (£333.26)
> 
> Options: Hold to the quoted £198.37 + VAT (recommended) pending Clarke's explanation; Approve the invoiced £277.72 + VAT

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it for payment
- The hold does not settle whether the extra is justified
- Completion is only the contractor's claim; photos have not been seen

## Remaining work
- Clarke to explain the invoice and send photos
- Landlord decision on the extra amount
- Confirm completion, file the invoice, then close

## Missing or unavailable information
- Reason for the invoice increase
- Completion photos
- Landlord's reply

## Conflicts between sources
- The invoice tool said it matched the approval, but £277.72 + VAT is above the approved £198.37 + VAT, so I held payment anyway.
- The contractor's emails say 'studio' while the property is Flat 8; the check-out report is dated 25 August 2026, after today. Both are likely data quirks, so I treated the job as this property.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The work is reported complete. The invoice is about 40% over the approved quote and payment is held. Outstanding: Clarke's explanation and photos, the landlord's decision, and the final checks before closing.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke asking him to explain the difference and send the photos. Email to the landlord asking whether to accept the extra. Both are done; review on 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the extra cost. Escalate to accounts (P2) if the explanation and landlord reply don't settle it by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Provider email event … | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311","reason":"Invoice £277.72 + VAT is about 40% above approved quote £198.37 + VAT; no explanation… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-007-0235","decision_needed":"Clarke has completed the works but invoiced £277.72 + VAT (£333.26 inc… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","purpose":"Review Clarke's explanation of invoice 2311 and landlord reply; escalate to ac… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
