# Case 111: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Front door improved via landlord's key-latch workaround. Tenant reported the back door sticking by phone and the ticket system failed, so I logged it as urgent JOB-101, asked the landlord to approve a contractor and updated the tenant.

## Where the case stands
NBL-111 (front door) on hold: workaround worked, landlord wants a contractor next month, who attends and when is unconfirmed. New urgent back door job JOB-101 on hold awaiting landlord approval (APR-102). The earlier P1 escalation (event 014) was already raised by the call.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor urgently for the back door (or name their own), reply by end of 7 June; also asks who attends the front door next month | Landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant back door is logged as urgent, awaiting landlord approval, ask whether it secures and her availability; front door noted | Ms Fletcher, tenant | email | A4 ✅ |
| 3 | WAIT | Hold urgent back door job pending landlord, review 8 June | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Please confirm we may send our contractor to the back door urgently (target within 24h), or tell us if you will use your own. Reply by end of today, 7 June.
> 
> Options: Our contractor, urgent attendance (recommended); Your own contractor (please give name and date)
> 
> Update: Front door: thanks, the tenant tried your key/latch tip and says it worked; she will monitor it. Please confirm for the front door whether your contractor or ours will attend next month. New issue: the tenant reports the back door also sticks and needs a firm push to close, and she is worried about security. No visit is booked yet.

**A4 · send_message → Ms Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Ms Fletcher, thanks for your call. I'm sorry the system failed while we were logging your back door. It is now logged as an urgent repair (JOB-101) and we've asked your landlord to approve it today; our target for urgent work is within 72 hours, and we'll aim to be quicker. No visit is booked yet. Please reply to tell us whether the back door still locks and secures the flat when pushed firmly, and when we can reach you. Front door: noted that the key tip worked, please tell us if it comes back. We'll update you by end of today. If you ever feel unsafe, call 999.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or visit booked
- Landlord's front-door reply is not approval of our contractor
- Front door is not confirmed permanently fixed

## Remaining work
- Landlord approval for back door (agency)
- Front door contractor next month (landlord/agency), review 10 June
- Tenant to confirm back door secures

## Missing or unavailable information
- Whether back door secures the flat
- Landlord's choice of contractor and spend limit

## Conflicts between sources
- Intake classed the job as Appliances/routine but it is a door issue; tenant also called the caller 'Miles' vs Fletcher in the record
- Landlord email summary (event 009) differs in wording from the full email (event 010); trusted the full text

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Front door eased by workaround, landlord wants contractor next month (route unclear). Back door is a new urgent job (JOB-101) awaiting landlord approval; no visit booked.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (APR-102) and tenant update by email, both sent; review 8 June.

**3. Does anything need a human decision, and why?**

Nothing further now. A P1 escalation was already raised in event 014 for the failed ticket creation; the human only needs the landlord approval outcome and to call the tenant if the door will not secure.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","category":"locks","severity":"urgent","description":"Back door sticking and needs… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-111","decision":"conditional","conditions":"Tenant to try key/latch workaround first; contractor to look at front door ne… | 1 | ✅ verified | Ticket NBL-111 read back after record_landlord_decision |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Please confirm we may send our contractor to the back door urgently (target… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Ms Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"JOB-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Landlord","comment":"Awaiting landlord approval to send our contractor for back door; tenant a… | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-111","reason":"Waiting for Landlord","comment":"Front door eased by workaround; landlord wants contractor next month; awa… | 1 | ✅ verified | Ticket NBL-111 read back after put_on_hold |

## Failed or unverified actions
_None._
