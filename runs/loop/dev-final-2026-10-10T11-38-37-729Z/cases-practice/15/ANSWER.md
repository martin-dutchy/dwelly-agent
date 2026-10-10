# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** action_taken · **Severity:** n/a

A caller gave the name and date of birth of the CRM tenant Priya Shah, but rang from a phone number not on file. I treated the CRM as authoritative over the stale legacy export. I sent the tenancy and deposit answers to her email on file rather than reading them out, and noted the legacy conflict.

## Where the case stands
Call handled; tenancy and deposit details sent to the email on file. No open repair job. Legacy record flagged by note.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Email tenancy basics (periodic, 2 months' written notice) and deposit details to the address on file, and offer to update her phone number | Priya Shah, tenant | email | A1 ✅ |
| 2 | OTHER | Note on property record that the legacy Fixflo row is stale and should be corrected | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for calling today. As you rang from a number we don't have on file, we're sending the details to your email on record. Your tenancy at Flat 9, 3 Amhurst Road started on 10 January 2026. Under the new rules it is a rolling (periodic) tenancy with no fixed end date. If you decide to move, you give 2 months' written notice (a shorter period only if your landlord agrees in writing). Your deposit of £1,903 is protected with the DPS. Nothing is decided by this email; if you want to give notice, please send it in writing. If you'd like us to use a different phone number for you, just reply and let us know. Mare and Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Name and DOB matching CRM does not prove the caller's phone is hers; deposit details therefore went only to the email on file
- No notice to end tenancy was taken or accepted; nothing was said about the landlord's agreement to a shorter notice
- The note does not delete or edit the legacy data

## Remaining work
- Data admin to archive/correct the legacy Fixflo Flat 9 row
- Tenant may reply with a preferred phone number; update if confirmed through the email on file
- If she wants to move out, she must give written notice; route through normal process

## Missing or unavailable information
_None._

## Conflicts between sources
- Legacy Fixflo shows Flat 9 tenant P. Shah-Mehta (ended 2025-11-30, phone ...166) vs CRM active tenant Priya Shah (phone ...103): trusted the CRM.
- Caller ID ...177 differs from the CRM phone ...103: explained by the caller as a work phone, unverified.

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM (T-1003, active, started 2026-01-10). Policy ranks CRM and signed documents above legacy exports, and the Fixflo data is an unmaintained 2026-03 import. Its Flat 9 entry (P. Shah-Mehta, ended 2025-11-30) is most likely the previous occupant.

**2. Is the caller verified? What can you tell her?**

Name and DOB match the CRM, so she is plausibly verified. The caller ID (+447700900177) does not match the phone on file (+447700900103); she said it was a work phone, and caller ID is only a hint. So I gave only general information by phone and sent the specifics (periodic tenancy, no fixed end date, 2 months' written notice, £1,903 deposit with DPS) to her email on file.

**3. What do you do about the conflicting records?**

I kept the CRM as the source of truth, added a note to P-203 flagging the legacy row as stale, and left the legacy data unchanged for a data admin to fix. No escalation was needed because the sources have a clear priority and no decision or money is involved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"P-203","note":"Legacy Fixflo export (Amhurst Lettings, imported 2026-03, unmaintained) lists Flat 9 tenant as P. Shah-Mehta, ende… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
