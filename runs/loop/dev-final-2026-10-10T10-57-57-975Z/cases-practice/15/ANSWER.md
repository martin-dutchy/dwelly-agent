# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** action_taken · **Severity:** routine

Caller said she was Priya Shah of Flat 9; her name and DOB match the current CRM tenant T-1003. The legacy Fixflo row (P. Shah-Mehta, ended Nov 2025) conflicts with the CRM and was treated as stale. I logged the call, noted the conflict on the property, and emailed the tenancy and deposit answers to her email on file.

## Where the case stands
Call handled and logged. Caller matched to T-1003 on name and DOB; details sent to email on file. Legacy conflict noted on P-203. Nothing awaiting approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Emailed tenancy (periodic, 2 months' written notice) and deposit (£1,903, DPS) details to the address on file rather than disclosing on a call from an unrecorded number | Priya Shah, tenant | email | A3 ✅ |
| 2 | OTHER | Noted legacy Fixflo conflict on property record for data clean-up | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for calling today. As you asked: your tenancy at Flat 9, 3 Amhurst Road is now a rolling (periodic) one, so it has no fixed end date. If you decide to move, you'd give us 2 months' written notice (shorter only if your landlord agrees in writing). Your deposit of £1,903 is protected with the DPS. If you do decide to leave, just let us know in writing and we'll talk you through the next steps. If you didn't make this call, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Name+DOB match does not prove the caller's phone belongs to her; the new number was not added to her record.
- No notice to leave has been given or accepted; nothing about the deposit's return is decided.
- The note does not delete or change the legacy export.

## Remaining work
- Data team to mark the legacy Fixflo Flat 9 row as ended/non-authoritative (owner: records/maintenance)
- If she gives notice, handle in writing per normal process

## Missing or unavailable information
- Who P. Shah-Mehta is (probably a former tenant) and whether she is related to the caller
- Whether +447700900177 is really the caller's work phone

## Conflicts between sources
- Legacy Fixflo: Flat 9 tenant P. Shah-Mehta, ended 2025-11-30, phone ...166, vs CRM: Priya Shah active from 2026-01-10, phone ...103. Trusted the CRM.
- Caller ID +447700900177 vs phone on file +447700900103. Explained by the caller as a work phone; unverified, so not recorded.

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM (T-1003, active since 2026-01-10). Policy ranks it above legacy exports, and the Fixflo data is an unmaintained 2026-03 import. The Fixflo move-out of 2025-11-30 also predates the current tenancy, so it describes an earlier occupant or a stale record.

**2. Is the caller verified? What can you tell her?**

Name and DOB match the CRM, which meets the verification standard. The caller ID did not match the number on file, but she said it was a work phone, and caller ID is only a hint. To limit risk I gave nothing sensitive on the call. I emailed the general position (periodic tenancy, no fixed end, 2 months' written notice) and the deposit (£1,903, DPS) to the email on file.

**3. What do you do about the conflicting records?**

I recorded the conflict as a note on P-203, kept the CRM as the source of truth, did not use the legacy phone number, and did not add the new phone number to her record. I flagged the legacy row for clean-up. No escalation was needed, as no decision requires authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller gave name Priya Shah, Flat 9,… | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"P-203","note":"Record conflict: legacy Fixflo export (Amhurst Lettings import, unmaintained) lists Flat 9 tenant as P. Shah-Mehta… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
