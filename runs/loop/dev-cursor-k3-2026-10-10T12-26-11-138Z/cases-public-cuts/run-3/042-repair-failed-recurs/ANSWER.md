# Case 042: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports the washing machine repair failed after about 5 days. I reopened the closed job, asked Lantern Services to return, and updated the tenant and landlord. A follow-up is set for 7 March.

## Where the case stands
Job was closed on 28 Feb after a £75+VAT repair; the tenant reports on 4 Mar that the fault recurred. Ticket reopened (mp_time). Waiting on Lantern Services to return and book a visit with the tenant; follow-up set for 2024-03-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Lantern Services to return for a repeat visit and confirm a date with the tenant | Lantern Services, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell Noah the job is reopened, no date confirmed yet, next update by 7 March | Noah Jenkins, tenant | email | A3 ✅ |
| 3 | OTHER | Inform landlord of the recurrence and the reopened job | Mercer, landlord | email | A4 ✅ |
| 4 | WAIT | Review provider confirmation of visit on 2024-03-07 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Lantern Services (contractor) via email, existing thread (event 024 email)** (verified)

> Hello, the tenant at Flat 20, 120 Alder Lane reports the washing machine fault has returned: after your repair of the heating element wiring it worked for a couple of washes, but the water has not heated on the 60°C cycle for about 5 days. Please return to re-inspect and put it right as a repeat visit to the previous job, and contact the tenant (07700 900566, enter the code when calling) to arrange a time. Please confirm the date with us. If it needs parts or a new quote, send the quote before starting work. Please also note any invoice for this return visit should be raised only if you consider it chargeable; we'll check against the earlier work.

**A3 · send_message → Noah Jenkins (tenant) via email, existing thread (event 032 email)** (verified)

> Dear Noah, sorry the washing machine fault has come back. I've reopened the job and asked Lantern Services to return and re-check it. They should contact you to arrange a time; no date is confirmed yet. If you haven't heard from them by Thursday 7 March, please let us know and we'll chase. I'll update you by then.

**A4 · send_message → Mercer (landlord) via email, agency landlord record** (verified)

> Dear Mercer, an update on Flat 20, 120 Alder Lane: the tenant reports the washing machine is again not heating on 60°C cycles, about 5 days after the repair we told you about on 28 Feb. We've reopened the job and asked the engineer to return and re-check. We'll let you know the outcome, and will come to you before any further cost beyond the original repair.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or confirmed; the cause of the recurrence is not established
- Does not decide who pays for the return visit (warranty/chargeable)
- The invoice mismatch is not resolved

## Remaining work
- Lantern to confirm return visit date (agency, review 7 Mar)
- Record work result after the visit
- Check the earlier invoice (£75.11, due date 2026) against £75+VAT and whether the return is chargeable before any payment

## Missing or unavailable information
- Invoice document and attachments not seen
- Whether earlier invoice was paid
- Landlord's spend limit not on file

## Conflicts between sources
- Invoice £75.11 (due 2026) vs '£75 + VAT' in the landlord update
- Visit slot 'Tuesday 1pm' in the calls vs system date 23/02 3:25pm
- Ticket closed 'need confirmation from landlord' but no landlord confirmation was seen

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It was closed on 28 Feb, but the repair has failed. It is now reopened, awaiting Lantern's return visit date. The invoice question is also outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Lantern Services asking for a return visit (done), with the tenant and landlord updated by email. Next is a chase on 7 March.

**3. Does anything need a human decision, and why?**

Not now. A human is needed only if the provider disputes responsibility or any extra cost is quoted, or if the invoice discrepancy is not resolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-042-repair-failed-recurs","stage":"mp_time","note":"Reopened: tenant reports on 2024-03-04 (event 032) fault recurred ~5 days af… | 1 | ✅ verified | Ticket NBL-042-repair-failed-recurs read back at stage mp_time |
| A2 | `send_message` | {"recipient_name":"Lantern Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 024 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Noah Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Mercer","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-042-repair-fai… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-042-repair-failed-recurs","due_on":"2024-03-07","party":"Lantern Services","purpose":"Check provider confirmed return vis… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
