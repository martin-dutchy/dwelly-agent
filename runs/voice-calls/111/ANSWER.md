# Case 111: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Front door improved via landlord's latch tip; landlord wants contractor next month, recorded as conditional. Tenant raised the back door as urgent; created JOB-101, asked landlord for approval, updated tenant, and set holds with review dates.

## Where the case stands
NBL-111 (front door) on hold for recurrence; tenant says latch workaround worked, landlord wants contractor next month. New urgent back-door job JOB-101 on hold awaiting landlord approval (review 8 June). Earlier P1 escalation (event 014) already with a human.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve contractor for back door, reply by 8 June | Landlord | email | A6 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: back door logged as separate urgent job, approval requested, next update 8 June | Ms Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Hold JOB-101 pending landlord, review 8 June | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ms Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Ms Fletcher, thanks for your call. Glad the front door is better with the key tip; please tell us if it comes back. We have logged your back door as a separate urgent job (JOB-101) and have asked your landlord today for the go-ahead to send a contractor. We can't promise a date until that's agreed, but we'll update you by tomorrow, 8 June. If the door will not secure the flat at all, or you feel unsafe, call 999 if in immediate danger, and ring the office.

**A6 · request_landlord_approval → Landlord (landlord)** (verified)

> Thanks for your reply on the front door; the tenant says your latch tip worked and she will monitor it. She has now also reported the BACK door sticking and needing a firm push, and is worried about security. May we send our contractor to look at the back door promptly? Please reply yes/no by end of 8 June.
> 
> Options: Yes, send our contractor to look at the back door now (recommended); Landlord arranges own contractor; Leave until next month

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord's reply is a conditional approach for the front door only, not approval for any contractor spend or the back door
- No contractor assigned or visit booked
- Email to tenant does not promise a date

## Remaining work
- Landlord decision on back door (JOB-101)
- Front door review 14 June / contractor next month per landlord
- Human already alerted via event 014 to call tenant back

## Missing or unavailable information
- Back door details/photos; whether it secures the flat
- Landlord answer on back door

## Conflicts between sources
- Intake classed the door as Appliances; it is a door/lock issue (JOB-101 categorised as locks)
- Tenant on call was inconsistent about front vs back door; tenant later confirmed front fixed, back sticking
- Landlord email said contractor next month, which does not cover the new back door report

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Front door resolved for now by workaround, tenant monitoring; contractor visit per landlord next month. Back door is a new urgent job awaiting landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request for back door (email, landlord); tenant update sent by email.

**3. Does anything need a human decision, and why?**

No new escalation: a P1 handover was already raised at event 014 for the tenant callback after the ticket-creation failure. The landlord's decision is the pending item, not a human one.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","category":"locks","severity":"urgent","description":"Back door sticking, needs a … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-111","decision":"conditional","conditions":"Tenant tries latch workaround first; contractor to look next month. Tenant re… | 1 | ✅ verified | Ticket NBL-111 read back after record_landlord_decision |
| A3 | `send_message` | {"recipient_name":"Ms Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"JOB-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Landlord","comment":"Awaiting landlord approval to send contractor to back door","review_on":"… | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-111","reason":"Waiting for Tenant","comment":"Front door improved with latch workaround; tenant monitoring; landlord want… | 1 | ✅ verified | Ticket NBL-111 read back after put_on_hold |
| A6 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Thanks for your reply on the front door; the tenant says your latch tip wor… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |

## Failed or unverified actions
_None._
