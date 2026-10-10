# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 so the property is compliant today, but the tenant has not answered three contacts. I opened JOB-101, re-contacted the tenant with proposed dates and a 24h notice promise, asked HeatRight for slots, informed the landlord and set a 12 Oct follow-up.

## Where the case stands
JOB-101 open at intake. Waiting on tenant reply and HeatRight slots/price; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked tenant for availability 12-15 Oct with promise of 24h written notice | Luca Bianchi, tenant | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Asked HeatRight for slots and price before 16 Oct | HeatRight Ltd, contractor | sms | A3 ✅ |
| 3 | OTHER | Updated landlord on compliance status and plan | Ben Hartley, landlord | email | A4 ✅ |
| 4 | WAIT | Review 12 Oct; escalate to compliance if no access | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your yearly gas safety check at 19 Victoria Park Road is due before 16 October and we haven't heard back yet. It's a legal safety check and takes under an hour. Please reply with any times between Monday 12 and Thursday 15 October that suit you (morning or afternoon). We are asking our gas engineer, HeatRight Ltd, for slots and will confirm the exact time in writing at least 24 hours ahead. If you can't be there, tell us and we'll find another way. If you ever smell gas, leave the property and call 0800 111 999. We'll write again on Monday 12 October.

**A3 · send_message → HeatRight Ltd (contractor) via sms, +447700900311** (verified)

> Hi, we need an annual gas safety check (CP12) at 19 Victoria Park Road, E9 7HD, before the current one expires on 16 Oct 2026. Please confirm your earliest available slots Mon 12 – Thu 15 Oct and your price. Tenant access is being arranged by us; we will not treat any slot as booked until you confirm it.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the gas safety record for 19 Victoria Park Road is valid until 16 Oct 2026, so it is compliant today, but it expires in six days. Luca hasn't replied to our email (25 Sep, 2 Oct) or SMS (2 Oct). We've emailed him again with proposed dates for 12–15 Oct, with 24 hours' written notice before any visit, and asked HeatRight Ltd for slots and a price. We can't enter without his agreement. If the date passes, the property would be out of compliance, so if you have another way to reach Luca, please tell us. We'll update you on Monday 12 Oct, and will check with you before any spend over £300.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked; nothing confirms access.
- Contacting the tenant does not give a right of entry; holding keys gives none.
- Compliance today does not mean it will be on 17 Oct.

## Remaining work
- Get HeatRight to confirm a slot and price (assign within £300 limit or ask landlord)
- Give tenant 24h written notice of confirmed slot
- Mon 12 Oct: try a different channel (letter/phone) and escalate to compliance if still no reply
- Send tenant copy of new CP12 within 28 days

## Missing or unavailable information
- Tenant availability/response
- HeatRight availability and price
- Property record not found in system (get_property)

## Conflicts between sources
- Legacy note says cert renewed 2025 'all good'; current record shows issue 2025-10-17, expiry 2026-10-16. Trusted the current record.
- get_property returned no record for P-230; relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, engineer Gas Safe 550123, a structured system record) over the legacy note 'gas cert renewed 2025, all good' which is vague hearsay and gives no expiry. It will lapse 17 Oct without a new check.

**2. What steps do you take to get access lawfully before expiry?**

Repeated written contact on a new attempt, proposed dates, HeatRight asked for slots, 24h written notice of any confirmed slot, tenant consent needed; no forced entry or entry on key alone. On 12 Oct try another channel (letter/phone) and escalate to compliance if still silent, documenting all attempts.

**3. What do you tell the landlord?**

That it is compliant today, expires in six days, tenant unresponsive, what we have done, that we can't enter without consent, the risk of lapse, and the next update on 12 Oct; spend over £300 will be checked with him first.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant Luca Bianc… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","ticket_ref":"JOB-101","body":"Hi,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply and HeatRight slots; if none, send formal written notice by lett… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
