# Case 042: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports the washing machine repair failed after a few washes. I reopened the closed job, asked Lantern Services for a no-charge guarantee return visit, held their invoice, and updated tenant and landlord. No human decision is needed yet.

## Where the case stands
Reopened at mp_time (was closed/completed). Waiting on Lantern Services to confirm a return-visit date; invoice payment on hold; follow-up 2024-03-06.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Lantern Services for a no-charge guarantee return visit and a confirmed date | Lantern Services, provider | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant job reopened, nothing booked yet, next update by 6 March | Noah Jenkins, tenant | email | A4 ✅ |
| 3 | OTHER | Inform landlord of failed repair, return visit at no charge, invoice held | Mercer, landlord | email | A5 ✅ |
| 4 | WAIT | Review provider confirmation on 2024-03-06 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Lantern Services (contractor) via email, existing thread (event 024 email)** (verified)

> Hello, the tenant at Flat 20, 120 Alder Lane reports the washing machine fault you repaired (heating element wiring) has returned: it worked for a couple of washes, and for the last 5 days the water has not heated on the 60°C cycle. Please treat this as a return visit under your workmanship guarantee at no extra charge. Please contact the tenant (details as on the original job email, 07700 900566, enter the code when calling), and reply with a date and time you can confirm, plus photos and notes of what you find. Your invoice for £75.11 is on hold until this is resolved. Please do not send a further invoice for the return visit.

**A4 · send_message → Noah Jenkins (tenant) via email, existing thread (event 032 email)** (verified)

> Dear Noah, sorry the repair didn't last. I've reopened the job and asked Lantern Services to come back and fix it properly, at no extra cost. They should contact you to agree a time, and I've asked them to confirm a date with us. Nothing is booked yet. Our target is to have this sorted within 14 days. If you haven't heard from them within 2 working days, or you notice any burning smell, leaking or sparking, please tell us straight away. We'll update you by Wednesday 6 March.

**A5 · send_message → Mercer (landlord) via email, agency landlord record** (verified)

> Dear Mercer, an update on Flat 20, 120 Alder Lane: the tenant reports the washing machine fault repaired last week has returned (water not heating at 60°C for 5 days). I've reopened the job and asked Lantern Services to return under their workmanship guarantee at no charge. We are holding their £75 + VAT invoice meanwhile. If the machine turns out to be beyond repair, we'll come back to you for approval before any further cost. We'll update you once a date is confirmed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked; the date must come from the provider
- Does not establish the cause of the recurrence or that the guarantee is accepted by the provider
- Holding payment does not decide the invoice dispute

## Remaining work
- Lantern to confirm date, then set_visit and attend
- Record work result, photos, then invoice decision and final checks
- Landlord told of outcome

## Missing or unavailable information
- Photos/attachments never seen (events 004, 013)
- Invoice amount discrepancy: £75.11 (event 024) vs £75 + VAT (event 025)
- Provider's visit notes

## Conflicts between sources
- Ticket closed at event 031 but the tenant says the fix failed; trusted the tenant's latest report
- Invoice £75.11 (event 024) vs £75 + VAT (event 025)
- Visit slot 'Tuesday 1pm' (event 016) vs 23/02 3:25pm recorded (event 017)
- Classified as heating/hot water but it is an appliance fault

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It was closed on 28 Feb with no photos, and the landlord was only told afterwards. The tenant reports the fault recurred. It is now reopened at mp_time, waiting for Lantern to confirm a return visit.

**2. What is the next action, who is it for, and through which channel?**

Lantern Services, by email: a guarantee return visit at no charge and a confirmed date. Tenant and landlord were also emailed.

**3. Does anything need a human decision, and why?**

No. Escalate only if Lantern refuses the guarantee, doesn't respond, or the machine proves beyond repair (landlord approval needed then).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-042-repair-failed-recurs","stage":"mp_time","note":"Reopened: tenant reports (event 032, 4 Mar) fix did not hold, water still no… | 1 | ✅ verified | Ticket NBL-042-repair-failed-recurs read back at stage mp_time |
| A2 | `hold_payment` | {"payee":"Lantern Services","reason":"NBL-042: repair failed within a week; return visit needed under guarantee. Invoice £75.11 on hold unti… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Lantern Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 024 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Noah Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Mercer","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-042-repair-fai… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-042-repair-failed-recurs","due_on":"2024-03-06","party":"Lantern Services","purpose":"Check provider confirmed return-vis… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
