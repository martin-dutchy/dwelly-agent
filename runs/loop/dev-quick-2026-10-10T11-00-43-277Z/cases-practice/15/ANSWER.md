# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** action_taken · **Severity:** n/a

The caller gave the name Priya Shah and DOB 21/07/1998, both matching the CRM tenant T-1003 at P-203. I logged the call and told her the tenancy is periodic with no fixed end date (2 months' written notice to leave) and her £1,903 deposit is held in DPS, per CRM. The CRM is authoritative over the legacy Fixflo row, which lists a different person who left in 2025, and I flagged the unverified phone number for ops.

## Where the case stands
Inbound call handled. Caller identifies as Priya Shah, tenant at P-203 (Flat 9, 3 Amhurst Road). Name and DOB match the CRM tenant record T-1003. Contact number does not match. No maintenance ticket involved. Contact-number discrepancy and legacy record conflict are noted for ops.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Logged the inbound call and its outcome on the record. | internal | internal | A1 ✅ |
| 2 | OTHER | Recorded a note on the property flagging the legacy Fixflo conflict and the unverified phone number, for ops to confirm the tenant's preferred phone on the next routine contact. | internal | internal | A2 ✅ |

## Messages sent (verbatim)
_None._

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Name and DOB match does not prove the caller's identity beyond the CRM record; the number used does not match the one on file.
- No contact details, tenancy dates or bank details were changed.
- The legacy Fixflo row was not used for any fact given to the caller.
- This does not confirm the tenancy end date. It is periodic with no fixed end date, so the tenant's own written notice governs when they leave.

## Remaining work
- Ops to confirm the tenant's preferred phone number and update CRM if it has changed (owner: ops/lettings).
- Ops to clean up the legacy Fixflo row for Flat 9 (P. Shah-Mehta, +447700900166) so it is not used for contact (owner: data quality).

## Missing or unavailable information
- Confirmation from the tenant of her preferred contact number (the call came from a number not on file).
- Whether the tenancy is periodic from 2026-01-10 or was a fixed term before 1 May 2026 (not in the record).

## Conflicts between sources
- CRM says tenant is Priya Shah (T-1003), active, phone +447700900103. Legacy Fixflo says P. Shah-Mehta, phone +447700900166, ended 2025-11-30. Trusted CRM (higher priority, current, consistent with DOB and tenancy start).
- Caller ID +447700900177 and her stated work phone match neither record. Treated as an unverified contact, not used for identity.

## Answers to the case questions
**1. 1. Which record do you treat as authoritative and why?**

The CRM record (dwelly_crm, T-1003). It is the highest-priority source in the data_quality ordering, it is current and active, and its name, DOB and tenancy start agree with the caller. The legacy Fixflo export (imported 2026-03 from an acquisition, not maintained) lists 'P. Shah-Mehta' with a different phone, status ended and move-out 2025-11-30. That row looks like a previous occupant, so I did not use it for any fact.

**2. 2. Is the caller verified? What can you tell her?**

Partly. Her name and DOB match the CRM record, which is the identity check the policy requires. But she called from a number that is not on file (caller ID +447700900177, and she said it is a work phone; CRM has +447700900103), so this is a hint, not proof. I shared only general information: the tenancy is periodic with no fixed end date, and she would give 2 months' written notice; the deposit is £1,903 held in DPS per the CRM. I did not give any balance, ticket or personal data beyond that.

**3. 3. What do you do about the conflicting records?**

I logged the call and added an internal note on P-203 recording the conflict: the legacy row is treated as a previous occupant and not used for contact or tenancy facts, and the unverified number is flagged. I changed no contact details. Ops should confirm her preferred phone on the next routine contact, and the legacy row should be cleaned up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller said she is Priya Shah, tenan… | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"P-203 Flat 9, 3 Amhurst Road","note":"Record conflict (case 15): legacy Fixflo export (imported 2026-03 from Amhurst Lettings acq… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
