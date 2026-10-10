# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The lounge spotlight and ceiling repair was approved at £198.37 + VAT. The contractor reports it done but has invoiced £277.72 + VAT (£333.26 inc VAT), 40% over the approval. I recorded the quote and invoice, held the payment (HOLD-102), asked the landlord to approve or reject the increase (APR-103), and asked the contractor for photos and a breakdown. The ticket is on hold until 2025-10-15.

## Where the case stands
Work reported complete by contractor Clarke (email 2025-10-08 16:28) but not yet evidenced. Invoice 2311 for £277.72 + VAT (£333.26 inc VAT) is 40% over the landlord-approved quote of £198.37 + VAT. Payment is on hold (HOLD-102). Ticket NBL-007-0235 is on hold waiting for the landlord's decision on the overrun, with a review date of 2025-10-15. Property is recorded as NOT TENANTED (void).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to approve or reject the £79.35 + VAT (40%) overrun on invoice 2311, with options set out in APR-103 | Landlord of Flat 8, 168 Alder Lane | internal | A5 ✅ |
| 2 | CHASE_PROVIDER | Ask contractor Clarke for photos of the completed work and a breakdown of the £79.35 + VAT difference | Clarke, contractor | email | A6 ✅ |
| 3 | WAIT | Keep invoice payment on hold (HOLD-102) until the landlord decides and the contractor's evidence is in; review 2025-10-15 | Clarke, contractor / accounts | internal | A7 ✅ |

## Messages sent (verbatim)
**A5 · request_landlord_approval → Landlord of Flat 8, 168 Alder Lane (per case record) (landlord)** (verified)

> Approve an increase from the approved £198.37 + VAT to the contractor's final invoice 2311 of £277.72 + VAT (£333.26 inc VAT), a rise of £79.35 + VAT (40%). The work is reported complete. The invoice is on hold until you decide. (£333.26)
> 
> Options: Approve the invoice at £277.72 + VAT (£333.26 inc VAT), with the contractor's variance explained and photos received; Approve only the original quote of £198.37 + VAT and ask the contractor to reduce the invoice; Decline the increase and have the contractor's invoice queried

**A6 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke,
> 
> Thank you for letting us know the work at Flat 8, 168 Alder Lane is done.
> 
> Your invoice no. 2311 is £277.72 plus VAT. The approved quote was £198.37 plus VAT. We cannot pay above the approved amount without the landlord's agreement, so we have put the invoice on hold while we check this with the landlord.
> 
> Please send:
> 1. The photos you mentioned, showing the two spotlights and the ceiling board after replacement.
> 2. A short breakdown explaining the difference of £79.35 plus VAT (for example extra parts or labour).
> 
> Regards
> Maya
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The contractor's email saying the work is done is not verified. No photos have been received and no agency inspection has taken place.
- Recording the invoice does not approve payment. The hold stands.
- The landlord's approval of the £198.37 + VAT quote does not cover the increased invoice.
- Nothing here decides who ultimately pays, or whether the landlord will be charged on a void property.

## Remaining work
- Landlord decision on the £79.35 + VAT overrun (APR-103, review 2025-10-15), owned by the agency manager.
- Contractor photos and variance breakdown, owned by Clarke.
- Release or adjust HOLD-102 once decided; then file the invoice and photos, and close the ticket with the landlord informed.
- Confirm the landlord's contact details, because the property record shows none.

## Missing or unavailable information
- Photos of the completed work (promised by contractor, not received).
- Reason for the £79.35 + VAT increase over the approved quote.
- Landlord's decision on the increase.
- Landlord contact details: none found on the property record for the approval email.

## Conflicts between sources
- The invoice check (A2) returned 'Invoice matches the approval', but £333.26 inc VAT (£277.72 + VAT) does not match the approved £198.37 + VAT (£238.04 inc VAT). I trusted the arithmetic and the source email, so the hold was placed.
- The contractor email (event 025) refers to 'the studio', but the job is for Flat 8 lounge. The contractor's 'all done at the studio' wording may be a template error. Confirm with photos.
- The check-out report is dated 25 August 2026, but the case is in October 2025. Treated as a record date error; no effect on the repair scope.
- The property is shown as NOT TENANTED (event 015), so the ticket was moved to Paused. The ticket record shows stage 'result' and a waiting-for-provider hold. Treated as a void property with the landlord paying.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

The quote of £198.37 + VAT was approved on 28 Sep 2025. Contractor Clarke reports the work done on 8 Oct 2025 and has invoiced £277.72 + VAT (£333.26 inc VAT). That is 40% over the approval, so payment is on hold. Outstanding: landlord decision on the overrun, contractor photos and breakdown, invoice payment, and job closure. The property is void, so no tenant contact is needed.

**2. 2. What is the next action, who is it for, and through which channel?**

(a) Ask the landlord to approve or reject the £79.35 + VAT overrun, via approval request APR-103 (internal; no landlord contact on file, so it needs routing). (b) Email Clarke, contractor, on the existing thread (event 031): ask for photos of the completed work and a breakdown of the increase. Both are done and verified (A5, A6). Payment hold HOLD-102 (A3) stays in place.

**3. 3. Does anything need a human decision, and why?**

Yes. Approving spend above the approved quote is the landlord's decision, not the agency's. The landlord must approve or reject the £79.35 + VAT overrun. Until then no payment should be released. Nothing else needs escalation at this stage.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-007-0235","provider":"Clarke (contractor)","amount_gbp":198.37,"vat":"plus_vat","items":["Replace two lounge spotlights",… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_quote |
| A2 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Contractor email 2025… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A3 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311","reason":"Invoice £277.72 + VAT (£333.26 inc VAT) exceeds the landlord-approved quote of £198.3… | 1 | ✅ verified | HOLD-102 found in the hold_payment log |
| A4 | `record_work_result` | {"ticket_ref":"NBL-007-0235","outcome":"completed","evidence":"Contractor Clarke email 2025-10-08 16:28 (event 031): \"All done at the studi… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_work_result |
| A5 | `request_landlord_approval` | {"landlord":"Landlord of Flat 8, 168 Alder Lane (per case record)","decision_needed":"Approve an increase from the approved £198.37 + VAT to… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A6 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Landlord","comment":"Landlord decision needed on invoice 2311 (£277.72 + VAT, £333.26 inc… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Failed or unverified actions
_None._
