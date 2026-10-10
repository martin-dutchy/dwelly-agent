# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor says the works are done and invoiced £277.72 + VAT against a £198.37 + VAT approved quote. I recorded the invoice, held payment, asked the contractor to explain and send photos, informed the landlord and set a follow-up for 2025-10-13.

## Where the case stands
Stage: result, on hold (Waiting for Provider). Work reported done by Clarke; invoice £333.26 inc VAT is about 40% above the approved quote. Payment held. Provider asked to explain and send photos; landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the invoice difference, itemise it, and send photos and attendance date by 2025-10-13 | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Tell landlord of the invoice overage and the payment hold | Landlord | email | A4 ✅ |
| 3 | WAIT | Review on 2025-10-13; escalate to accounts P2 if the explanation does not settle the overage | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update. Invoice 2311 (£277.72 + VAT) is higher than the approved quote of £198.37 + VAT. Please explain the difference in writing, with an itemised breakdown, by 2025-10-13. Please also send the photos of the completed work and the date you attended. Payment is on hold until we have these. Any extra work needed approval from the landlord first. Regards, Maya

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, Clarke says the lounge works (two spotlights and ceiling board) at Flat 8, 168 Alder Lane are done. His invoice is £277.72 + VAT (£333.26 inc VAT), against the £198.37 + VAT quote you approved. We have not approved the extra and have put payment on hold while we ask him to explain and send photos. We will update you by 2025-10-13. No action needed from you now.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it
- Payment hold does not decide whether the extra is valid
- Work completion is unverified until photos and an attendance date arrive
- Landlord approval covers only £198.37 + VAT

## Remaining work
- Provider explanation, photos and attendance date
- Landlord decision on any extra above the quote if the explanation is credible
- Accounts escalation if unresolved by 2025-10-13
- Close the ticket after the checks; no tenant, as the property is void

## Missing or unavailable information
- Reason for the extra £79.35 + VAT
- Photos (promised)
- Visit date

## Conflicts between sources
- record_invoice returned no flags ('matches the approval') although the invoice is about 40% above the quote; I trusted the figures in the documents and held payment.
- The contractor's emails call the property a 'studio', but the address is Flat 8; the same address and job ID were used, so I treated it as the same job.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The work is reported done but unverified (no photos or visit date). The invoice is about 40% over the approved quote. Payment is held and the explanation is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke asking for an itemised explanation, photos and the attendance date by 2025-10-13. The landlord was also emailed.

**3. Does anything need a human decision, and why?**

Not yet. If Clarke's answer does not settle the overage by 2025-10-13, escalate to accounts (P2). Any extra spend above the quote needs the landlord's approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Provider email event … | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT (£333.26 inc) is about 40% above approved quote £… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-13","party":"Clarke","purpose":"Chase explanation of invoice 2311 overage, photos and attenda… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `add_note` | {"entity":"NBL-007-0235","note":"Invoice 2311 £333.26 inc VAT vs quote £198.37+VAT (£238.04 inc); system flagged no mismatch but it is ~40% … | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
