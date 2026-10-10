# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider reported the work done with an invoice of £277.72 + VAT against the approved £198.37 + VAT. I recorded the invoice, held payment, asked the provider to explain, and told the landlord. A follow-up is set for 10 Oct.

## Where the case stands
Stage: result. Work reported done by the provider on 2025-10-08. Invoice 2311 is about 40% above the approved quote. Payment is held. Waiting on the provider for an explanation, photos and PDF. The landlord has been told. Property is void, so there is no tenant to message.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Clarke to explain the invoice overage and send the attendance date, PDF invoice and photos by 10 Oct | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Tell the landlord about the overage and that payment is held | Landlord | email | A4 ✅ |
| 3 | WAIT | Review on 2025-10-10; escalate to accounts (P2) if the explanation does not settle it | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update on NBL-007-0235. Invoice 2311 (£277.72 + VAT) is higher than your approved quote of £198.37 + VAT. Please send a written breakdown explaining the difference, plus the date you attended, the invoice as a PDF and the photos of the work. Payment is on hold until this is settled; any extra work needed approval from the landlord first. Please reply by 2025-10-10. Thanks, Maya

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, Clarke reports the lounge spotlights and ceiling board at Flat 8, 168 Alder Lane are done. However, his invoice is £277.72 + VAT (£333.26 inc VAT) against the £198.37 + VAT quote you approved. We have put payment on hold and asked him to explain the difference and send photos and the PDF invoice, by 10 October. Please don't pay anything yet. We will update you once he replies; if the extra isn't justified, we'll come back to you for a decision.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it
- The payment hold does not decide whether the extra is payable
- Work completion is not verified: no photos, visit date or PDF seen

## Remaining work
- Provider explanation, photos, PDF invoice, attendance date
- Landlord decision on any extra above £198.37 + VAT if the provider justifies it
- Close the ticket after checks (keys with caretaker: confirm returned)
- Accounts escalation if unresolved by 10 Oct

## Missing or unavailable information
- Reason for the £79.35 + VAT increase
- Visit date
- Photos
- Invoice PDF

## Conflicts between sources
- record_invoice returned no flags ('matches the approval') although the invoice exceeds the quote by about 40%; I trusted the figures in the emails.
- Provider emails say 'studio' but the property is Flat 8 with a lounge; likely a template wording issue.
- The check-out report is dated 25 August 2026, after today's date and the ticket creation.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The work is reported done but unverified. The invoice is about 40% over the approved quote. Payment is held. Photos, PDF invoice, explanation and visit date are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke asking for an explanation and evidence by 10 Oct, plus an email to the landlord. Follow-up FUP-104 is set.

**3. Does anything need a human decision, and why?**

Not yet. If the provider's answer does not settle the overage, escalate to accounts (P2) or ask the landlord to approve the extra.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Provider email 2025-1… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT (£333.26 inc) is about 40% above approved quote £… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","purpose":"Check provider's explanation of invoice 40% over quote; escalate to accounts i… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
