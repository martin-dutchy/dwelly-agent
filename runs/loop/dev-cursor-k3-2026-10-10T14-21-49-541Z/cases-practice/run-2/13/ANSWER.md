# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026, so the property is currently compliant but only for six more days. The tenant has ignored three contacts. I opened JOB-101, booked HeatRight (the landlord's preferred gas contractor, Gas Safe 550123) for 13 Oct, gave the tenant written notice by email, SMS and letter, and asked the landlord to approve the cost.

## Where the case stands
JOB-101 at visit stage: HeatRight booked Tue 13 Oct 9am-12pm (proposed, tenant not yet agreed). Waiting on tenant reply and landlord cost approval; review 12 Oct. CP12 valid until 16 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Booked HeatRight for 13 Oct 9am-12pm | HeatRight Ltd, contractor | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Written 24h+ notice by email, SMS and letter with how to rearrange | Luca Bianchi, tenant | email | A4 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Told landlord of deadline, booking, steps; asked cost approval within £300 limit by 12 Oct | Ben Hartley, landlord | email | A7 ✅ |
| 4 | WAIT | Review 12 Oct; phone tenant and rebook/escalate if no agreement | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your yearly gas safety check is due before 16 October and we haven't heard back. This is written notice that a Gas Safe engineer from HeatRight Ltd will visit on Tuesday 13 October, between 9am and 12pm. Someone aged 18+ needs to be home to let them in. If that doesn't suit, just reply or ring us with another time before 16 October and we'll rearrange. Booking early keeps your landlord's annual renewal date the same, and you'll get a copy of the safety record within 28 days of the check. If you ever smell gas, leave the property and call 0800 111 999. We'll be in touch again on Monday 12 October if we haven't heard from you.

**A5 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, written notice: gas safety check by HeatRight Ltd on Tue 13 Oct, 9am-12pm at 19 Victoria Park Rd. Please be home. Need another time? Reply before 16 Oct and we'll rearrange. Details sent by email and letter.

**A6 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, your annual gas safety check is due before 16 October. This is written notice that a Gas Safe engineer from HeatRight Ltd will visit on Tuesday 13 October 2026, between 9am and 12pm. Please make sure an adult is home. If the time doesn't suit, contact us before 16 October and we'll rearrange. Booking early keeps the annual renewal date the same, and you'll receive a copy of the record within 28 days of the check. If you smell gas, leave and call 0800 111 999.

**A7 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Approve the gas safety check cost (HeatRight Ltd fee not yet quoted; your limit is £300 inc VAT). Please reply by Monday 12 October.
> 
> Options: Approve HeatRight Ltd to do the check up to £300 inc VAT (recommended); Arrange your own Gas Safe engineer before 16 Oct
> 
> Update: The current gas safety record (CP12, Gas Safe 550123) expires 16 Oct 2026. Tenant hasn't replied to our email of 25 Sep, or email and SMS of 2 Oct. We've booked HeatRight Ltd for Tue 13 Oct 9am-12pm and given the tenant written notice by email, SMS and letter, with a way to rearrange. The deadline doesn't move. Booking early keeps the anniversary date, and the tenant gets a copy within 28 days. We won't enter without the tenant's agreement. We'll review Mon 12 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not mean the tenant has agreed; no entry without their agreement for a non-emergency check
- Cost not quoted or approved yet
- Does not renew the certificate until the check is done and the CP12 issued

## Remaining work
- Tenant response/access agreement (agency)
- Landlord approval of cost (Ben)
- Post-visit result, CP12 copy to tenant within 28 days, and invoice
- Escalate if no tenant contact by 14 Oct; expired CP12 would be a compliance breach

## Missing or unavailable information
- Tenant has not responded to any contact
- HeatRight fee not quoted
- Cannot phone from this run

## Conflicts between sources
- Legacy note says cert renewed 2025; consistent with CP12 issued 2025-10-17, but the compliance record is trusted.
- get_property found no record for P-230, so I relied on the case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (the CP12 issued 2025-10-17, Gas Safe 550123, file CP12_2025.pdf), the current system record. The legacy note of 2 Nov 2025 ('renewed 2025, all good') is hearsay from the old agency and has no dates. It is consistent with the CP12 but not evidence. The EICR is valid to 2027 and the EPC to 2031.

**2. What steps do you take to get access lawfully before expiry?**

Opened JOB-101, assigned HeatRight Ltd for Tue 13 Oct 9-12 (over 24h away and before expiry), and sent written notice by email, SMS and letter with a way to rearrange. Follow-up is set for 12 Oct to try other contact and rebook. There is no entry without the tenant's agreement. If there is still no contact, escalate before 16 Oct.

**3. What do you tell the landlord?**

I told Ben the expiry date, that the tenant hasn't responded, the booking with HeatRight, and the steps taken. I said the deadline doesn't move, that early booking keeps the anniversary date, and that the tenant gets a copy within 28 days. I asked him to approve the cost within his £300 limit by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","tenant":"T-1030","description":"Annual gas safety check (CP12) expires 2026-10-16.… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-13 09:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `set_visit` | {"ticket_ref":"JOB-101","datetime":"2026-10-13 09:00","slot_text":"Tuesday 13 October, 9am-12pm","access":"tenant_home","confirmed_by":"assi… | 1 | ✅ verified | Ticket JOB-101 read back after set_visit |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Approve the gas safety check cost (HeatRight Ltd fee not yet quoted; you… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply and landlord approval; if no tenant agreement, try phone and reb… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
