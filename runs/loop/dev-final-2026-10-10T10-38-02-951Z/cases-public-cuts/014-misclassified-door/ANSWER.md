# Case 014-misclassified-door: ANSWER

**Outcome:** action_taken · **Severity:** routine

Intake misclassified a front/back door that needs slamming as a fridge appliance issue; the fridge questions were irrelevant and unanswered. No open ticket existed, so I logged a routine door repair (JOB-101) and emailed the tenant relevant questions with a 14-day target.

## Answers
**1. Where does this case stand?**

Misclassified as appliance. It is a door repair. There was no existing ticket; JOB-101 now exists at init. Outstanding: tenant answers on security, glass and access, then contractor booking.

**2. Next action, who, channel?**

Email to tenant asking whether the door locks securely, whether glass is cracked, and about access. Then assign a door/joinery contractor when answers arrive.

**3. Does anything need a human decision?**

No. It is routine and within policy. It would be upgraded to urgent if the door cannot be secured or the glass is damaged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","category":"locks","severity":"routine","description":"Front door (and back door) … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","questions":["Does the front door latch and lock securely once shut?"… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Escalations
_None._

## Failed or unverified actions
_None._
