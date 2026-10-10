# Case 112: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord chose Eliza Bennett's £1,370 quote on the phone. I recorded the decision, the quote and the approval, then messaged Eliza for dates and the invoice and updated the landlord. The case is on hold until 19 May.

## Where the case stands
Void flat. Landlord approved Eliza Bennett's £1,370 (no VAT) quote by phone on 14/05. Waiting on Eliza for start dates and the resent invoice; hold review 2025-05-19.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Asked Eliza Bennett to approve-confirm start dates and resend invoice; agency-key access | Eliza Bennett, contractor | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord approval is recorded, asked for the address of the other flat with the roof leak | Mr Langley, landlord | email | A5 ✅ |
| 3 | WAIT | Hold until 2025-05-19 for contractor dates/invoice | Eliza Bennett | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Eliza Bennett (contractor) via email, existing thread (event 003/027 contractor email)** (verified)

> Hello Eliza, the landlord has approved your quote of £1,370 (no VAT) for the check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ (job NBL-008-3466). Please reply with the dates you can start and how long it will take; the flat is empty so access will be by agency key. The landlord has also asked you to resend your invoice from the previous refurb so he can check it. Please send it by reply. Thanks, Northbridge Lettings

**A5 · send_message → Mr Langley (landlord) via email, agency landlord record** (verified)

> Hi Mr Langley, thanks for your call. We've recorded your approval of Eliza Bennett's quote of £1,370 (no VAT) for Flat 5, 55 Lantern Quay. We've asked her for start dates and to resend the earlier invoice, which we'll pass to you once received. Separately, you mentioned a roof leak at another flat: please send us its address so we can log it. We'll update you once Eliza confirms dates, by 2025-05-19.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Approval does not book a visit or confirm dates
- Does not confirm the earlier invoice was paid or valid
- Quote document itself not seen
- Roof leak at another property is not logged: no address

## Remaining work
- Eliza to confirm dates, then set_visit with agency_key
- Resent invoice to be passed to landlord for checking
- Work completion, invoice, close
- Landlord to supply address of the roof-leak flat, then log separately

## Missing or unavailable information
- Contractor start dates
- Resent earlier invoice
- Address of other flat with roof leak

## Conflicts between sources
- Events 021, 023, 027, 028 name other properties; treated as not about this job. Kendall's quote was £1,700+VAT (£2,040), Eliza £1,370; landlord chose Eliza on the call.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Quote approved at £1,370 (no VAT). Outstanding: contractor dates, the work itself, the resent invoice, final checks.

**2. What is the next action, who for, which channel?**

Email to Eliza Bennett for dates and invoice (done), and email to the landlord confirming (done); wait until 2025-05-19.

**3. Does anything need a human decision?**

No. The earlier invoice query is only to be passed on once received.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-008-3466","decision":"approved","evidence_quote":"Um, let's, let's choose Eliza and ask her to send the, resend the invoi… | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_landlord_decision |
| A2 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Eliza Bennett","amount_gbp":1370,"vat":"none","items":["Repaint bedroom and other rooms if needed",… | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A3 | `approve_quote` | {"ticket_ref":"NBL-008-3466","amount_gbp":1370,"contractor":"Eliza Bennett","approval_basis":"Landlord approved by phone 14/05 (event 031): … | 1 | ✅ verified | QAP-102 found in the approve_quote log |
| A4 | `send_message` | {"recipient_name":"Eliza Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 003/027 contractor email… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Mr Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466",… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Awaiting Eliza Bennett's start dates and resent invoice","review_on"… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
