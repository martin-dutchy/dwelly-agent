# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** action_taken · **Severity:** n/a

Caller said she was Priya Shah at Flat 9. Her name and DOB match the current CRM record (T-1003, active). The legacy Fixflo export disagrees, but it is unmaintained, so I trusted the CRM. I emailed the tenancy and deposit facts to the CRM address and noted the legacy conflict.

## Where the case stands
Caller verified against CRM; tenancy and deposit details sent to the CRM email. Legacy record conflict noted for data clean-up. Nothing else open.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Emailed tenancy (periodic, 2 months' written notice) and deposit (£1,903, DPS) details to the email on file | Priya Shah, tenant | email | A2 ✅ |
| 2 | OTHER | Noted the legacy Fixflo conflict on the property record for clean-up | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for calling today. As promised, here are the details. Your tenancy is now a rolling (periodic) one, so it has no fixed end date. If you want to move out, you give 2 months' written notice (a shorter period only if your landlord agrees in writing). Your deposit of £1,903 is protected with the DPS. If you decide to go ahead, please send your notice in writing. We have also noted that the number you called from is different to the one we hold, so please tell us if you'd like us to update it. Kind regards, Mare and Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Verification rests on name plus date of birth matching the CRM; caller ID was only a hint.
- No change was made to the legacy export or tenancy records.
- Nothing here confirms any early-exit terms with the landlord or a move-out date.

## Remaining work
- Data admin to correct or archive the legacy Fixflo Flat 9 row (P. Shah-Mehta, ended 2025-11-30).
- Update the tenant's phone only if she confirms it.

## Missing or unavailable information
_None._

## Conflicts between sources
- Legacy Fixflo shows Flat 9 tenant P. Shah-Mehta, ended 2025-11-30, phone +447700900166. CRM shows Priya Shah, active since 2026-01-10, phone +447700900103. The caller phoned from +447700900177. I trusted the CRM.

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM. Its source priority puts it above signed documents and legacy exports. The Fixflo data is an unmaintained import from the Amhurst Lettings acquisition (March 2026). It lists a different surname, a different phone and a move-out in 2025-11, which is before the CRM tenancy start of 2026-01-10.

**2. Is the caller verified? What can she tell her?**

Yes. She gave her full name and a DOB (21 July 1998) that match the CRM. The work-phone caller ID does not match the number on file, but caller ID is only a hint and she explained it. She can be told that the tenancy is periodic with no fixed end date, that she can leave on 2 months' written notice, and that the deposit is £1,903 held with the DPS. I sent this to her CRM email.

**3. What do you do about the conflicting records?**

I added a note to P-203 recording the conflict and asking for the legacy row to be corrected or archived. I changed nothing else. No escalation is needed, since the conflict does not affect this caller's identity or any decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"P-203","note":"Record conflict 2026-10-10: legacy Fixflo export (Amhurst Lettings import, unmaintained) lists Flat 9 tenant as \"… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
