# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 issued 2025-10-17 is valid until 2026-10-16. The tenant has not answered three contacts. I opened JOB-101, booked HeatRight Ltd for 13 Oct 9-12, sent the tenant written notice by email, SMS and letter, and informed the landlord.

## Where the case stands
Job JOB-101 at visit stage; HeatRight booked Tue 13 Oct 9-12 (not yet confirmed by tenant); tenant notified on email, SMS, letter; landlord informed; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for 13 Oct 9-12 and set visit | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written notice of the visit by email | Luca Bianchi, tenant | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | Notice by letter (earlier messages unanswered) | Luca Bianchi, tenant | letter | A6 ✅ |
| 4 | OTHER | Told landlord of deadline, booking and steps | Ben Hartley, landlord | email | A7 ✅ |
| 5 | WAIT | Review tenant response on 12 Oct | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is legally due before 16 October. We have booked HeatRight Ltd (Gas Safe registered) to visit on Tuesday 13 October between 9am and 12pm; please treat this as written notice. The check takes about 30-45 minutes and someone needs to be home. If that doesn't suit, just reply or call with another time before 16 October and we'll rearrange. We won't enter without your agreement. Thank you.

**A5 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-12pm, HeatRight Ltd. Please be home. Can't make it? Reply with another time before 16 Oct. Details emailed.

**A6 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, your annual gas safety check is due before 16 October. This is written notice that HeatRight Ltd (Gas Safe registered) will visit on Tuesday 13 October 2026 between 9am and 12pm. Please be home. If you need another time, contact us before 16 October and we will rearrange. We will not enter without your agreement.

**A7 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road expires on 16 October 2026 (it is valid until then). Luca hasn't replied to our email of 25 Sept or email and SMS of 2 Oct. We've booked HeatRight Ltd for Tue 13 Oct, 9am-12pm, and sent Luca written notice by email, SMS and letter, with a way to rearrange. We won't enter without his agreement. If he doesn't respond we'll try again and update you by Monday 12 Oct. If you have another way to reach Luca, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean the tenant agreed; no entry without his agreement
- A new CP12 is not issued until the check is done
- Legacy note does not prove compliance

## Remaining work
- Ops: 12 Oct review; retry contact if no reply, rearrange if tenant proposes another date before 16 Oct
- HeatRight to carry out check and issue CP12; copy to tenant within 28 days
- If still no access by 15 Oct, escalate to legal/management for lawful options

## Missing or unavailable information
- No tenant response or agreement to access
- No agency property record found (get_property not_found); no HeatRight confirmation of the slot

## Conflicts between sources
- Legacy note says cert renewed 2025; compliance record gives the exact dates. Trusted the compliance record; they are consistent but the note proves nothing.
- get_property returned not_found; relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, expires 2026-10-16, Gas Safe 550123, matching HeatRight on file) over the legacy note 'gas cert renewed 2025, all good', which is hearsay with no dates. It lapses after 16 Oct if not renewed.

**2. What steps do you take to get access lawfully before expiry?**

Booked the on-file gas contractor HeatRight for 13 Oct, more than 24h away and before expiry. Gave written notice by email, SMS and letter with a way to rearrange. No entry without the tenant's agreement. Follow-up on 12 Oct; escalate if there is still no access by 15 Oct.

**3. What do you tell the landlord?**

The expiry date of 16 Oct, that the tenant has not replied, the booked date of 13 Oct, the notices sent, that there will be no forced entry, and that we will update him by 12 Oct. I also asked for any other way to reach the tenant.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant not respon… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `set_visit` | {"ticket_ref":"JOB-101","datetime":"2026-10-13 09:00","slot_text":"Tuesday 13 October, 9am-12pm","access":"tenant_home","confirmed_by":"assi… | 1 | ✅ verified | Ticket JOB-101 read back after set_visit |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant response to gas check notice; if none, retry contact and update landlo… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
