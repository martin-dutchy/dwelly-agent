# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** escalated · **Severity:** routine

Caller Priya Shah matched the CRM on name and DOB; the legacy Fixflo row (P. Shah-Mehta, ended 2025-11-30) is stale. I told her by SMS to her CRM number that the tenancy is periodic and needs 2 months' written notice. The deposit looks over the 5-week cap, so I escalated it rather than quote the figure.

## Where the case stands
Caller verified by name+DOB against CRM; general info sent by SMS; deposit figure withheld and escalated for cap check; legacy record noted.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Review deposit £1903 vs 5-week cap and confirm figure to tenant | compliance team | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | SMS to CRM number: periodic tenancy, 2 months' written notice, deposit with DPS, amount to follow in writing | Priya Shah, tenant | sms | A2 ✅ |
| 3 | OTHER | Note conflict on property record | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, thanks for calling Mare and Co. Your tenancy no longer has a fixed end date: it rolls on, and you can end it by giving 2 months' written notice. Your deposit is protected with DPS. A colleague will check the details and confirm the amount to you in writing. If you decide to move, please send your notice in writing.

## Escalation
- **P3 → compliance** (verified): Deposit on CRM (£1903) appears above 5-week cap for £1650 rent; plus legacy record conflict to clean up
  - Known: Caller Priya Shah gave name and DOB matching CRM T-1003 (P-203, active, start 2026-01-10, DPS deposit £1903, rent £1650). Caller ID differs from CRM phone (work phone). Legacy Fixflo shows "P. Shah-Mehta" ended 2025-11-30 at Flat 9. 5 weeks' rent = c. £1586.54, so deposit looks ~£316 over cap. Done: note NOTE-101, SMS to CRM number; deposit figure not disclosed pending review.
  - Missing: Whether deposit figure is correct; signed tenancy agreement; whether legacy record is a former tenant.
  - Options: Check signed agreement and DPS record, correct or refund excess if over cap; Confirm figure is correct and tell tenant
  - Recommendation: Verify deposit against signed agreement/DPS, then write to tenant with confirmed amount; archive legacy Fixflo row.

## What this does not establish
- Verification by name and DOB does not prove caller ID/work phone; no changes made to tenant records
- No notice of leaving has been accepted; nothing said about deposit return
- Legacy record not deleted

## Remaining work
- Compliance: check deposit against agreement/DPS and write to tenant
- Data owner: archive/clean legacy Fixflo Flat 9 row

## Missing or unavailable information
- Signed tenancy agreement and DPS certificate to confirm deposit amount

## Conflicts between sources
- Fixflo legacy: Flat 9 tenant P. Shah-Mehta, ended 2025-11-30, phone +447700900166 vs CRM: Priya Shah active from 2026-01-10 (CRM trusted)
- Caller ID +447700900177 vs CRM phone +447700900103 (explained as work phone)

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM (T-1003, active, start 2026-01-10), because the source priority puts CRM and signed documents above legacy exports, and the Fixflo data is unmaintained and from 2025.

**2. Is the caller verified? What can you tell her?**

Yes: name and DOB match the CRM. Caller ID differs, but that is only a hint and she said it was her work phone. Under the Renters' Rights Act the tenancy has no fixed end date; she can leave on 2 months' written notice; the deposit is with DPS. I did not give the £1903 figure because it looks over the 5-week cap, and a colleague will confirm it in writing. The reply went by SMS to her CRM number.

**3. What do you do about the conflicting records?**

Added note NOTE-101 recording the conflict and treating the CRM as correct, and escalated the legacy clean-up and the deposit cap question (ESC-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"P-203","note":"Legacy Fixflo export (Amhurst Lettings, imported 2026-03, unmaintained) lists Flat 9 tenant as \"P. Shah-Mehta\", … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","body":"Hi Priya, thanks for calling Mare… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"compliance","reason":"Deposit on CRM (£1903) appears above 5-week cap for £1650 rent; plus legacy record conflict t… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
