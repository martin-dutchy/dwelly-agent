# Case 111: Front Door Repair Request: ANSWER

**Decision:** escalated · **Severity:** urgent

Front door resolved by landlord's latch workaround; landlord wants contractor next month. Tenant raised a back door fault on call and the agent's ticket creation failed, so I created JOB-101 as urgent, asked landlord for approval, updated tenant and escalated P2 for a same-day landlord call.

## Where the case stands
NBL-111 (front door): resolved for now by landlord's key/latch workaround; landlord wants contractor next month, no visit booked, follow-up set 1 Jul. New urgent job JOB-101 (back door) at init, awaiting landlord approval (APR-102); tenant told; escalated P2.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor or name their own for the urgent back door (JOB-101), reply today | Landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant back door is logged urgent, approval pending, asked whether it secures, safety note, next update by 8 June | Ms Fletcher, tenant | email | A4 ✅ |
| 3 | ESCALATE_TO_HUMAN | P2 handover: phone landlord for same-day approval and call tenant back | internal maintenance | internal | A9 ✅ |
| 4 | WAIT | Chase landlord on 8 June for back door; front door contractor review 1 July | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Approve our contractor to attend the back door (new job JOB-101) urgently, or tell us you will arrange your own.
> 
> Options: Approve our contractor to attend urgently (recommended); You arrange your own contractor (please give name and date)
> 
> Update: Thanks for the key/latch tip: tenant says it fixed the front door this morning; she will monitor and we have noted your plan for a contractor to look at it next month (NBL-111, no visit booked yet). On the call today she also reported the back door sticks and needs a firm push, and she is worried about security. We have logged this as urgent (JOB-101). Please reply today with yes/no.

**A4 · send_message → Ms Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Ms Fletcher, sorry the system failed during our call. Your back door is now logged as an urgent repair (JOB-101). We've asked your landlord to approve a contractor today; the urgent target is within 24 hours of approval, and I can't promise a time yet. Front door: glad the key trick helps; the landlord plans a contractor visit next month, and please tell us if it gets worse. Back door: does it close and latch (even with a firm push) so the flat is secure when you go out? If it won't lock or secure, please tell us straight away. Please close it carefully rather than slamming, as slamming can crack glass. If it feels unsafe, call 999. We'll update you by end of tomorrow, 8 June, at the latest.

## Escalation
- **P2 → maintenance** (verified): Urgent back door security concern; tenant wants same-day; landlord approval pending
  - Known: Tenant Ms Fletcher, Flat 12, 52 Meadow Row. Front door fixed by workaround (events 012/013). Back door sticks, needs firm push, tenant worried about safety, in until 5pm 7 Jun. Call ticket creation failed; I created JOB-101 (urgent), asked landlord to approve, messaged tenant. No contractor named on property record.
  - Missing: Whether back door secures/locks; landlord approval and spend limit; the on-call colleague callback status.
  - Options: Phone landlord for same-day approval and book a locksmith/carpenter; Wait for landlord reply, chase 8 June
  - Recommendation: Phone landlord now for approval and book urgent attendance; call tenant back as promised.

## What this does not establish
- Landlord's reply is not approval to send a contractor to the back door
- No visit booked and no contractor assigned
- Tenant's claim the front door is fixed is not a permanent repair; frame/wobble not inspected
- Does not establish whether back door secures the flat

## Remaining work
- Landlord approval for back door (agency/landlord)
- Assign contractor and book visit once approved
- Front door contractor visit next month
- Confirm whether back door secures; human callback to tenant

## Missing or unavailable information
- Landlord approval and spend limit
- Whether back door locks securely
- Contractor on file for the property

## Conflicts between sources
- Intake classed the issue as Appliances/routine; it is a door fault.
- Landlord email summary (event 009) vs full text (event 010): used full text.
- Call names tenant 'Miles' vs 'Fletcher'; treated as the same tenant.
- Earlier P1 escalation (event 014) vs routine severity; set urgent as the tenant reports security worry but door latches with a push.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Front door settled via workaround with a contractor look planned next month; back door is a new urgent job JOB-101 awaiting landlord approval.

**2. What is the next action, who for, which channel?**

Landlord approval request for the back door by email (APR-102) and tenant update by email (MSG-103); follow-up 8 June.

**3. Does anything need a human decision?**

Yes, P2: same-day landlord approval/contact and tenant callback for the urgent back door security concern, as it can't be authorised without landlord or limit on file.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","category":"locks","severity":"urgent","description":"Back door sticking, needs a … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-111","decision":"conditional","conditions":"Tenant tries key/latch workaround first; contractor to look at front door nex… | 1 | ✅ verified | Ticket NBL-111 read back after record_landlord_decision |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Approve our contractor to attend the back door (new job JOB-101) urgently, … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Ms Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"JOB-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2024-06-08","purpose":"Chase landlord for back door approval; update tenant; on approval assign contractor… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `add_note` | {"entity":"NBL-111","note":"Front door: landlord workaround (use key to retract latch then close) worked per tenant (events 012, 013); landl… | 1 | ✅ verified | NOTE-105 found in the add_note log |
| A7 | `schedule_follow_up` | {"ticket_ref":"NBL-111","due_on":"2024-07-01","purpose":"Landlord wants contractor to look at front door 'next month': ask landlord to appro… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |
| A8 | `resume_auto` | {"ticket_ref":"NBL-111"} | 1 | ✅ verified | Ticket NBL-111 read back after resume_auto |
| A9 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Urgent back door security concern; tenant wants same-day; landlord approval pending","known"… | 1 | ✅ verified | ESC-107 found in the escalate_to_human log |

## Failed or unverified actions
_None._
