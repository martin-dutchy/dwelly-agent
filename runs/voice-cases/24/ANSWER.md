# Case 24: A verified tenant's repair the system dropped (AI phone line): ANSWER

**Decision:** action_taken · **Severity:** routine

Priya Shah's oven hinge repair was never logged because the phone line's server restart lost her verification. Her verification was genuine, as the details match the CRM. I logged JOB-101, messaged the tenant and asked the usual contractor to confirm a date.

## Where the case stands
JOB-101 at intake; contractor asked to confirm a visit date; tenant informed; follow-up 2026-10-13. E-4901 handled by this run.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Texted ref JOB-101, 14-day target, safety advice, next update by 13 Oct | Priya Shah, tenant | sms | A2 ✅ |
| 2 | CHASE_PROVIDER | Asked East London Appliance Repairs to confirm a visit date | East London Appliance Repairs, contractor | phone_call | A3 ✅ |
| 3 | WAIT | Follow up on contractor date on 13 Oct | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, Northbridge here. Sorry for the glitch on your call. Your oven door repair is now logged, ref JOB-101 (routine). Our target is a visit within 14 days. We'll ask our appliance contractor to contact you to arrange a weekday morning and will note you have a cat. Please don't use the oven until it's fixed, and keep the cat clear of the open door. You'll hear from us again by Tuesday 13 Oct.

**A3 · send_message → East London Appliance Repairs (contractor) via phone_call, +447700900308** (verified)

> Job JOB-101, Flat 9, 3 Amhurst Road, London E8 2AU: oven door hinge broken, door hangs open. Routine, please attend within 14 days (landlord limit £250 incl. VAT; quote first if above). Tenant Priya Shah is in weekday mornings, has a cat; tenant phone +447700900103. Please reply with a date you can confirm.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked; no contractor formally assigned because no provider-confirmed window exists.
- Ticket creation does not confirm cost or cause.
- Landlord not contacted as the work is within the £250 limit; a quote above it must go to him.

## Remaining work
- Contractor to confirm date, then assign_contractor/set_visit (owner: ops)
- Tenant update by 13 Oct
- Close E-4901 as resolved (no tool available)

## Missing or unavailable information
- Contractor availability
- Whether the cost will be within £250

## Conflicts between sources
- Transcript: caller first said 'Shaw' but confirmed 'Shah'; the CRM and DOB match, so I trusted the CRM.
- The escalation was P3 for a routine job, which was fine.

## Answers to the case questions
**1. What does the tenant need, and what did the phone line actually get done?**

She needs her broken oven door hinge repaired (door hangs open, routine). The phone line verified her, but ticket creation failed and nothing was logged.

**2. Why was E-4901 raised, and what do you do about it?**

The ticket creation was rejected as not_verified because a server restart lost the verification. It was a system fault, not an identity problem. I created the ticket by hand (JOB-101) and completed the work. E-4901 needs closing as resolved.

**3. What actions do you take, and what do you tell the tenant?**

I created JOB-101, texted the tenant the reference, the 14-day target, advice not to use the oven and to keep the cat away, and that she'll hear from us by 13 Oct. I asked East London Appliance Repairs to confirm a date, and set a follow-up for 13 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","description":"Oven door hinge broke this morning (10 Oct); door hangs open … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"East London Appliance Repairs","recipient_role":"contractor","channel":"phone_call","contact":"+447700900308","ticket_ref… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-13","party":"East London Appliance Repairs","purpose":"Confirm contractor visit date for oven hing… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
- phone line create_repair_ticket: Rejected as not_verified after a restart; recreated manually as JOB-101 (A1).
