# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026, so the property is currently compliant. The tenant has ignored three contacts. I opened JOB-101, assigned HeatRight (the landlord's preferred Gas Safe firm, no. 550123) for 13 Oct 9-12, gave the tenant written notice by email, SMS and letter, and informed the landlord.

## Where the case stands
JOB-101 at visit stage; HeatRight assigned for 2026-10-13 09:00-12:00; tenant notified by email, SMS and letter, no reply yet; follow-up 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for gas safety check 13 Oct 09:00-12:00 | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | BOOK_OR_CONFIRM_APPOINTMENT | Sent written 24h+ notice of the visit to tenant by email | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | CHASE_TENANT | Notice by letter to the property | Luca Bianchi, tenant | letter | A5 ✅ |
| 4 | REPLY_TO_TENANT | Notice by SMS | Luca Bianchi, tenant | sms | A4 ✅ |
| 5 | OTHER | Told landlord the deadline, booking and steps | Ben Hartley, landlord | email | A6 ✅ |
| 6 | WAIT | Review 12 Oct for tenant response; rebook before 16 Oct if needed | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is a legal requirement and the current certificate runs out on 16 October. We have booked HeatRight Ltd to visit on Tuesday 13 October between 9am and 12pm. This is your written notice of the visit. If that doesn't suit, please reply or call us with another time before 16 October and we'll rearrange. We'll need someone aged 18+ at home. We won't enter without your agreement. We'll check again with you on 12 October.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 9am-12pm, HeatRight Ltd. Please reply to confirm or suggest another time before 16 Oct. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, notice of gas safety check: HeatRight Ltd (Gas Safe) will visit on Tuesday 13 October 2026, 9am-12pm. The annual check is a legal requirement and your certificate expires on 16 October. If this time doesn't suit, please contact us to rearrange before 16 October. We will not enter without your agreement.

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety certificate for 19 Victoria Park Road expires on 16 October 2026. The tenant hasn't replied to our email (25 Sept), or email and text (2 Oct). We've booked HeatRight Ltd for Tuesday 13 Oct, 9am-12pm, and sent the tenant written notice by email, text and letter, with a way to rearrange. We won't enter without the tenant's agreement. The property is compliant until 16 Oct, but if the check isn't done by then it will lapse. Routine check, within your limit. We'll update you on 12 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not confirm access; the tenant has not agreed and no entry without agreement.
- Certificate is only valid to 16 Oct; a lapse is not ruled out.
- The slot is not provider-confirmed beyond assignment in this system.

## Remaining work
- Check tenant response by 12 Oct (agency)
- If no access, rebook before 16 Oct and tell landlord; escalate if the certificate will lapse
- After the visit: record result, file the new CP12, send tenant copy within 28 days

## Missing or unavailable information
- Tenant has not responded; no confirmed access
- No property record in system (get_property not found); relied on case inputs

## Conflicts between sources
- Legacy note 'cert renewed 2025, all good' vs compliance record: trusted compliance record (current, dated, with expiry).

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, expires 2026-10-16, Gas Safe 550123) over the legacy note 'gas cert renewed 2025, all good', which is old-agency hearsay with no dates and says nothing about expiry. Any lapse after 16 Oct is a breach.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight for 13 Oct 09:00-12:00 (over 24h away, before expiry). Written notice sent by email, SMS and letter, with a way to rearrange. No entry without the tenant's agreement; follow-up on 12 Oct to rebook if needed.

**3. What do you tell the landlord?**

Told Ben the expiry date, that the tenant has not responded, the booked date, the notices sent, that we will not enter without agreement, and that we will update him on 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12 expires 2026-10-16). Tenant has not re… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant response / HeatRight visit confirmation for 13 Oct; if no access, rebo… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
