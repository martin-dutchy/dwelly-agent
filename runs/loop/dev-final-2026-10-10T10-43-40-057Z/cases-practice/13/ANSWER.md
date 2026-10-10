# Case 13: ANSWER

**Outcome:** action_taken · **Severity:** urgent

The gas safety record is valid until 16 Oct, so the property is compliant today, but the tenant has not replied to any contact. I opened JOB-101, booked HeatRight Ltd for Mon 12 Oct 09:00-13:00, and sent the tenant 24h written notice by email and SMS. The landlord has been updated.

## Answers
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes. The current compliance record shows a CP12 issued 2025-10-17 and expiring 2026-10-16, with Gas Safe engineer 550123 (HeatRight). I trust it over the legacy note ('renewed 2025, all good'), which is hearsay from the old agency, though it doesn't contradict the record. The property stays compliant only until 16 Oct.

**2. What steps do you take to get access lawfully before expiry?**

I opened JOB-101 and assigned HeatRight (the landlord's preferred gas contractor) for Mon 12 Oct 09:00-13:00. I sent written notice by email and SMS more than 24h ahead and offered alternative times before the 16th. There is no forced entry. Holding keys gives no right of entry. If there is still no access, I will try phone and letter and an alternative contact, then escalate before 16 Oct.

**3. What do you tell the landlord?**

I told Ben that the CP12 is valid until 16 Oct, the tenant has not responded to the earlier emails or SMS, notice has been given for 12 Oct, we will not enter without access, and he will be updated if the visit does not happen.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) due before expiry 2026-10-16. Tenant … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"2026-10-12 09:00-13:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","body":"Hi Luca, this … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","body":"Hi Luca, written notice sent by… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, the… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
