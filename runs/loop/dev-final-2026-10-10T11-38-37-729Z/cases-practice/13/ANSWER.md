# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The gas safety record is valid until 16 Oct 2026, so the property is compliant today but expires in six days. The tenant has been silent on three contacts. I opened JOB-101, asked HeatRight for slots, wrote to the tenant again and updated the landlord.

## Where the case stands
JOB-101 open at intake. Waiting on tenant reply and HeatRight slots/quote. Follow-up 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_TENANT | Email tenant again asking for availability and promising 24h written notice | Luca Bianchi, tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask HeatRight for slots before 16 Oct and a quote | HeatRight Ltd, contractor | sms | A3 ✅ |
| 3 | OTHER | Update landlord Ben on status and plan | Ben Hartley, landlord | email | A4 ✅ |
| 4 | WAIT | Review on 12 Oct; if still no contact, phone, post a letter with visit notice, escalate | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your yearly gas safety check at 19 Victoria Park Road is due before 16 October. It is a legal requirement and takes about an hour. We are asking our gas engineer (HeatRight Ltd) for the earliest slots and will send you at least 24 hours' written notice of the exact date and time. In the meantime please reply with days and times that suit you this week (weekends are fine). If you smell gas, leave the property and call 0800 111 999. Thanks, the lettings team.

**A3 · send_message → HeatRight Ltd (contractor) via sms, +447700900311** (verified)

> Hi, we need an annual gas safety check (CP12) at 19 Victoria Park Road, London E9 7HD before the current one expires on 16 Oct 2026. Please reply with your earliest available slots (ideally Mon 12 - Thu 15 Oct) and your quote. Tenant is Luca Bianchi; we are arranging access and 24h notice.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, 19 Victoria Park Road: the gas safety record is valid until 16 Oct 2026, so it is compliant today but only for six more days. The tenant hasn't replied to our emails (25 Sep, 2 Oct) or text (2 Oct). We've opened JOB-101, asked HeatRight Ltd for slots before 16 Oct and written to the tenant again; we'll give 24 hours' written notice for the visit. We'll keep you updated, and will call before anything over £300. If the check can't be done in time, we'll record our attempts; the record can be renewed up to 2 months early without losing the anniversary date.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked and no contractor assigned yet; no date has been confirmed by the provider.
- No entry will be made without 24h written notice; holding keys gives no right of entry.
- The current CP12 being valid does not mean a renewal is arranged.

## Remaining work
- Get HeatRight's confirmed slot, assign, set_visit and serve 24h written notice (agency)
- Phone tenant and send a letter if still silent by 12 Oct
- Escalate if no access by ~14 Oct; keep a record of all attempts
- Copy of new CP12 to tenant within 28 days

## Missing or unavailable information
- Tenant availability
- HeatRight slots and quote
- Copy of CP12_2025.pdf not seen

## Conflicts between sources
- Legacy note says cert renewed 2025 with no date; the compliance record gives exact dates and expiry, which I trusted. get_property returned not found, so I used the case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust the compliance record (CP12 issued 2025-10-17, Gas Safe engineer 550123, which matches HeatRight) over the legacy note 'gas cert renewed 2025', which is hearsay with no dates. I have not seen the PDF itself.

**2. What steps do you take to get access lawfully before expiry?**

Opened JOB-101, sent a fresh email to the tenant asking for availability, asked HeatRight (preferred gas contractor, within the £300 limit) for slots, and set a follow-up for 12 Oct. Next: phone the tenant, then a letter, then written notice of 24h or more for a confirmed slot. No forced entry. If access is still not possible, escalate and document all attempts.

**3. What do you tell the landlord?**

Told Ben it is compliant until 16 Oct, the tenant hasn't responded, what we've done, that we'll call before any spend over £300, and that we'll keep him updated.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) due; current record expires 2026-10-1… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","ticket_ref":"JOB-101","body":"Hi,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant and HeatRight replies; if no contact, phone tenant, send letter/notice… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
