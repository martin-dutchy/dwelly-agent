# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026, so the property is compliant today but expires in 6 days. The tenant has ignored an email and an SMS, so I opened JOB-101, assigned HeatRight for 13 Oct, sent 24h+ written notice by email, SMS and letter, and told the landlord.

## Where the case stands
JOB-101 at visit stage; HeatRight assigned for 13 Oct 09:00-13:00; tenant notified on all channels, awaiting his agreement; landlord informed; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for gas safety check 13 Oct 09:00-13:00 | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written notice of visit by email, SMS and letter, with how to rearrange | Luca Bianchi, tenant | letter | A5 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Told landlord of deadline, booking and steps; asked to confirm spend within £300 | Ben Hartley, landlord | email | A6 ✅ |
| 4 | WAIT | Review 12 Oct for tenant and contractor confirmation | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is legally due by 16 October. We've booked HeatRight Ltd (Gas Safe registered) for Tuesday 13 October, 9am-1pm. Please let us know someone will be home. If that doesn't suit, reply with another time before 16 October and we'll rearrange. The visit takes about an hour. You'll get a copy of the safety record within 28 days. We won't enter without your agreement. If you smell gas, leave and call 0800 111 999.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-1pm, HeatRight Ltd. Please reply to confirm you can be in, or suggest another time before 16 Oct. We'll not enter without your agreement.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October 2026 between 9am and 1pm for the annual gas safety check, which must be done by 16 October. Please reply by phone or email to confirm or to rearrange a time before 16 October. You will receive a copy of the record within 28 days. We cannot enter without your agreement.

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road is valid until 16 October 2026, so it is compliant today but expires in 6 days. Luca hasn't replied to our email (25 Sep), or email and SMS (2 Oct). We've booked HeatRight Ltd for Tue 13 Oct, 9am-1pm, and sent Luca written notice by email, SMS and letter, with a way to rearrange. Booking before expiry keeps the anniversary date; Luca gets a copy within 28 days. We can't enter without Luca's agreement; if he doesn't respond we'll chase again and update you. We don't have a price yet; please confirm you're happy for us to proceed within your £300 limit, and we'll call you before anything above that. Next update Monday 12 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean the tenant has agreed to access; no entry without his agreement.
- Does not confirm cost or that the contractor has confirmed the slot.
- Does not renew the certificate until the check is done and the record issued.

## Remaining work
- Tenant to confirm or rearrange
- Confirm slot with HeatRight and obtain price
- If still no response by 12 Oct, chase again on all channels and escalate to maintenance P2 before 16 Oct
- Send tenant the CP12 copy within 28 days of the check

## Missing or unavailable information
- Tenant response
- HeatRight confirmation and price
- Landlord confirmation

## Conflicts between sources
- Legacy note says cert renewed 2025 'all good' with no dates; current compliance record gives exact dates and was trusted.
- get_property returned no record for P-230; relied on the case inputs.

## Answers to the case questions
**1. Is the property currently compliant? Which record do you trust?**

Yes, until 16 Oct 2026. I trust the current compliance record (CP12 issued 2025-10-17, Gas Safe 550123, HeatRight's number) over the legacy note 'renewed 2025, all good', which is vague and has no dates.

**2. What steps to get access lawfully before expiry?**

Assigned HeatRight (the landlord's preferred gas contractor) for 13 Oct, more than 24h away and before expiry. Sent written notice by email, SMS and letter with a way to rearrange. No entry without the tenant's agreement. Follow-up 12 Oct, then chase and escalate if still silent.

**3. What do you tell the landlord?**

The expiry date, that it is compliant today, the booking, the notices sent, that early booking keeps the anniversary date, the 28-day copy to the tenant, that we can't force entry, and the £300 limit with a call before anything above.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant not respon… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant confirmation and HeatRight confirmation of 13 Oct slot; if no response… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
