# Case 021: ANSWER

**Outcome:** escalated · **Severity:** urgent

The landlord approved replacing the snapped conservatory back-door lock and providing 4 keys, and Alder Compliance was assigned on 21 Nov. The contractor has only acknowledged receipt, and no visit window, quote or ticket exists. I escalated the booking follow-up to maintenance (ESC-101) because I could not verify a contractor contact, and no message was sent.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval is recorded (21 Nov, 11:00 UTC). The contractor was assigned and emailed, and acknowledged receipt at 14:30 UTC on 21 Nov. Outstanding: a confirmed visit window, the lock replacement, the 4 keys, handover of the office and landlord keys, and a completion record. No system ticket exists.

**2. What is the next action, who is it for, and through which channel?**

Confirm the visit window with Alder Compliance and tell the tenant the target timescale. Both need a verified contact from the records, which I could not confirm, so this was escalated to maintenance (ESC-101, P2) rather than sent. No message was sent in this run.

**3. Does anything need a human decision, and why?**

Yes. A maintenance team member needs to confirm the booking with the contractor and the tenant, because I could not verify a contractor contact and no ticket exists to track the job.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Key replacement approved by landlord, but the contractor (Alder Compliance) has only acknowl… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |

## Escalations
- **P2 → maintenance** (verified): Key replacement approved by landlord, but the contractor (Alder Compliance) has only acknowledged receipt. No visit date, quote or completion estimate is recorded, and the tenant has not been given a confirmed appointment. Someone needs to confirm the booking with the contractor and the tenant.
  - Known: Flat 22, 148 Lantern Quay, Westmarsh, ZZ4 1ZZ. Tenant Clara Jenkins reports the conservatory back-door key snapped and no spare exists (agency checked, event 003). Landlord Quinn approved the work and asked for 4 new keys: 2 tenant, 1 agency office, 1 landlord; the agency and landlord keys go to the office (event 006). Contractor Alder Compliance was assigned and emailed on 2024-11-21 12:04 (events 010-012). The contractor replied only "Received, thanks" (event 013). The tenant was emailed on 2024-11-21 (event 011). No ticket exists in the system (list_tickets returned empty).
  - Missing: No visit window, quote or completion estimate from Alder Compliance. No verified contractor contact address on file (the only number in the record, 07700 900625, is labelled for the tenant and I could not confirm it). Confirmation that the tenant is still without a working lock is needed. No system ticket reference exists.
  - Options: Ask Alder Compliance by phone or verified email to confirm a visit window and to contact the tenant directly, then tell the tenant the target date.; Ask the tenant directly whether the back door is secure and what times suit for a visit.; Create a ticket in the system (none exists) so the job can be tracked and assigned a visit window.
  - Recommendation: Create the ticket and have the contractor confirm a visit window within 72 hours (urgent, since the back door has no working key). Tell the tenant the target timescale once confirmed. Ask the tenant directly about security and visit times in the same call.
  - Deadline: 2024-11-22 17:00 UTC

## Failed or unverified actions
_None._
