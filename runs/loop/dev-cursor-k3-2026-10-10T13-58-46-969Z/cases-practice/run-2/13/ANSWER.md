# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The gas safety record is valid until 16 Oct but expiring, and the tenant has not responded to three contacts. I booked HeatRight for 13 Oct, gave the tenant written notice by email, SMS and letter, and asked the landlord to approve cost and informed them of the deadline.

## Where the case stands
JOB-101 at visit stage; HeatRight assigned for Tue 13 Oct 09:00-12:00; tenant given written notice on all channels, no reply; landlord approval of cost requested; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd (Gas Safe 550123) for 13 Oct 09:00-12:00 | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | BOOK_OR_CONFIRM_APPOINTMENT | Written notice of visit sent to tenant by email | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | BOOK_OR_CONFIRM_APPOINTMENT | Same notice by SMS | Luca Bianchi, tenant | sms | A4 ✅ |
| 4 | BOOK_OR_CONFIRM_APPOINTMENT | Same notice by letter | Luca Bianchi, tenant | letter | A5 ✅ |
| 5 | REQUEST_LANDLORD_APPROVAL | Told Ben the deadline, booking and steps; asked cost approval up to £300 | Ben Hartley, landlord | email | A6 ✅ |
| 6 | WAIT | Review 12 Oct for tenant reply/contractor confirmation | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your yearly gas safety check is legally due by 16 October. We have booked gas engineers HeatRight Ltd to visit on Tuesday 13 October, between 9am and 12pm. This is your written notice of the visit. If that doesn't suit, please reply or call us with another time before 16 October and we will rearrange; we will not enter without your agreement. If you smell gas, leave the property and call 0800 111 999. We will check back with you on Monday 12 October.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: HeatRight Ltd, Tue 13 Oct, 9am-12pm at 19 Victoria Park Rd. Need another time before 16 Oct? Just reply here. Gas smell: leave and call 0800 111 999.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD (address on file)** (verified)

> Dear Luca, written notice of access: our gas engineers HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October 2026 between 9am and 12pm to carry out the annual gas safety check, which must be done by 16 October. If this time is not convenient please contact us to rearrange; we will not enter without your agreement. If you smell gas, leave the property and call 0800 111 999.

**A6 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hi Ben, the gas safety certificate at 19 Victoria Park Road expires on 16 Oct. Tenant hasn't replied to emails (25 Sep, 2 Oct) or SMS (2 Oct). We've booked HeatRight Ltd for Tue 13 Oct 9am-12pm and sent the tenant written notice by email, SMS and letter. The deadline doesn't move. Please approve the cost of the check (quote not yet received; your limit on file is £300 inc VAT) and tell us if you have any way of reaching Luca.
> 
> Options: Approve HeatRight check up to £300 inc VAT (recommended); Arrange your own engineer

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean the tenant has agreed access; no entry without agreement
- Does not make the property compliant until a new CP12 is issued
- Cost not yet quoted or approved

## Remaining work
- Tenant to confirm or rearrange
- HeatRight to confirm window and issue CP12; copy to tenant within 28 days
- Landlord approval of cost
- If no access by 14 Oct, escalate to legal/management on lawful options

## Missing or unavailable information
- Tenant response
- HeatRight confirmation of slot and price
- Landlord approval

## Conflicts between sources
- Legacy note 'gas cert renewed 2025' is vague; compliance.json gives exact dates, so trusted. Property record lookup returned not found; used case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety?**

Yes until 16 Oct 2026: CP12 issued 2025-10-17 by Gas Safe 550123 (matches HeatRight) in the compliance record, which I trust over the legacy note (vague, old-agency hearsay, 'renewed 2025'). It lapses after 16 Oct unless renewed.

**2. What steps do you take to get access lawfully before expiry?**

Assigned HeatRight for 13 Oct (more than 24h notice, 3 days before expiry), sent written notice by email, SMS and letter with how to rearrange, follow-up 12 Oct. No entry without tenant agreement; keys give no right of entry.

**3. What do you tell the landlord?**

Expiry date, the contact attempts so far, the booked date and notice steps, that the deadline does not move, and ask to approve cost (limit £300) and share any other way to reach the tenant.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant has not re… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD (address on fi… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hi Ben, the gas safety certificate at 19 Victoria Park Road expires on 1… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply and HeatRight confirmation; if no access agreed, rearrange and e… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
