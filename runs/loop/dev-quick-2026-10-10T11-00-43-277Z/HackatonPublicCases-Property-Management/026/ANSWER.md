# Case 026: Oven Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The oven fault is routine: the electric main oven does not heat, and the grill works. The landlord approved the repair and Keystone Compliance was assigned, but the booking conflicts on contractor, date, tenant identity and phone number. I put the ticket on hold until 2025-08-28, escalated the reconciliation to maintenance (ESC-101), and sent the tenant a holding message on the existing thread.

## Where the case stands
Ticket NBL-026 is at visit stage. Landlord approved the oven repair on 2025-08-26 (event 009, "Yes go ahead"). The visit booking is unreliable: the contractor is named inconsistently, the date is inconsistent, and the tenant's name and phone number conflict across records. The ticket is on hold for maintenance review (review 2025-08-28).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold NBL-026 pending reconciliation of the contractor, tenant identity, contact number and visit date; review on 2025-08-28. | internal | internal | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | Escalate to maintenance (ESC-101) to confirm the attending contractor (Keystone Compliance or Riverside Works), correct tenant identity and phone, and agree a real date with the tenant. 30/08/2025 is a Saturday, not the Monday slot. | internal | internal | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell the tenant the approval is in place, the booking details are being checked, and a visit time will follow once confirmed. No date or contractor promised. | Clara, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clara (tenant, Flat 3, 3 Willowmere Road) (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara,
> 
> Thanks for your patience. Your landlord has approved the oven repair, and we are checking the appointment details with our contractor. We have noticed some details in the booking don't match, so we are sorting these out before anything is confirmed. We will get back to you shortly with the agreed visit time. Please keep the instruction booklet handy in case the engineer needs it.
> 
> Kind regards
> Northbridge Lettings

## Escalation
- **P3 → maintenance** (verified): Oven repair (routine, electric main oven not heating; grill works) has landlord approval but the visit booking is inconsistent and needs a human to reconcile it before the contractor attends.
  - Known: Landlord approved on 2025-08-26 17:28 ("Yes go ahead", event 009). Keystone Compliance assigned and emailed (event 014). Isaac Palmer of Riverside Works called tenant 20:21 proposing Monday 10-12 pending confirmation by Harriet Fletcher by text (event 016). Agency set visit 30/08/2025 10:00 (event 017) and sent confirmation to contractor and tenant (events 018-019). 30/08/2025 is a Saturday; Monday is 01/09/2025.
  - Missing: Which contractor is attending (Keystone Compliance or Riverside Works). Correct tenant name (Clara, Ruben Oakley or Grace Mercer). Correct tenant phone (07700 900721 in event 014 vs 07700 900077 in event 018, which reads like a call code). Whether the Monday slot or 30/08 is actually agreed with the tenant and contractor.
  - Options: Confirm Keystone Compliance as sole contractor, ask them to confirm the slot directly with the tenant and correct the record to the agreed date; Re-book with Riverside Works if that is the correct provider; Verify tenant identity and contact number before sending any further booking details
  - Recommendation: Confirm the contractor and tenant identity from the landlord/contractor records, then let the contractor agree a real date with the tenant. Correct the 30/08 vs Monday discrepancy before any confirmation goes out.
  - Deadline: 2025-08-28

## What this does not establish
- Landlord approval does not confirm the fault cause, the repair cost, or which contractor will attend.
- The visit of 30/08/2025 10:00 is not confirmed with the tenant or contractor.
- Sending the tenant a holding message does not confirm any appointment.
- No contractor or visit was re-booked or cancelled in this run.

## Remaining work
- Maintenance (ESC-101): confirm the correct contractor and tenant identity/phone, and correct the visit record.
- Contractor to agree a real visit date with the tenant and attend the routine oven fault.
- Chase on 2025-08-28 if the booking is still unresolved.
- After the visit: record the work result, any quote or invoice, and close with tenant confirmation and landlord notice.

## Missing or unavailable information
- Which contractor is attending: Keystone Compliance (event 014) or Riverside Works (event 016).
- Correct tenant name: Clara (events 018 and the 'Tenant Name' field), Ruben Oakley (events 013, 014, 019) or Grace Mercer (event 016).
- Correct tenant phone: 07700 900721 (event 014) or 07700 900077 (event 018, which reads like a call code).
- Whether the Monday 1 September slot or 30/08/2025 is the agreed date. Harriet Fletcher's confirmation text is not on file.

## Conflicts between sources
- Contractor: Keystone Compliance (events 013-014, 018) vs Riverside Works / Isaac Palmer (event 016). Neither trusted yet; escalated.
- Visit date: 30/08/2025 10:00 (events 017, 019) is a Saturday; the contractor offered Monday 10-12 (event 016), which is 01/09/2025. Monday was not confirmed by the contractor.
- Tenant name: Clara (event 018 and the 'Tenant Name' field), Ruben Oakley (events 013, 014, 019), Grace Mercer (event 016).
- Tenant phone: 07700 900721 (event 014) vs 07700 900077 (event 018, described as a call code). Not used for any outbound contact.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

At visit stage with landlord approval confirmed. The visit booking is not reliable, so the ticket is on hold. Outstanding: confirm the contractor, correct the tenant identity and phone, agree a real visit date, then attend, record the result, and close.

**2. 2. What is the next action, who is it for, and through which channel?**

Internal maintenance escalation ESC-101 to reconcile the booking (P3, by 2025-08-28). Holding email to tenant Clara on the existing thread (event 015). Ticket on hold for review 2025-08-28. No contractor message was sent, because the contractor identity is unresolved.

**3. 3. Does anything need a human decision, and why?**

Yes, but only routine admin. A maintenance team member must decide which contractor attends and confirm the tenant's identity and phone number before any date is confirmed. There is no safety issue, and the decision is not financial.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-026","reason":"Other","comment":"Visit booking conflicts: contractor named as Keystone Compliance (event 014) but call fr… | 1 | ✅ verified | Ticket NBL-026 read back after put_on_hold |
| A2 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Oven repair (routine, electric main oven not heating; grill works) has landlord approval but… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |
| A3 | `send_message` | {"recipient_name":"Clara (tenant, Flat 3, 3 Willowmere Road)","recipient_role":"tenant","channel":"email","contact":"existing thread (event … | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
