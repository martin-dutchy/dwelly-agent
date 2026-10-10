# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Contractor reports the lounge works done and invoiced £277.72 + VAT (£333.26 inc) against an approved £198.37 + VAT. I recorded the invoice, held payment, asked the contractor to explain, told the landlord and set a follow-up for 10 Oct.

## Where the case stands
Ticket at Result stage, on hold Waiting for Provider. Works reported done; invoice 2311 recorded but payment held as it is about 40% over the approved quote. Awaiting provider explanation and photos; landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Clarke to explain the £79.35 + VAT overage, itemise it, and send photos and a PDF invoice | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Tell landlord of the invoice over the approved quote, payment held, no extra paid without their agreement | Landlord | email | A4 ✅ |
| 3 | WAIT | Review 2025-10-10; if no satisfactory explanation, escalate to accounts or ask landlord to approve the higher figure | Clarke / landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update on NBL-007-0235. Invoice 2311 is £277.72 + VAT, but the approved quote was £198.37 + VAT for two spotlights and one ceiling board. Please explain the difference and itemise any extra work. Payment is on hold until this is settled. Please also send the photos of the completed work, and the invoice as a PDF. Thanks, Maya

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Good afternoon. Clarke says the lounge works (two spotlights and a ceiling board) at Flat 8, 168 Alder Lane are done. His invoice is £277.72 + VAT (£333.26 inc VAT), but you approved £198.37 + VAT. We have not paid it and have asked him to explain the extra. We will not pay above the approved figure unless you agree. We are also waiting for his photos. We will update you once he replies.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it
- Holding payment does not decide the dispute
- Work completion is only the contractor's claim; photos not yet seen
- Ticket not closed

## Remaining work
- Provider explanation of overage and photos (Clarke)
- Landlord decision on any amount above £198.37 + VAT if justified
- Release or amend payment, filing invoice, then close (no tenant, void property)
- Check the caretaker returned keys

## Missing or unavailable information
- Reason for the invoice increase
- Completion photos
- Invoice PDF
- Original attachment at event 005 not available

## Conflicts between sources
- Invoice check returned no flags ('matches approval') although the figure is above the £198.37 + VAT quote; I trusted the documents and held payment.
- Contractor email refers to 'the studio' while the property is a flat; the address matches the job ID.
- The ticket is paused as NOT TENANTED, yet works progressed; no tenant to notify.
- The check-out report is dated 25 Aug 2026, after today's date; treated as a typo.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Works reported complete, invoice about 40% over the approved quote, photos not yet received. Payment is held. Outstanding: explanation, photos, landlord decision on any excess, closure.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke (contractor) asking for an explanation of the overage and the photos; email to the landlord informing them. Follow-up set for 2025-10-10.

**3. Does anything need a human decision?**

Not yet. If Clarke cannot justify the excess by 10 Oct, escalate to accounts (P2), or the landlord may approve the higher amount.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"agency","source":"Provider email event 031, invo… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor)","reason":"Invoice 2311 £333.26 inc VAT (£277.72 + VAT) is ~40% above approved quote £198.37 + VAT; unexplaine… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Chase explanation of invoice 2311 overage and completion phot… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
