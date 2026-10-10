# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Clarke reports the lounge works done but invoiced £333.26 inc VAT against an approved £198.37 + VAT (£238.04 inc). I recorded the invoice, held payment, asked Clarke to explain, asked the landlord to decide, and set a hold review for 10 Oct.

## Where the case stands
Stage result, on hold (review 2025-10-10). Works reported done by Clarke (event 031); invoice 2311 is about 40% above the approved quote; payment held; waiting on provider explanation/photos and landlord decision. Property is void, so no tenant to inform.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Asked Clarke to explain the extra £79.35 + VAT and send completion photos | Clarke, contractor | email | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked landlord whether to pay the higher invoice or hold to the quote | Landlord | email | A4 ✅ |
| 3 | WAIT | Hold until 2025-10-10 for provider explanation and landlord answer | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update. Invoice 2311 (£277.72 + VAT) is above the approved quote of £198.37 + VAT, and we had no variation request. Please send a written breakdown explaining the extra £79.35 + VAT, plus the completion photos. Payment is on hold until then and the landlord will be asked about the difference. Regards, Maya

**A4 · request_landlord_approval → Landlord (landlord)** (verified)

> Clarke says the lounge works (two spotlights, ceiling board) are done, but invoiced £277.72 + VAT (£333.26 inc VAT) against the approved quote of £198.37 + VAT (£238.04 inc). No explanation yet; we have asked him for one and for photos. Payment is on hold. May we pay the higher amount, or should we hold to the quote? (£333.26)
> 
> Options: Hold to the approved quote of £198.37 + VAT until Clarke explains the difference (recommended); Approve the invoice of £277.72 + VAT

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it; the tool flagged nothing, but the amount exceeds the approved quote
- Completion is unverified: photos not yet received
- Payment hold does not decide who pays

## Remaining work
- Receive Clarke's breakdown and photos
- Landlord decision on the extra amount
- Then record result, file invoice, tell landlord, close
- Escalate to accounts (P2) if the explanation does not settle it

## Missing or unavailable information
- Reason for the invoice overage
- Completion photos
- Landlord's decision on the higher amount

## Conflicts between sources
- record_invoice said it matched the approval, but £333.26 exceeds the approved £198.37 + VAT; I trusted the figures
- Check-out report dates 25 August 2026 are inconsistent with the 2025 timeline; not relevant to the action
- The provider's emails call it 'the studio' while the property is a flat; the address is the same job ID

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works reported done, invoice about 40% over the approved quote, no photos yet, payment held. Outstanding: provider explanation, photos, landlord decision, then closing.

**2. What is the next action, who is it for, and through which channel?**

Done: email to Clarke asking for an explanation and photos; email to the landlord asking whether to pay the higher amount; the hold review is set for 10 Oct.

**3. Does anything need a human decision, and why?**

Not yet. The landlord owns the decision on the extra spend. If Clarke's answer does not settle it, escalate to accounts (P2).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Email event 031, 2025… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311","reason":"Invoice £277.72 + VAT (£333.26 inc) is about 40% above approved quote £198.37 + VAT; … | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-007-0235","decision_needed":"Clarke says the lounge works (two spotlights, ceiling board) are done,… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Waiting for Clarke's explanation of invoice 2311 overage and complet… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Failed or unverified actions
_None._
