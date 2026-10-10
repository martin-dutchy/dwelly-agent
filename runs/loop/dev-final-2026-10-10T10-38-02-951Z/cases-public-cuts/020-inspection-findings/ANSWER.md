# Case 020-inspection-findings: ANSWER

**Outcome:** escalated · **Severity:** routine

Inspection was completed on 15/02 and the report is dated 16/02. The landlord was told "no issues", but the report records a tenant-installed dog flap and sticker marks in Bedroom 1. A landlord-side email from "Felix Clarke" asks about the unapproved dog flap and a spare key after a lock change. The sender does not match the landlord on record (Oliver Bennett), so I asked for identity confirmation and escalated.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The inspection is done and the report uploaded. Outstanding: a reply to the landlord-side email on the dog flap and key; identity of the sender; a corrected findings summary to the landlord; the Bedroom 1 make-good by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Done now: an information request (REQ-101) by email to Felix Clarke asking for identity and key/lock details. Next: a human verifies and replies, and sends the corrected summary to the verified landlord.

**3. Does anything need a human decision, and why?**

Yes (ESC-102, P3). The sender's identity conflicts with the landlord on record. The dog flap consent and alteration stance, and the lock/key matter, carry tenancy and unlawful-entry risk. Our earlier landlord summary was inaccurate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Felix Clarke","recipient_role":"landlord","channel":"email","questions":["Please confirm your full name and your relation… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Landlord-side email raises unapproved dog flap and a lock change/spare key query; sender name… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Escalations
- **P3 → management** (verified): Landlord-side email raises unapproved dog flap and a lock change/spare key query; sender name doesn't match landlord on record; our inspection email to the landlord understated findings.
  - Known: Inspection done 15/02 (report dated 16/02). Report notes a dog flap fitted by tenants (utility room/back door), a small dog, and sticker marks in Bedroom 1 (tenant to make good). Our landlord email (to Oliver Bennett, 17/02) wrongly said no issues; the upload says Inspection issues: NO. Event 020 email is from "Felix Clarke" about the unapproved dog flap and retrieving a spare front door key after a lock change. No open tickets. Tenant earlier said they have a dog (visit rescheduled 08/02 for the dog).
  - Missing: Who Felix Clarke is and whether they are entitled to instruct; whether Oliver Bennett is still the landlord; who changed the lock and who holds keys; whether landlord ever consented to the dog/flap; email body is only a summary.
  - Options: Verify Felix Clarke vs landlord record, then reply on the dog flap (consent/make-good) and key query; Send corrected inspection summary to the landlord of record; If landlord is not entitled, decline and disclose nothing
  - Recommendation: Confirm sender identity, send a corrected inspection summary to the verified landlord, decide the dog flap stance (alteration vs pet request, no fees), and ensure no one enters or retrieves keys without 24h written notice to the tenant.

## Failed or unverified actions
_None._
