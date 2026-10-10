# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Contractor says the lounge works are done but invoiced about 40% over the approved quote. I recorded the invoice, held payment, asked Clarke to justify it and send photos, asked the landlord to decide on the excess, informed Maya, and set a 13 Oct review.

## Where the case stands
On hold (waiting for provider). Contractor reports work done, invoice £333.26 inc VAT vs approved £198.37 + VAT. Payment held. Landlord asked about the excess. Photos and visit date outstanding. Property void.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to itemise the extra £79.35 + VAT, send photos, attendance date and confirm the property, by 13 Oct | Clarke, contractor | email | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell landlord of the overrun, payment held, and ask whether they accept the higher amount | Landlord | email | A4 ✅ |
| 3 | WAIT | Hold and follow-up on 13 Oct; escalate P2 accounts if unresolved | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> - Invoice 2311 is £277.72 + VAT against your approved quote of £198.37 + VAT. Please itemise the extra £79.35 + VAT and say why it was not raised before the work.
> - Please send the photos of the completed work, and the date you attended and who collected the keys from the caretaker.
> - Your email says 'the studio'; please confirm the work was at Flat 8, 168 Alder Lane.
> 
> Why: Invoice is above the approved quote; payment is on hold until explained. Please reply by 2025-10-13.

**A4 · request_landlord_approval → Landlord (landlord)** (verified)

> Clarke reports the lounge works (two spotlights, ceiling board) done, but invoiced £277.72 + VAT (£333.26 inc VAT) against the £198.37 + VAT you approved. Do you agree to pay the higher amount? (£333.26)
> 
> Options: Hold at the approved £198.37 + VAT while we ask Clarke to justify the extra (recommended); Approve the higher invoice of £277.72 + VAT
> 
> Update: Payment is on hold and nothing will be paid above your approval without your say-so. We have asked Clarke to itemise the difference and send photos by 13 Oct. We will update you by then.

**A7 · send_message → Maya Ashford (internal) via email, existing thread (event 001 request)** (verified)

> Update on NBL-007-0235 (Flat 8, 168 Alder Lane): Clarke says the works are done but invoiced £333.26 inc VAT (£277.72 + VAT) against the approved £198.37 + VAT. Payment is held, Clarke is asked to itemise and send photos by 13 Oct, and the landlord is asked whether they accept the extra. Job on hold, review 13 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it
- The hold does not decide who pays or whether the extra is justified
- Work completion is the contractor's claim, unverified until photos arrive

## Remaining work
- Clarke: explanation, photos, attendance date (by 13 Oct)
- Landlord: decision on excess
- Agency: review 13 Oct, then close or escalate to accounts
- Caretaker key return not confirmed

## Missing or unavailable information
- Itemisation of the extra cost
- Photos
- Visit date
- Landlord decision on higher amount

## Conflicts between sources
- record_invoice returned no flags though the invoice is ~40% over quote; trusted the quote/approval figures
- Check-out report dated 25 Aug 2026 but signed 27 Sep 2025
- Contractor refers to 'the studio'; job is Flat 8
- Provider names Clarke and Harriet; no visit date in system

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Contractor claims works complete; invoice £277.72 + VAT (£333.26 inc) exceeds approved £198.37 + VAT. Photos, itemisation, visit date, landlord decision on the excess and key return are outstanding. Job paused as property is void.

**2. What is the next action, who is it for, and through which channel?**

Payment held; Clarke asked by email to explain the overrun and send photos; landlord asked by email to decide on the excess; review 13 Oct.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the extra spend. If Clarke's answer doesn't settle it by 13 Oct, escalate P2 to accounts.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor, invoice no. 2311)","amount_gbp":333.26,"who_pays":"agency","source":"Provider ema… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT (£333.26 inc) is about 40% above the approved quo… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `request_information` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Invoi… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-007-0235","amount_gbp":333.26,"decision_needed":"Clarke reports the lounge works (two spotlights, c… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Invoice 2311 £333.26 inc VAT is above approved £198.37 + VAT. Awaiti… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |
| A6 | `add_note` | {"entity":"NBL-007-0235","note":"Conflicts: record_invoice returned no flags though invoice exceeds quote by ~40%; treating as over-quote. C… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A7 | `send_message` | {"recipient_name":"Maya Ashford","recipient_role":"internal","channel":"email","contact":"existing thread (event 001 request)","ticket_ref":… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A8 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-13","purpose":"Check Clarke's itemisation/photos and landlord reply on invoice over quote; es… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
