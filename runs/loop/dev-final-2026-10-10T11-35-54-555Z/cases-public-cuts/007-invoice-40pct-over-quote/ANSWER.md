# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Clarke reports the lounge works done and invoiced £277.72 + VAT (£333.26 inc VAT) against the £198.37 + VAT quote the landlord approved. I recorded the invoice, held payment, asked Clarke to explain the difference and send photos, and told the landlord. A follow-up is set for 2025-10-10.

## Where the case stands
Work reported complete by provider 2025-10-08; invoice 2311 recorded and payment held as it is about 40% above the approved quote. Waiting on the provider for a breakdown and photos. Landlord told. Property is void, so no tenant messages are needed. Ticket not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the extra £79.35 + VAT and send completion photos | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Tell the landlord the invoice exceeds the approved quote and that payment is held | Landlord | email | A4 ✅ |
| 3 | WAIT | Review on 2025-10-10; escalate to accounts (P2) if the provider's answer does not settle it | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update. Invoice 2311 (£277.72 + VAT) is higher than the approved quote of £198.37 + VAT, and we have no variation approved by the landlord. Please send a breakdown of the extra £79.35 + VAT and why it was needed. Please also send the photos of the completed work as a PDF or plain email attachment. We are holding payment until this is clarified. Regards, Maya

**A4 · send_message → Landlord (landlord) via email, existing thread (event 011 email)** (verified)

> Hello, Clarke has reported the lounge spotlights and ceiling board at Flat 8, 168 Alder Lane as replaced. His invoice is £277.72 + VAT (£333.26 inc VAT), against the £198.37 + VAT you approved. We have not agreed the difference and are holding payment while we ask him to explain. We will come back to you once we hear. No action needed from you yet. Regards, Maya

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it or the extra amount
- Holding payment does not decide whether the overage is valid
- Work completion is by the provider's word only; photos not yet seen
- Nothing here approves any variation

## Remaining work
- Provider to explain the overage and send photos (Clarke)
- Landlord decision on any variation if the provider justifies it
- Escalate to accounts if unresolved on 2025-10-10
- Release or adjust payment, then close with final checks; confirm keys returned from the caretaker

## Missing or unavailable information
- Breakdown of the invoice overage
- Completion photos
- Original quote attachment (attachment-07) not seen
- Confirmation that the caretaker keys were returned

## Conflicts between sources
- record_invoice returned no flags and 'matches the approval', but the invoice is £79.35 + VAT above the quote; I trusted the figures in the documents and held payment.
- Provider and agency emails call the property a 'studio' while the address is Flat 8; the check-out report is dated 2026 but signed 2025. Neither blocks this step.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The works are reported complete, but the invoice is about 40% over the approved quote. Payment is held. Outstanding: the provider's explanation, photos, any landlord decision on the variation, key return and closing.

**2. What is the next action, who is it for, and through which channel?**

Email Clarke asking for the breakdown and photos (sent). Email the landlord to say payment is held (sent). Review on 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. If Clarke's answer does not settle the overage by 2025-10-10, escalate to accounts at P2. The landlord must approve any amount above the quote.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor, invoice no. 2311)","amount_gbp":333.26,"who_pays":"agency","source":"Provider ema… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (invoice 2311, NBL-007-0235)","reason":"Invoice £277.72 + VAT (£333.26 inc) is about 40% above approved quote £198.37 + VAT… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Chase breakdown of invoice 2311 overage and completion photos… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
