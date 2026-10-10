# Case 01: ANSWER

**Outcome:** escalated · **Severity:** emergency

A rotten-egg smell from the boiler is a possible gas leak, so this is an emergency even though the tenant called it "not urgent". The tenant was told to leave, not use switches or flames, and call 0800 111 999. Job JOB-101 is raised and HeatRight Ltd (C-11) is assigned for an emergency visit within 24h, with the landlord and P1 escalation ESC-104 notified.

## Answers
**1. What severity is this and why, given the tenant says it is not urgent?**

Emergency. A rotten-egg smell from a gas boiler is the odorant for a possible gas leak, and gas smells are emergencies under policy whatever the tenant calls them. An 82-year-old household member is also present, which raises the risk.

**2. What exactly do you tell the tenant right now, and in what order?**

First: leave the flat with everyone, open windows, don't operate switches, the boiler or flames. Second: call the National Gas Emergency line 0800 111 999 now (999 if anyone is unwell). Third: a Gas Safe engineer is being arranged as an emergency, target within 24h, with the confirmed time to follow. This was sent on WhatsApp as MSG-102.

**3. Which actions do you take tonight (job, contractor, escalation, landlord)?**

Created JOB-101 (gas, emergency) linked to R-4801. Assigned HeatRight Ltd (C-11, Gas Safe 550123) for an ASAP visit with a 24h target, and messaged them (MSG-105). Emailed landlord Ben Hartley (MSG-103) that the cost may exceed £300 and that he will be called before approval. Escalated P1 to maintenance (ESC-104). Added a note to P-201 about the vulnerable occupant (NOTE-106).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports boiler (Worcester 30i, fitted 2017) making a rotte… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, a rotten-egg s… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, Ame… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak at P-201 (rotten-egg smell from boiler), reported out of hours. Tenant tol… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A5 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd (C-11, Gas Safe 550123, +447700900311)","visit_window":"2026-10-10 ASAP, emergency targe… | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A6 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","body":"EMERGENCY gas job JOB-101,… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `add_note` | {"entity":"P-201","note":"Out-of-hours report 09/10/2026 22:40: rotten-egg smell from boiler. Treated as gas emergency (JOB-101, ESC-104). A… | 1 | ✅ verified | NOTE-106 found in the add_note log |

## Escalations
- **P1 → maintenance** (verified): Possible gas leak at P-201 (rotten-egg smell from boiler), reported out of hours. Tenant told to evacuate and call 0800 111 999. Needs Gas Safe engineer make-safe and gas safety check; may exceed landlord's £300 limit.
  - Known: WhatsApp 22:40 Fri 09/10/2026 from tenant Amelia Clarke (T-1001, +447700900101): boiler smells of rotten eggs when firing. Tenant called it "not urgent". Boiler: Worcester 30i, 2017. CO alarm in kitchen (2022). An 82-year-old flatmate's mum is staying (not recorded in CRM; CRM marks tenant not vulnerable). Landlord Ben Hartley: £300 spend limit, call before spend over that, prefers HeatRight Ltd (C-11, Gas Safe 550123). Existing ticket R-4801 (dripping tap, visit 2026-10-15) is unrelated. Tenant safety message sent via WhatsApp; landlord emailed.
  - Missing: Whether the gas leak is confirmed or the tenant has left the property; whether the 999/National Gas line was called; the make-safe cost; whether the tenant has been told a confirmed appointment time.
  - Options: Confirm HeatRight Ltd emergency attendance tonight or first thing Sat 10/10 and approve the make-safe cost above £300 if needed; Use Swift Plumbing & Heating (C-12) as backup if HeatRight can't attend; Isolate the boiler supply and cap off gas only if engineer confirms it is safe
  - Recommendation: Ensure the tenant has evacuated and called 0800 111 999. Book HeatRight Ltd (C-11) for an emergency Gas Safe attendance by Sat 10/10. Get Ben's approval by phone for any spend over £300 (inc VAT).
  - Deadline: 2026-10-10 09:00

## Failed or unverified actions
_None._
