---
id: out-of-hours
title: Out-of-hours calls and reports
tags: [out_of_hours]
when_to_use: The report arrives at night, on a Sunday or when the office is closed, and something may not be able to wait until the next working day.
red_flags:
  - A real emergency was left until the office opens.
  - A routine issue was booked as an emergency call-out at night without saying who pays.
  - The occupant was offered an office-hours service (key collection, a visit) as if it were available tonight.
  - No follow-up was set for the next working day.
---

## Procedure
1. Decide first whether it can wait. Emergencies cannot: gas, carbon monoxide, fire, flooding or water near electrics, sparking electrics, no power at all, a home that cannot be secured, a person locked out at night (especially if vulnerable), and no heating or hot water with a vulnerable occupant or in cold weather. Everything else is logged tonight and handled the next working day.
2. For an emergency, make safe tonight: give the safety advice, and instruct a contractor marked as available out of hours in the records. Emergency make-safe does not wait for the landlord; tell them afterwards, in the way their notes ask.
3. Say who pays when it is not obvious. An out-of-hours call-out caused by the tenant (lost keys, their own damage) is usually at their cost; a fault in the property (a broken lock, a failed boiler) is the landlord's. Where the cause is unclear, say the contractor's findings will decide, and record that.
4. Do not offer what is closed: office key collection, office visits or a staff call-back tonight. Offer what is open now, and the office option for the next working day.
5. Open or update the job with the right severity, escalate P1 for emergencies, and schedule a follow-up for the next working day so the office picks it up.
6. Give the occupant the numbers they may need tonight: 0800 111 999 for gas, 105 for a power cut, 999 in immediate danger.

## Required actions
- `send_message`: what happens tonight and what happens next, to the occupant.
- `create_ticket` or `update_ticket`: the job with its severity.
- `assign_contractor`: an out-of-hours contractor, for emergencies only.
- `escalate_to_human`: P1 for an emergency.
- `schedule_follow_up`: the next working day.

## Red flags
- The occupant is outside in the cold or at night, or is vulnerable.
- The occupant says they will force the door or fix gas or electrics themselves.
- A previous report of the same fault exists: the fault may be the landlord's, not the tenant's.

## Escalate when
- Any emergency: P1, maintenance, once make-safe is instructed.
- Nobody suitable is available out of hours and the risk remains: P1, with what you tried.
