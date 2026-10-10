# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

CP12 is valid until 16 Oct 2026 but the tenant has ignored three contacts. I opened JOB-101, assigned HeatRight for 13 Oct, gave the tenant written notice on all three channels, and told the landlord.

## Where the case stands
Job JOB-101 at visit stage; HeatRight assigned for 13 Oct 09:00-12:00; tenant notified by email, SMS, letter; waiting on tenant response; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for gas check Tue 13 Oct 09:00-12:00 | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written 24h+ notice of visit by email | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Notice by SMS | Luca Bianchi, tenant | sms | A4 ✅ |
| 4 | REPLY_TO_TENANT | Notice by letter | Luca Bianchi, tenant | letter | A5 ✅ |
| 5 | OTHER | Told landlord deadline, date booked and steps | Ben Hartley, landlord | email | A6 ✅ |
| 6 | WAIT | Review tenant response and attendance 12 Oct | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is legally due before 16 October. We have booked HeatRight Ltd (Gas Safe registered) to visit 19 Victoria Park Road on Tuesday 13 October, between 9am and 12pm. This is your written notice of the visit. The check takes about an hour and someone needs to be home to let the engineer in. If that time doesn't suit, please reply or call us with another time before 15 October and we will rearrange. We will not enter without your agreement. If you ever smell gas, leave the property and call 0800 111 999. Thank you.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-12pm, HeatRight Ltd. Please be home to give access. Can't make it? Reply with another time before 15 Oct and we'll rearrange. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, your annual gas safety check must be done before 16 October. HeatRight Ltd (Gas Safe registered) will visit on Tuesday 13 October between 9am and 12pm. This is your written notice. Please be home to give access. To rearrange, contact us before 15 October with another time. If you smell gas, leave and call 0800 111 999.

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road expires on 16 October 2026. It is valid today. The tenant hasn't replied to our email (25 Sep) or email and SMS (2 Oct). We have booked HeatRight Ltd for Tue 13 Oct, 9am-12pm, and sent the tenant written notice by email, SMS and letter, with a way to rearrange. We can't enter without the tenant's agreement. If access isn't possible we'll update you on 13 Oct and keep trying before expiry. A routine check should be within your £300 limit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not confirm tenant agreement or access; no entry without agreement.
- Does not renew the certificate until the engineer issues a new CP12.
- Visit not yet confirmed by HeatRight beyond assignment.

## Remaining work
- Check on 12 Oct for tenant reply; if none, rebook/try again before 16 Oct and update landlord; escalate if access cannot be obtained by 15 Oct (owner: maintenance/compliance)
- Send new CP12 copy to tenant within 28 days of check

## Missing or unavailable information
- Tenant has not replied to any contact
- No property record in system (get_property not found)

## Conflicts between sources
- get_property found no record for P-230; relied on case inputs.
- Legacy note says certificate renewed 2025; trusted the compliance record for dates.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026, per the CP12 in compliance.json (issued 2025-10-17, Gas Safe 550123, which matches HeatRight). The legacy note 'gas cert renewed 2025, all good' is an old-agency note and not evidence; it fits but adds nothing. After 16 Oct it is non-compliant unless renewed.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight (landlord's preferred, Gas Safe contractor) for Tue 13 Oct, more than 24h away. Gave written notice by email, SMS and letter with a way to rearrange. Follow-up on 12 Oct; rebook before 16 Oct if needed. No entry without tenant agreement.

**3. What do you tell the landlord?**

Told Ben the expiry date, that the record is valid today, the tenant's silence, the booked date, the steps taken, that we can't force entry, and that cost is within his limit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant not respon… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Tenant / HeatRight","purpose":"Check tenant response and HeatRight attendance for 13 … | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
