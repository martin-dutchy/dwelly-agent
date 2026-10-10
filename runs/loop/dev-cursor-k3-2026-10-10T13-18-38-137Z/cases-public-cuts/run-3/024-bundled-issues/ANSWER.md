# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed with no evidence of a repair, and the tenant was wrongly told the oven and fence were fixed. I opened separate jobs for the oven, fence and urgent roof leak, noted the error, told the tenant and landlord, and set a follow-up.

## Where the case stands
Original oven ticket closed "without payment" in error. Three new jobs opened: JOB-101 roof leak (urgent), JOB-102 fence (routine), JOB-103 oven (routine). Waiting on tenant details and landlord decision; follow-up set for 2026-08-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Correct the wrong 'fixed' message, confirm three jobs, ask roof leak details, give safety advice and next update date | Imogen Clarke, tenant | email | A5 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell landlord of the error and ask whether to send our contractor or use their own for roof and fence | Landlord | email | A6 ✅ |
| 3 | WAIT | Follow up on tenant details, landlord reply and oven provider status | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A5 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our earlier message saying the oven and fence were fixed was wrong, and we had no confirmation of either. I've reopened them as separate jobs: oven (JOB-103) and fence (JOB-102). I've also logged the leaking conservatory roof as an urgent job (JOB-101). Could you tell us where it's leaking, roughly how much water is coming in, and whether it's near any lights or sockets? If water is near electrics, keep away from them and switch off at the consumer unit if safe. We'll update you by Friday 28 August. Please reply with any times that suit for access.

**A6 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, an update on Flat 6, 56 Juniper Mews. Our earlier note that the oven was fixed was sent in error: there is no contractor report, so we've reopened the oven (JOB-103). The tenant also reports a leaking conservatory roof (JOB-101, urgent) and a fence repair (JOB-102). For the roof and fence, please confirm whether you'd like us to send our contractor to inspect, or whether you'll arrange your own. We'd like your reply by Friday 28 August.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor has been assigned or booked on the new jobs
- The oven fix is not confirmed; the roof cause and fence scope are unknown
- Landlord approval for roof/fence spend has not been given

## Remaining work
- Get roof leak details and landlord decision, then assign contractor (agency, by 2026-08-27)
- Chase Lantern Works for oven visit or reassign
- Landlord decisions on JOB-101 and JOB-102

## Missing or unavailable information
- Leak location and severity, and whether water is near electrics
- Any record of the earlier roof and fence reports
- Lantern Works' response and visit date
- Oven manual and photo attachments were unavailable

## Conflicts between sources
- Event 016 said the oven and fence were fixed, but there is no provider result or visit. Treated as wrong.
- Events 020 and 029 skip the invoice, but event 017 says an invoice was received. No invoice was seen.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The original ticket is closed in error. The oven, fence and conservatory roof leak are all unresolved, now logged as JOB-103, JOB-102 and JOB-101.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant to correct the mistake and ask for roof leak details (done), and email the landlord to ask for a contractor decision on the roof and fence (done). Follow-up on 2026-08-27.

**3. Does anything need a human decision, and why?**

No. The routine steps are done. Escalate to P2 if the roof leak turns out to involve water near electrics or the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports leaking cons… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Tenant asked (event 015) … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"appliance","severity":"routine","description":"Oven not heating prop… | 1 | ✅ verified | Ticket JOB-103 read back at stage init |
| A4 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Closed in error: event 016 told tenant fence and oven were fixed with no provider result, visit o… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","body":"Hi Imoge… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hello, an update on Fl… | 1 | ✅ verified | MSG-106 found in the send_message log |
| A7 | `schedule_follow_up` | {"due_on":"2026-08-27","purpose":"Chase tenant details on roof leak (JOB-101), landlord decision on roof/fence, and Lantern Works status on … | 1 | ✅ verified | FUP-107 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
