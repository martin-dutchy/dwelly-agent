# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 so the property is compliant today, but the tenant hasn't replied to three contacts. I booked HeatRight (Gas Safe 550123, the landlord's preferred firm) for 13 Oct, gave the tenant written notice on all three channels, and told the landlord.

## Where the case stands
Job JOB-101 at visit stage; HeatRight booked 13 Oct 09:00-13:00; tenant notified by email, SMS and letter; awaiting tenant response/access; follow-up 13 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Assigned HeatRight Ltd for 13 Oct 09:00-13:00 gas check | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written notice of the visit by email | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Notice by SMS | Luca Bianchi, tenant | sms | A4 ✅ |
| 4 | REPLY_TO_TENANT | Notice by letter | Luca Bianchi, tenant | letter | A5 ✅ |
| 5 | OTHER | Told landlord the deadline, booking and steps | Ben Hartley, landlord | email | A6 ✅ |
| 6 | WAIT | Review outcome on 13 Oct; rebook before 16 Oct if no access | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is legally due before 16 October. This is written notice that a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October between 9am and 1pm. The check takes about an hour and we need someone to let them in. If that doesn't suit, please reply or text us with another time before 16 October and we'll rearrange. We won't enter without your agreement. Thank you.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-1pm, HeatRight Ltd. Please make sure someone is in. Can't make it? Reply with another time before 16 Oct. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, notice of gas safety check: a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October 2026, 9am-1pm. The annual check is a legal requirement and our current certificate expires on 16 October. Please ensure someone can let the engineer in. To rearrange, contact us before then with another time. We will not enter without your agreement.

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record (CP12) for 19 Victoria Park Road expires on 16 October. The tenant hasn't replied to our email (25 Sep), or email and SMS (2 Oct). We've booked HeatRight Ltd for Tuesday 13 Oct, 9am-1pm, and sent the tenant written notice by email, SMS and letter, with a way to rearrange. We can't enter without the tenant's agreement. The deadline doesn't move; if access fails we'll update you straight away and keep trying. The check should sit within your £300 limit; we'll confirm if the cost differs.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not confirm tenant agreement or access; no entry without agreement
- Cost of the check not confirmed; assumed within £300 limit
- Does not extend the certificate

## Remaining work
- Visit 13 Oct; if no access, rebook before 16 Oct and update landlord; if expiry is missed, escalate to compliance and inform landlord

## Missing or unavailable information
- Tenant has not responded to any contact
- No property record in system (get_property not found)
- CP12 PDF not seen; only compliance.json

## Conflicts between sources
- Legacy note says cert renewed 2025 all good; consistent with compliance.json but undated, so the compliance record was used.
- get_property returned not found; relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, expires 2026-10-16, Gas Safe 550123, which matches HeatRight), the structured system record. The legacy note 'gas cert renewed 2025, all good' is an old-agency remark with no dates; it agrees but isn't evidence of expiry. The certificate lapses after 16 Oct unless renewed.

**2. What steps do you take to get access lawfully before expiry?**

Gave more than 24h written notice of a specific visit (13 Oct 9am-1pm) by email, SMS and letter, with a way to rearrange, after earlier unanswered email and SMS. No entry without tenant agreement; follow-up on 13 Oct to rebook before 16 Oct if needed.

**3. What do you tell the landlord?**

Told Ben the expiry date, that the tenant is unresponsive, the booked date with HeatRight, the notice steps, that we cannot enter without consent, and that the deadline doesn't move.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12 expires 2026-10-16). Tenant Luca Bianc… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-13","purpose":"Check gas visit outcome; if no access or no reply, rebook before 16 Oct and update … | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
