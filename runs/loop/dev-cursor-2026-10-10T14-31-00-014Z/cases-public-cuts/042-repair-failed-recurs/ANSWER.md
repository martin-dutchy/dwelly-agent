# Case 042: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports the washing machine repair failed within days of the ticket closing. I reopened the job, asked Lantern Services for a no-charge guarantee return visit, held their invoice, and updated the tenant and landlord.

## Where the case stands
Ticket was closed 28 Feb; reopened to mp_time on 4 Mar after tenant reported the repair failed. Waiting on Lantern Services to confirm a return-visit date; invoice £75.11 held.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Lantern Services for a no-charge guarantee return visit and to confirm a date by 6 March | Lantern Services, provider | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell Noah the job is reopened, no visit booked yet, we'll chase by 6 March | Noah Jenkins, tenant | email | A4 ✅ |
| 3 | OTHER | Tell landlord of failed repair, return visit at no charge, invoice held | Mercer, landlord | email | A5 ✅ |
| 4 | WAIT | Follow up on provider visit date 6 March | Lantern Services | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Lantern Services (contractor) via email, existing thread (event 024 email)** (verified)

> Hello, the washing machine at Flat 20, 120 Alder Lane (tenant Noah Jenkins) has stopped heating on the 60°C cycle again after your repair on or around 28 Feb (heating element wiring replaced). The tenant says it worked for a couple of washes only. Please attend for a return visit under your workmanship guarantee at no extra charge, contact the tenant using the details from the original job email, and confirm the date to us. Please report what you find and the cause. Your invoice of £75.11 is on hold until this is resolved. Please confirm a visit date by 6 March.

**A4 · send_message → Noah Jenkins (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Noah, sorry the fix didn't last. I've reopened the job and asked Lantern Services to come back to redo the repair at no extra cost. They'll contact you to arrange a time, and nobody is booked yet; I'll confirm once they give us a date. Please let me know if they haven't been in touch by 6 March and I'll chase. You'll hear from us by then either way. Please tell me if the machine shows any other fault, such as leaking or burning smells, and stop using it if so.

**A5 · send_message → Mercer (landlord) via email, agency landlord record** (verified)

> Dear Mercer, an update on the washing machine at Flat 20, 120 Alder Lane. The tenant reports the repair of 28 Feb has failed and the water is again not heating on 60°C. I've reopened the job and asked Lantern Services to do a return visit under their workmanship guarantee at no charge, and I've put their £75.11 invoice on hold meanwhile. If they find it needs further parts or a replacement, I'll come back to you for approval before any cost. I'll update you once a visit is confirmed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked; the date depends on provider confirmation
- Does not establish the cause of the recurrence
- Holding the invoice does not decide whether it is payable

## Remaining work
- Lantern Services to confirm and attend return visit (ops)
- Resolve held invoice after the visit
- Landlord approval needed if further cost arises

## Missing or unavailable information
- Return visit date
- Lantern's findings on the cause
- Invoice (£75.11 vs the £75 + VAT reported) mismatch to check

## Conflicts between sources
- Invoice £75.11 (event 024) vs £75 + VAT told to landlord (event 025); invoice due date 2026 is odd
- Ticket was closed with no landlord confirmation (event 030)
- Tenant call said Tuesday 1pm, but the visit was recorded as 23/02 3:25pm

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It was closed on 28 Feb after the repair, then reopened on 4 Mar as the fault recurred. Outstanding: the return-visit date from the provider, the held invoice, and the cause.

**2. What is the next action, who is it for, and through which channel?**

Lantern Services, by email, for a guarantee return visit with the date confirmed by 6 March. The tenant and landlord have been updated by email.

**3. Does anything need a human decision, and why?**

No. This is a routine return visit under guarantee. A human is needed only if the provider refuses or further cost arises.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-042-repair-failed-recurs","stage":"mp_time","note":"Reopened: tenant reports fix (replaced heating element wiring, 28 Feb) faile… | 1 | ✅ verified | Ticket NBL-042-repair-failed-recurs read back at stage mp_time |
| A2 | `hold_payment` | {"payee":"Lantern Services","reason":"NBL-042: repair failed and recurred; invoice GBP 75.11 held until return visit resolves it."} | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Lantern Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 024 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Noah Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Mercer","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-042-repair-fai… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-042-repair-failed-recurs","due_on":"2024-03-06","party":"Lantern Services","purpose":"Check return visit date confirmed; … | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
