# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The gas safety record is valid until 16 Oct 2026, with no tenant response to earlier requests. I opened JOB-101, assigned HeatRight (Gas Safe 550123, matches the CP12 engineer) for 13 Oct, gave the tenant 3-day written notice on every channel and informed the landlord.

## Where the case stands
JOB-101 at visit stage; HeatRight assigned for 13 Oct 9-12; tenant notified by email, SMS and letter, no reply yet; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for gas check 13 Oct 09:00-12:00 | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Sent written notice of the visit by email, SMS and letter with how to rearrange | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | REQUEST_INFORMATION | Told landlord of the deadline, booking and steps taken | Ben Hartley, landlord | email | A6 ✅ |
| 4 | WAIT | Follow up on tenant confirmation on 12 Oct | Luca Bianchi, tenant | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is legally due before 16 October. We have booked HeatRight Ltd (Gas Safe registered) to visit on Tuesday 13 October, 9am-12pm. This is your written notice of the visit. Please reply to confirm, or tell us a different time that suits you before 16 October and we will rearrange. We will not enter without your agreement. If you smell gas, leave the property and call 0800 111 999. We will write again if we do not hear from you.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-12pm, HeatRight Ltd. Please reply to confirm or suggest another time before 16 Oct. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, notice of gas safety check: HeatRight Ltd (Gas Safe registered) will visit on Tuesday 13 October 2026, 9am-12pm. The check is a legal requirement and must be done before 16 October. To rearrange, reply to our emails or text, or call the office. We will not enter without your agreement.

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road expires on 16 October 2026 (it is currently valid). Luca has not replied to our email on 25 Sep or our email and text on 2 Oct. We have booked HeatRight Ltd for Tue 13 Oct, 9am-12pm and sent Luca written notice by email, text and letter, with a way to rearrange. We will not enter without his agreement. A routine check should be within your £300 limit. We will update you on Monday 12 Oct, and if access isn't agreed we will tell you the options. If you have another way of reaching Luca, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean the tenant agreed; no entry without his agreement.
- Does not establish the check has passed or a new CP12 issued.

## Remaining work
- Confirm tenant access by 12 Oct; otherwise try another route, rebook before 16 Oct, and escalate if access cannot be agreed.
- After the visit record result, file new CP12, send tenant copy within 28 days.

## Missing or unavailable information
- Tenant response/consent to access
- Copy of CP12_2025.pdf not seen
- No property record found in system (get_property not_found)

## Conflicts between sources
- Legacy note says gas cert renewed 2025; the compliance record gives the exact dates. Trusted the compliance record. Property lookup failed, so relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, expires 2026-10-16, engineer 550123) over the legacy note 'gas cert renewed 2025, all good', which is vague, undated as to expiry and from the old agency. It becomes non-compliant on 17 Oct if not renewed.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight for 13 Oct 9-12 with more than 24h written notice by email, SMS and letter, with a way to rearrange; no forced entry; follow-up on 12 Oct to try other routes and rebook before 16 Oct; escalate if agreement can't be reached.

**3. What do you tell the landlord?**

Told Ben the certificate expires 16 Oct, the tenant has not responded, the booking for 13 Oct, notices sent, no entry without consent, and that we will update him on 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant has not re… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant confirmation of 13 Oct gas check; if none, try another route and updat… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
