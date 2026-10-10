# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the tenant has ignored three contacts. I opened JOB-101, assigned HeatRight for 13 Oct, sent written notice by email, SMS and letter, informed the landlord, and set a follow-up for 12 Oct.

## Where the case stands
JOB-101 at visit stage; HeatRight assigned for 13 Oct 09:00-12:00; awaiting tenant agreement; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for 13 Oct 9-12 | HeatRight Ltd, contractor | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written notice of visit by email, SMS and letter with rearrange route | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | OTHER | Told landlord deadline, booking and steps | Ben Hartley, landlord | email | A6 ✅ |
| 4 | WAIT | Follow up 12 Oct on tenant response; escalate if no agreement | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is due before 16 October. We have booked HeatRight Ltd (Gas Safe registered) to visit on Tuesday 13 October, 9am-12pm, at 19 Victoria Park Road. This is your written notice of the visit. If that time doesn't suit, please reply or call us with another time before 16 October and we'll rearrange; nobody will enter without your agreement. Booking now keeps the certificate's anniversary date, and you'll get a copy of the record within 28 days of the check. Thank you.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-12pm, HeatRight Ltd. Can't make it? Reply with another time before 16 Oct and we'll rearrange. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October 2026, 9am-12pm, for your annual gas safety check, which is legally due before 16 October. If this time doesn't suit, please contact us to rearrange before 16 October. You will receive a copy of the record within 28 days of the check.

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road expires on 16 October 2026 and the deadline doesn't move. Luca hasn't replied to our email (25 Sep), or to the email and SMS of 2 Oct. We've booked HeatRight Ltd for Tue 13 Oct, 9am-12pm, and sent Luca written notice by email, SMS and letter, with a way to rearrange. We won't enter without his agreement. Booking early keeps the anniversary date, and Luca gets a copy within 28 days. Please let us know if the check cost is above your £300 limit; we'll call you first if so. If access can't be agreed before the 16th, the property will be out of compliance and we'll update you straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean access is agreed; no entry without tenant agreement for a non-emergency check.
- Does not renew the certificate until the check is done and a new record issued.
- Cost not confirmed against the £300 limit.

## Remaining work
- Confirm tenant agreement or rearrange (agency, by 12 Oct)
- HeatRight to confirm the slot and cost; call landlord if over £300
- If no response by 12 Oct, escalate / try other contact routes before 16 Oct

## Missing or unavailable information
- Tenant response
- HeatRight cost and slot confirmation

## Conflicts between sources
- Legacy note says cert renewed 2025 vs compliance record issued 2025-10-17; trusted the compliance record.
- get_property returned no record for P-230; relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026: the compliance record shows a CP12 issued 2025-10-17 by Gas Safe engineer 550123 (matches HeatRight). I trust it over the old agency note 'gas cert renewed 2025', which is hearsay and unspecific. It lapses after 16 Oct unless renewed.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight for Tue 13 Oct 9-12 (over 24h away), gave written notice by email, SMS and letter with a way to rearrange, follow-up 12 Oct for other routes and escalation. No entry without tenant agreement.

**3. What do you tell the landlord?**

Expiry date 16 Oct, tenant unresponsive since 25 Sep, the booked date and notice steps, early booking keeps the anniversary, tenant copy within 28 days, cost vs £300 limit with a call if over, and the risk of non-compliance if access fails.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12 expires 2026-10-16). Tenant not respon… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant has replied/agreed to 13 Oct visit; if not, try phone/other contact an… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
