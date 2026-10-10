# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

Gas record is valid to 16 Oct 2026 but tenant unresponsive to three attempts. Opened JOB-101, wrote and texted tenant, asked HeatRight for slots, updated landlord, set review 12 Oct.

## Where the case stands
Job JOB-101 at intake. Waiting on tenant reply and HeatRight slots; review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Email and SMS tenant for access times, with 24h notice promise | Luca Bianchi, tenant | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask HeatRight for slots 12-15 Oct and price | HeatRight Ltd, contractor | phone_call | A4 ✅ |
| 3 | REPLY_TO_TENANT | SMS to tenant as second channel | Luca Bianchi, tenant | sms | A3 ✅ |
| 4 | WAIT | Review 12 Oct: phone tenant, send letter, escalate if no access | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check at 19 Victoria Park Road is a legal requirement and the current certificate runs out on 16 October. We'd like HeatRight Ltd (Gas Safe registered) to visit in the next few days. Please reply with days and times that suit you, or call us. We'll give you at least 24 hours' written notice of the confirmed slot, and we won't enter without it. We've also texted you. If you smell gas, leave the property and call 0800 111 999. We'll contact you again on Monday 12 October.

**A3 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, your gas safety check must be done before 16 Oct. Please reply with times that suit you this week (we'll give 24h notice of the confirmed slot). We've emailed details too. Gas smell? Leave and call 0800 111 999.

**A4 · send_message → HeatRight Ltd (contractor) via phone_call, +447700900311** (verified)

> Please confirm your earliest available slots between Mon 12 and Thu 15 Oct for an annual gas safety check (CP12) at 19 Victoria Park Road, E9 7HD, and your price. Tenant is yet to confirm access; we'll give notice once you confirm.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road is valid until 16 October 2026 (so currently compliant), but it expires in under a week. We've emailed and texted Luca (25 Sep, 2 Oct) with no reply. We've now written again, texted, and asked HeatRight Ltd for slots before 16 Oct. We'll give Luca 24 hours' written notice and won't enter without it. If we can't get access we'll keep a record of every attempt. Please tell us if you have another way to reach Luca. We'll update you on Monday 12 October.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked; nothing assigned. Messages do not guarantee access. The CP12 file itself was not seen, only its record.

## Remaining work
- Get tenant access and HeatRight confirmation, give 24h written notice, book visit before 16 Oct
- Landlord informed of cost if above £300
- If no access by ~14 Oct escalate to maintenance/legal with attempt log

## Missing or unavailable information
- Tenant reply
- HeatRight availability and price
- Property record not found in system

## Conflicts between sources
- Legacy note says cert renewed 2025 'all good' vs compliance record expiry 2026-10-16; trusted the current compliance record.

## Answers to the case questions
**1. Is the property currently compliant for gas safety?**

Yes until 16 Oct 2026, per the compliance record (CP12 issued 2025-10-17, Gas Safe 550123, matching HeatRight). I trust it over the legacy note ('renewed 2025, all good'), which is vague hearsay and gives no dates. The CP12 PDF was not seen. After 16 Oct it is non-compliant without a new check.

**2. What steps to get access lawfully before expiry?**

Two earlier attempts unanswered; now a further email and SMS, a request to HeatRight for slots, and a follow-up on 12 Oct to phone, send a letter, then escalate. Written 24h notice of a confirmed slot; no entry without it and keys give no right of entry. Can renew up to 2 months early keeping the anniversary.

**3. What do you tell the landlord?**

Currently compliant until 16 Oct, tenant not responding, steps taken, we won't enter without notice, ask for any other contact route, next update 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) due before 2026-10-16 expiry. Tenant … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"phone_call","contact":"+447700900311","ticket_ref":"JOB-101","bod… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply and HeatRight slots; if none, phone tenant, send letter, then es… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
