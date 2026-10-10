# Case 112: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved Eliza Bennett's £1,370 quote by phone. I recorded the decision, the quote and the approval, then told Eliza and the landlord. I scheduled a follow-up for 16 May.

## Where the case stands
Quote approved (£1,370, Eliza Bennett). Waiting on Eliza for start dates, access and resent invoice. No visit booked. Property void.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Told Eliza Bennett her £1,370 quote is approved; asked for dates, access and the resent invoice naming the property | Eliza Bennett, contractor | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Confirmed decision to landlord, asked about the other-property roof leak address and which property the invoice relates to | Mr Langley, landlord | email | A5 ✅ |
| 3 | WAIT | Follow up with Eliza on 16 May | Eliza Bennett | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Eliza Bennett (contractor) via email, existing thread (event 027 email / event 003 job email)** (verified)

> Hello Eliza, the landlord has approved your quote of £1,370 (no VAT) for the check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ (job NBL-008-3466): repaint bedroom (and other rooms if needed), replace burnt bedroom carpet, replace bathroom flooring, repair broken plug, dripping bath tap and damaged bathroom shelf. Anything above £1,370 needs the landlord's approval first. The flat is empty, so please tell us the dates you can start and finish, and whether you need the agency to arrange keys. The landlord has also asked you to resend your invoice for the earlier refurbishment so he can check it. Please say which property it relates to, and send it as a PDF. Thank you.

**A5 · send_message → Mr Langley (landlord) via email, agency landlord record** (verified)

> Hi Mr Langley, thanks for your call. To confirm: we have approved Eliza Bennett's quote of £1,370 (no VAT) for the check-out works at Flat 5, 55 Lantern Quay, and Kendall's quote is not going ahead. We have asked Eliza for start dates and will update you by Friday 16 May. We have also asked her to resend her earlier invoice, and to say which property it relates to, so you can check it. Some of our earlier emails named other flats (e.g. Juniper Mews, Harbour View), so if the invoice or quotes you mean were for a different property please tell us. You also mentioned a roof leak at another flat: if you can find the address, please let us know and we will log it straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Approval does not book a visit or confirm dates
- Quote document not seen; figure taken from history
- Does not settle the earlier invoice payment question
- Roof leak at another property not logged: no address

## Remaining work
- Eliza to confirm dates and access; then set_visit (agency keys)
- Eliza to resend earlier invoice; landlord to check it
- Landlord to supply roof-leak property address
- After work: result, invoice (must be ≤ £1,370), landlord told, close

## Missing or unavailable information
- Eliza's start/finish dates
- Quote PDF
- Address of other leaking property
- Property the earlier invoice relates to

## Conflicts between sources
- Several emails name other properties (Juniper Mews, Harbour View, Alder Lane, Willowmere). I trusted the call, which names 55 Lantern Quay.
- Event 030 'resend the invoice' did not authorise spend; the call (event 031) did.
- Event 028 labels the same quotes as Harbour View.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The quote is approved at £1,370. Outstanding: Eliza's dates and access, a visit booking, the resent earlier invoice, and the work itself. The ticket was paused as not tenanted.

**2. What is the next action, who is it for, and through which channel?**

Eliza Bennett (contractor) by email for dates, access and the invoice. The landlord was updated by email.

**3. Does anything need a human decision, and why?**

No. The landlord's decision is recorded and the rest is routine. The earlier-invoice payment question is the landlord's to settle.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-008-3466","decision":"approved","cap_gbp":1370,"evidence_quote":"Um, let's, let's choose Eliza and ask her to send the, r… | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_landlord_decision |
| A2 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Eliza Bennett","amount_gbp":1370,"vat":"none","items":["Repaint bedroom and other rooms if needed",… | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A3 | `approve_quote` | {"ticket_ref":"NBL-008-3466","amount_gbp":1370,"contractor":"Eliza Bennett","approval_basis":"Landlord approved by phone 14/05 (event 031): … | 1 | ✅ verified | QAP-102 found in the approve_quote log |
| A4 | `send_message` | {"recipient_name":"Eliza Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 027 email / event 003 jo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Mr Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466",… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-16","party":"Eliza Bennett","purpose":"Chase start/finish dates and access, and resent invoic… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `add_note` | {"entity":"NBL-008-3466","note":"Approved Eliza Bennett £1,370 no VAT by landlord phone 14/05 (event 031). Quote document not seen; figure f… | 1 | ✅ verified | NOTE-106 found in the add_note log |

## Failed or unverified actions
_None._
