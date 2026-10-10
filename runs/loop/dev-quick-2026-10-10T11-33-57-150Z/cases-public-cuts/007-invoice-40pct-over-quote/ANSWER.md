# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Clarke completed the approved lounge work (two spotlights and ceiling board) and invoiced £277.72 plus VAT, 40% above the approved £198.37 plus VAT. I recorded the quote and the landlord's approval, held payment (HOLD-102), asked Clarke for an itemised invoice and photos, and asked the landlord to decide on the excess. The job stays on hold until both reply, with a review on 2025-10-10.

## Where the case stands
Work reported complete by contractor Clarke (email 2025-10-08, event 031). Invoice 2311 is £277.72 plus VAT (£333.26 inc VAT), 40% above the landlord-approved £198.37 plus VAT (£238.04 inc VAT). Payment is held (HOLD-102). Job is on hold waiting for the provider's itemisation and photos and the landlord's decision on the excess. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask contractor Clarke to itemise invoice 2311, explain the increase over the approved quote, and send the completion photos | Clarke, contractor | email | A6 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to decide whether to approve the £333.26 inc VAT invoice or limit payment to the approved £238.04 inc VAT | Landlord, Flat 8, 168 Alder Lane | email | A7 ✅ |
| 3 | WAIT | Payment to Clarke held (HOLD-102) pending explanation and landlord decision; job on hold with review 2025-10-10 | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A6 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke,
> 
> Thank you for letting us know the work at Flat 8, 168 Alder Lane is done.
> 
> Your approved quote was £198.37 plus VAT for two spotlights and one ceiling board. Invoice 2311 is £277.72 plus VAT. Could you please:
> 1. Explain the difference from the approved quote, and itemise the invoice (parts, labour, any extra items).
> 2. Send the photos of the completed work, which you said would follow.
> 
> We have put payment on hold until this is clear. The landlord is being asked to decide on the higher amount.
> 
> Regards
> Maya
> Northbridge Lettings

**A7 · request_landlord_approval → Landlord, Flat 8, 168 Alder Lane (existing thread, event 009 email) (landlord)** (verified)

> Clarke has completed the lounge spotlight and ceiling board work. His invoice 2311 is £277.72 plus VAT (£333.26 inc VAT), which is above the £198.37 plus VAT (£238.04 inc VAT) you approved. Do you approve the higher amount of £333.26 inc VAT, or do you want the invoice reduced to the approved figure? Payment is on hold until you decide. (£333.26)
> 
> Options: Approve £333.26 inc VAT (£277.72 plus VAT) as invoiced, once the provider has itemised it; Limit payment to the approved £238.04 inc VAT and ask Clarke to justify or reduce the difference (recommended until the provider explains the 40% increase)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work as completed does not confirm quality; photos have not been received.
- The landlord's approval of the £198.37 plus VAT quote does not cover the higher invoice amount.
- Nothing here confirms who pays for the work; the invoice is recorded as agency-paid, which is an unverified assumption.
- The landlord has not yet decided on the excess; no further spend is authorised.
- The property is not tenanted, so no tenant message was sent.

## Remaining work
- Provider to itemise invoice 2311 and send photos (Clarke). Review 2025-10-10.
- Landlord to decide on the £79.35 plus VAT (£95.22 inc VAT) excess over the approved quote (APR-104). Deadline 2025-10-15.
- Once resolved: record the invoice outcome, release or adjust HOLD-102, file photos and invoice, confirm keys (caretaker) and close.

## Missing or unavailable information
- Itemised invoice and reason for the increase from £198.37 to £277.72 plus VAT
- Completion photos (stated as to follow)
- Landlord decision on the excess
- Landlord's name (not on file in the case)
- Confirmation of who pays for the works (landlord or agency)
- Check-out report appointment date (25 August 2026) is inconsistent with its 27 September 2025 signature

## Conflicts between sources
- Check-out report shows appointment date 25 August 2026 but was signed 27 September 2025; treated as a record error and not relied on.
- Invoice total (£277.72 plus VAT) differs from the approved quote (£198.37 plus VAT); the invoice is not accepted as approved.
- Bathroom cleaning and items-left issues in the same report are not part of this job's request and were not actioned.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Work is reported complete but not closed. The approved quote was £198.37 plus VAT (landlord said 'Pls go ahead'). The invoice is £277.72 plus VAT (£333.26 inc VAT), above the approved amount. Outstanding: itemised invoice, completion photos, landlord decision on the excess, and who pays. Payment is on hold.

**2. What is the next action, who is it for, and through which channel?**

Email Clarke to itemise the invoice, explain the increase and send photos (A6). Ask the landlord by email to approve £333.26 inc VAT or limit payment to £238.04 inc VAT (A7). Payment hold HOLD-102 (A4). Review 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. The landlord must decide whether to approve spend above their approval. Escalate to accounts (P2) only if Clarke's explanation does not resolve the difference by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-007-0235","provider":"Clarke (contractor)","amount_gbp":198.37,"vat":"plus_vat","items":["Replace two spotlights","Replac… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_quote |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-007-0235","decision":"approved","evidence_quote":"Pls go ahead","source":"Landlord email, 2025-09-28 16:27 (event 011), r… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_landlord_decision |
| A3 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor), invoice no. 2311","amount_gbp":333.26,"who_pays":"agency","source":"Contractor e… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A4 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311","reason":"Invoice £277.72 plus VAT (£333.26 inc VAT) is about 40% above the approved quote of £… | 1 | ✅ verified | HOLD-102 found in the hold_payment log |
| A5 | `record_work_result` | {"ticket_ref":"NBL-007-0235","outcome":"completed","evidence":"Contractor Clarke email 2025-10-08 16:28 (event 031): \"All done at the studi… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_work_result |
| A6 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `request_landlord_approval` | {"ticket_ref":"NBL-007-0235","landlord":"Landlord, Flat 8, 168 Alder Lane (existing thread, event 009 email)","decision_needed":"Clarke has … | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A8 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Waiting for Clarke to itemise invoice 2311 (£277.72 plus VAT vs appr… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Failed or unverified actions
_None._
