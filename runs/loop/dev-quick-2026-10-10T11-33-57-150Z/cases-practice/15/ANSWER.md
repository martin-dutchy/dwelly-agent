# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** resolved · **Severity:** n/a

The caller gave the name Priya Shah and DOB 21 July 1998, which match the current CRM tenant record (T-1003, Flat 9, 3 Amhurst Road). The CRM is authoritative over the legacy Fixflo export, which shows a different tenant name, phone and an ended tenancy. The caller's number matches neither record, so no changes were made from the call; general tenancy and deposit information was given and the conflicts were logged for correction.

## Where the case stands
Inbound phone enquiry, no maintenance job. Caller identified by name and DOB as tenant Priya Shah (T-1003, P-203). General tenancy and deposit questions answered. Conflicting legacy record and unmatched phone number recorded for correction.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Log the inbound call and record the identity basis (name and DOB match CRM; caller ID not matched). | internal | internal | A1 ✅ |
| 2 | OTHER | Flag the legacy Fixflo entry (P. Shah-Mehta, ended 2025-11-30, +447700900166) as conflicting and not to be used for contact or status. | internal | internal | A2 ✅ |
| 3 | OTHER | Note on the tenant record that the caller's number differs from the number on file and to confirm the preferred number at next contact. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
_None._

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Name and DOB matched the CRM; caller ID did not match, so no write actions were taken on the strength of the call.
- Telling the caller her tenancy information does not authorise changes to the account or bank details.
- Notice to leave is not confirmed or accepted by this call; no tenancy end date has been set.

## Remaining work
- Records team to correct or retire the legacy Fixflo entry for Flat 9 (P. Shah-Mehta, ended 2025-11-30).
- Confirm the tenant's preferred contact number before any contact or change to the record.
- If Ms Shah gives written notice, handle it as a new tenancy-end request under the Renters' Rights Act process (2 months' written notice); no notice has been given.

## Missing or unavailable information
- Written notice from the tenant (none received).
- Confirmation of which phone number is correct for Ms Shah (caller ID +447700900177 is not on file).

## Conflicts between sources
- Legacy Fixflo lists 'P. Shah-Mehta' at +447700900166, status ended, move-out 2025-11-30; CRM lists Priya Shah, active since 2026-01-10. Trusted CRM (current, priority source).
- Caller ID +447700900177 matches neither CRM (+447700900103) nor legacy (+447700900166). Caller says it is a work phone. Trusted DOB/name match, flagged the number.

## Answers to the case questions
**1. 1. Which record is authoritative and why?**

The CRM record (dwelly_crm, T-1003). It is the top source in the data-quality priority list and is current. The Fixflo legacy export is an unmaintained import from the Amhurst Lettings acquisition, and it conflicts on tenant name, phone and status (ended 2025-11-30).

**2. 2. Is the caller verified? What can she be told?**

Verified to the standard of name and date of birth: she gave Priya Shah and 21 July 1998, matching the CRM. Caller ID (+447700900177) does not match the CRM phone and is treated only as a hint. She can be told her tenancy is active with the agency, the deposit held on record (£1,903, DPS), and that a tenancy end needs 2 months' written notice. No account changes or bank details are discussed or made on this call.

**3. 3. What to do about the conflicting records?**

Treat the CRM as correct. Add a note to the legacy Fixflo entry flagging it as conflicting and not to be used for contact or status, and ask the records team to correct it. Add a note to the tenant record that the caller's number differs from the number on file, to confirm the preferred number at the next contact.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller said she is Priya Shah, tenan… | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"3 Amhurst Road, Flat 9 (P-203) legacy Fixflo record","note":"Conflict: legacy Fixflo export lists \"P. Shah-Mehta\", +44770090016… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `add_note` | {"entity":"Tenant T-1003 Priya Shah","note":"Inbound call 2026-10-10 from +447700900177 (described as work phone). Not the phone on file (+4… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
