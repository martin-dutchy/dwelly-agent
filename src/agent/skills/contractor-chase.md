---
id: contractor-chase
title: Chasing contractors, visits and missed appointments
tags: [contractor_chase]
when_to_use: A contractor has not replied, booked, attended or reported back, a visit date is disputed or has passed without a result, or the system asks you to check what is happening with the provider.
red_flags:
  - A fourth identical reminder was sent to a provider.
  - A visit was announced as booked when only the tenant proposed the date.
  - A date in the past, or a weekday that does not match the date, was given to anyone.
  - A second booking was made on top of an existing one.
  - The tenant was not told what happens next and when they will hear.
---

## Procedure
1. Read the job's stage, contractor and visit with `get_ticket`. "No work results; we need to check what is happening": the visit date has passed. Ask the provider and the tenant what happened. Record the outcome with `record_work_result` once someone tells you (a missed appointment or no access counts too).
2. "No response after 3 days": one chase on a different channel, then the chase rule below.
3. "3+ reminders have been sent to provider": stop reminding; never send a fourth reminder. You cannot phone from this run, so reassign if another contractor is approved for the job, otherwise escalate recommending a provider swap, and tell the tenant.
4. Chase rule: every chase says exactly what you need and the date you need it by. Do not chase a party you contacted more recently than the cadence, and do not repeat a message already sent. After 3 unanswered reminders, change channel, reassign, or escalate recommending a swap.
5. Visits: a visit is booked when the system recorded it ("Visit date selected" and the appointment emails) or the party doing the visit stated that date. A date only the tenant gave is a proposal: ask the provider to confirm it and tell the tenant it is not confirmed yet. If the tenant and the record disagree, say which date the record holds, list every date you can see with its source, and confirm with the provider. Never book twice.
6. Provider replies:
   - Cannot do it or declines: reassign and tell the tenant.
   - No access, tenant not home: `record_work_result` with no_access, rebook and find out why.
   - Needs parts or a return visit: `schedule_follow_up` and tell the tenant and landlord. Do not close.
   - Asks for the tenant's number to book: pass on the contact on file exactly as written, with any calling instructions; say you will check the tenant's direct number and ask the tenant for the best number and times.
   - Found another fault on site: a new job, check severity, landlord approval before extra work.
   - Emoji only, one word, unreadable: read it as best you can; if it cannot be read, ask one plain question that covers both what the reply meant and what you need, and keep the raw text in a note.
   - "Email received from provider, but expected data could not be extracted": read the email yourself; if it has no readable content, ask for a PDF or a plain-text reply.
7. Tenant asks for an update: give the true status from the record, chase whoever is blocking, never invent a date, and say when they will next hear from us.
8. Waiting is fine when the provider is inside the cadence or the visit is in the future: record it with `schedule_follow_up` or `put_on_hold` and a review date (the next working day for urgent jobs, 2 to 3 working days for routine ones).

## Required actions
- `send_message` or `request_information`: the chase or question to the provider, with the date you need the answer by.
- `record_work_result`: what the visit produced, including no access or a missed appointment.
- `set_visit`: only for a future date the provider confirmed.
- `assign_contractor`: a reassignment when another approved contractor exists.
- `put_on_hold` or `schedule_follow_up`: the review date.

## Red flags
- The visit date in the record is in the past or falls on a different weekday than stated.
- Different appointment dates in different messages.
- A caller from a company name that differs from the assigned provider (often the same firm: note it and carry on).
- The tenant says nobody came.

## Escalate when
- Three unanswered provider reminders and no other channel or contractor left: P3, maintenance, recommending a swap.
- An urgent repair stalled because the provider will not attend: P2, maintenance.
