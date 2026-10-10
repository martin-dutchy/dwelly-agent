# Case 042: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant reports the washing machine repair failed after a few washes. The job had been closed without tenant confirmation. I reopened it, asked Lantern Services to return as rework, and updated the tenant and landlord.

## Where the case stands
Ticket was closed on 28 Feb; reopened now (stage mp_time) after the tenant reported the fix failed. Waiting on Lantern Services to contact the tenant and confirm a return visit; review 2024-03-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Asked Lantern Services to return and re-inspect as rework, and confirm the date | Lantern Services, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant job is reopened, no date booked yet, next update by 7 March | Noah Jenkins, tenant | email | A3 ✅ |
| 3 | OTHER | Informed landlord of recurrence and rework request | Mercer, landlord | email | A4 ✅ |
| 4 | WAIT | Follow-up on provider visit confirmation on 2024-03-07 | Lantern Services | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Lantern Services (contractor) via email, existing thread (event 024 email)** (verified)

> Dear Lantern Services, the tenant at Flat 20, 120 Alder Lane (Noah Jenkins) reports the washing machine repair has not held: it worked for a couple of washes but the water has not heated on the 60°C cycle for around 5 days. Please return to re-inspect and put it right under your original visit (we expect this to be treated as a rework, not a new charge). Please contact the tenant on the number on the original job email (07700 900566, enter the code when calling) to book, and confirm the date to us. If you think a different fault or a quote is needed, send the quote and do not start work until we approve. Thank you.

**A3 · send_message → Noah Jenkins (tenant) via email, existing thread (event 032 email)** (verified)

> Dear Noah, thank you for letting us know, and sorry the repair didn't last. We've reopened the job and asked Lantern Services to come back and look at it again. They should contact you to arrange a time; no date is booked yet. If you haven't heard from them, we'll check in with you by Thursday 7 March. Kind regards.

**A4 · send_message → Mercer (landlord) via email, agency landlord record** (verified)

> Dear Mercer, a quick update on Flat 20, 120 Alder Lane: the tenant reports the washing machine fault has returned after the repair we told you about on 28 Feb (water not heating on 60°C). We've reopened the job and asked the same engineer to return and re-inspect. We're asking for this to be handled as a rework of the earlier repair; we'll come back to you before any further cost is committed. We'll update you once a visit is confirmed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reopening does not book a visit or establish the cause of recurrence
- Does not settle who pays for the return visit; the provider has not agreed it is free rework
- No extra spend approved

## Remaining work
- Provider to contact tenant and confirm the visit date, then set_visit
- Check whether the Lantern invoice (£75.11 reported in event 024) is affected; the repair was reported as £75 + VAT
- Re-close only with tenant confirmation, invoice handling and landlord informed

## Missing or unavailable information
- Original invoice and attachments were not visible
- Provider's view on the cause of the failure and rework terms

## Conflicts between sources
- Ticket was closed at event 031 with 'Need confirmation from landlord' and no tenant confirmation, contradicting the tenant's report that the fault persists; I trusted the tenant's latest report.
- Invoice in event 024 is £75.11 due 2026, versus £75 + VAT in event 025; not resolved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It was closed on 28 Feb but the repair failed (tenant email, 4 Mar). It is now reopened and waiting on the provider to book a return visit. The visit, the rework terms and the invoice are outstanding.

**2. What is the next action, who is it for, and through which channel?**

The rework request went to Lantern Services by email. The tenant and landlord have been updated by email. A follow-up is set for 7 March.

**3. Does anything need a human decision, and why?**

No. This is a routine rework. It goes to a human only if the provider disputes free rework or quotes additional cost above the approved figure.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-042-repair-failed-recurs","stage":"mp_time","note":"Reopened: tenant reports on 2024-03-04 (event 032) the fix did not hold; wat… | 1 | ✅ verified | Ticket NBL-042-repair-failed-recurs read back at stage mp_time |
| A2 | `send_message` | {"recipient_name":"Lantern Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 024 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Noah Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NBL… | 2 | ✅ verified | MSG-105 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Mercer","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-042-repair-fai… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-042-repair-failed-recurs","due_on":"2024-03-07","party":"Lantern Services","purpose":"Check provider has contacted tenant… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
- A3 attempt 1: First tenant message was not in the send log; retried once and verified as MSG-105.
