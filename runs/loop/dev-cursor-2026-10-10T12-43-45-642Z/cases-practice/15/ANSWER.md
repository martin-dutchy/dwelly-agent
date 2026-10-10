# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** action_taken · **Severity:** routine

Priya Shah called asking when her tenancy ends and what deposit is held. Her name and date of birth match the current CRM record, so I treated her as verified. I told her the tenancy is rolling (2 months' written notice) and the deposit is £1,903 with the DPS, and logged the conflict with the legacy export.

## Where the case stands
Call handled. Caller verified against the CRM. Conflict with the legacy export noted. Nothing outstanding with the tenant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Emailed Priya the tenancy position (rolling, 2 months' written notice) and the deposit (£1,903, DPS) at the email on file | Priya Shah, tenant | email | A2 ✅ |
| 2 | OTHER | Added a note on the record conflict and the unrecognised caller number, so the legacy Fixflo row can be cleaned up | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for your call today. To confirm: your tenancy has no fixed end date (it is rolling), so it only ends when you give us 2 months' written notice, or sooner if your landlord agrees in writing. Your deposit of £1,903 is protected with the DPS. Nothing has been ended by your call; if you decide to move, please send your notice in writing and we will confirm receipt. We have also noted your work number on your file as the one you rang from. Reply here if you have any questions.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The call is not notice to leave; notice must be in writing.
- Treating the CRM as authoritative does not delete or correct the legacy Fixflo row; that clean-up is still to do.
- The caller number +447700900177 is not added as a contact; it is noted only.

## Remaining work
- Data team to clean up or archive the stale legacy Fixflo rows for 3 Amhurst Road, including a check of the Flat 8 row (not checked here).
- Tenant to send written notice if she decides to move.

## Missing or unavailable information
_None._

## Conflicts between sources
- Legacy Fixflo shows Flat 9 tenant 'P. Shah-Mehta', phone +447700900166, ended 2025-11-30. The CRM shows Priya Shah, active since 2026-01-10, phone +447700900103. I trusted the CRM.
- Caller ID +447700900177 does not match the CRM phone. She explained it as her work phone, and the name and date of birth match.

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM record. The policy ranks the CRM above signed documents and legacy exports. The Fixflo export is an unmaintained import from the Amhurst Lettings acquisition, and its Flat 9 row shows a tenancy that ended on 2025-11-30. The CRM shows Priya Shah active from 2026-01-10.

**2. Is the caller verified? What can you tell her?**

Yes. She gave her full name and a date of birth (21 July 1998) that match CRM T-1003. The caller ID (+447700900177) does not match the number on file, but she said she was on her work phone, and caller ID is only a hint. I told her the tenancy is periodic with no fixed end date and that she can leave on 2 months' written notice. I also told her the deposit is £1,903 held with the DPS.

**3. What do you do about the conflicting records?**

I added a note recording the conflict and the unrecognised number. The legacy row (P. Shah-Mehta, ended) is treated as stale, probably a former occupant. I did not escalate because the CRM and the caller's details agree, and the legacy row is flagged for clean-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"P-203 / T-1003","note":"Record conflict: legacy Fixflo export (Amhurst Lettings import, unmaintained) lists Flat 9 tenant as \"P.… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
