# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The gas certificate is valid until 16 Oct but the tenant hasn't replied to earlier email or SMS. I opened JOB-101, assigned HeatRight Ltd for 13 Oct 10:00-13:00, sent the tenant written notice by email, SMS and letter, informed the landlord and set a 12 Oct follow-up.

## Where the case stands
JOB-101 at visit stage; HeatRight assigned for 13 Oct 10:00-13:00 (agency-proposed window, not yet tenant-agreed). Waiting on tenant; review 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for gas check 13 Oct 10:00-13:00 | HeatRight Ltd, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Written notice of the visit by email, SMS and letter, with how to rearrange | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | OTHER | Told landlord of the deadline, booking and steps taken | Ben Hartley, landlord | email | A6 ✅ |
| 4 | WAIT | Review tenant response and access on 12 Oct | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, this is written notice that a Gas Safe engineer from HeatRight Ltd will visit 19 Victoria Park Road on Tuesday 13 October 2026 between 10:00 and 13:00 for the annual gas safety check. The check is a legal requirement and the current certificate runs out on 16 October. Takes about an hour. If the time doesn't suit, just reply with another time before 16 October and we'll rearrange. We won't enter without your agreement. We'll also try you by text and letter.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, notice: gas safety check at 19 Victoria Park Rd, Tue 13 Oct, 10am-1pm (HeatRight Ltd). Can't make it? Reply with another time before 16 Oct and we'll rearrange. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, written notice: a Gas Safe engineer from HeatRight Ltd will visit on Tuesday 13 October 2026 between 10:00 and 13:00 for the annual gas safety check, required by law before the current certificate expires on 16 October. If this time doesn't suit, please contact us with another time before 16 October and we will rearrange. Thank you.

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road is valid until 16 October 2026, so it is compliant today but only just. The tenant hasn't replied to our email (25 Sep, 2 Oct) or text (2 Oct). We've booked HeatRight Ltd for Tue 13 Oct, 10:00-13:00, and given the tenant written notice by email, text and letter, with a way to rearrange. We can't enter without the tenant's agreement. If access isn't agreed we'll update you by Mon 12 Oct and look at the options. Routine check, within your limit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not guarantee access; no entry without tenant agreement.
- Does not renew the certificate; only a completed check and new CP12 does.
- Contractor attendance not yet confirmed by HeatRight.

## Remaining work
- Follow-up 12 Oct: check tenant reply, confirm HeatRight attendance
- If no access, update landlord and consider further notice/rebooking before 16 Oct; escalate if the certificate will lapse
- After the check, send the CP12 copy to tenant within 28 days

## Missing or unavailable information
- Tenant has not responded on any channel
- No HeatRight confirmation of the window
- Property record not found in system; relied on case inputs

## Conflicts between sources
- Legacy note says certificate 'renewed 2025, all good'; compliance record shows the CP12 issued 2025-10-17 expiring 2026-10-16. Trusted the compliance record. get_property returned not found; used CRM inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, Gas Safe 550123, matching HeatRight) over the vague legacy note 'gas cert renewed 2025, all good', which has no date or evidence and doesn't extend the expiry.

**2. What steps do you take to get access lawfully before expiry?**

Booked HeatRight (gas contractor on file) for 13 Oct, over 24h away and before expiry. Gave written notice by email, SMS and letter with a way to rearrange. No forced entry; follow-up 12 Oct, rebook before 16 Oct if the tenant proposes another time.

**3. What do you tell the landlord?**

Told Ben the certificate is valid to 16 Oct, the tenant hasn't responded, the booking date, the notices sent, no entry without tenant agreement, and that we will update him by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12 expires 2026-10-16). Tenant Luca Bianc… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 10:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant response/access for 13 Oct gas check; confirm HeatRight attendance; es… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
