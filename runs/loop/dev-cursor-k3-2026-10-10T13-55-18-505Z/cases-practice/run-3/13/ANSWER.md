# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

CP12 is valid until 16 Oct 2026 but the tenant has ignored two contact attempts. I opened JOB-101, assigned HeatRight Ltd (landlord's preferred, Gas Safe 550123) for 13 Oct 9-12, sent the tenant 24h+ written notice by email, SMS and letter, informed the landlord and set a 13 Oct follow-up.

## Where the case stands
Visit booked Tue 13 Oct 9-12 with HeatRight; tenant notified on email, SMS and letter; waiting on tenant agreement; follow-up 13 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Booked HeatRight gas check Tue 13 Oct 9-12 | HeatRight Ltd / Luca Bianchi | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Written notice by email, SMS and letter with rearrange option | Luca Bianchi, tenant | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | SMS notice | Luca Bianchi, tenant | sms | A5 ✅ |
| 4 | REPLY_TO_TENANT | Letter notice | Luca Bianchi, tenant | letter | A6 ✅ |
| 5 | OTHER | Told landlord the deadline, booking and steps | Ben Hartley, landlord | email | A7 ✅ |
| 6 | WAIT | Review visit outcome 13 Oct; rebook before 16 Oct if no access | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is legally due before 16 October. We have booked gas engineer HeatRight Ltd to visit on Tuesday 13 October, between 9am and 12pm. Please be home to let them in. If that doesn't suit, just reply or call us with another day or time before 16 October and we'll rearrange. The check takes about an hour. We won't enter without you agreeing. We'll also send this by text and letter.

**A5 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: HeatRight Ltd, Tue 13 Oct, 9am-12pm. Please be home. Can't make it? Reply with another time before 16 Oct and we'll rearrange.

**A6 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: your annual gas safety check will take place on Tuesday 13 October 2026, between 9am and 12pm, by HeatRight Ltd (Gas Safe registered). Please be home to give access. If this time doesn't suit, contact us to rearrange for a date before 16 October. We will not enter without your agreement.

**A7 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road expires on 16 October 2026 (so it is valid today). Our emails and text to the tenant on 25 Sep and 2 Oct got no reply. We've booked HeatRight Ltd for Tue 13 Oct, 9am-12pm, and sent the tenant written notice by email, text and letter, with a way to rearrange. We can't enter without the tenant's agreement. If access isn't secured we'll update you on 14 Oct on next steps. Routine check, within your limit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean the tenant has agreed; no entry without their agreement
- Does not renew the CP12 until the check is done and the record issued
- Does not decide any remedy if access is refused

## Remaining work
- Agency: confirm visit outcome 13 Oct, rebook if needed
- If no access by 14 Oct, update landlord and consider escalation (compliance)
- Send tenant the new CP12 within 28 days of the check

## Missing or unavailable information
- Tenant has not responded on any channel
- No property record in system (get_property not found); relied on case inputs

## Conflicts between sources
- Legacy note says cert renewed 2025 with no date; compliance record gives exact dates. Trusted compliance record. get_property returned not found; used CRM inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust?**

Yes, today: the compliance record shows a CP12 issued 2025-10-17 expiring 2026-10-16. I trust that system record (with an engineer Gas Safe number) over the legacy note 'gas cert renewed 2025', which is vague hearsay from the old agency, though it is consistent. It lapses after 16 Oct unless renewed.

**2. What steps do you take to get access lawfully before expiry?**

Booked the preferred gas contractor HeatRight for 13 Oct (more than 24h away), gave written notice by email, SMS and letter with a way to rearrange, and set a follow-up. No forced entry; holding keys gives no right of entry. If no access, rebook before 16 Oct and escalate to compliance.

**3. What do you tell the landlord?**

Told Ben the expiry date, that it's currently valid, that the tenant is unresponsive, the booked date and the steps taken, and that he'll get an update on 14 Oct if access fails.

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
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-13","purpose":"Check gas visit outcome; if no access, rebook before 16 Oct and update landlord"} | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
