# Case 07: ANSWER

**Outcome:** action_taken · **Severity:** routine

The tenant's email is about the same dripping tap already booked as R-4801 (visit 15 Oct, 08:00-12:00, Swift Plumbing & Heating). No new job was created. I added a note about the worsening drip to R-4801 and replied to the tenant.

## Answers
**1. Should a new repair job be created?**

No. R-4801 is open for the same issue, with a visit already confirmed. A second job would be a duplicate. The worsening drip is still a routine issue: there is no flooding and no vulnerable occupant.

**2. What do you reply to the tenant?**

I sent MSG-102 to the email on file. It confirms the existing job R-4801 and the visit on 15 Oct, 08:00-12:00. It says the worsening has been noted, suggests a bowl or turning off the isolation valve, and asks her to contact us at once if water leaks or sprays.

**3. What do you change on existing records?**

I added note NOTE-101 to R-4801 recording the worsening. The stage, contractor and visit are unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"10 Oct: tenant emailed that the tap is getting worse and now drips constantly even when fully closed. No new tick… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","body":"Hello Amelia… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
