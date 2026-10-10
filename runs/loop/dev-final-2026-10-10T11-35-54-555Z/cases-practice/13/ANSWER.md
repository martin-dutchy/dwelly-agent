# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 issued 2025-10-17 is valid to 2026-10-16, so the property is compliant today. The tenant has ignored three contacts. I opened JOB-101, re-contacted the tenant by email and SMS, asked HeatRight for a slot, updated the landlord and set a follow-up for 12 Oct.

## Where the case stands
JOB-101 at intake. Waiting on tenant for access times and on HeatRight for availability/price. Review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Email asking Luca for access times before 15 Oct, with gas emergency number | Luca Bianchi, tenant | email | A2 ✅ |
| 2 | CHASE_TENANT | SMS to Luca on a second channel | Luca Bianchi, tenant | sms | A3 ✅ |
| 3 | REQUEST_INFORMATION | Ask HeatRight for earliest CP12 slot and price | HeatRight Ltd, contractor | phone_call | A4 ✅ |
| 4 | OTHER | Tell landlord status, compliant until 16 Oct, plan and lawful access approach | Ben Hartley, landlord | email | A5 ✅ |
| 5 | WAIT | Follow up 12 Oct: phone tenant, send notice letter, escalate to compliance if no access | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check at 19 Victoria Park Road is a legal requirement and the current certificate runs out on 16 October. We haven't heard back from our earlier emails and text. Please reply with a few days and times that suit you between now and Thursday 15 October (weekday mornings or afternoons are fine). Our gas engineer, HeatRight Ltd, will then confirm a slot and we'll send you written notice at least 24 hours before they visit. The check usually takes under an hour and someone over 18 needs to be home. If you smell gas, leave the property and call 0800 111 999 straight away. Thanks, the Lettings Team

**A3 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, urgent: your gas safety check must be done before 16 Oct. Please reply with times you're free before Thu 15 Oct. We've emailed details. Thanks.

**A4 · send_message → HeatRight Ltd (contractor) via phone_call, +447700900311** (verified)

> Please can you tell us your earliest availability for an annual gas safety inspection (CP12) at 19 Victoria Park Road, E9 7HD, before 15 Oct, and your price? Tenant access is not yet confirmed; we will give 24h written notice once a slot is agreed.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, 19 Victoria Park Road: the gas safety record on file is valid until 16 October 2026, so it is compliant today but only for six more days. Luca hasn't replied to our email (25 Sep), or email and text (2 Oct). We've opened job JOB-101, sent him another email and text asking for times before 15 October, and asked HeatRight Ltd for availability and a price. We'll give Luca 24 hours' written notice before any visit and won't enter without it. If the check can't be done in time we'll update you straight away; the next step would be documented attempts and a written notice letter. We'll ask you before committing anything over your £300 limit. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked: tenant access and provider availability unconfirmed.
- Compliance today does not guarantee compliance after 16 Oct.
- No entry without 24h written notice.

## Remaining work
- Get tenant access and HeatRight slot, give 24h written notice, assign contractor within £300 or ask Ben.
- Copy of new CP12 to tenant within 28 days.
- If no access by 13 Oct, escalate to compliance with documented attempts.

## Missing or unavailable information
- Tenant availability
- HeatRight availability and price
- Property record not found in system (relied on case inputs)

## Conflicts between sources
- Legacy note says cert renewed 2025 vs compliance record dated 2025-10-17: consistent; trusted the compliance record for dates.
- get_property found no record for P-230; relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, expires 2026-10-16, Gas Safe engineer 550123, a structured record with a file) over the legacy note 'gas cert renewed 2025, all good', which is vague, undated as to the certificate and from the old agency. The two don't actually conflict. It lapses after 16 Oct.

**2. What steps do you take to get access lawfully before expiry?**

Opened job, emailed and texted the tenant for times, asked HeatRight (preferred, Gas Safe) for availability, will give 24h written notice before any visit, follow up 12 Oct with a phone call and letter, escalate to compliance if no access by 13 Oct. No entry without notice; holding keys gives no right of entry.

**3. What do you tell the landlord?**

Compliant until 16 Oct, tenant unresponsive since 25 Sep, what we've done, that we will not enter without notice, and that we'll update him and ask before spend over £300.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) due before current record expires 202… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"phone_call","contact":"+447700900311","ticket_ref":"JOB-101","bod… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"If no tenant reply: phone Luca, send access-notice letter, confirm HeatRight slot; … | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
