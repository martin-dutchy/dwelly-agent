# Bathroom leak and wall repair: ANSWER

**Decision:** action_taken · **Severity:** urgent

Inspection done and Hearthline quoted £2,844 inc VAT. The landlord has not approved and asked which quote was meant. The quote PDF names a different property and the contractor's breakdown does not reconcile. I asked the contractor to correct it, clarified to the landlord, updated the tenant, and put the job on hold with review on 26 Sept.

## Where the case stands
Quote stage, on hold waiting for provider (review 2025-09-26). No landlord approval recorded; nothing assigned or booked for repair.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Hearthline to confirm property address, reconcile the itemised figures, clarify commission/deposit, and resend as PDF | Ewan Rook, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant, give interim leak advice, next update by 26 Sept | Nessa Quill, tenant | email | A4 ✅ |
| 3 | OTHER | Clarify which quote and why approval is not yet requested | Orin Vale, landlord | email | A3 ✅ |
| 4 | WAIT | Hold for corrected quote, review 26 Sept | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Ewan Rook (contractor) via email, existing thread (event 021 email)** (verified)

> - Your quotation NBL-001-Q1 dated 18 Sept names 8 Wrenfold Mews, but this job is at 4 Thistlewick Rise. Please confirm which property it was for and reissue it with the correct address if needed.
> - Your breakdown (materials £1,270 + labour £1,170 = £2,440) does not match the £2,370 subtotal. Please send one corrected itemised quote with subtotal, VAT and total, as a PDF.
> - Please explain how the 10% Northbridge commission applies. It should not be added to the landlord's price unless stated clearly. Please also confirm what the 50% deposit is calculated on.
> - Please confirm whether the work includes finding and fixing the leaking pipe behind the shower, since that is the fault reported.
> 
> Why: The quote document shows a different property and the figures do not reconcile; the landlord cannot decide on it until clarified. Reply wanted by 26 Sept 2025.

**A3 · send_message → Orin Vale (landlord) via email, existing thread (event 023 email)** (verified)

> Hi Orin, sorry for the confusion. I mean the single Hearthline Plumbing & Bath quote (ref NBL-001-Q1, 18 Sept) for the shower/bathroom work at 4 Thistlewick Rise: remove the screen, taps and valve, fit wall and riser cladding with chrome trims, fit new bath taps and shower valve, and refit the screen. It was sent as £2,844.00 including VAT. Please don't approve it yet: the PDF shows a different property address, and the contractor's breakdown (materials £1,270, labour £1,170, VAT, a 10% commission and a 50% deposit) doesn't add up to that total. I've asked Hearthline to correct and itemise it and to confirm the leaking pipe itself is covered. I'll send you the corrected quote for your decision by 26 Sept. The tenant reports the leak is ongoing, so we'd like to move quickly once it's clear.

**A4 · send_message → Nessa Quill (tenant) via email, existing thread (event 014 email)** (verified)

> Hi Nessa, an update on the shower leak. The plumber has inspected and sent a quote, which we're getting corrected and itemised before the landlord decides on the repair. I can't give a repair date yet. In the meantime, please keep the shower use to a minimum if water is still coming through the wall, and put a towel or bowl to catch drips. If water spreads outside the bathroom, reaches light fittings or sockets, or you smell gas, tell us straight away (turn off the water at the stopcock if you can; 999 if you're in danger). We'll update you by 26 Sept.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or books any repair.
- Does not confirm cause of leak or who pays commission.

## Remaining work
- Receive corrected quote, record it, send to landlord for approval (agency)
- Tenant update by 26 Sept
- Chase contractor if no reply by 26 Sept

## Missing or unavailable information
- Confirmed property on quote
- Reconciled itemised totals and commission treatment
- Whether quote covers the leaking pipe

## Conflicts between sources
- Quote PDF names 8 Wrenfold Mews; job is 4 Thistlewick Rise; trusted the case property.
- Contractor breakdown £1,270+£1,170=£2,440 vs quote subtotal £2,370; event 016 also references a £474 figure (VAT).

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Inspection done; quote £2,844 inc VAT sent to landlord, who wants itemisation and asked which quote. The PDF shows 8 Wrenfold Mews, and materials+labour (£2,440) don't match the £2,370 subtotal; commission and deposit basis are unclear. Outstanding: corrected quote, landlord decision, repair booking.

**2. What is the next action, for whom, and channel?**

Email Ewan Rook for a corrected itemised quote (done), and email the landlord to clarify (done) and the tenant (done); then send the corrected quote to the landlord for approval.

**3. Does anything need a human decision?**

Not yet. The landlord decides on the corrected quote. Escalate if Hearthline cannot confirm the property or explain the commission by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Ewan Rook","recipient_role":"contractor","channel":"email","contact":"existing thread (event 021 email)","questions":["Yo… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-001","reason":"Waiting for Provider","comment":"Waiting for Hearthline to confirm property address on quote NBL-001-Q1 (s… | 1 | ✅ verified | Ticket NBL-001 read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Orin Vale","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Nessa Quill","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
