# Case 02: ANSWER

**Outcome:** needs_info · **Severity:** urgent

The hallway CO alarm at Flat 9, 3 Amhurst Road is most likely at end of life (fitted 2019-04-02, 7-year lifespan, sealed battery), so it is treated as an urgent landlord repair, not a CO emergency, since no continuous alarm or symptoms were reported. I sent Priya a safety SMS, requested her date of birth and symptom and availability details (REQ-103), and notified landlord Ben Hartley that the unit needs replacing. No repair ticket is logged yet because identity is not verified and the call dropped.

## Answers
**1. 1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm?**

Most likely an end-of-life alarm. A regular single chirp with no continuous alarm and no reported symptoms fits a low battery or end-of-life warning. The unit was fitted 2019-04-02 with a 7-year manufacturer lifespan, so it reached end of life around April 2026. The battery is sealed, so a battery swap is not a fix. It becomes a CO emergency only if the alarm goes continuous or symptoms appear.

**2. 2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord (Ben Hartley, L-01). Clause 12.8 makes the tenant responsible for replacing batteries, but this unit has a sealed battery and has reached end of life, so the unit itself must be replaced at landlord cost, within his £300 limit. Clause 12.9 requires the tenant to test alarms and report faults promptly, which Priya is doing. Clause 12.17 does not apply because no avoidable or out-of-hours call-out has been booked.

**3. 3. What actions did you take, and what did you tell the tenant?**

Checked for open tickets (none). Sent Priya an SMS (MSG-101, ledger A1) saying not to remove the alarm or battery, that a repair is being arranged, what to do if it alarms continuously or she feels unwell (leave, call 0800 111 999 or 999), and asking her to reply with her date of birth. Requested her identity, alarm status, symptoms and availability (REQ-103, ledger A3). Emailed landlord Ben Hartley (MSG-102, ledger A2) about the end-of-life replacement. Not yet done: repair ticket creation and contractor booking, pending identity verification. The extractor fan issue was non-urgent and has not been logged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","body":"Hi Priya, this is Mare and Co Let… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, the… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_information` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","questions":["Please confirm your full na… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Escalations
_None._

## Failed or unverified actions
_None._
