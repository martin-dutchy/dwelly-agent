# Case 07: ANSWER

**Outcome:** action_taken · **Severity:** routine

Amelia Clarke's email duplicates existing routine job R-4801 (dripping kitchen tap, visit booked 2026-10-15 08:00-12:00 with C-12). No new job was created; the worsening symptom was recorded on R-4801 and the tenant was asked to confirm her date of birth before any booking details are shared.

## Answers
**1. Should a new repair job be created?**

No. R-4801 already covers the dripping kitchen tap at P-201 and is at visit stage with C-12. The email is a worsening update on the same issue, so it is linked to R-4801 instead of duplicated. The symptom is not an emergency: no flooding, gas or electrical risk. The routine severity is kept.

**2. What do you reply to the tenant?**

Sent by email (MSG-101) to the address on file. It thanks her, says her update is on the existing repair, asks her to reply with her date of birth before sharing appointment details, and gives shut-off advice if water starts escaping. It does not disclose the visit date because identity is not yet verified.

**3. What, if anything, do you change on existing records?**

Added a note to R-4801 (NOTE-102) recording the worsening symptom, the retained 15 Oct visit, and a request that C-12 bring cartridge/washer parts. Stage and visit date are unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4801","note":"Tenant email 2026-10-10 12:09 (from registered address): tap now drips constantly even when fully closed, getting wo… | 1 | ✅ verified | Ticket R-4801 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","body":"Hello Amelia… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `add_note` | {"entity":"R-4801","note":"Tenant Amelia Clarke (T-1001, P-201) emailed 2026-10-10 12:09: kitchen tap now drips constantly even when fully c… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Escalations
_None._

## Failed or unverified actions
_None._
