# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the tenant has ignored two emails and an SMS. I opened JOB-101, assigned HeatRight for 13 Oct, gave the tenant written notice by email, SMS and letter, and asked the landlord to approve cost.

## Where the case stands
JOB-101 at visit stage: HeatRight booked 13 Oct 10-13; tenant notified on all channels, awaiting reply; landlord asked to approve cost; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | HeatRight assigned for 13 Oct 10am-1pm; written notice sent by email, SMS and letter | Luca Bianchi, tenant | email | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell Ben the deadline, booking and steps taken; ask for cost approval | Ben Hartley, landlord | email | A6 ✅ |
| 3 | WAIT | Review tenant response on 12 Oct; escalate if no access agreed | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your yearly gas safety check is due before 16 October, and we haven't heard back from our earlier emails and text. We've booked HeatRight Ltd to visit 19 Victoria Park Road on Tuesday 13 October, between 10am and 1pm. This is your written notice of that visit. If the time doesn't suit, just reply with another time before 16 October and we'll rearrange; we won't enter without your agreement. The engineer will give a copy of the record, and you'll get a copy within 28 days of the check. Booking before expiry keeps the annual renewal date. We'll also write by letter and text. Thank you.

**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check booked: Tue 13 Oct, 10am-1pm, HeatRight Ltd. This is your written notice. Can't make it? Reply with another time before 16 Oct and we'll rearrange. Details emailed.

**A5 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, your annual gas safety check is due before 16 October. HeatRight Ltd will visit on Tuesday 13 October 2026, between 10am and 1pm. This letter is your written notice. If the time doesn't suit, please contact us with another time before 16 October and we'll rearrange. You'll receive a copy of the record within 28 days of the check. Booking early keeps your annual renewal date.

**A6 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Approve HeatRight Ltd's gas safety check cost (your limit is £300 inc VAT; we have no quote yet, so please confirm you are happy to proceed).
> 
> Options: Approve HeatRight Ltd for the annual check (recommended); Use your own engineer before 16 Oct
> 
> Update: The CP12 for 19 Victoria Park Road expires 16 Oct 2026. Luca hasn't replied to emails (25 Sep, 2 Oct) or SMS (2 Oct). We've booked HeatRight for Tue 13 Oct 10am-1pm and given Luca written notice by email, SMS and letter, with a way to rearrange. No entry without his agreement. The deadline doesn't move. Booking before expiry keeps the anniversary date; Luca gets a copy within 28 days. If he doesn't respond we'll keep trying and update you by Mon 12 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not establish tenant agreement; no entry without it
- Cost not yet approved or quoted
- Does not renew the certificate until the check is done

## Remaining work
- Tenant reply or rearrangement (agency)
- Landlord approval of cost (Ben)
- Complete check and send tenant copy within 28 days (HeatRight/agency)
- Escalate if no access by 12-13 Oct

## Missing or unavailable information
- Tenant has not responded
- HeatRight quote/cost for the check
- HeatRight has not itself confirmed the window in the record

## Conflicts between sources
- Legacy note 'gas cert renewed 2025' is undated detail; compliance record preferred. get_property returned no record, so I relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant? Which record do you trust?**

Yes, until 16 Oct 2026 (CP12 issued 17 Oct 2025, engineer 550123 matches HeatRight). I trust the compliance record over the legacy note, which has no date or detail and says 'renewed 2025'. It expires in 6 days.

**2. What steps do you take to get access lawfully?**

Booked HeatRight for Tue 13 Oct 10-13 (over 24h away, before expiry). Sent written notice by email, SMS and letter with a way to rearrange. No entry without agreement. Follow-up on 12 Oct to try other routes, then escalate if no access.

**3. What do you tell the landlord?**

Told Ben the expiry date, that the tenant hasn't replied, the booking and notice steps, that early booking keeps the anniversary date and the tenant gets a copy within 28 days, and asked him to approve cost (limit £300, no quote yet).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","tenant":"T-1030","description":"Annual gas safety check (CP12) expires 2026-10-16.… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 10:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Approve HeatRight Ltd's gas safety check cost (your limit is £300 inc VA… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply/access for 13 Oct gas check; if none, try phone/another route an… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
