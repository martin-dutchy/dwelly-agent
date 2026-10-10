# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** escalated · **Severity:** routine

Clarke reports the lounge spotlight and ceiling board work complete and invoices £333.26 inc VAT, about 40% over the £238.04 inc VAT the landlord approved on 28 September. I recorded the approval, quote, work result and invoice, held payment (HOLD-102), asked Clarke to explain the increase and send photos, told the landlord, and escalated the overage to accounts (ESC-105).

## Where the case stands
Paused for invoice. The lounge repair (two spotlights and one ceiling board) was approved at £198.37 + VAT (£238.04 inc VAT). The contractor reports it done (event 031, 8 Oct). Invoice no. 2311 is £277.72 + VAT (£333.26 inc VAT), which is above the approval. Payment is held (HOLD-102). The property is NOT TENANTED, so there is no tenant contact. Waiting on Clarke for an explanation and photos, and on the landlord and accounts for any overage decision. Review 2025-10-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Clarke to explain the £39.35 + VAT increase, itemise any extra work, and send the completion photos | Clarke, contractor | email | A6 ✅ |
| 2 | CHASE_LANDLORD | Tell the landlord the work is complete, the invoice is £333.26 inc VAT against £238.04 approved, payment is held, and ask them to say whether they will approve any overage once Clarke explains it | Landlord | email | A7 ✅ |
| 3 | ESCALATE_TO_HUMAN | Accounts to decide whether to pay £238.04 inc VAT only, or approve up to £333.26 after the explanation (P2) | Accounts team (internal) | internal | A8 ✅ |
| 4 | WAIT | Review on 2025-10-10 for Clarke's reply and the landlord's decision | internal | internal | A9 ✅ |

## Messages sent (verbatim)
**A6 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke,
> 
> Thanks for letting us know the work at Flat 8, 168 Alder Lane is done.
> 
> Your invoice no. 2311 is for £277.72 plus VAT (£333.26 inc VAT). The approved quote was £198.37 plus VAT (£238.04 inc VAT). We can't process the invoice at the higher amount, so payment is on hold for now.
> 
> Please could you explain the difference, listing any extra work or materials and their cost, and send the photos you mentioned. Once we have this, we will take it to the landlord for a decision.
> 
> Regards
> Maya
> Northbridge Lettings

**A7 · send_message → Landlord (landlord) via email, existing thread (event 011 email)** (verified)

> Good afternoon,
> 
> The lounge works at Flat 8, 168 Alder Lane are reported complete: two spotlights and one ceiling board replaced.
> 
> You approved the quote of £198.37 plus VAT (£238.04 inc VAT). Clarke's invoice no. 2311 is £277.72 plus VAT (£333.26 inc VAT), about 40% more than approved. We have held payment and asked Clarke to explain the difference. We will not pay above your approval without your agreement. Please let us know whether you would like us to approve the higher amount once we have his explanation.
> 
> Regards
> Maya
> Northbridge Lettings

## Escalation
- **P2 → accounts** (verified): Contractor invoice no. 2311 (Clarke) is £333.26 inc VAT, above the landlord-approved £238.04 inc VAT. Payment held (HOLD-102). Decision needed on whether any overage is payable.
  - Known: Quote £198.37 + VAT approved by landlord ("Pls go ahead", event 011, 28 Sep). Work reported complete 8 Oct (event 031); photos not yet received. Invoice £277.72 + VAT (£333.26 inc VAT), 14-day terms. Property is NOT TENANTED (void); keys with caretaker.
  - Missing: Reason for the £39.35 + VAT increase; itemised extra work; completion photos; the landlord's view on any overage. Check-out report is dated 25 Aug 2026, which is after today and conflicts with its 27 Sep 2025 signature.
  - Options: Ask the landlord to approve up to £333.26 inc VAT once Clarke explains the increase; Pay only £238.04 inc VAT and ask Clarke to credit the difference; Reject the invoice and close at the approved amount
  - Recommendation: Hold payment. Pay no more than £238.04 inc VAT unless the landlord approves the overage after Clarke's itemised explanation.
  - Deadline: 2025-10-15

## What this does not establish
- Recording the work as completed does not confirm the photos or the quality of the work.
- The landlord's approval covers only £238.04 inc VAT and does not cover the £333.26 invoice.
- Holding payment does not decide whether any overage is payable.
- The ticket is not closed: the invoice is flagged, the photos are missing, and the overage is undecided.

## Remaining work
- Clarke: explanation of the increase, itemised extra work, completion photos (operations; review 2025-10-10).
- Landlord: decision on any overage above £238.04 inc VAT.
- Accounts (ESC-105): decide whether to pay £238.04 inc VAT only, or approve up to £333.26 after the explanation.
- Close the ticket once the invoice is settled and work evidence is filed. Confirm the keys with the caretaker are returned if they were lent.

## Missing or unavailable information
- Reason for the invoice increase from £198.37 + VAT to £277.72 + VAT.
- Completion photos (said to follow, not received).
- Landlord decision on any overage.
- The check-out report is dated 25 August 2026 (after today) but was signed 27 September 2025; the date needs checking.

## Conflicts between sources
- The check-out report gives the inspection date as 25 August 2026, which is after today (8 Oct 2025), yet it was signed 27 Sep 2025. I used the report as the basis of the job and flagged the date for checking.
- The landlord's 'Pls go ahead' (event 011) answered the £198.37 + VAT quote. I treated it as approval up to £238.04 inc VAT, not for the higher invoice.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Work is reported complete (event 031). The invoice is flagged and on hold. The approved amount is £238.04 inc VAT. Outstanding: Clarke's explanation and photos, the landlord's decision on the overage, accounts' decision (ESC-105), and then closure. The property is void, so there is no tenant to update.

**2. What is the next action, who is it for, and through which channel?**

Email Clarke asking for an explanation and photos (A6). Email the landlord about the overage (A7). Escalate to accounts (A8). Review on 2025-10-10 (A9).

**3. Does anything need a human decision, and why?**

Yes. Paying £39.35 + VAT above the approved amount needs accounts or landlord authority. We have no authority to approve spend above the landlord's limit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-007-0235","decision":"approved","evidence_quote":"Pls go ahead","source":"event 011, email from Landlord 2025-09-28 16:27… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_landlord_decision |
| A2 | `record_quote` | {"ticket_ref":"NBL-007-0235","provider":"Clarke (contractor)","amount_gbp":198.37,"vat":"plus_vat","items":["Replace two lounge spotlights",… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_quote |
| A3 | `record_work_result` | {"ticket_ref":"NBL-007-0235","outcome":"completed","evidence":"Contractor Clarke email 2025-10-08 16:28:25 UTC (event 031): \"All done at th… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_work_result |
| A4 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor), invoice no. 2311","amount_gbp":333.26,"who_pays":"agency","source":"event 031, e… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A5 | `hold_payment` | {"payee":"Clarke (contractor), invoice no. 2311","reason":"Invoice £333.26 inc VAT (£277.72 + VAT) exceeds the approved quote of £198.37 + V… | 1 | ✅ verified | HOLD-102 found in the hold_payment log |
| A6 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A8 | `escalate_to_human` | {"priority":"P2","team":"accounts","reason":"Contractor invoice no. 2311 (Clarke) is £333.26 inc VAT, above the landlord-approved £238.04 in… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |
| A9 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","purpose":"Check whether Clarke has replied with the invoice explanation and completion p… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |
| A10 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Waiting for Clarke's explanation of the invoice increase (£333.26 vs… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Failed or unverified actions
_None._
