# Case 15: ANSWER

**Outcome:** action_taken · **Severity:** routine

Caller gave name and DOB matching the current CRM tenant (Priya Shah, T-1003). The legacy Fixflo row naming a different, ended tenant is stale. I sent the tenancy and deposit details to her CRM email and logged the record conflict on the property.

## Answers
**1. Which record is authoritative and why?**

The current CRM (Dwelly) record. Source priority puts CRM above signed documents and legacy exports, and the Fixflo data is an unmaintained 2026-03 import from the Amhurst Lettings acquisition.

**2. Is the caller verified? What can you tell her?**

Yes, to the policy standard: full name and DOB match the CRM. The caller ID (+447700900177) matches neither the CRM nor the legacy number, but caller ID is only a hint and she said she was on a work phone. I told her the tenancy started 10 Jan 2026 and is periodic with no end date, that she leaves on 2 months' written notice, and that the deposit is £1,903 held at DPS. I sent this to her CRM email, not to the unfamiliar number. I disclosed nothing from the legacy record.

**3. What do you do about the conflicting records?**

Trust the CRM. Add a note to P-203 recording the stale legacy row (P. Shah-Mehta, ended 2025-11-30) for cleanup. Do not change the tenant record or contact details on the strength of this call. No escalation needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"P-203","note":"Record conflict 2026-10-10: legacy Fixflo export (Amhurst Lettings import, unmaintained) lists Flat 9 tenant as P.… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Escalations
_None._

## Failed or unverified actions
_None._
