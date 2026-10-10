# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Clarke says the lounge spotlights and ceiling board are replaced, but invoiced £277.72 + VAT (£333.26 inc VAT) against an approved £198.37 + VAT quote. I recorded the work result and invoice, held payment, asked Clarke to explain, told the landlord, and set a hold review for 10 Oct. No human decision is needed yet.

## Where the case stands
Work reported done by provider; invoice 2311 recorded but about 40% over the approved quote. Payment held (HOLD-101). Waiting on Clarke for an explanation and photos; review 2025-10-10. Property void, so no tenant involved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the £79.35 + VAT overage, send photos, and confirm the works were in the lounge (he wrote 'studio') | Clarke, contractor | email | A4 ✅ |
| 2 | OTHER | Tell landlord the work is reported done, the invoice is over quote, payment is held and nothing above the quote will be paid without their say-so | Landlord | email | A5 ✅ |
| 3 | WAIT | Hold until 2025-10-10 for the provider's answer; then escalate to accounts (P2) if unexplained or unsupported | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update on NBL-007-0235. Invoice 2311 (£277.72 + VAT) is about 40% above the approved quote of £198.37 + VAT. The landlord approved the quote figure only. Please send a breakdown of what accounts for the extra and any evidence that extra work was agreed. Please also send the photos of the completed work. We are holding payment until this is cleared. Also, your email says "studio"; please confirm the works were done in the lounge at Flat 8, 168 Alder Lane. Regards, Maya

**A5 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Good afternoon. Clarke reports the lounge works at Flat 8, 168 Alder Lane (two spotlights and ceiling board) are done; photos are to follow. The invoice is £277.72 + VAT (£333.26 inc VAT), against the £198.37 + VAT quote you approved. We have not approved the extra and are holding payment while we ask Clarke to explain the difference. We will update you once we have his answer, and will come to you before anything above the quote is paid. Regards, Maya

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work result is based on the provider's word only; photos not yet seen, so the work is not independently verified.
- Holding payment does not decide whether the extra is justified.
- The invoice is not approved for payment and the landlord has not agreed the extra.

## Remaining work
- Provider to explain overage and send photos (owner: provider, review 2025-10-10)
- Landlord decision on any extra above £198.37 + VAT if the provider justifies it
- Accounts escalation if unresolved
- Keys: caretaker held them; confirm they are returned before closing
- Close ticket only after invoice resolved and photos filed

## Missing or unavailable information
- Breakdown or justification for the extra £79.35 + VAT
- Completion photos
- Visit date was never recorded in the system; provider said done on or before 8 Oct

## Conflicts between sources
- The invoice check returned no flags ('matches the approval') although £333.26 inc VAT exceeds £198.37 + VAT (about £238.04 inc VAT); I trusted the figures in the provider's email.
- Provider says 'studio' while the property is Flat 8 with a lounge; asked him to confirm.
- Check-out report dated 25 Aug 2026 but signed 27 Sep 2025; date inconsistency noted.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The work is reported complete by the provider (photos to follow). The invoice is about 40% over the approved quote, so payment is held. Outstanding: the provider's explanation, the photos, any landlord decision on extra spend, key return and closure.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke (contractor) asking for the overage breakdown and photos, plus an email to the landlord about the over-quote invoice and held payment. Then wait until 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. If Clarke cannot justify the overage by the review date, escalate to accounts (P2). Any payment above the approved figure needs the landlord's decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"agency","source":"Provider email event 031, 2025… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT is about 40% above the approved quote of £198.37 … | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `record_work_result` | {"ticket_ref":"NBL-007-0235","outcome":"completed","evidence":"Provider email 2025-10-08 (event 031) says two spotlights and ceiling board r… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_work_result |
| A4 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Waiting for Clarke to explain invoice 2311 (40% over quote) and send… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Failed or unverified actions
_None._
