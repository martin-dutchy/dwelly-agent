# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Clarke reports the lounge works done, but invoice 2311 is £333.26 inc VAT against an approved £238.04. I recorded the landlord approval and the invoice, held payment, asked Clarke to explain and send the PDF and photos, and told the landlord. The property is void, so there is no tenant to message.

## Where the case stands
Stage result, on hold (Waiting for Provider, review 2025-10-13). Works reported done; invoice 2311 £333.26 inc VAT is about 40% over the approved £238.04 inc VAT; payment held. Awaiting provider explanation, invoice PDF and photos.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the invoice overage and send invoice PDF and photos | Clarke, contractor | email | A4 ✅ |
| 2 | OTHER | Tell landlord of the overage, that payment is held, and when they will next hear | Landlord | email | A5 ✅ |
| 3 | WAIT | Wait for provider reply; review 13 Oct | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for letting us know the works are done. Invoice 2311 is £277.72 + VAT (£333.26 inc VAT), but the approved quote was £198.37 + VAT for two spotlights and one ceiling board. Please can you explain the difference, and send the invoice as a PDF plus the photos of the completed work. Payment is on hold until this is cleared. Any extra work needed landlord approval first. Regards, Maya

**A5 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Good afternoon. Clarke reports the lounge works at Flat 8, 168 Alder Lane are done (two spotlights and one ceiling board). His invoice is £277.72 + VAT (£333.26 inc VAT), against the £198.37 + VAT quote you approved. We have not approved the extra and have put payment on hold while we ask him to explain the difference. We will update you by 15 October. No action needed from you yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it; only £238.04 inc VAT is authorised
- Completion is the contractor's claim; no photos or PDF seen yet
- Holding payment does not decide whether the extra is justified

## Remaining work
- Review provider's explanation by 13 Oct; if unsettled, escalate to accounts P2 or ask landlord to approve the variance
- Obtain photos and invoice PDF
- Close ticket (final_checks) once invoice is resolved and landlord informed
- Confirm caretaker keys are back, if applicable

## Missing or unavailable information
- Reason for the £79.35 + VAT increase
- Invoice PDF
- Completion photos
- Attachment-07 on event 005 not in case files

## Conflicts between sources
- Inspection report is dated 25 August 2026, after the 2025 case dates, and the emails call the flat a 'studio'; treated as data errors, not a different property.
- Provider email event 023 is signed Harriet; the contractor is Clarke. Same thread, treated as the same firm.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works reported complete by the provider. The invoice is about 40% over the approved quote. Outstanding: the provider's explanation, the invoice PDF and photos, the landlord's view on any variance, then close.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke asking for an explanation, the PDF and photos (done), and an email to the landlord with an update (done). Review 13 Oct.

**3. Does anything need a human decision, and why?**

Not yet. Payment is held and the provider has been asked. If the answer does not settle it by 13 Oct, escalate to accounts (P2) or ask the landlord to approve the variance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-007-0235","decision":"approved","evidence_quote":"Pls go ahead","source":"event 011, email 28/09, in reply to quote of £1… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_landlord_decision |
| A2 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"agency","source":"Provider email event 031, 2025… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A3 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £333.26 inc VAT (£277.72 + VAT) is about 40% above approved quo… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A4 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `update_ticket` | {"ref":"NBL-007-0235","note":"Provider reports completion (event 031); property void so no tenant confirmation needed. Invoice 2311 40% over… | 1 | ✅ verified | Ticket NBL-007-0235 read back at stage result |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Explanation of invoice 2311 being above quote, invoice PDF and compl… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Failed or unverified actions
_None._
