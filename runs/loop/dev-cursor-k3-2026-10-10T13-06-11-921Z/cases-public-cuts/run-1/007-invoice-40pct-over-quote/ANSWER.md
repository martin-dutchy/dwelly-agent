# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Contractor reports works done but invoiced about 40% above the approved quote. I recorded the invoice, held payment, asked Clarke to explain and send photos, informed the landlord and set a review for 2025-10-10.

## Where the case stands
Stage result, on hold waiting for provider. Works reported done by Clarke (event 031); invoice £333.26 inc VAT is ~40% above approved £198.37 + VAT quote. Payment held; provider asked to explain and send photos; landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Clarke to explain the invoice overage, itemise, give attendance date and send photos | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Tell landlord of the over-quote invoice, payment held, no extra spend without agreement | Landlord | email | A4 ✅ |
| 3 | WAIT | Review provider reply by 2025-10-10; escalate to accounts if unresolved | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for completing the works. Invoice 2311 is £277.72 + VAT, but the approved quote was £198.37 + VAT for two spotlights and one ceiling board. Please explain the difference and itemise what was added; if extra work was needed it should have been agreed with the landlord first. Please also send the photos of the work, and the date you attended. Payment is on hold until this is clarified. Regards, Maya

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, Clarke says the lounge works (two spotlights and one ceiling board) at Flat 8, 168 Alder Lane are done. His invoice is £277.72 + VAT (£333.26 inc VAT), against the £198.37 + VAT quote you approved. We have not paid it and have asked him to explain the difference and send photos. We will not pay above the approved quote without your agreement, and will update you once he replies (we aim to review by 2025-10-10).

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it for payment
- Payment hold does not decide the dispute
- Work completion is only the provider's claim until photos arrive
- Nothing closed

## Remaining work
- Provider explanation and photos (Clarke)
- Landlord decision if extra cost is justified
- Accounts escalation P2 if unresolved after 2025-10-10
- Close ticket after checks; no tenant (void)

## Missing or unavailable information
- Reason for extra £79.35 + VAT
- Attendance date
- Photos of work

## Conflicts between sources
- Invoice tool returned no flags although the amount exceeds the quote; treated as over quote.
- Check-out report dated 25 Aug 2026 but signed 27 Sep 2025.
- Emails mention 'the studio' while the property is Flat 8; keys with caretaker.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works reported complete; invoice £333.26 inc VAT vs approved £198.37 + VAT. Outstanding: explanation, photos, landlord view on overage, payment decision, closure.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke (provider) asking for explanation and photos, and email to the landlord informing them; payment held.

**3. Does anything need a human decision, and why?**

Not yet. If Clarke's answer by 2025-10-10 does not settle the overage, escalate P2 to accounts; paying above the approved quote needs landlord agreement.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"agency","source":"Provider email event 031, invo… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £333.26 inc VAT (£277.72 + VAT) is about 40% above approved quo… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Check provider's explanation of invoice over quote and photos… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `add_note` | {"entity":"NBL-007-0235","note":"Invoice 2311 recorded; system said no flags but amount is ~40% over quote. Payment held HOLD-101. Visit not… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
