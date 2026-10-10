# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** escalated · **Severity:** routine

A caller said she was Priya Shah at Flat 9 and asked about her tenancy end and deposit. Her name and date of birth match the CRM, and the stale legacy export disagrees. I gave general tenancy information by email to the CRM address, held back the deposit figure because it looks above the 5-week cap, and escalated.

## Where the case stands
Enquiry answered in general terms by email to the CRM address. Exact deposit figure withheld pending a human document check (ESC-102). No maintenance ticket involved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Escalated deposit figure check and legacy record cleanup | internal, management | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Emailed the tenant to explain that the tenancy is periodic with 2 months' written notice, that the deposit is in the DPS, and that a colleague will confirm the figure in writing | Priya Shah, tenant | email | A3 ✅ |
| 3 | OTHER | Noted the record conflict on P-203 | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for your call today. Your tenancy has no fixed end date. If you decide to move, you can end it by giving us 2 months' written notice. Your deposit is protected with the DPS. We want to double-check the exact deposit figure against your paperwork before we quote it, so a colleague will confirm it to you in writing at this email address. If you'd like to give notice, just reply here. Thanks, Mare and Co Lettings

## Escalation
- **P3 → management** (verified): Possible deposit over the 5-week cap, plus stale legacy tenant record at P-203
  - Known: Caller gave name Priya Shah and DOB 21 July 1998, matching CRM T-1003 (active, start 2026-01-10). Caller ID +447700900177 is not the CRM number (+447700900103); caller says it is her work phone. Legacy Fixflo shows P. Shah-Mehta ended 2025-11-30. CRM deposit £1903 (DPS), rent £1650 pcm; 5 weeks' rent is about £1586.54, so deposit looks about £316 over the cap. She asked about tenancy end and deposit because she is thinking of moving.
  - Missing: Whether the deposit figure is correct, and whether any excess was taken or is a data error; signed tenancy agreement and DPS certificate not seen; whether the legacy row is a different person.
  - Options: Check the signed tenancy and DPS certificate, correct the record or arrange refund of any excess; Confirm the figure as correct if there is a lawful explanation
  - Recommendation: Check the documents before anyone quotes the deposit figure to her. Clean up the legacy Fixflo row. Contact the tenant on the CRM email.

## What this does not establish
- Nothing here ends the tenancy or accepts notice.
- The deposit figure was not confirmed to the caller.
- No data was changed or deleted.

## Remaining work
- A human checks the signed tenancy and DPS certificate and confirms the deposit to the tenant in writing (management).
- A human cleans up the legacy Fixflo row for Flat 9 (management).

## Missing or unavailable information
- Signed tenancy agreement and DPS certificate
- Whether the legacy tenant P. Shah-Mehta is a different person

## Conflicts between sources
- Legacy Fixflo lists P. Shah-Mehta (ended 2025-11-30) for Flat 9, but CRM lists Priya Shah as active from 2026-01-10. I trusted the CRM.
- Caller ID +447700900177 differs from the CRM phone +447700900103. The caller says it is her work phone.

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM (T-1003, Priya Shah, active). Policy ranks the CRM above signed documents and legacy exports. The Fixflo export is an unmaintained import from the Amhurst Lettings acquisition.

**2. Is the caller verified? What can you tell her?**

Her name and date of birth match the CRM, which meets the verification standard. Her caller ID does not match the number on file, but she said it is her work phone, so the match is not perfect. I told her only general information, and only by email to the address on file: the tenancy is periodic and she needs 2 months' written notice. I also said the deposit is with the DPS. I did not state the deposit amount, because it looks above the 5-week cap and needs checking first.

**3. What do you do about the conflicting records?**

I noted the conflict on P-203 (NOTE-101) and escalated it as ESC-102 so a human can clean up the legacy row. The escalation also covers the possible deposit cap breach.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"P-203","note":"Record conflict: legacy Fixflo export (Amhurst Lettings, imported 2026-03, unmaintained) lists Flat 9 tenant as P.… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Possible deposit over the 5-week cap, plus stale legacy tenant record at P-203","known":"Call… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
