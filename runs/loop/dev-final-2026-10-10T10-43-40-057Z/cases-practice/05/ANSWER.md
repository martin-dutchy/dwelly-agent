# Case 05: ANSWER

**Outcome:** escalated · **Severity:** urgent

Quote CBF-2291 (£640 inc VAT) exceeds the landlord's £300 limit, so it was not approved. Approval was requested from Ben Hartley, the tenant and contractor were updated, and a P2 escalation asks a human to phone Ben today.

## Answers
**1. Can you approve this quote?**

No. £640 exceeds Ben Hartley's £300 limit and he asked to be called before any spend over £300. The contractor's pressure to 'just approve' doesn't change that. Ben also prefers HeatRight for boilers.

**2. Who needs to be contacted, how, and what exactly do you ask for?**

Landlord Ben (email/approval request APR-101, plus a human phone call via ESC-104 to +447700900201): approve £640 for a Monday repair, or have HeatRight quote, or decline. Contractor told to wait and not order parts. Tenant updated.

**3. Is there anything the tenant needs in the meantime?**

Priya (not vulnerable) has no hot water and intermittent heating. She was told the target is within 72 hours (urgent), that a date is not confirmed, given the gas emergency number, and asked to report any change. If it worsens or becomes a vulnerable-occupant issue it becomes an emergency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Approve £640 inc VAT quote CBF-2291 from Capital Boiler Fix (PCB + diverter valve, labour) for … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.example","body":"Hi Kier… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Quote £640 exceeds landlord £300 limit; landlord asked to be phoned before spend over £300 a… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Escalations
- **P2 → maintenance** (verified): Quote £640 exceeds landlord £300 limit; landlord asked to be phoned before spend over £300 and prefers HeatRight for boilers
  - Known: Ticket R-4815, Flat 9 3 Amhurst Rd. Capital Boiler Fix (Gas Safe 558812) quote CBF-2291 £640 inc VAT: PCB + diverter. No hot water, heating intermittent; tenant Priya Shah not vulnerable. Landlord Ben Hartley limit £300 (CRM, 2019 email); wants a call over £300; prefers HeatRight. Approval request emailed; tenant and contractor informed.
  - Missing: Landlord decision; whether he wants HeatRight to quote instead. No reply possible during this run.
  - Options: Phone Ben on +447700900201 and get approval for £640 Monday; Get HeatRight second quote; Decline
  - Recommendation: Phone Ben today; if he approves, approve_quote and confirm Monday with Capital Boiler Fix; check if HeatRight can attend sooner.
  - Deadline: 2026-10-10 17:00

## Failed or unverified actions
_None._
