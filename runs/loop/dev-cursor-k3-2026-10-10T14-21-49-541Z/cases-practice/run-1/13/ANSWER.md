# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the tenant has ignored three contacts. I opened JOB-101, booked HeatRight (the landlord's preferred, Gas Safe 550123) for 13 Oct, gave the tenant written notice by email, SMS and letter, and told the landlord. A follow-up is set for 12 Oct.

## Where the case stands
JOB-101 at visit stage: HeatRight booked Tue 13 Oct 9am-1pm (tenant not yet confirmed). Waiting on tenant reply and landlord cost approval. Follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Booked HeatRight for 13 Oct 9am-1pm and sent written notice by email | Luca Bianchi, tenant | email | A4 ✅ |
| 2 | BOOK_OR_CONFIRM_APPOINTMENT | Same notice by SMS | Luca Bianchi, tenant | sms | A5 ✅ |
| 3 | BOOK_OR_CONFIRM_APPOINTMENT | Same notice by letter to the property | Luca Bianchi, tenant | letter | A6 ✅ |
| 4 | REQUEST_LANDLORD_APPROVAL | Told Ben the deadline, booking and steps; asked for cost approval up to £300 by 12 Oct | Ben Hartley, landlord | email | A7 ✅ |
| 5 | WAIT | Review tenant response on 12 Oct; escalate/rebook before 16 Oct if no access | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, this is written notice that HeatRight Ltd (Gas Safe registered) will visit 19 Victoria Park Road on Tuesday 13 October between 9am and 1pm for the annual gas safety check. It takes about an hour and someone aged 18+ needs to be home. The current certificate runs out on 16 October, so we need to do it this week; doing it now keeps the same yearly anniversary date. You'll get a copy of the record within 28 days of the check. If the time doesn't suit, just reply or call us with another time before 16 October and we'll rearrange. We'll also write to you by letter.

**A5 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: HeatRight Ltd, Tue 13 Oct, 9am-1pm at 19 Victoria Park Rd. Please be home. Can't make it? Reply with another time before 16 Oct and we'll rearrange. Details emailed.

**A6 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: HeatRight Ltd (Gas Safe registered) will visit on Tuesday 13 October 2026, between 9am and 1pm, to carry out the annual gas safety check. Please make sure an adult is home. The current certificate expires on 16 October. To rearrange, reply to our emails or texts with another time before 16 October. You will receive a copy of the record within 28 days of the check.

**A7 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Approve the gas safety check cost (HeatRight quote not yet received; your limit is £300 inc VAT). Please reply by Monday 12 Oct. (£300)
> 
> Options: Approve HeatRight Ltd for the check, up to £300 inc VAT; Arrange your own engineer
> 
> Update: The gas safety record (CP12) expires 16 Oct 2026. Luca hasn't replied to our email of 25 Sep, or email and SMS of 2 Oct. We've booked HeatRight Ltd for Tue 13 Oct 9am-1pm (tenant not yet confirmed) and sent Luca written notice by email, SMS and letter, with a way to rearrange. Booking before expiry keeps the anniversary date; Luca gets a copy within 28 days. If access fails we'll tell you at once; we can't enter without the tenant's agreement. Next update after the visit or by 12 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not confirm tenant access or that the certificate will be renewed
- No entry without tenant agreement; keys give no right of entry
- Cost not approved or quoted yet

## Remaining work
- Tenant to confirm or rearrange (agency follows up 12 Oct)
- Landlord to approve cost
- HeatRight to carry out check; copy of record to tenant within 28 days; file new CP12
- If no access by 12-14 Oct, escalate to management (landlord told of risk of lapse)

## Missing or unavailable information
- HeatRight price for the check
- Tenant response/availability
- Confirmation from HeatRight of the slot (assigned by us)

## Conflicts between sources
- get_property had no record for P-230; relied on case inputs.
- Legacy note says renewed 2025 'all good'; system CP12 record trusted for dates.

## Answers to the case questions
**1. Is the property currently compliant for gas safety?**

Yes, until 16 Oct 2026: the CP12 issued 17 Oct 2025 (compliance.json, system record, Gas Safe 550123 matching HeatRight) is valid. The legacy note 'renewed 2025, all good' is an old-agency hint and is not trusted over the system record; it fits the same cert. Compliance lapses after 16 Oct if no new check is done.

**2. What steps do you take to get access lawfully before expiry?**

Previous attempts (email 25 Sep, email+SMS 2 Oct) went unanswered. Now booked HeatRight for 13 Oct (3 days' notice, over 24h), sent written notice by email, SMS and letter with a way to rearrange, and set a 12 Oct follow-up. No entry without tenant agreement; if still no response, escalate for further options.

**3. What do you tell the landlord?**

Expiry date 16 Oct, tenant unresponsive, visit booked 13 Oct with HeatRight, notice sent on all channels, early renewal keeps anniversary, tenant gets copy within 28 days, cost approval up to his £300 limit requested by 12 Oct, and that we cannot force entry.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant Luca Bianc… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `set_visit` | {"ticket_ref":"JOB-101","datetime":"2026-10-13 09:00","slot_text":"Tuesday 13 October, 9am-1pm","access":"tenant_home","confirmed_by":"assig… | 1 | ✅ verified | Ticket JOB-101 read back after set_visit |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Approve the gas safety check cost (HeatRight quote not yet received; you… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply/confirmation of 13 Oct gas visit; if none, try rebooking options… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
