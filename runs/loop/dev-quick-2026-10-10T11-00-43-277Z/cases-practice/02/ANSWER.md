# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** escalated · **Severity:** urgent

The hallway CO alarm is past its 7-year life and chirping, most likely end-of-life or a fault, not a battery issue, as the battery is sealed. There are no symptoms or continuous alarm, so this is urgent rather than an emergency. Ticket JOB-101 was opened, the landlord and tenant were messaged with safety advice (do not remove the battery, leave and call 999 if symptoms), and maintenance was escalated to book a replacement within 72 hours.

## Where the case stands
JOB-101 open at init. Urgent CO alarm replacement needed at Flat 9, 3 Amhurst Road. Landlord notified by email and tenant sent safety SMS. No contractor booked yet; maintenance has been escalated (ESC-106) because no alarm contractor is on file.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Book a qualified contractor to replace the hallway CO alarm within 72h (by 2026-10-13), within the £300 limit, and tell the tenant and landlord the visit time | Maintenance team | internal | A6 ✅ |
| 2 | CHASE_LANDLORD | Tell the landlord the replacement is being booked, and ask him to reply to confirm | Ben Hartley, landlord | email | A3 ✅ |
| 3 | WAIT | Check the visit is booked and the alarm replaced; chase if not | Maintenance / Ben Hartley | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, this is Mare and Co Lettings following up on your call about the hallway CO alarm. Please don't take the battery out or switch the alarm off. The alarm is past its expected life, so we are arranging for it to be checked and replaced. We aim to have this done within 72 hours. Until then: if you notice headaches, dizziness, sickness or breathlessness, or the alarm sounds continuously, get out into fresh air straight away and call 999. For any gas concern call the National Gas Emergency line on 0800 111 999. We will confirm the visit time once booked.

**A3 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, a tenant at Flat 9, 3 Amhurst Road reports the hallway carbon monoxide alarm (FireAngel CO-9X, fitted April 2019) chirping about once a minute since last night. The unit has a sealed battery and is past its 7-year manufacturer lifespan, so it most likely needs replacing. We are treating it as urgent. A replacement alarm and fitting should fall within your £300 (inc VAT) limit. Please reply to confirm you are happy for us to arrange this, or let us know if you would like to be called first. We will book a visit within 72 hours.

## Escalation
- **P2 → maintenance** (verified): Urgent: CO alarm at P-203 (JOB-101) past its 7-year lifespan and chirping. No alarm contractor is on the property record, so a visit cannot be booked. Needs a contractor booked within 72h (by 2026-10-13).
  - Known: Tenant Priya Shah (T-1003) reported the hallway CO alarm (FireAngel CO-9X, fitted 2019-04-02, sealed battery) chirping about once a minute since 2026-10-09 evening. No continuous alarm or symptoms reported. Tenancy 12.8 covers replacing batteries, but the battery is sealed, so the tenant cannot do this. Landlord Ben Hartley emailed 2026-10-10 asking for approval; spend limit £300 inc VAT, so a replacement should be within his limit. HeatRight Ltd is preferred for boilers only. Tenant SMS sent with safety advice.
  - Missing: No alarm-specific contractor on file. Landlord approval not yet received (his limit covers it, so approval is needed only to confirm). Tenant identity (DOB) not verified because the call dropped.
  - Options: Book a qualified contractor to replace the CO alarm within 72h, within the £300 limit; Ask the landlord to confirm before booking if he wants to be called first
  - Recommendation: Book the replacement within 72h (by 2026-10-13) under the landlord's £300 limit, and tell the landlord it is booked.

## What this does not establish
- Classed as urgent, not an emergency: no continuous alarm or reported symptoms, so no evidence of an active CO leak. This is not confirmed by an engineer.
- Replacement is needed because the alarm is past its 7-year lifespan and the battery is sealed. Tenancy 12.8 (battery replacement) does not cover this, so this is not a tenant charge.
- Booking a visit and replacement does not confirm cause or safety of the boiler.

## Remaining work
- Maintenance: book a qualified contractor to replace the CO alarm by 2026-10-13 and send the visit to the tenant and landlord (ESC-106 / ledger A6).
- Landlord: reply to confirm the replacement (his limit covers it).
- Tenant: DOB verification has not been done. The call dropped before any identity check, so no ticket detail beyond safety advice was given by phone.
- Follow-up FUP-105 (ledger A5) on 2026-10-12 to check booking and replacement.

## Missing or unavailable information
- Alarm-specific contractor (none on file)
- Landlord reply to the email
- Tenant DOB verification (call dropped)

## Conflicts between sources
- The tenancy clause 12.8 says the tenant replaces batteries in CO alarms, but the CRM says the alarm has a sealed battery. The CRM record was trusted, so the tenant is not responsible.

## Answers to the case questions
**1. 1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely an end-of-life alarm. It was fitted 2019-04-02, its 7-year manufacturer lifespan passed in April 2026, and it has a sealed battery, so a battery change is not possible. The tenant reports a single chirp about once a minute, not a continuous alarm, and no symptoms. That makes it urgent, not an emergency, but a CO alarm fault still needs replacing within 72 hours. Nobody has confirmed by inspection that there is no CO leak.

**2. 2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord (Ben Hartley) is responsible for replacing the alarm. Clause 12.8 requires the tenant to replace batteries, but this alarm has a sealed battery and is end-of-life, so the clause does not apply and the tenant is not liable. Clause 12.9 requires the tenant to test alarms and report faults promptly, which Priya has done. The replacement should fall within the landlord's £300 inc VAT limit.

**3. 3. What actions did you take, and what did you tell the tenant?**

Opened ticket JOB-101 (urgent). Sent the tenant an SMS (MSG-102): do not remove the battery or switch the alarm off; a replacement is being arranged within 72 hours; if she has headaches, dizziness, sickness or breathlessness, or the alarm sounds continuously, get into fresh air and call 999; for gas concerns call 0800 111 999. Emailed the landlord (MSG-103) asking him to confirm. Logged the call (CALL-104). Escalated to maintenance (ESC-106) to book the contractor. Set a follow-up for 2026-10-12 (FUP-105). The tenant's DOB was not verified because the call dropped, so no ticket detail was given by phone. The extractor fan issue is non-urgent and has not been logged as a separate ticket.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","description":"Hallway carbon monoxide alarm (FireAngel CO-9X, fitted 2019-04-02, s… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","body":"Hi Priya, this is Mare and Co Let… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, a t… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Tenant reported hallway CO alarm chi… | 1 | ✅ verified | CALL-104 found in the log_call log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check the CO alarm has been booked and replaced (72h target 2026-10-13). Chase land… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A6 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Urgent: CO alarm at P-203 (JOB-101) past its 7-year lifespan and chirping. No alarm contract… | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Failed or unverified actions
- escalate_to_human (first attempt): Validation failed (missing options and recommendation). Re-sent with both fields; succeeded as A6 / ESC-106.
