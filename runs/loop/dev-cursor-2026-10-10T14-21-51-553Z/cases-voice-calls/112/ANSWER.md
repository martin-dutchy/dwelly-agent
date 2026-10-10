# Case 112: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Recorded the landlord's phone approval of Eliza Bennett's £1,370 quote, approved it, and told Eliza to proceed and offer dates. Updated the landlord and asked for the two missing addresses. Follow-up set for 19 May.

## Where the case stands
Void flat, check-out works. Landlord approved Eliza Bennett's £1,370 (no VAT) by phone 14/05; quote recorded and approved. Waiting on Eliza for start dates and resent invoice; no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Instruct Eliza Bennett to proceed up to £1,370, offer dates via agency key, resend invoice | Eliza Bennett, contractor | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Update landlord: approval recorded, ask which property the earlier invoice relates to and the address of the roof leak | Mr Langley, landlord | email | A5 ✅ |
| 3 | WAIT | Follow up 19 May for Eliza's dates, invoice, and landlord's answers | Eliza Bennett / landlord | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Eliza Bennett (contractor) via email, existing thread (event 027 email)** (verified)

> Hi Eliza, the landlord has approved your quote of £1,370 (no VAT) for the check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ (job NBL-008-3466). Please go ahead. The flat is empty, so access is via the agency key: please reply with the dates you can start. Please keep to the £1,370 approved; anything extra needs landlord approval first. The landlord has also asked you to resend your invoice from the earlier refurb so he can check it. Please send it to us as a PDF. Thank you.

**A5 · send_message → Mr Langley (landlord) via email, agency landlord record** (verified)

> Hi Mr Langley, thanks for your call. We have recorded your approval of Eliza Bennett's quote of £1,370 (no VAT) for the check-out works at Flat 5, 55 Lantern Quay, and have asked her to start and to send us the dates she can attend. We have also asked her to resend her earlier invoice for you to check; we will forward it when it arrives. Please can you confirm which property that earlier invoice was for, as our records mention more than one address? Also, for the roof leak you mentioned at another flat, please send us the address when you find it and we will log it straight away. We will update you once Eliza confirms dates, by 19 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Approval does not book a visit; no date confirmed
- Does not establish whether the earlier refurb invoice was paid or which property it was for
- Roof leak at another property not logged (no address)

## Remaining work
- Eliza to confirm dates; then set_visit with agency key
- Obtain resent invoice and forward to landlord
- Landlord to give roof-leak address; then log as separate job
- Final invoice check against £1,370, then close

## Missing or unavailable information
- Eliza's start dates
- Property of earlier invoice
- Address of roof leak

## Conflicts between sources
- Several events name other addresses; ignored as not this job
- Event 030 'resend the invoice' is ambiguous; event 031 clarifies it is Eliza's invoice
- Event 032 says approved £1,370 which matches the call
- Contractor email sent on existing thread because no contact detail for Eliza is on file

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Quote approved at £1,370 (no VAT). Outstanding: Eliza's dates, visit booking, the resent invoice, and the work itself.

**2. Next action, recipient, channel?**

Email to Eliza Bennett to proceed and give dates; email to the landlord confirming and asking two questions.

**3. Does anything need a human decision?**

No. The approval is clear and within the cap. Nothing needs escalating now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-008-3466","decision":"approved","evidence_quote":"let's, let's choose Eliza and ask her to send the, resend the invoice."… | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_landlord_decision |
| A2 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Eliza Bennett","amount_gbp":1370,"vat":"none","items":["Check-out works: repaint bedroom (other roo… | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A3 | `approve_quote` | {"ticket_ref":"NBL-008-3466","amount_gbp":1370,"contractor":"Eliza Bennett","approval_basis":"Landlord approved by phone 14/05 (event 031): … | 1 | ✅ verified | QAP-102 found in the approve_quote log |
| A4 | `send_message` | {"recipient_name":"Eliza Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 027 email)","ticket_ref"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Mr Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466",… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-19","party":"Eliza Bennett","purpose":"Chase Eliza for start dates and resent invoice; then s… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `add_note` | {"entity":"NBL-008-3466","note":"Route: Eliza Bennett approved 14/05 by phone, £1,370 no VAT cap (Kendall £1,700+VAT declined). Property voi… | 1 | ✅ verified | NOTE-106 found in the add_note log |
| A8 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |

## Failed or unverified actions
_None._
