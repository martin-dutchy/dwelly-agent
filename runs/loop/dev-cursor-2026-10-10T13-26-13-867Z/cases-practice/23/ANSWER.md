# Case 23: Gas smell after a failed identity check (AI phone line): ANSWER

**Decision:** action_taken · **Severity:** emergency

Caller Jonah Okafor (T-1002) reported a gas smell. The AI line verified him against the wrong record (T-1001, Amelia Clarke) because find_tenant was never run; his details actually match T-1002. I raised emergency JOB-101, assigned Gas Safe Bow Gas & Heating for a same-day window, messaged the tenant and landlord, and set an evening follow-up.

## Where the case stands
Emergency gas job JOB-101 at visit stage; Bow Gas & Heating assigned for a same-day window (14:00-20:00, target, not yet confirmed by contractor). Waiting on NGES attendance, engineer report, tenant welfare reply. E-4902 stays open as the P1.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Raised emergency JOB-101 and assigned Gas Safe Bow Gas & Heating, same-day window | Bow Gas & Heating, contractor | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant: stay out, call 0800 111 999, apology for our verification error, engineer coming today, welfare check, next update this evening | Jonah Okafor, tenant | sms | A3 ✅ |
| 3 | OTHER | Told landlord of gas emergency same day and the action taken | Margaret Ellison, landlord | email | A4 ✅ |
| 4 | WAIT | Evening follow-up: NGES/engineer outcome, welfare, temporary heating if capped | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, it's Northbridge. Sorry about the trouble on the phone: our system checked the wrong record, that was our error and your details are fine. Please stay outside, don't use switches or flames, and if you haven't already call the National Gas Emergency line on 0800 111 999 (999 if in immediate danger). We've asked a Gas Safe engineer (Bow Gas & Heating) to attend today and will confirm their time once they do. Please don't go back in until the gas service says it's safe. Are you OK, and do you have somewhere to stay? We'll also look at the other things you're worried about, including your stiff front door lock. We'll update you again by this evening.

**A4 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, today (10 Oct) the tenant at 27 Bethnal Green Road reported a strong smell of gas in the kitchen. They have left the property and been told to call the National Gas Emergency line. Per your standing instruction for emergencies, we have raised JOB-101 and instructed Bow Gas & Heating (Gas Safe registered) to attend today to find and repair the fault once the gas service has made it safe. The supply may be capped; the tenant is vulnerable so we will consider temporary heating/hot water. We'll update you when the engineer has reported and send any quote over your limit for approval.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Assigning the engineer does not mean the contractor has confirmed the time or that the gas is safe.
- Marking E-4901 invalid does not close it in the queue; a human should close it.
- Nothing yet decides the cause, cost, or lock job R-4766.

## Remaining work
- Confirm NGES attended and engineer's confirmed arrival time; ops on-call, this evening
- Welfare check and temporary heating/hot water if supply capped
- Human to close E-4901 and fix the AI line's find_tenant omission
- Move R-4766 (stiff front door lock, open since 22 Sep) forward, and ask tenant what else is broken; routine, next week

## Missing or unavailable information
- Whether the tenant has actually called NGES
- Contractor confirmation of arrival time
- Tenant's current location/welfare

## Conflicts between sources
- AI line verified against T-1001 (Amelia Clarke, P-201); caller is T-1002 Jonah Okafor, P-202. CRM T-1002 trusted: name, DOB and phone match.
- Transcript shows the caller giving several DOB versions, but his final statement 2 Nov 1985 matches T-1002.

## Answers to the case questions
**1. What is the situation right now, and what is the most urgent thing to do?**

A vulnerable tenant has a strong gas smell in his kitchen and is outside. Most urgent: make sure he stays out and has called NGES 0800 111 999, and get a Gas Safe engineer booked same day. Done.

**2. Are E-4901 and E-4902 both valid? What do you do with each, and why?**

E-4902 (P1 gas) is valid and stays open, now backed by JOB-101. E-4901 (P3 identity failure) is invalid: the line checked T-1001 (Amelia Clarke, different person) instead of T-1002; Jonah's name, DOB and phone match T-1002. I noted this on E-4901 for a human to close and flagged the process fault. No identity check was needed to give safety advice anyway.

**3. What actions do you take in the next hour, and who do you tell?**

Created and assigned JOB-101 to Bow Gas & Heating; texted the tenant (safety, apology, welfare, update this evening); emailed the landlord Margaret Ellison (emergency, approved per her notes); noted E-4901; scheduled an evening follow-up. R-4766 lock and other worries handled after the emergency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-202","category":"gas","severity":"emergency","description":"Tenant Jonah Okafor reports strong smell of gas in kitchen (call … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Bow Gas & Heating","visit_window":"2026-10-10 14:00-20:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"JOB-101","body":"Hi Jonah… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `add_note` | {"entity":"E-4901","note":"Invalid: phone line never ran find_tenant and verified caller against T-1001 (Amelia Clarke, different tenant/pro… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-10","purpose":"Evening: confirm NGES attended, Bow Gas visit happened, tenant welfare/temporary he… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
