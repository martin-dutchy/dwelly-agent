# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix quoted £640 inc VAT (arithmetic checks out) against a £300 landlord limit, so I could not approve it. I recorded the quote, asked Ben for a decision, told the tenant and contractor, and put the job on hold until 12 Oct.

## Where the case stands
Ticket R-4815 at result/quote stage, on hold waiting for landlord Ben Hartley to decide on £640 quote; review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked Ben to approve £640 inc VAT quote (or HeatRight second quote / own contractor), noting he wants a call over £300 | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told Priya approval is pending, update by Mon 12 Oct, gas safety advice | Priya Shah, tenant | email | A3 ✅ |
| 3 | CHASE_PROVIDER | Told Capital Boiler Fix not to order parts until approved | Kieran Doyle, contractor | email | A4 ✅ |
| 4 | WAIT | Hold until 2026-10-12, then chase landlord by phone/SMS | Ben Hartley, landlord | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Ben, the tenant at Flat 9, 3 Amhurst Road has no hot water and intermittent heating. Capital Boiler Fix quote CBF-2291: PCB and diverter valve replacement, £640 inc VAT, which is over your £300 limit. Can we approve it up to £640? The contractor can attend Monday if approved today. You prefer HeatRight for boilers, so I can instead ask HeatRight for a second quote. We will also try to phone you as you asked. (£640)
> 
> Options: Approve Capital Boiler Fix at £640 inc VAT (recommended, quickest for the tenant); Ask HeatRight Ltd for a second quote; Use your own contractor

**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, the engineer has diagnosed a faulty circuit board and valve on your boiler. The repair cost needs your landlord's approval, which we've asked for today. We'll update you by Monday 12 October at the latest. Until then, please don't try to fix the boiler yourself. If you smell gas, leave the flat and call 0800 111 999. Sorry for the wait without hot water.

**A4 · send_message → Kieran Doyle (contractor) via email, office@capitalboilerfix.example** (verified)

> Hi Kieran, thanks for the quote CBF-2291 (£640 inc VAT). It is above the landlord's spend limit so we can't approve it ourselves. We've sent it to the landlord for a decision. Please don't order parts until we confirm. We'll come back to you as soon as we hear.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it.
- No contractor instructed to order parts or attend Monday.
- Request to landlord is not a landlord decision; no phone call was made (no call tool run).

## Remaining work
- Ben to decide; if approved record decision with cap £640 and approve_quote, book Monday visit with Capital Boiler Fix
- If he prefers HeatRight, request second quote
- Phone/SMS chase on 12 Oct; if tenant still without hot water and landlord silent, escalate P2

## Missing or unavailable information
- Landlord decision on £640 quote

## Conflicts between sources
- Contractor says tenant has no hot water but heating works intermittently; consistent with ticket. Preferred contractor HeatRight vs assigned Capital Boiler Fix: Capital was assigned before the quote.

## Answers to the case questions
**1. Can you approve this quote?**

No. £640 inc VAT exceeds the £300 spend limit, and Ben asked to be called before any spend over £300. It is not an emergency (tenant not vulnerable, no gas/safety risk reported), so there is no emergency route. The contractor's pressure to 'just approve' does not change this. Ben also prefers HeatRight for boilers.

**2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord): approval request by email on record with the quote details, asking him to approve up to £640 inc VAT, or ask HeatRight for a second quote, or use his own contractor; chase by phone/SMS at +447700900201 as he prefers calls. Capital Boiler Fix told not to order parts yet.

**3. Is there anything the tenant needs in the meantime?**

Priya has been told the repair awaits landlord approval, that she will hear by Mon 12 Oct, not to tamper with the boiler, and the gas helpline 0800 111 999. She has no hot water; non-vulnerable so urgent, target 72h once approved. If the landlord stays silent, escalate P2.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Diverter valve £120",… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"R-4815","amount_gbp":640,"decision_needed":"Ben, the tenant at Flat 9, 3 Amhurst Road has no hot wat… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"R-4815","bod… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.example","ticket_ref":"R… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Quote £640 inc VAT exceeds £300 limit; awaiting Ben Hartley's decision.","… | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4815","due_on":"2026-10-12","party":"Ben Hartley","purpose":"Chase landlord by phone/SMS on £640 quote; update tenant"} | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
