# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider reported completion with an invoice 40% above the approved quote and no recorded visit or photos. I recorded the invoice, held payment, asked the provider to explain and evidence the work, asked the landlord for a decision on the extra, and updated the agency manager.

## Where the case stands
Job approved at £198.37 + VAT; provider says works done and invoiced £277.72 + VAT (£333.26 inc), about 40% over. Payment held. Waiting on Clarke (explanation, visit date, photos) and the landlord (decision on the extra). Property void, no tenant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to itemise the £79.35 + VAT increase, give attendance date and key handling, send photos and PDF invoice by 10 Oct | Clarke, contractor | email | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell landlord of the over-quote invoice and ask whether to approve the extra; payment held meanwhile | Landlord | email | A4 ✅ |
| 3 | WAIT | Review on 10 Oct; escalate to accounts P2 if the explanation does not settle it | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> - Invoice 2311 (£277.72 + VAT) is above your approved quote of £198.37 + VAT. Please itemise the difference and explain what extra work or materials were added.
> - What date did you attend, and who collected and returned the keys from the caretaker?
> - Please send the photos of the completed work (spotlights and ceiling board) and the invoice as a PDF.
> - Your email says 'the studio' - please confirm the works were at Flat 8, 168 Alder Lane.
> 
> Why: Invoice exceeds the landlord-approved quote and no visit is recorded; payment is on hold until explained. Please reply by 2025-10-10.

**A4 · request_landlord_approval → Landlord, Flat 8, 168 Alder Lane (landlord)** (verified)

> Clarke's invoice is £277.72 + VAT (£333.26 inc VAT) against the £198.37 + VAT quote you approved on 28 Sept. Do you approve the extra only if he justifies it?
> 
> Options: Hold at the approved quote £198.37 + VAT until Clarke explains the extra (recommended); Approve the full invoice £277.72 + VAT; Reject the extra
> 
> Update: Clarke reports the lounge works (two spotlights, ceiling board) done on 8 Oct; photos not yet received and visit date not yet confirmed. We have put the invoice on hold and asked him to itemise the difference, confirm the visit date and send photos by 10 Oct. Nothing extra will be paid without your approval. Property is empty, so no tenant involved.

**A5 · send_message → Maya Ashford (internal) via email, agency internal** (verified)

> NBL-007-0235 update: Clarke says works are done but invoiced £277.72 + VAT (£333.26 inc) vs approved £198.37 + VAT. Payment held, Clarke asked to explain, give visit date and photos by 10 Oct; landlord asked to decide on the extra. No visit was ever booked on the system. Job stays on hold; I will review on 10 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice and the hold do not approve payment or the extra cost
- Completion is unverified: no visit was booked or recorded and photos have not arrived, so no work result recorded and ticket not closed
- Landlord's 'Pls go ahead' covers only the £198.37 + VAT quote

## Remaining work
- Clarke: explanation, visit date, photos, PDF invoice
- Landlord decision on the extra
- Then record work result, file invoice, inform landlord and close (no tenant confirmation needed, void)
- Escalate to accounts P2 if unresolved on 10 Oct

## Missing or unavailable information
- Reason for the increase
- Visit date and who used caretaker keys
- Photos of the work
- Which property: provider says 'studio'

## Conflicts between sources
- record_invoice returned no flags although the invoice is about 40% above the quote; I treated the quote and landlord approval as authoritative and held payment.
- Provider calls the property 'the studio' while the job is Flat 8; keys message also said 'studio'.
- Check-out report dates the inspection 25 August 2026 but was signed 27 September 2025.
- Provider email event 023 names Harriet, rest names Clarke; treated as the same provider.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote £198.37 + VAT was approved by the landlord. The provider says the work is done and invoiced £277.72 + VAT (£333.26 inc). The invoice is over the approval, there is no visit record and photos are outstanding. Payment is held.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke asking him to explain the extra and give the visit date and photos by 10 Oct; email to the landlord asking for a decision on the extra; internal update to Maya; follow-up on 10 Oct.

**3. Does anything need a human decision, and why?**

The landlord must decide on the extra spend. No human escalation yet; escalate to accounts (P2) if Clarke's answer on 10 Oct does not settle the variance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (assigned contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Provider ema… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor, invoice 2311, NBL-007-0235)","reason":"Invoice £277.72 + VAT (£333.26 inc) is about 40% above approved quote £… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `request_information` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Invoi… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `request_landlord_approval` | {"landlord":"Landlord, Flat 8, 168 Alder Lane","ticket_ref":"NBL-007-0235","decision_needed":"Clarke's invoice is £277.72 + VAT (£333.26 inc… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A5 | `send_message` | {"recipient_name":"Maya Ashford","recipient_role":"internal","channel":"email","contact":"agency internal","ticket_ref":"NBL-007-0235","body… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke / landlord","purpose":"Check provider explanation, visit date and photos;… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
