# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the tenant has not answered three contact attempts. I opened JOB-101, assigned HeatRight for 13 Oct 9-1, gave the tenant written notice on all channels with a way to rearrange, told the landlord, and set a follow-up for 12 Oct.

## Where the case stands
JOB-101 at visit stage: HeatRight booked 13 Oct 09:00-13:00. Tenant notified by email, SMS and letter; awaiting tenant reply. Follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for 13 Oct 09:00-13:00 | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written 24h+ notice of visit by email | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Notice by SMS | Luca Bianchi, tenant | sms | A4 ✅ |
| 4 | REPLY_TO_TENANT | Notice by letter | Luca Bianchi, tenant | letter | A5 ✅ |
| 5 | OTHER | Told landlord the deadline, booking and steps | Ben Hartley, landlord | email | A6 ✅ |
| 6 | WAIT | Review tenant response on 12 Oct | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is a legal requirement and must be done before 16 October. This is written notice that a Gas Safe engineer from HeatRight Ltd will visit on Tuesday 13 October 2026 between 9am and 1pm. It takes about an hour. If that doesn't suit, just reply or call us with another time before 16 October and we'll rearrange. We won't enter without your agreement. If you smell gas, leave the property and call 0800 111 999.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-1pm, HeatRight Ltd. Can't make it? Reply with another time before 16 Oct and we'll rearrange. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October 2026 between 9am and 1pm for the annual gas safety check, which must be completed before 16 October. If this time doesn't suit, please contact us with another time before 16 October and we'll rearrange. Gas emergency line: 0800 111 999.

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road expires on 16 October 2026 (so it is currently valid, but only for 6 more days). Luca hasn't replied to our email of 25 Sep or email and SMS of 2 Oct. We've booked HeatRight Ltd for Tuesday 13 October, 9am-1pm, and given Luca written notice by email, SMS and letter, with a way to rearrange. We won't enter without his agreement. If he doesn't respond we'll try again and update you by 12 October. If the date is missed, the property would be without a valid certificate, so any help reaching Luca is welcome.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean the tenant has agreed; no entry without agreement
- Does not renew the certificate until the engineer completes the check and issues a new CP12
- Visit is not yet confirmed by the tenant or recorded as set_visit

## Remaining work
- Agency: check tenant reply and confirm HeatRight attendance by 12 Oct
- If no access, rebook before 16 Oct or escalate; document attempts
- Copy of new CP12 to tenant within 28 days

## Missing or unavailable information
- No tenant response on any channel
- No property record in system; relied on case inputs
- HeatRight's own confirmation of the slot not seen

## Conflicts between sources
- Legacy note says cert renewed 2025 'all good' without dates; compliance record gives the expiry of 16 Oct 2026. Trusted the compliance record.
- Property lookup returned not found; used case inputs.

## Answers to the case questions
**1. Is the property currently compliant? Which record do you trust?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, Gas Safe 550123, matching HeatRight) over the vague legacy note 'gas cert renewed 2025, all good', which has no dates. It lapses after 16 Oct if no new check is done.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight (the gas contractor on file) for 13 Oct 9-1, more than 24h away and before expiry. Gave written notice by email, SMS and letter with a way to rearrange. No forced entry; holding keys gives no right of entry. Follow-up set for 12 Oct to retry and rebook if needed.

**3. What do you tell the landlord?**

Told Ben the expiry date, that the tenant hasn't responded, the booked date and the notice steps, that we won't enter without agreement, and that we'll update him by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant has not re… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant response to access notice; if none, try other contact route and update… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
