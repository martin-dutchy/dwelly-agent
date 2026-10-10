# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Contractor reports works complete with invoice £333.26 inc VAT against approved £198.37 + VAT. I recorded the invoice, held payment, asked the contractor to explain and send photos, and told the landlord.

## Where the case stands
Stage: result, on hold waiting for provider (review 2025-10-13). Works reported done; invoice 40% over approved quote; payment held; no visit date or photos yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain invoice vs quote, give attendance date and send photos by 10 Oct | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Inform landlord of the overshoot and payment hold | Landlord | email | A4 ✅ |
| 3 | WAIT | Wait for provider's reply; review 13 Oct | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> - Invoice 2311 is £277.72 + VAT against your approved quote of £198.37 + VAT. Please explain the difference line by line, with any extra work or materials.
> - What date did you attend?
> - Please send the photos of the completed work (spotlights and ceiling board), by Friday 10 October.
> 
> Why: Invoice exceeds approved quote; payment on hold until explained.

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, Clarke says the lounge work at Flat 8, 168 Alder Lane (two spotlights and ceiling board) is done. His invoice is £277.72 + VAT (£333.26 inc VAT), but the quote you approved was £198.37 + VAT. We have put payment on hold and asked him to explain the difference and send photos and his attendance date. We will not pay more than you approved without your say-so, and will update you by Monday 13 October.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it; the approval covers only £198.37 + VAT.
- Contractor's claim that work is done is unverified until photos and date arrive.
- Nothing here decides who pays the extra.

## Remaining work
- Provider explanation, photos, attendance date
- If extra is not justified, or landlord won't approve it, escalate to accounts (P2) or get landlord decision
- Record work result, file invoice, close once landlord informed
- Property is void so no tenant messaging needed; caretaker held keys

## Missing or unavailable information
- Reason for the £79.35 + VAT increase
- Attendance date
- Photos of completed work

## Conflicts between sources
- record_invoice returned no flags ('matches the approval') despite the invoice being above the quote; I treated the quote figure as the approval limit.
- Emails mention 'the studio' though the property is Flat 8; treated as the same job.
- Check-out report dated 25 Aug 2026 but signed Sept 2025; noted only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved the £198.37 + VAT quote; contractor says work is done and invoiced £277.72 + VAT (£333.26 inc), about 40% over. Outstanding: explanation, attendance date, photos, landlord decision on any excess, closure.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke (contractor) asking for explanation, date and photos; email to landlord informing them; payment held (HOLD-101).

**3. Does anything need a human decision, and why?**

Not yet. If the contractor cannot justify the excess by review date 13 Oct, escalate to accounts P2 or seek landlord approval for the extra.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor, invoice no. 2311)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Pro… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311","reason":"Invoice £277.72 + VAT (£333.26 inc) is about 40% above approved quote £198.37 + VAT; … | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `request_information` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Invoi… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Awaiting explanation of invoice 2311 over quote, attendance date and… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Failed or unverified actions
_None._
