# Case V008-landlord-two-quotes-j5yxy2: ANSWER

**Outcome:** escalated · **Severity:** routine

Landlord approved Eliza Bennett's £1,370 quote by phone on 14 May and the approval is logged. I held payment to Eliza pending the landlord's check of the old invoice. The ticket and contact details aren't in the system, so I couldn't message Eliza or the landlord. I escalated that to a human.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The quote decision is made: Eliza Bennett at £1,370, against Kendall at £2,040 including VAT. Still outstanding: instructing Eliza and agreeing a visit window, getting the old invoice resent for the landlord to check, and the landlord's separate roof leak (no address given).

**2. What is the next action, who is it for, and through which channel?**

Instruct Eliza Bennett to start the works and ask her to resend the old invoice. That would go by email, with SMS as a prompt, to the contractor. Then confirm to the landlord. I couldn't send either because no contact details are on file, so I passed it to the team via ESC-102.

**3. Does anything need a human decision, and why?**

Not the approval itself, which is made. A human is needed for the missing ticket and contact records, the inconsistent invoice references, and the release of any payment once the landlord has checked the invoice. This went to accounts as P3 (ESC-102).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `approve_quote` | {"ticket_ref":"NBL-008-3466","amount_gbp":1370,"contractor":"Eliza Bennett","approval_basis":"Landlord Mr Langley verbally approved £1,370 o… | 1 | ✅ verified | QAP-101 found in the approve_quote log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"accounts","reason":"Quote approved; contractor instruction and old-invoice query need contact details/records not i… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `hold_payment` | {"payee":"Eliza Bennett","reason":"Landlord asked for the old refurb invoice to be resent and checked before any payment"} | 1 | ✅ verified | HOLD-103 found in the hold_payment log |

## Escalations
- **P3 → accounts** (verified): Quote approved; contractor instruction and old-invoice query need contact details/records not in system
  - Known: Landlord approved Eliza Bennett's £1,370 (no VAT) over Kendall £1,700+VAT (£2,040) on call 14 May (events 031-032). Approval QAP-101 logged. Landlord wants Eliza to resend the old refurb invoice before any payment is made. Ticket NBL-008-3466 not found in the ticket system and no contact details on file for Eliza or the landlord.
  - Missing: Contractor and landlord contact details; ticket record; which invoice is meant (earlier chasers named Alder Compliance and different property addresses; the record is inconsistent); visit dates. The call also said Eliza 'will be instructed', which has not happened. Landlord's roof leak at another property has no address.
  - Options: Instruct Eliza to proceed and ask her to resend the old invoice; hold payment until landlord has checked it; Ask landlord for the roof-leak property address and log it separately
  - Recommendation: Instruct Eliza Bennett now, request the invoice resend, hold any invoice payment until the landlord confirms, and get the roof leak details from the landlord.

## Failed or unverified actions
_None._
