# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Clarke reports works done but invoiced £277.72 + VAT against an approved £198.37 + VAT. I recorded the quote and invoice, held payment, asked Clarke to explain and send photos, informed the landlord and set a follow-up for 10 Oct.

## Where the case stands
Stage: result. Works reported complete by Clarke (event 031). Invoice 2311 £333.26 inc VAT is ~40% above approved quote £198.37 + VAT (£238.04 inc). Payment held. Waiting on provider explanation and photos; landlord informed. Property is void, so no tenant messages.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Clarke to explain the invoice overage item by item and send photos; payment on hold | Clarke, contractor | email | A4 ✅ |
| 2 | OTHER | Tell landlord about completion and the invoice overage; no payment above approval without their agreement | Landlord | email | A5 ✅ |
| 3 | WAIT | Review 10 Oct for provider's reply; escalate to accounts (P2) if unresolved | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for completing the works at Flat 8, 168 Alder Lane (Job NBL-007-0235). Invoice 2311 is £277.72 + VAT (£333.26 inc VAT), but the approved quote was £198.37 + VAT for two spotlights and one ceiling board. Could you please explain the difference item by item (extra materials, labour or additional work)? Please also send the photos you mentioned. Payment is on hold until this is clarified; any extra cost needs the landlord's approval. Regards, Maya, Northbridge Lettings

**A5 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Good afternoon. Clarke reports the works at Flat 8, 168 Alder Lane are complete (two spotlights and one ceiling board replaced). However, his invoice is £277.72 + VAT (£333.26 inc VAT) against the £198.37 + VAT quote you approved. We have put payment on hold and asked him to explain the difference and send photos. We will not pay above the approved figure without your agreement, and will update you once he replies (by 13 October). Regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Completion is the contractor's claim only; no photos seen yet and nothing verified on site
- Holding payment does not decide whether the extra is justified
- Landlord has not approved any amount above £198.37 + VAT
- Ticket not closed

## Remaining work
- Provider explanation and photos (agency/Maya)
- Landlord decision on any extra cost if justified
- Confirm keys back from caretaker
- Close ticket after invoice resolved
- If unresolved by 10 Oct, escalate to accounts P2

## Missing or unavailable information
- Reason for the £79.35 + VAT increase
- Completion photos
- Confirmation of keys returned by caretaker
- Attachment-07 on event 005 not seen

## Conflicts between sources
- record_invoice returned no flags ('matches the approval') although the invoice exceeds the quote by ~40%; I trusted the documents and held payment. Quote recorded as £238.04 inc VAT.
- Inspection report dated 25 Aug 2026 but signed 27 Sep 2025; emails refer to 'studio' for Flat 8. Neither affects the action.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works reported complete; invoice about 40% over approved quote; payment held; photos, explanation, keys return and landlord decision outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Clarke (contractor) for an itemised explanation and photos (done); email landlord informing them (done); follow-up 10 Oct.

**3. Does anything need a human decision, and why?**

Not yet. If Clarke's answer does not settle the overage by the review date, escalate to accounts P2; any extra above the approved figure needs the landlord's decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-007-0235","provider":"Clarke","amount_gbp":198.37,"vat":"plus_vat","items":["Replace two spotlights","Replace one ceiling… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_quote |
| A2 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke","amount_gbp":333.26,"who_pays":"agency","source":"event 031 email 2025-10-08, invoice no. 231… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A3 | `hold_payment` | {"payee":"Clarke (invoice 2311, NBL-007-0235)","reason":"Invoice £277.72 + VAT (£333.26 inc) is about 40% above approved quote £198.37 + VAT… | 1 | ✅ verified | HOLD-102 found in the hold_payment log |
| A4 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Chase explanation of invoice 2311 overage and photos; escalat… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
