# Case 047-wrong-address: ANSWER

**Outcome:** action_taken · **Severity:** routine

Tenant needs only the bedroom window fixed, as the toilet is already sorted. The landlord's reply named a different property (Flat 18, 88 Alder Lane) and a plumber, so it doesn't fit this case. I logged a routine job, asked the landlord to confirm the property and approve a contractor for the window, and updated the tenant.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The window repair is logged as JOB-101 (routine, init). We are waiting on the landlord to approve a contractor. The landlord's reply is for a different address and a plumber, and the toilet is already fixed, so it doesn't answer our question. No contractor is booked.

**2. What is the next action, who is it for, and through which channel?**

Done: an email to the landlord to confirm the property and say which contractor should do the window, and an email to the tenant with the 14-day target. Next: when the landlord confirms, assign a contractor and give the tenant 24h notice.

**3. Does anything need a human decision, and why?**

Not yet. The landlord's decision on the contractor is pending. If the landlord doesn't clarify, or the Alder Lane plumber visit turns out to be a records mix-up, a human should review it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","category":"general","severity":"routine","description":"Bedroom window not… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","body":"Dear Mr Oakley, thank you for your reply. Your messag… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","body":"Hello, glad the toilet is sorted. We've logged the bedroom wi… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
