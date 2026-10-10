# Case 13: ANSWER

**Outcome:** action_taken · **Severity:** urgent

The property is compliant today: the CP12 issued 2025-10-17 (Gas Safe 550123) is valid until 2026-10-16. I opened urgent gas job JOB-101, assigned HeatRight Ltd for a proposed visit on 2026-10-12 08:00-12:00, and sent written access notice to the tenant by email and SMS and an update to the landlord. The tenant has not yet responded, so access is not confirmed.

## Answers
**1. 1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, as of 2026-10-10. I trust the compliance record (CP12 issued 2025-10-17, expires 2026-10-16, Gas Safe 550123, which matches HeatRight Ltd's registration in CRM). The legacy note saying the cert was renewed in 2025 is consistent but is hearsay and not a current document, so I did not rely on it for the expiry date.

**2. 2. What steps do you take to get access lawfully before expiry?**

Opened JOB-101 (urgent gas). Assigned HeatRight Ltd for 2026-10-12 08:00-12:00, which gives more than 24 hours' written notice. Sent a written email notice and an SMS to Luca Bianchi asking him to confirm or propose another time before 16 Oct. Next step if there is no reply: phone call on +447700900130 and a letter, then escalate to compliance with a P2/P3 if access is not confirmed by about 14 Oct.

**3. 3. What do you tell the landlord?**

Emailed Ben Hartley (preferred name Ben) that the CP12 is valid until 16 Oct and the property is compliant today. The tenant has not replied, and the visit is provisionally booked with HeatRight Ltd (his preferred boiler contractor) for 12 Oct 08:00-12:00, expected within his £300 limit. If access cannot be completed before 16 Oct, we will come back to him for a decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230 (19 Victoria Park Road, London E9 7HD)","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd (C-11, Gas Safe 550123)","visit_window":"2026-10-12 08:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","body":"Hello Luca,\n\… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","body":"Hi Luca, your gas safety check … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Benjamin Hartley (Ben)","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
