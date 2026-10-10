# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Clarke reports the lounge works done and invoiced £277.72 + VAT (£333.26 inc) against an approved £198.37 + VAT. I recorded the invoice and work result, held payment, asked the provider to explain, told the landlord and set a follow-up for 10 Oct.

## Where the case stands
Stage: result. Work reported complete by Clarke on 2025-10-08. Invoice 2311 (£333.26 inc VAT) is about 40% above the approved quote and payment is held. Waiting on the provider's explanation and photos. Property is vacant, so there is no tenant to message. Ticket cannot close yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the £79.35 + VAT overage and send a breakdown and photos | Clarke, contractor | email | A4 ✅ |
| 2 | OTHER | Tell landlord about the over-quote invoice and the payment hold; no action needed from them yet | Landlord | email | A5 ✅ |
| 3 | WAIT | Review provider's reply on 2025-10-10; escalate to accounts (P2) if unresolved | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update on NBL-007-0235. Invoice 2311 is £277.72 + VAT, but the approved quote was £198.37 + VAT for two spotlights and one ceiling board. Please can you explain the difference and send a breakdown of any extra work or materials, along with the photos you mentioned? We can't process payment until this is settled, as the landlord approved the quote figure only. Regards, Maya

**A5 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, Clarke says the lounge works at Flat 8, 168 Alder Lane are done (two spotlights and the ceiling board). His invoice is £277.72 + VAT (£333.26 inc VAT), against the £198.37 + VAT quote you approved. That is about 40% higher. We have put payment on hold and asked him to explain and send photos. We have not approved the extra. We will update you once he replies, and you do not need to do anything yet. Regards, Maya

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice and work result does not approve the extra cost or authorise payment.
- Completion is the provider's claim only; photos not yet seen.
- The landlord has not been asked to approve a variation.

## Remaining work
- Provider explanation and photos (Clarke)
- If extra is justified, landlord decides on the variation; otherwise payment stays at the approved quote
- Then close_ticket after invoice settled and landlord informed
- Accounts escalation if unresolved by 2025-10-10

## Missing or unavailable information
- Reason for invoice exceeding the quote
- Completion photos
- Attachment at event 005 was not in the case files

## Conflicts between sources
- The invoice check returned no flags, but the invoice is clearly above the quote (£333.26 vs £198.37 + VAT); I treated it as over-quote and held payment.
- The contractor says 'studio' while the property is Flat 8. The property and job ID match, so I treated it as the same job.
- The inspection report is dated 25 Aug 2026 but was signed 27 Sep 2025; this does not affect the work.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Work is reported complete, but the invoice is about 40% over the approved quote. Payment is on hold. Outstanding: the provider's explanation, photos, any landlord decision on the extra, then final checks and closure.

**2. What is the next action, who is it for, and through which channel?**

Email Clarke (sent) asking for an explanation and photos. Email the landlord (sent) with the status. Follow up on 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. If Clarke's answer does not justify the overage, escalate to accounts (P2). Any extra above the approved quote needs landlord approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Provider email event … | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £277.72+VAT (£333.26 inc) is about 40% above approved quote £19… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `record_work_result` | {"ticket_ref":"NBL-007-0235","outcome":"completed","evidence":"Provider email event 031 (2025-10-08) says two spotlights and ceiling board r… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_work_result |
| A4 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Check provider's explanation of invoice 2311 overage and phot… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
