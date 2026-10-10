# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the tenant has ignored two notices. I opened JOB-101, assigned HeatRight Ltd for 13 Oct 9-12, sent the tenant written notice by email, SMS and letter, told the landlord, and set a follow-up for 12 Oct.

## Where the case stands
JOB-101 at visit stage; HeatRight assigned for Tue 13 Oct 09:00-12:00; waiting on tenant's response; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for 13 Oct 09:00-12:00 | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | BOOK_OR_CONFIRM_APPOINTMENT | Gave tenant written notice by email | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | BOOK_OR_CONFIRM_APPOINTMENT | Notice by SMS | Luca Bianchi, tenant | sms | A4 ✅ |
| 4 | BOOK_OR_CONFIRM_APPOINTMENT | Notice by letter | Luca Bianchi, tenant | letter | A5 ✅ |
| 5 | REPLY_TO_TENANT | Told landlord the deadline, booking and steps | Ben Hartley, landlord | email | A6 ✅ |
| 6 | WAIT | Review 12 Oct for tenant reply | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, this is written notice that HeatRight Ltd (Gas Safe registered) plan to carry out the annual gas safety check at 19 Victoria Park Road on Tuesday 13 October 2026, between 9am and 12pm. The check is a legal requirement and your current certificate expires on 16 October. It takes about an hour. If that time doesn't suit, just reply with another time before 16 October and we'll rearrange. We won't enter without your agreement. Thank you.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked for Tue 13 Oct, 9am-12pm at your home (HeatRight Ltd). Please reply if you need another time before 16 Oct. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: HeatRight Ltd (Gas Safe registered) will visit 19 Victoria Park Road on Tuesday 13 October 2026, 9am-12pm, for the annual gas safety check. Your current certificate expires on 16 October. If this time doesn't suit, please contact us to rearrange a time before then. We will not enter without your agreement.

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road is valid but expires on 16 October 2026. Luca hasn't replied to our email (25 Sep, 2 Oct) or text (2 Oct). We've booked HeatRight Ltd for Tue 13 Oct, 9am-12pm, and sent Luca written notice by email, text and letter, with a way to rearrange. We can't enter without his agreement. If he doesn't respond we'll chase again and tell you before the deadline. If you have another way to reach him, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not give right of entry; tenant agreement is needed for a non-emergency check.
- Does not renew the certificate until the engineer completes the check and issues a new CP12.

## Remaining work
- Check tenant reply by 12 Oct and rearrange if needed (ops)
- Confirm HeatRight attended and obtain new CP12; send copy to tenant within 28 days
- If no access by 16 Oct, escalate and document attempts

## Missing or unavailable information
- Tenant has not replied to any contact
- No property record in system (get_property not found)
- HeatRight has not confirmed the window with us; assignment recorded by system

## Conflicts between sources
- Legacy note says cert renewed in 2025 and all good; consistent with compliance.json but undated, so I rely on the compliance record.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, Gas Safe engineer 550123) because it is the structured system record with an expiry date. The legacy note 'renewed 2025, all good' is only a hearsay note from the old agency and gives no dates.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight Ltd (the gas contractor on file) for 13 Oct 9-12, more than 24h away and before expiry. Sent written notice by email, SMS and letter explaining how to rearrange. No entry without the tenant's agreement. Follow-up on 12 Oct; escalate if there is still no access.

**3. What do you tell the landlord?**

The certificate expires 16 Oct, the tenant hasn't replied, the visit is booked for 13 Oct, the notices sent, we can't force entry, and we'll update him; I asked if he has another way to reach the tenant.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12 expires 2026-10-16). Tenant not respon… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Check tenant response / HeatRight attendance for gas check on 13 Oct; chase again and tell landlord if no … | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
