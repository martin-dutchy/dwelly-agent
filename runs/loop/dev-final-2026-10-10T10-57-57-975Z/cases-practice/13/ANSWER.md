# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The gas safety record is valid until 16 Oct, so the property is compliant today, but it expires in six days and the tenant has not responded to three contacts. I opened JOB-101, gave the tenant written notice of a proposed visit on 13 Oct by email and SMS, informed the landlord, and set a follow-up and hold for 12 Oct.

## Where the case stands
JOB-101 on hold waiting for tenant to confirm access for proposed 13 Oct 8-12 visit; review 12 Oct. Contractor not yet booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Written notice of proposed gas check Tue 13 Oct 8-12 sent by email | Luca Bianchi, tenant | email | A2 ✅ |
| 2 | CHASE_TENANT | SMS with the proposed slot | Luca Bianchi, tenant | sms | A3 ✅ |
| 3 | REPLY_TO_TENANT | Inform landlord of status, risk and plan | Ben Hartley, landlord | email | A4 ✅ |
| 4 | WAIT | Follow-up 12 Oct to phone tenant, book HeatRight if confirmed, else escalate | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, this is formal written notice that your landlord's annual gas safety check is legally required and the current certificate runs out on 16 October. We'd like an engineer from HeatRight Ltd to visit on Tuesday 13 October, 8am-12pm (more than 24 hours' notice). If that doesn't suit, please reply with another time before Thursday 15 October, or call us. The visit takes about an hour and you or an adult you trust needs to be there. Thank you.

**A3 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, gas safety check proposed for Tue 13 Oct, 8am-12pm (details emailed). Please reply to confirm or suggest another time before 15 Oct. Thanks.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road is valid until 16 October, so it is compliant today but expires in six days. Luca hasn't replied to our email (25 Sep), or to our email and text (2 Oct). We have now given written notice of a visit by HeatRight Ltd on Tue 13 Oct, 8am-12pm, and will chase by phone. If we can't get in, we'll keep a record of every attempt, which shows you tried, but the certificate would lapse, so please let us know if you can reach Luca yourself. We'll confirm the cost with you before booking if it is over your £300 limit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Notice does not give right of entry without tenant consent; no forced access.
- Proposed slot is not a booked visit; HeatRight not yet assigned or cost confirmed.
- Does not extend the certificate.

## Remaining work
- Agency: phone Luca 12 Oct, assign HeatRight and set_visit once confirmed; check cost vs £300 limit and call Ben if over
- Escalate to compliance if no access by 14 Oct
- Issue CP12 copy to tenant within 28 days after the check

## Missing or unavailable information
- Tenant response/availability
- HeatRight cost and availability
- No property record found in system (get_property not_found)

## Conflicts between sources
- get_property returned not_found; relied on case inputs. Legacy note is consistent with the CP12 and was not relied on.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust the compliance record (CP12 issued 2025-10-17, Gas Safe 550123, which matches HeatRight) over the legacy note, which is a vague hearsay note from the old agency saying 'renewed 2025'. They are consistent, but the CP12 is the evidence.

**2. What steps do you take to get access lawfully before expiry?**

Previous attempts were 25 Sep email and 2 Oct email and SMS. I sent written notice with more than 24h (proposed 13 Oct 8-12, alternatives invited), by email and SMS. Next: phone call, letter if needed, assign HeatRight once confirmed, escalate to compliance if there is still no access by 14 Oct. No entry without the tenant's consent; holding keys gives no right of entry.

**3. What do you tell the landlord?**

That the certificate is valid until 16 Oct, the tenant has not responded, notice and a proposed visit have been given, the plan and the risk of lapse, that attempts are documented, and that we will call before spend over £300.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) due before 2026-10-16. Tenant Luca Bi… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi Luca,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"If no tenant reply, phone Luca, confirm HeatRight slot for 13 Oct, consider second notice/letter and escal… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A6 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Tenant","comment":"Waiting for Luca to confirm access for gas check proposed 13 Oct 8-12","rev… | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |

## Failed or unverified actions
_None._
