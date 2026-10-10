# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the tenant hasn't answered three contacts. I created JOB-101, assigned HeatRight Ltd for 13 Oct 9-1, gave the tenant written notice by email, SMS and letter, and informed the landlord.

## Where the case stands
Gas check booked with HeatRight for 13 Oct 9-1; tenant notified by email, SMS, letter; awaiting tenant reply/agreement; landlord informed and asked to approve cost. Follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for 13 Oct 9am-1pm | HeatRight Ltd, contractor | internal | A2 ✅ |
| 2 | BOOK_OR_CONFIRM_APPOINTMENT | Booked visit 13 Oct and sent written notice by email | Luca Bianchi, tenant | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | Sent SMS notice | Luca Bianchi, tenant | sms | A5 ✅ |
| 4 | REPLY_TO_TENANT | Sent letter notice | Luca Bianchi, tenant | letter | A6 ✅ |
| 5 | REQUEST_LANDLORD_APPROVAL | Told landlord the deadline, booking and steps; asked cost approval | Ben Hartley, landlord | email | A7 ✅ |
| 6 | WAIT | Review tenant response on 12 Oct | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, this is written notice that a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October between 9am and 1pm for the annual gas safety check, which is a legal requirement and due by 16 October. Someone aged 18+ needs to be home. If that time doesn't work, please reply or call us with another time before Friday 16 October and we'll rearrange. We won't enter without your agreement. If you ever smell gas, leave the property and call 0800 111 999.

**A5 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-1pm, HeatRight Ltd. Please be home. Can't make it? Reply with another time before 16 Oct. Details emailed.

**A6 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October 2026, 9am-1pm, for the annual gas safety check due by 16 October. Please be home. To rearrange, contact us before 16 October. Our earlier emails and text have had no reply.

**A7 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road expires on 16 October 2026 (so it is currently valid). Luca hasn't replied to our email of 25/09, or the email and text of 02/10. I've booked HeatRight Ltd for Tuesday 13 October, 9-1, and given Luca written notice by email, text and letter, with a way to rearrange. We can't enter without his agreement, so the deadline does not move and I'll update you on Monday. The check cost isn't confirmed; please confirm you approve it (your limit on file is £300 inc VAT) and tell us if you have another way to reach Luca.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean the tenant has agreed; no entry without his agreement.
- Cost of the check is unconfirmed and not approved by the landlord.
- Visit not yet confirmed by HeatRight beyond our assignment.

## Remaining work
- Confirm tenant agreement or rearranged date before 16 Oct (agency)
- Landlord cost approval (Ben)
- If no response by 12 Oct, escalate to legal/compliance on options, e.g. further notice or documenting attempts

## Missing or unavailable information
- Tenant has not responded to any contact
- HeatRight price
- Landlord's alternative contact for tenant

## Conflicts between sources
- Legacy note says cert renewed 2025 without dates; current compliance record preferred. get_property returned no record, so I relied on the case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, Gas Safe 550123, matches HeatRight) over the vague legacy note 'gas cert renewed 2025', which has no dates and which I treat only as background. It lapses after 16 Oct if not renewed.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight (contractor on file) for 13 Oct, over 24h away and before expiry; sent written notice by email, SMS and letter explaining how to rearrange; no entry without the tenant's agreement; follow-up 12 Oct.

**3. What do you tell the landlord?**

The expiry date, that it is currently valid, the tenant's silence, the booking date and steps taken, that the deadline does not move, and asked for cost approval (limit £300).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant Luca Bianc… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `set_visit` | {"ticket_ref":"JOB-101","datetime":"2026-10-13 09:00","slot_text":"Tuesday 13 October, 9am-1pm","access":"tenant_home","confirmed_by":"assig… | 1 | ✅ verified | Ticket JOB-101 read back after set_visit |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant response and HeatRight confirmation for 13 Oct gas check; if no contac… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
