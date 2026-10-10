# Case 026-date-conflict: ANSWER

**Outcome:** action_taken · **Severity:** routine

Landlord approved the oven repair and Keystone was assigned. The system booked 30/08 (labelled "Monday", but it is a Saturday). The tenant says she agreed 8 September (a Monday) with the engineer. I asked the contractor to confirm 8 September in writing and told the tenant the date is pending confirmation.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Routine oven repair, landlord approved and contractor assigned. The visit date is disputed: the system says 30/08 and the tenant says 8 Sept. Outstanding: contractor confirmation of the date, and whether anyone attended on 30/08.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance asking them to confirm Monday 8 Sept 10-12 and whether a visit happened today (sent). Email to the tenant explaining the mix-up and that confirmation is pending (sent). Once the contractor replies, confirm the date to the tenant.

**3. Does anything need a human decision, and why?**

No. This is a routine scheduling clarification. A human only needs to step in if the contractor does not reply or has a conflicting booking. The ticket system holds no ticket for this job, so no ticket could be updated.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","body":"Hi, regarding the oven repair at Flat 3, 3 W… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","body":"Hi Clara, thanks for letting us know. Our automated messages s… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
