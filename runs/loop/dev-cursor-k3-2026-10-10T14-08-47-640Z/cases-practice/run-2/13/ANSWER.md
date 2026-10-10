# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 (issued 17 Oct 2025) is valid until 16 Oct 2026, so the property is compliant today but expires in 6 days. The tenant has ignored an email and an SMS. I opened JOB-101, assigned HeatRight for 13 Oct, gave the tenant written notice by email, SMS and letter, and asked the landlord to approve the cost.

## Where the case stands
JOB-101 at visit stage: HeatRight assigned for Tue 13 Oct 9am-1pm (agency-proposed, tenant not yet agreed). Waiting on tenant reply and landlord cost approval; review 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for 13 Oct 9am-1pm | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written 24h+ notice of the visit by email | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Same notice by SMS | Luca Bianchi, tenant | sms | A4 ✅ |
| 4 | REPLY_TO_TENANT | Same notice by letter | Luca Bianchi, tenant | letter | A5 ✅ |
| 5 | REQUEST_LANDLORD_APPROVAL | Tell Ben the deadline, booked date and steps, and ask approval of cost up to £300 | Ben Hartley, landlord | email | A6 ✅ |
| 6 | WAIT | Review 12 Oct; escalate if tenant still silent | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is legally due before 16 October. We've booked HeatRight Ltd (Gas Safe registered) to visit on Tuesday 13 October, between 9am and 1pm. This is your written notice of the visit. It takes about an hour and someone needs to be home. If that time doesn't suit, just reply with another day or time before 16 October and we'll rearrange. We won't enter without your agreement. You'll get a copy of the gas safety record within 28 days of the check. If you ever smell gas, leave the property and call 0800 111 999. We'll be in touch again on Monday 12 October.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: HeatRight Ltd, Tue 13 Oct, 9am-1pm, someone needs to be home. This is your written notice. Can't make it? Reply with another time before 16 Oct and we'll rearrange. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, your annual gas safety check must be done before 16 October 2026. HeatRight Ltd (Gas Safe registered) will visit on Tuesday 13 October 2026 between 9am and 1pm. Please make sure someone is home. This letter is your written notice. To rearrange, reply to our email or text, or contact us, with another time before 16 October. You will receive a copy of the record within 28 days. In a gas emergency call 0800 111 999.

**A6 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Gas safety certificate expires 16 Oct 2026. Tenant has not replied to email (25 Sep, 2 Oct) or SMS (2 Oct). We've booked HeatRight Ltd for Tue 13 Oct 9am-1pm and given the tenant written notice by email, SMS and letter; no entry without tenant agreement. Please approve the check cost (HeatRight's price not yet confirmed; your limit on file is £300 inc VAT) - the deadline does not move. Please reply by Monday 12 Oct.
> 
> Options: Approve HeatRight Ltd gas safety check up to £300 inc VAT (recommended); Arrange your own Gas Safe engineer before 16 Oct

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean the tenant has agreed; no entry without their agreement.
- Property is not compliant after 16 Oct unless a new CP12 is completed.
- Cost not yet approved or confirmed.

## Remaining work
- Tenant to confirm or rearrange access
- Landlord to approve cost
- Follow-up 12 Oct: escalate if no tenant contact
- Send tenant copy of CP12 within 28 days of check
- Next CP12 anniversary booking

## Missing or unavailable information
- Tenant response
- HeatRight price
- HeatRight confirmation of slot

## Conflicts between sources
- Legacy note says cert renewed 2025; compliance record gives dates. Trusted the compliance record.
- get_property found no record for P-230; relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, expires 2026-10-16, Gas Safe 550123, matching HeatRight on file) over the legacy note 'gas cert renewed 2025, all good', which is an unsourced hearsay note with no dates.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight Ltd for 13 Oct (over 24h away, before expiry) and gave written notice by email, SMS and letter with how to rearrange. No entry without the tenant's agreement; follow-up on 12 Oct and escalate if still silent.

**3. What do you tell the landlord?**

Ben: the expiry date of 16 Oct, tenant unresponsive since 25 Sep, the booked date of 13 Oct, the notice steps, a request to approve the cost up to £300 and that the deadline does not move.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant Luca Bianc… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `request_landlord_approval` | {"ticket_ref":"JOB-101","landlord":"Ben Hartley","decision_needed":"Gas safety certificate expires 16 Oct 2026. Tenant has not replied to em… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply and landlord approval for 13 Oct gas check; if no tenant respons… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
