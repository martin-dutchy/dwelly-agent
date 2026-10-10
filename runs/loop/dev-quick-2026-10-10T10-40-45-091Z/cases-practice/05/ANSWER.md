# Case 05: ANSWER

**Outcome:** escalated · **Severity:** urgent

I did not approve the £640 Capital Boiler Fix quote (CBF-2291). It is more than double the landlord's £300 limit, and he asked to be called before any spend over £300. I requested his approval (APR-101), told Kieran Doyle to hold parts, updated the tenant Priya Shah with a 72-hour target and gas safety advice, asked HeatRight Ltd (the landlord's preferred boiler contractor) for a comparison quote, and escalated ESC-105 so someone phones Ben today.

## Answers
**1. 1. Can you approve this quote?**

No. The quote is £640 inc VAT, above the £300 spend limit in the CRM and in Ben's 2019 email. The contractor's pressure to approve today does not change that. Ben's 2023 'emergencies without asking' permission does not apply, because the tenant is not vulnerable and hot water being off is not an emergency under policy.

**2. 2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord, L-01): written approval request APR-101 sent, plus a human phone call to +447700900201 (escalation ESC-105). Ask him to approve £640 inc VAT for quote CBF-2291 (replacement PCB and diverter valve) with a Monday 2026-10-12 visit, or to choose the HeatRight route. Kieran Doyle, Capital Boiler Fix (C-19): email sent asking him to hold parts until written confirmation. HeatRight Ltd (C-11): asked for a quote and earliest visit date. Only a phone number is on file for HeatRight, so the email may not have reached them and needs checking.

**3. 3. Is there anything the tenant needs in the meantime?**

Yes. Priya Shah was emailed: the target is a repair within 72 hours, no date is confirmed yet, and she will be told when approval comes through. She was given the gas emergency number 0800 111 999 and told to leave the property if she smells gas, and how to isolate the boiler if it is loud or leaking.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Benjamin Hartley (Ben), L-01, +447700900201, ben.hartley@hartleyhomes.co.uk","decision_needed":"Approve £640.00 inc VAT quote C… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Kieran Doyle, Capital Boiler Fix","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.exam… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"email","contact":"HeatRight Ltd (C-11) +447700900311 - email on f… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `update_ticket` | {"ref":"R-4815","stage":"visit","note":"Capital Boiler Fix quote CBF-2291 £640 inc VAT exceeds landlord limit £300. Not approved. Landlord a… | 1 | ✅ verified | Ticket R-4815 read back at stage visit |
| A6 | `escalate_to_human` | {"priority":"P2","team":"management","reason":"Landlord Ben Hartley's written instruction is to call him before any spend over £300. Approva… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Escalations
- **P2 → management** (verified): Landlord Ben Hartley's written instruction is to call him before any spend over £300. Approval was requested in writing, but he has not been phoned. The £640 quote needs his decision today, as the contractor's offer depends on it and the quote expires in 14 days.
  - Known: Ticket R-4815, Flat 9, 3 Amhurst Road (P-203). Tenant Priya Shah reports no hot water; heating works intermittently. Not recorded as vulnerable. Capital Boiler Fix (Kieran Doyle) quote CBF-2291 is £640 inc VAT. The spend limit is £300. Landlord's preferred boiler contractor is HeatRight Ltd. Ben's 2023 email allows emergencies without asking, but this is not an emergency.
  - Missing: Ben's decision on £640. Whether HeatRight can quote sooner. Contractor email for HeatRight is not on file (phone only).
  - Options: Call Ben today and approve £640 with Capital Boiler Fix for Monday 2026-10-12.; Call Ben and ask for a HeatRight quote first; accept a short delay.; Ben declines; ask for a different plan.
  - Recommendation: Call Ben today. Approve £640 with Capital Boiler Fix if he agrees, since the work can start Monday. If he prefers HeatRight, get their quote and approval before work starts.

## Failed or unverified actions
_None._
