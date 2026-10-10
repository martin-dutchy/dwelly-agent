# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** escalated · **Severity:** routine

Caller gave name and DOB matching the current CRM tenant Priya Shah (T-1003). The legacy Fixflo record (P. Shah-Mehta, ended 2025) is stale. I emailed her the tenancy and deposit information on the address on file, logged the call and flagged the record conflict. I escalated an apparent over-cap deposit (£1,903 against about £1,586.54 for 5 weeks).

## Where the case stands
Caller treated as verified tenant; info sent by email to the address on file. Open: human review of deposit amount and legacy record clean-up (ESC-104).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Emailed periodic tenancy, 2 months' written notice, deposit £1,903 with DPS; asked for best phone number | Priya Shah, tenant | email | A3 ✅ |
| 2 | ESCALATE_TO_HUMAN | Escalated deposit over-cap and legacy record clean-up | internal management | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for calling today. As promised, here is the information you asked about. Your tenancy at Flat 9 is now a rolling (periodic) one with no fixed end date. If you want to move out, you give us 2 months' written notice (a shorter period only if your landlord agrees in writing). Your deposit of £1,903 is protected with the DPS. If you decide to go ahead, please send your notice in writing to us. Please also confirm the best phone number to reach you on, as the number you called from isn't the one we hold. A colleague will also check a couple of details on your deposit record and be in touch if anything needs explaining.

## Escalation
- **P3 → management** (verified): Deposit on CRM appears above the 5-week cap; legacy tenant record conflict needs cleaning
  - Known: Caller Priya Shah, DOB matched CRM T-1003 (P-203, Flat 9, rent £1,650pcm, deposit £1,903 DPS, start 2026-01-10). 5 weeks' rent = about £1,586.54, so deposit is about £316 over the cap. Legacy Fixflo export shows P. Shah-Mehta ended 2025-11-30 for same flat; legacy is unmaintained. Caller phone +447700900177 not on file (said work phone). Tenant emailed on file address with periodic tenancy, 2 months' notice, deposit £1,903 DPS.
  - Missing: Signed tenancy agreement and DPS certificate to confirm the true deposit figure; whether legacy Shah-Mehta is a prior occupant.
  - Options: Check signed agreement and DPS certificate, then correct the record; If deposit is over cap, plan a refund of the excess with the landlord; Archive legacy Fixflo Flat 9 entry
  - Recommendation: Verify the deposit against signed documents, remedy any excess with the landlord, and archive the stale legacy entry.

## What this does not establish
- Verification rests on name and DOB matching the CRM; caller ID did not match
- Nothing here decides the deposit dispute or the remedy
- No notice to end the tenancy has been given or accepted

## Remaining work
- Management: check signed agreement and DPS certificate, fix deposit if over cap
- Management: archive legacy Fixflo Flat 9 entry
- Update tenant phone on record once she confirms

## Missing or unavailable information
- Signed tenancy agreement and DPS certificate
- Tenant's confirmed current phone number

## Conflicts between sources
- Legacy Fixflo: P. Shah-Mehta ended 2025-11-30, phone ...166, vs CRM: Priya Shah active since 2026-01-10, phone ...103. Trusted CRM.
- Caller ID +447700900177 matches neither record; explained by work phone, not relied on.
- Deposit £1,903 exceeds 5 weeks' rent (about £1,586.54).

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM (T-1003, active, start 2026-01-10). Policy ranks CRM and signed documents above legacy exports, and the legacy Fixflo data was imported from an acquisition and is not maintained.

**2. Is the caller verified? What can you tell her?**

Yes, sufficiently: full name and DOB (21/07/1998) match the CRM. The caller ID differs from both records but is only a hint, and she said she was on her work phone. I sent to the email on file: periodic tenancy with no end date, 2 months' written notice, deposit £1,903 protected with DPS. I disclosed nothing about Flat 8 or the legacy tenant.

**3. What do you do about the conflicting records?**

Added a note to P-203 recording the conflict and that the CRM is treated as current, asked the tenant to confirm her phone number, and escalated (ESC-104) for clean-up of the legacy entry and the deposit cap check.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller gave name Priya Shah and DOB … | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"P-203","note":"Record conflict: legacy Fixflo export (imported 2026-03, unmaintained) lists Flat 9 tenant as P. Shah-Mehta, ended… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Deposit on CRM appears above the 5-week cap; legacy tenant record conflict needs cleaning","k… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
