# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The gas safety record is valid until 16 Oct 2026, so the property is compliant today but expires in 6 days. Tenant has not replied to earlier contact. I opened JOB-101, assigned HeatRight (the gas contractor on file) for 13 Oct 9-12, sent written notice by email, SMS and letter, informed the landlord and scheduled a follow-up for 12 Oct.

## Where the case stands
JOB-101 at visit stage; HeatRight booked Tue 13 Oct 9-12, tenant notified on all channels, awaiting tenant response; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Booked HeatRight Ltd gas check 13 Oct 9-12 | HeatRight Ltd, contractor | portal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Written notice by email | Luca Bianchi, tenant | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | SMS notice | Luca Bianchi, tenant | sms | A5 ✅ |
| 4 | REPLY_TO_TENANT | Letter notice | Luca Bianchi, tenant | letter | A6 ✅ |
| 5 | OTHER | Told landlord of deadline, booking and steps | Ben Hartley, landlord | email | A7 ✅ |
| 6 | WAIT | Review tenant response on 12 Oct | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is due by 16 October. We've booked HeatRight Ltd (Gas Safe registered) to visit on Tuesday 13 October, 9am-12pm. Please be home to let the engineer in. The check usually takes under an hour. If that time doesn't suit, just reply or call us with another time before 16 October and we'll rearrange. You'll get a copy of the gas safety record within 28 days of the check. We'll be in touch again before the visit.

**A5 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-12pm, HeatRight Ltd. Please be home. Can't make it? Reply with another time before 16 Oct and we'll rearrange. Details sent by email.

**A6 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: a Gas Safe registered engineer from HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October 2026, 9am-12pm, for your annual gas safety check, which is legally due by 16 October. Please be home to give access. If the time doesn't suit, contact us with another time before 16 October. We will not enter without your agreement. You'll receive a copy of the record within 28 days.

**A7 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road expires on 16 October 2026 (it is currently valid until then). Luca hasn't replied to our email of 25 Sep or our email and SMS of 2 Oct. We've booked HeatRight Ltd for Tuesday 13 October, 9-12, and given Luca written notice by email, SMS and letter, with a way to rearrange. We won't enter without his agreement. If he doesn't respond or access fails, we'll try again before 16 Oct and update you. The deadline doesn't move. We'll update you after the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean tenant agreed; no entry without agreement.
- Does not renew the certificate until the check is done and a new record issued.
- Cost not confirmed; HeatRight quote/invoice must stay within £300 limit or go to Ben.

## Remaining work
- Follow-up 12 Oct: confirm tenant access; try phone call/rebook before 16 Oct; escalate to compliance if no access.
- After visit: record result, file CP12, send tenant copy within 28 days, tell landlord.

## Missing or unavailable information
- Tenant has not responded to any contact
- HeatRight not yet confirmed the window in the record; no cost known
- No property record in system (get_property not found)

## Conflicts between sources
- Legacy note says cert renewed 2025 'all good' vs compliance record with exact dates; trusted compliance record.
- get_property found no record for P-230; relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant? Which record do you trust?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, expires 2026-10-16, Gas Safe 550123, which matches HeatRight) over the legacy note 'gas cert renewed 2025, all good', which is an old-agency hearsay note with no dates. Compliance lapses after 16 Oct if no new check is done.

**2. What steps do you take to get access lawfully?**

Gave written notice (email, SMS, letter) of a booked slot over 24h away on 13 Oct with an easy way to rearrange; no entry without tenant agreement; follow-up 12 Oct to phone/rebook; escalate to compliance if access is still not secured.

**3. What do you tell the landlord?**

Told Ben the expiry date, that Luca has not replied, the booking, the notice steps, that we won't enter without consent, and that the deadline doesn't move; he will get an update after the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12 expires 2026-10-16). Tenant Luca Bianc… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `set_visit` | {"ticket_ref":"JOB-101","datetime":"2026-10-13 09:00","slot_text":"Tuesday 13 Oct, 9am-12pm","access":"tenant_home","confirmed_by":"assigned… | 1 | ✅ verified | Ticket JOB-101 read back after set_visit |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check whether tenant replied/confirmed 13 Oct gas check; if not, try phone/alternat… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
