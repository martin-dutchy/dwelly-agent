# Case 012-duplicate-report: ANSWER

**Outcome:** action_taken · **Severity:** routine

The tenant's latest email duplicates an open dishwasher job. Troubleshooting failed, the landlord/manager agreed an engineer, and a visit is booked for 29/04/2026 08:00-12:00. I did not open a new ticket. I told the tenant about the booking and added a note about record inconsistencies.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Troubleshooting is done and failed. An engineer visit is booked for 29/04/2026 8am-12pm. Outstanding: the visit itself, then any quote needing landlord approval. The tenant's 28/04 email is a chaser for the same job.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant confirming the existing booking tomorrow 8-12 and the contractor's number (sent, MSG-101). No new ticket, as that would duplicate the open job.

**3. Does anything need a human decision, and why?**

No. The visit is booked and within policy. A note flags the contractor name and tenant surname inconsistencies for tidy-up. Any quote will need the normal landlord approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","body":"Hi Leo, thanks for getting back to us. An engineer is alr… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"Case 012 Flat 9, 89 Juniper Mews","note":"Tenant chased 28/04 13:52; duplicate of open dishwasher job, visit 29/04 08:00-12:00 al… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Escalations
_None._

## Failed or unverified actions
_None._
