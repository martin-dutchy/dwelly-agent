# Case 15: Records disagree about who the tenant is: ANSWER

**Decision:** resolved · **Severity:** n/a

The caller gave a name and DOB that match the current CRM tenant (T-1003) for Flat 9, 3 Amhurst Road, so she was verified on those details. The legacy Fixflo export conflicts and is stale, so it was not used. Tenancy status (periodic, 2 months' written notice to leave) and the £1,903 DPS deposit were emailed to her on the address on file.

## Where the case stands
Enquiry closed. Caller identified as tenant T-1003 (Priya Shah, Flat 9, P-203) by name and DOB. Tenancy and deposit details sent by email to the address on file. No open maintenance job.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Logged the inbound call as CALL-101 with the identity check and the caller ID mismatch. | internal | internal | A1 ✅ |
| 2 | OTHER | Added a note flagging the legacy Fixflo record (P. Shah-Mehta, ended 2025-11-30) as conflicting with the CRM and not used for decisions. | internal | internal | A2 ✅ |
| 3 | REPLY_TO_TENANT | Emailed Priya Shah at the CRM address with her periodic tenancy status, the 2-month notice rule and the £1,903 DPS deposit. | Priya Shah, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hello Priya,
> 
> Thanks for calling Mare and Co Lettings today. Here is what we hold for Flat 9, 3 Amhurst Road.
> 
> Tenancy: your tenancy started on 10 January 2026. It is a periodic tenancy, so it has no fixed end date. To move out, you give us at least 2 months' written notice. If you tell us you are thinking of leaving, we can talk through the timing with you.
> 
> Deposit: we hold £1,903, protected with the DPS (Deposit Protection Service).
> 
> If you have any questions, reply to this email.
> 
> Mare and Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Name and DOB match the CRM, but caller ID does not match the CRM phone. Caller ID was treated only as a hint.
- No tenancy-end date was given because the tenancy is periodic. Tenant moving out needs 2 months' written notice.
- This does not confirm any notice has been given or accepted. Any notice would be handled separately.
- The legacy record was annotated only, not corrected in the source system.

## Remaining work
- Records team to clean up the legacy Fixflo entry for Flat 9 (P. Shah-Mehta, +447700900166) so it no longer conflicts with the CRM.
- If Priya gives notice, route it to the property team.

## Missing or unavailable information
- Who the legacy name P. Shah-Mehta refers to and whether that person has any link to the tenancy. Not needed for this call, but worth checking in the clean-up.

## Conflicts between sources
- CRM: Priya Shah, +447700900103, active, tenancy from 2026-01-10. Legacy Fixflo: P. Shah-Mehta, +447700900166, ended, move-out 2025-11-30. CRM trusted (current, higher priority). Legacy not used.
- Caller ID +447700900177 matches neither record. Treated as a hint only.

## Answers to the case questions
**1. 1. Which record do you treat as authoritative and why?**

The CRM record (T-1003, Priya Shah, active, tenancy start 2026-01-10, deposit £1,903 DPS). It is the current system of record and sits highest in the source priority. The legacy Fixflo export is an unmaintained import from an acquired agency, dated 2025-11-30 for a different name and phone, so it is not used.

**2. 2. Is the caller verified? What can you tell her?**

Yes, on name and date of birth only: the caller gave Priya Shah and 21 July 1998, which match the CRM. Caller ID (+447700900177) does not match the CRM phone and is not treated as proof. She was told the tenancy is periodic with no fixed end date, that leaving needs 2 months' written notice, and that £1,903 is held in the DPS. This was sent by email to the CRM address.

**3. 3. What do you do about the conflicting records?**

Used the CRM and did not act on the legacy entry. Added a note to the Flat 9 record flagging the conflict, and asked for the legacy entry to be cleaned up. No change was made to the CRM or to bank details.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller said she is Priya Shah, tenan… | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"P-203 Flat 9, 3 Amhurst Road legacy Fixflo record","note":"Legacy Fixflo export (imported 2026-03 from Amhurst Lettings acquisiti… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hello Priya,\n\nTh… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
