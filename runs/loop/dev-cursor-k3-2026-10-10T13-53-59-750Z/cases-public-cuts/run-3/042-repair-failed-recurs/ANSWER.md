# Case 042: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant says the washing machine fix failed after 5 days. I reopened the job, asked Lantern Services for a no-charge guarantee return visit, and updated the tenant and landlord. A follow-up is set for 6 March.

## Where the case stands
Ticket was closed on 28/02 after Lantern Services repaired the heating element wiring (£75 + VAT). Tenant reports the fault is back (event 032). Reopened at mp_time; waiting on Lantern Services to confirm a return-visit date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Instruct Lantern Services to do a guarantee return visit at no charge and confirm a date | Lantern Services, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Apologise, explain return visit, no date confirmed yet, next update by 6 March | Noah Jenkins, tenant | email | A3 ✅ |
| 3 | OTHER | Tell landlord the job is reopened under guarantee, any charge comes back for approval | Mercer, landlord | email | A4 ✅ |
| 4 | WAIT | Follow up with provider on 6 March for a confirmed date | Lantern Services | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Lantern Services (contractor) via email, existing thread (event 018 email)** (verified)

> Dear Lantern Services, the washing machine at Flat 20, 120 Alder Lane (NBL-042) has the same fault again: the tenant says it worked for a couple of washes after your repair (heating element wiring replaced) but has not heated on the 60°C cycle for 5 days. Please treat this as a return visit under your workmanship guarantee, at no extra charge. Please contact the tenant (details as on the original job email) and reply with a date and time you can confirm. Please also send photos and a short note of what you find. If you think it needs more than a guarantee fix, send a quote and do not start work until we approve it.

**A3 · send_message → Noah Jenkins (tenant) via email, existing thread (event 032 email)** (verified)

> Dear Noah, sorry the repair didn't last. I've reopened the job and asked Lantern Services to come back as a return visit under their guarantee, at no cost. They will contact you to agree a time; no date is confirmed yet. Please let me know if you haven't heard from them within 2 working days. I'll check progress with them by 6 March and update you then.

**A4 · send_message → Mercer (landlord) via email, agency landlord record** (verified)

> Dear Mercer, an update on Flat 20, 120 Alder Lane (NBL-042). The tenant reports the washing machine fault has returned after the repair we told you about on 28 Feb. We have reopened the job and asked Lantern Services to return under their workmanship guarantee, at no charge. If they find it needs further work or a quote, we will come back to you for approval before anything is spent. We will update you once a visit is confirmed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms a visit date or the cause of the recurrence
- Guarantee cover is assumed from workmanship, not confirmed by Lantern
- No spend approved

## Remaining work
- Lantern to confirm visit date; then set_visit
- Record work result, photos and invoice (or no-charge) after visit
- Landlord approval if extra work is quoted
- Possible duplicate invoice (£75.11 vs £75 + VAT) from earlier job needs checking by accounts if not already paid

## Missing or unavailable information
- Provider-confirmed return date
- Whether Lantern accepts guarantee
- Original invoice was never recorded and no photos exist

## Conflicts between sources
- Ticket was closed with no tenant confirmation or photos, yet the tenant now reports a recurrence; I trusted the tenant's latest message.
- Invoice email says £75.11 due July 2026 while landlord was told £75 + VAT; not reconciled.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It was closed on 28/02 and is now reopened at mp_time because the repair did not hold. Outstanding: a provider-confirmed return visit, the result, and the invoice or no-charge confirmation.

**2. What is the next action, who is it for, and through which channel?**

Email to Lantern Services asking for a guarantee return visit and a confirmed date. Emails also went to the tenant and landlord.

**3. Does anything need a human decision, and why?**

No. This is a routine guarantee return. It only goes to a human if Lantern refuses the guarantee or the cost is disputed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-042-repair-failed-recurs","stage":"mp_time","note":"Reopened: tenant reports (event 032, 04/03) fix did not hold, no hot water h… | 1 | ✅ verified | Ticket NBL-042-repair-failed-recurs read back at stage mp_time |
| A2 | `send_message` | {"recipient_name":"Lantern Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Noah Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Mercer","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-042-repair-fai… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-042-repair-failed-recurs","due_on":"2024-03-06","party":"Lantern Services","purpose":"Confirm return visit date for washi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
