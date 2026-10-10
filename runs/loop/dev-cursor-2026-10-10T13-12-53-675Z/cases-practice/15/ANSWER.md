# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** action_taken · **Severity:** n/a

Priya Shah called asking when her tenancy ends and what deposit we hold. Name and DOB match the current CRM, so she is verified. The legacy Fixflo row is a previous occupant. I logged the call, noted the conflict, and emailed her the details at the address on file.

## Where the case stands
Call handled. Caller verified against CRM. Tenancy and deposit details sent to the CRM email. Legacy conflict noted. Nothing outstanding with the tenant. She may send written notice if she decides to move.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Emailed tenancy basics and deposit details to the email on file, not to the caller's work phone | Priya Shah, tenant | email | A3 ✅ |
| 2 | OTHER | Noted the legacy Fixflo conflict on P-203 for data cleanup | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for calling today. As promised, here is what we hold: your tenancy at Flat 9, 3 Amhurst Road has no fixed end date (it rolls on month to month). If you decide to move, you give us 2 months' written notice; a shorter period only applies if your landlord agrees in writing. Your deposit on record is £1,903, protected with the DPS. Please send any notice in writing and we'll confirm receipt. If you didn't make this call, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here ends the tenancy; she has not served notice.
- Verification relied on name plus DOB only; the caller ID does not match any number on file.
- The CRM phone was not updated and the legacy row was not deleted.

## Remaining work
- Data team to retire or archive the legacy Fixflo Flat 9 row (P. Shah-Mehta, ended 2025-11-30).
- Ask Priya whether to add the work number to her record, if she wants that.

## Missing or unavailable information
_None._

## Conflicts between sources
- Fixflo export: Flat 9 tenant is P. Shah-Mehta, ended 2025-11-30. CRM: Priya Shah, active since 2026-01-10. Trusted the CRM.
- Caller ID +447700900177 matches neither the CRM phone (+447700900103) nor the legacy phone (+447700900166). Explained by the work-phone remark and not treated as a mismatch.

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM (T-1003). It is the highest in the source priority and is current, with a 2026-01-10 start that fits the legacy tenant leaving on 2025-11-30. The Fixflo export is an unmaintained legacy import.

**2. Is the caller verified? What can you tell her?**

Yes. Her name and DOB (21 July 1998) match the CRM. The caller ID differs, but she said she was on her work phone, and caller ID is only a hint. I told her the tenancy is periodic with no fixed end date, that she needs 2 months' written notice to leave, and that the deposit is £1,903 with the DPS. I sent this to the email on file, not to the work phone.

**3. What do you do about the conflicting records?**

I added a note on P-203 saying the legacy Flat 9 row (P. Shah-Mehta, ended) is the previous occupant and that the CRM prevails. I did not change the CRM or the phone number on file. The row is flagged for cleanup. No escalation was needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller gave name Priya Shah, Flat 9,… | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"P-203","note":"Record conflict: legacy Fixflo export (Amhurst Lettings import, unmaintained) lists Flat 9 tenant as P. Shah-Mehta… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
