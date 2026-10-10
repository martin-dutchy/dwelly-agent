# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The property is currently compliant: the CP12 issued 2025-10-17 is valid until 2026-10-16. It expires in 6 days and the tenant has not responded. I opened JOB-101, assigned HeatRight for 14 Oct, sent 24h+ written notice by email, SMS and letter, and asked the landlord to approve cost.

## Where the case stands
JOB-101 at visit stage: HeatRight assigned for 14 Oct 9-12. Tenant notified on all channels, awaiting reply. Landlord asked to approve cost by 12 Oct. Follow-up 13 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for 14 Oct 09:00-12:00 | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written notice of visit by email, SMS and letter, with rearrange option | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Told landlord of deadline, booking and steps; asked to approve cost up to £300 | Ben Hartley, landlord | email | A6 ✅ |
| 4 | WAIT | Follow up 13 Oct on tenant response/access; escalate before 16 Oct if none | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, this is written notice that a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Wednesday 14 October, between 9am and 12pm, for the annual gas safety check. The current certificate runs out on 16 October, so we need to do it this week. If that time doesn't suit, just reply or call us with another time before 16 October and we'll rearrange. We can't enter without your agreement. You'll get a copy of the record within 28 days of the check. If you ever smell gas, leave the property and call 0800 111 999.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: HeatRight engineer, Wed 14 Oct, 9am-12pm at 19 Victoria Park Rd. Details emailed. Can't make it? Reply with another time before 16 Oct. Gas smell: leave and call 0800 111 999.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Wednesday 14 October 2026, between 9am and 12pm, for your annual gas safety check. The current certificate expires on 16 October. If the time doesn't suit, please contact us to rearrange before 16 October. You will receive a copy of the record within 28 days. If you smell gas, leave and call 0800 111 999.

**A6 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Approve HeatRight Ltd gas safety check cost (price not yet confirmed; your limit is £300 inc VAT) and note the deadline.
> 
> Options: Approve HeatRight Ltd for the check, up to £300 inc VAT (recommended); Arrange your own Gas Safe engineer before 16 Oct
> 
> Update: Hi Ben. The gas safety certificate expires 16 Oct. Luca hasn't replied to our email (25 Sep, 2 Oct) or SMS (2 Oct). We've booked HeatRight Ltd for Wed 14 Oct 9am-12pm and given Luca written notice by email, SMS and letter, with a way to rearrange. Booking early/on time keeps the anniversary date; Luca gets a copy within 28 days. No entry without Luca's agreement; if access fails we'll tell you and rebook before the 16th. The deadline doesn't move. Please reply by Mon 12 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not confirm tenant access; no entry without tenant agreement
- Does not confirm the cost or landlord approval
- Not compliant evidence until a new CP12 is issued

## Remaining work
- Tenant reply/access (tenant)
- Landlord approval of cost by 12 Oct (Ben)
- HeatRight to confirm the slot (HeatRight)
- Escalate to compliance on 13 Oct if no tenant contact

## Missing or unavailable information
- Tenant has not responded
- HeatRight price and confirmation of the 14 Oct slot
- No property record found in system (P-230 lookup failed); relied on case inputs

## Conflicts between sources
- Legacy note says cert renewed 2025 (undated); compliance record gives exact dates and was trusted.
- get_property found no P-230 record; used case inputs.

## Answers to the case questions
**1. Is the property currently compliant? Which record do you trust?**

Yes, until 16 Oct 2026. I trust the compliance record (CP12 issued 2025-10-17, Gas Safe 550123) over the vague legacy note 'gas cert renewed 2025, all good', which has no dates. It expires in 6 days.

**2. What steps to get access lawfully before expiry?**

Booked HeatRight (on file, gas, Gas Safe 550123) for Wed 14 Oct, more than 24h away and before expiry. Gave written notice by email, SMS and letter, with a way to rearrange. No forced entry; follow-up 13 Oct, escalate to compliance if no contact.

**3. What do you tell the landlord?**

Told Ben the expiry date, that the tenant hasn't replied to two earlier contacts, the booking of 14 Oct, the steps taken, that early booking keeps the anniversary date, the tenant gets a copy within 28 days, that the deadline does not move, and asked him to approve cost up to his £300 limit by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant not respon… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-14 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `request_landlord_approval` | {"ticket_ref":"JOB-101","landlord":"Ben Hartley","decision_needed":"Approve HeatRight Ltd gas safety check cost (price not yet confirmed; yo… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-13","purpose":"Check tenant response/HeatRight confirmation of 14 Oct visit; if no contact, escala… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
