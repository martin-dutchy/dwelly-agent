# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** action_taken · **Severity:** n/a

Caller named herself Priya Shah with DOB 21/07/1998, which matches the current CRM tenant T-1003 at P-203. The legacy Fixflo row (P. Shah-Mehta, ended Nov 2025) is stale, so I trusted the CRM, logged the call and noted the conflict.

## Where the case stands
Call handled. No repair ticket involved. Records conflict noted on P-203. Nothing outstanding with the caller beyond her deciding whether to give notice.

## Next action
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Logged the call and added a note on P-203 about the stale legacy Fixflo row for data cleanup | internal | internal | A2 ✅ |

## Messages sent (verbatim)
_None._

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No bank, phone or contact details were changed; the work number was not added to the record.
- Nothing here decides or accepts any notice to leave, or any deposit return.
- The note does not delete the legacy row; a human or data owner must clean it up.

## Remaining work
- Data owner to clean up or archive the legacy Fixflo Flat 9 row (P. Shah-Mehta).

## Missing or unavailable information
_None._

## Conflicts between sources
- Legacy Fixflo shows Flat 9 tenant P. Shah-Mehta (+447700900166, ended 2025-11-30) versus CRM Priya Shah (active, started 2026-01-10): trusted CRM.
- Caller ID +447700900177 matches neither the CRM phone (+447700900103) nor the legacy phone; the caller said it was her work phone and identity rests on name and DOB.

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM. Its stated source priority is CRM, then signed documents, then legacy exports. The Fixflo export is unmaintained data from the 2026-03 acquisition and refers to a tenancy that ended 2025-11-30, before the CRM tenancy began on 2026-01-10.

**2. Is the caller verified? What can you tell her?**

Yes, on the standard of full name plus date of birth, which both match CRM T-1003. The caller ID is a hint only and does not match; she said it is her work phone, so I did not treat that as a red flag or add the number to the record. I can tell her that her tenancy has no fixed end date (it is periodic under the Renters' Rights Act). If she wants to leave she gives 2 months' written notice, and a shorter period only applies if the landlord agrees in writing. Her deposit held is £1,903 with the DPS. I would not give anything beyond that, and I would not take a verbal notice as formal notice.

**3. What do you do about the conflicting records?**

I logged the call (CALL-101) and added a note (NOTE-102) on P-203 flagging the legacy row as a former occupant and recommending cleanup. I did not change any contact details and did not escalate, because the CRM settles it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller gave name Priya Shah and DOB … | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"P-203","note":"Record conflict: legacy Fixflo export (Amhurst Lettings, imported 2026-03, unmaintained) lists Flat 9 tenant 'P. S… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
