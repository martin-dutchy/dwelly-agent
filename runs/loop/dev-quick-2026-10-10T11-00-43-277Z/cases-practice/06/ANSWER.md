# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** action_taken · **Severity:** emergency

The first assignment attempt returned HTTP 500 and was not applied; the retry verified R-4820 at stage visit with HeatRight Ltd for 2026-10-11 08:00-12:00. The tenant (email), landlord (email) and contractor (SMS) were notified, and the visit was booked with tenant access, with a follow-up set for 11 Oct. The no-show record is dated after today, so the next step is conditional on what happens on the visit day.

## Where the case stands
Ticket R-4820 (27 Bethnal Green Road, P-202) is at stage visit. HeatRight Ltd (C-11) is assigned for Sun 11 Oct 08:00-12:00 with tenant access. Tenant, landlord and contractor have been notified. Follow-up FUP-104 set for 11 Oct to check attendance.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Confirm the emergency no-heating/no-hot-water visit with HeatRight Ltd (C-11) for Sun 11 Oct 08:00-12:00 and ask for receipt confirmation | HeatRight Ltd, contractor | sms | A5 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant Jonah Okafor the visit is booked for Sun 11 Oct 8am-12pm, that the job is treated as an emergency, and gas safety advice (0800 111 999) | Jonah Okafor, tenant | email | A3 ✅ |
| 3 | CHASE_LANDLORD | Tell landlord Margaret Ellison the emergency booking under her standing instruction, and that any cost over £250 will come back to her | Margaret Ellison, landlord | email | A4 ✅ |
| 4 | WAIT | Check on 11 Oct whether HeatRight attended; if missed, book Swift Plumbing & Heating (C-12) as emergency and update tenant and landlord | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Dear Jonah,
> 
> I'm sorry you've been without heating and hot water since Friday. Because of the cold and your situation, we are treating this as an emergency.
> 
> We have booked HeatRight Ltd (Gas Safe registered) to attend on Sunday 11 October between 8am and 12pm. Please be at home if you can, so they can get in. If you can't be there, reply to this email and we will arrange another way in.
> 
> If you smell gas, leave the property and call the National Gas Emergency line on 0800 111 999 straight away.
> 
> We will confirm this visit with you again if anything changes.
> 
> Kind regards,
> Operations team

**A4 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret,
> 
> The heating and hot water at 27 Bethnal Green Road (R-4820) have been off since Friday evening. The tenant is vulnerable and temperatures are falling to 3-5C. Under your emergency instruction, we have booked HeatRight Ltd for Sunday 11 October, 8am-12pm. We will update you on the outcome and any cost, which we will bring back to you if it goes over your £250 routine limit.
> 
> Kind regards,
> Operations team

**A5 · send_message → HeatRight Ltd (contractor) via sms, +447700900311** (verified)

> HeatRight: emergency no-heating/no-hot-water job R-4820 at 27 Bethnal Green Road, E1 6LA. Tenant is vulnerable. Visit booked Sun 11 Oct 08:00-12:00. Access: tenant at home. Please confirm receipt.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking the visit does not confirm the cause of the fault or whether HeatRight will attend.
- The no-show in the visit log is dated 2026-10-11, after today (2026-10-10). It is not treated as having happened. No work result is recorded.
- Cost and who pays are not decided; the landlord has not approved a spend figure.

## Remaining work
- Confirm HeatRight attendance and outcome on 11 Oct (owner: operations, FUP-104).
- If no-show or not fixed: emergency reassignment to Swift Plumbing & Heating (C-12), tenant told by email, landlord informed.
- Any invoice or quote above £250 needs landlord approval before instruction, unless it is an emergency make-safe.

## Missing or unavailable information
- Whether HeatRight acknowledged the booking (SMS sent, no reply yet).
- Actual visit outcome (no record yet).

## Conflicts between sources
- The visit log is dated 2026-10-11 12:30 (no-show) and 12:41 (tenant email), but today is 2026-10-10 08:30. The no-show is not treated as having happened. No work result recorded.
- Ticket R-4820 stage was init, but the assign_contractor call expected visit; resolved by the successful retry.

## Answers to the case questions
**1. 1. What happened when you assigned the contractor and how did you verify it?**

The first assign_contractor call to HeatRight Ltd (C-11) failed with HTTP 500 and ledger A1 showed NOT APPLIED (stage init, expected visit). I retried once, and it succeeded. Read-back (A1 attempt 2) shows R-4820 at stage visit, contractor HeatRight Ltd, window 2026-10-11 08:00-12:00. I then booked the visit with set_visit (A2, verified) and tenant access.

**2. 2. What do you tell the tenant at each point?**

Now (10 Oct): by email (A3, verified), I apologise for the delay, say it is treated as an emergency, give the booked window Sunday 11 Oct 8am-12pm, ask him to be home or reply if not, and give the gas emergency number 0800 111 999. If the visit is missed: email him that the visit did not happen, that we are arranging an emergency alternative, and give the target timescale (same day/within 24h as an emergency) without promising an appointment. Once fixed: confirm the outcome by email and ask him to confirm heating and hot water work.

**3. 3. After the no-show, what do you do?**

Treat it as an emergency: email the tenant that the visit did not happen, record the work result as missed_appointment with the contractor's note, and reassign to Swift Plumbing & Heating (C-12, Gas Safe 551987) for the earliest slot, without waiting for landlord approval (emergency instruction). Tell the landlord by email, and chase HeatRight for the reason. Keep the tenant informed by email given his anxiety. Note the visit log is dated 11 Oct, after today, so this branch is conditional and not yet recorded as having happened.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd (C-11)","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `set_visit` | {"ticket_ref":"R-4820","datetime":"2026-10-11 08:00","slot_text":"Sunday 11 October 8am-12pm","access":"tenant_home"} | 1 | ✅ verified | Ticket R-4820 read back after set_visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Dear Jonah,\n\nI'm… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","body":"HeatRight: emergency no-he… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","purpose":"Check whether HeatRight attended the 08:00-12:00 visit. If missed or no heating fixe… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
- A1 attempt 1: HTTP 500 and NOT APPLIED. Retried once as allowed; the retry verified at stage visit.
