# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The gas safety record is valid until 16 Oct 2026 but the tenant has ignored two emails and an SMS. I opened JOB-101, assigned HeatRight (Gas Safe 550123) for 13 Oct, sent the tenant written notice by email, SMS and letter, and informed the landlord and asked for cost approval.

## Where the case stands
JOB-101 at visit stage: HeatRight assigned for Tue 13 Oct 09:00-13:00; tenant notified by email, SMS and letter, no reply yet; landlord approval of cost requested; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Assigned HeatRight for 13 Oct 09:00-13:00 and gave tenant written notice by email | Luca Bianchi, tenant | email | A3 ✅ |
| 2 | CHASE_TENANT | SMS notice of the booking | Luca Bianchi, tenant | sms | A4 ✅ |
| 3 | CHASE_TENANT | Letter notice of the booking | Luca Bianchi, tenant | letter | A5 ✅ |
| 4 | REQUEST_LANDLORD_APPROVAL | Told Ben the deadline, booking and steps taken; asked approval of cost up to £300 | Ben Hartley, landlord | email | A6 ✅ |
| 5 | WAIT | Review 12 Oct for tenant reply/contractor confirmation | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your landlord's annual gas safety check is legally due before 16 October. This is written notice that HeatRight Ltd (Gas Safe registered) will visit 19 Victoria Park Road on Tuesday 13 October between 9am and 1pm. It takes about an hour and someone needs to be home to let them in. If that doesn't suit, just reply with another time before 16 Oct and we'll rearrange. We won't enter without your agreement. Booking early keeps the same yearly renewal date, and you'll get a copy of the record within 28 days of the check. We'll be in touch again on Monday 12 October.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: HeatRight Ltd, Tue 13 Oct, 9am-1pm at 19 Victoria Park Rd. Please be home to give access. Can't make it? Reply with another time before 16 Oct. Details sent by email and letter.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: the annual gas safety check is due before 16 October. HeatRight Ltd (Gas Safe registered) will visit on Tuesday 13 October 2026 between 9am and 1pm. Please be home to give access. If it doesn't suit, contact us with another time before 16 October. We will not enter without your agreement. You'll receive a copy of the record within 28 days of the check.

**A6 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road expires 16 Oct 2026. Luca hasn't replied to our email (25 Sep, 2 Oct) or SMS (2 Oct). We've booked HeatRight Ltd for Tue 13 Oct 9am-1pm and sent Luca written notice by email, SMS and letter, with a way to rearrange. We haven't seen a price; please approve the check cost (your limit is £300 inc VAT; we'll call before anything over). Early booking keeps the anniversary date; Luca gets a copy within 28 days. If access fails we'll update you on 12/13 Oct; the deadline doesn't move and we can't enter without Luca's agreement. (£300)
> 
> Options: Approve HeatRight check up to £300 inc VAT (recommended); Use another contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not confirm tenant agreement or access; no entry without the tenant's agreement
- Landlord has not yet approved the cost; no price seen
- Does not establish compliance after 16 Oct

## Remaining work
- Check tenant reply 12 Oct; if none, try other contact and tell landlord (agency)
- HeatRight to confirm window and attend 13 Oct
- Landlord to approve cost
- File new CP12 and send tenant copy within 28 days

## Missing or unavailable information
- Tenant response
- HeatRight confirmation of the window and price
- Landlord cost approval

## Conflicts between sources
- Legacy note says cert renewed 2025 'all good'; compliance record gives exact dates, trusted. get_property found no record for P-230, so I relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, currently compliant: CP12 issued 2025-10-17 expires 2026-10-16 (compliance record, with engineer Gas Safe 550123 and a file). It lapses in 6 days if not renewed. The legacy note 'renewed 2025, all good' is undated in detail and unspecific, so I trust the compliance record.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight (the gas contractor on file) for 13 Oct 9am-1pm, more than 24h ahead, and gave written notice by email, SMS and letter with a way to rearrange. No entry without the tenant's agreement; a follow-up is set for 12 Oct to try other contact.

**3. What do you tell the landlord?**

Ben was told the expiry date, that the tenant has not replied, the booking date, the notices sent, that early booking keeps the anniversary, the 28-day copy rule, and was asked to approve the cost (limit £300).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant has not re… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hi Ben, the gas safety record for 19 Victoria Park Road expires 16 Oct 2… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply and HeatRight confirmation; if no reply, try phone/other contact… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
