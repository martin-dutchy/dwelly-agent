# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** action_taken · **Severity:** n/a

Caller claiming to be Priya Shah asked for tenancy end and deposit details from an unrecorded work number. The current CRM is authoritative; the legacy Fixflo row is a stale former tenant record. I disclosed nothing personal, logged the call, noted the conflict and emailed the tenant on file to confirm.

## Where the case stands
Caller not fully verified; awaiting her confirmation via contact details on file. No tenancy or deposit details disclosed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Email the tenant on file about the call and ask her to confirm or call back from the number on file | Priya Shah, tenant (on file) | email | A3 ✅ |
| 2 | OTHER | Note the legacy vs CRM conflict on the property/tenant record | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, someone calling from a work phone number said they were you and asked about your tenancy end date and deposit. For your security we didn't share any details. If that was you, please reply here or call us from the number we have on file and we'll help. In general, since May 2026 tenancies have no fixed end date, and a tenant can leave by giving 2 months' written notice. If it wasn't you, please let us know. Thanks, Mare and Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No verification is established by a DOB and name alone
- Not disclosing details does not mean the caller is not the tenant
- Nothing here records a notice to leave or sets an end date

## Remaining work
- Once the tenant confirms via the email or number on file, give tenancy and deposit details and, if she wants to leave, handle her notice (2 months' written notice)
- Data owner to clean up legacy Fixflo row

## Missing or unavailable information
- Confirmation that the caller is the tenant on file; the work phone number is not on record

## Conflicts between sources
- Legacy Fixflo: Flat 9 tenant P. Shah-Mehta, ended 2025-11-30, phone +447700900166 vs CRM: Priya Shah active, +447700900103; CRM trusted.
- Caller ID +447700900177 matches neither number; caller says it is a work phone.

## Answers to the case questions
**1. Which record do you treat as authoritative and why?**

The current CRM (T-1003, active since 2026-01-10). Source priority puts CRM and signed documents above unmaintained legacy exports. The Fixflo row (P. Shah-Mehta, ended 2025-11-30) is stale and likely a previous tenant.

**2. Is the caller verified? What can you tell her?**

Not fully. Name and DOB match the CRM but the number matches neither CRM nor legacy, and DOB is only a hint. I told her nothing about her tenancy end or deposit. General law can be shared: tenancies are periodic and a tenant leaves on 2 months' written notice. The email to the tenant on file included only that.

**3. What do you do about the conflicting records?**

Trust the CRM, add a note on the record flagging the legacy row as superseded for clean-up, and verify the caller through the contact details on file. No escalation needed unless the tenant says it wasn't her.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Caller claiming to be Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller from +4… | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"P-203 / T-1003","note":"Record conflict: legacy Fixflo export (Amhurst Lettings acquisition, imported 2026-03, unmaintained) list… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, someone … | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
