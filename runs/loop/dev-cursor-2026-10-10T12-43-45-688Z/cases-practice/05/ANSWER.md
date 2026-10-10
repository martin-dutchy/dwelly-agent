# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix quoted £640 inc VAT for a PCB and diverter valve, over Ben Hartley's £300 limit, so it cannot be approved by us. I recorded the quote, asked Ben by email and SMS, told the tenant and contractor to wait, and put the job on hold to 12 Oct.

## Where the case stands
Ticket R-4815 at result stage, on hold (Waiting for Landlord) until 2026-10-12. Quote Q-101 £640 inc VAT recorded, not approved. Ben Hartley asked by email and SMS; tenant and contractor told.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked Ben to approve £640 quote (or choose HeatRight / own contractor) | Ben Hartley, landlord | email | A2 ✅ |
| 2 | CHASE_LANDLORD | SMS to Ben pointing him to the approval request | Ben Hartley, landlord | sms | A6 ✅ |
| 3 | REPLY_TO_TENANT | Told Priya approval is pending, safety advice and gas number, next update by Mon 12 Oct | Priya Shah, tenant | email | A3 ✅ |
| 4 | REPLY_TO_TENANT | Told Capital Boiler Fix not to order parts until the landlord approves | Kieran Doyle, contractor | email | A7 ✅ |
| 5 | WAIT | Hold until landlord replies; review 12 Oct | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hi Ben, the boiler at Flat 9, 3 Amhurst Road has a PCB fault (no hot water, heating intermittent). Capital Boiler Fix quote CBF-2291 is £640 inc VAT (PCB £295, diverter valve £120, labour £118.33, VAT £106.67), above your £300 limit, so we need your OK before ordering parts. They could fit Monday if approved today. Please reply yes/no, or tell us if you'd prefer HeatRight to quote instead. I'll also try your phone. (£640)
> 
> Options: Approve Capital Boiler Fix at £640 inc VAT (recommended: fastest, no hot water now); Ask HeatRight Ltd for a second quote (slower); Arrange your own contractor

**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, the engineer has found a fault with the boiler's control board and a valve, and parts are needed. The cost needs your landlord's approval, which we have asked for today. We can't give a repair date until that's agreed. Meanwhile, please don't try to open or fix the boiler. If you ever smell gas, leave the property and call 0800 111 999. We'll update you by Monday 12 October.

**A4 · send_message → Kieran Doyle (contractor) via email, office@capitalboilerfix.example** (failed)

> Hi Kieran, thanks for the quote CBF-2291 (£640 inc VAT). It is above the landlord's spend limit so we can't approve it ourselves. We've asked the landlord and will come back as soon as we have an answer. Please don't order parts until we confirm.

**A6 · send_message → Ben Hartley (landlord) via sms, +447700900201** (verified)

> Hi Ben, boiler quote for Flat 9, 3 Amhurst Road, London E8 2AU is £640 inc VAT (over your £300 limit). Tenant has no hot water. Please check your email and reply YES to approve, or let us know if you'd prefer HeatRight. Thanks.

**A7 · send_message → Kieran Doyle (contractor) via email, office@capitalboilerfix.example** (verified)

> Hi Kieran, thanks for quote CBF-2291 (£640 inc VAT). It is above the landlord's spend limit so we can't approve it ourselves. We've asked the landlord and will come back as soon as we have an answer. Please don't order parts until we confirm.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it.
- No contractor instructed and no visit booked; Monday is only the contractor's offer.
- Landlord has not yet been phoned; policy note asks for a call over £300, which I could not make as a call tool is unavailable here.

## Remaining work
- Ben's decision (approve £640, HeatRight second quote, or own contractor) - landlord
- Phone Ben (his stated preference for spend over £300) - human/agency staff on Monday if no reply
- Review 12 Oct; if approved, record decision, approve_quote, book visit; if silent, chase and consider P2 escalation as tenant has no hot water

## Missing or unavailable information
- Landlord decision
- Whether HeatRight could quote faster

## Conflicts between sources
- Landlord notes say 'call before over £300' while the spend limit is £300; treated as: over £300 needs landlord approval, plus a call preferred.
- Contractor's quote email says tenant is 'hot water off, heating intermittent', consistent with the ticket.

## Answers to the case questions
**1. Can you approve this quote?**

No. £640 inc VAT exceeds the £300 spend limit, and Ben asked to be called before anything over £300. This is not an emergency (tenant not vulnerable, no gas or safety risk), so no emergency approval route. The contractor's pressure to 'just approve' is not authority. The quote arithmetic checks out.

**2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord) by email and SMS: approve £640 quote CBF-2291, or ask HeatRight (his preferred boiler contractor) for a second quote, or arrange his own; a call is also his stated preference. Capital Boiler Fix told not to order parts until confirmed.

**3. Is there anything the tenant needs in the meantime?**

Priya was told approval is pending, not to touch the boiler, the gas emergency number 0800 111 999, and that we'll update her by 12 Oct. Hot water is off; this is an urgent job (72h target once approved). No date promised.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Diverter valve £120",… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"R-4815","amount_gbp":640,"decision_needed":"Hi Ben, the boiler at Flat 9, 3 Amhurst Road has a PCB f… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"R-4815","bod… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.example","ticket_ref":"R… | 1 | ❌ failed | MSG-104 was returned but is not in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Quote £640 exceeds £300 limit; awaiting Ben Hartley's decision (email + SM… | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"sms","contact":"+447700900201","ticket_ref":"R-4815","body":"Hi Ben, … | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.example","ticket_ref":"R… | 1 | ✅ verified | MSG-106 found in the send_message log |

## Failed or unverified actions
- A4: First contractor message not applied; resent successfully as A7. An earlier landlord SMS was blocked for an abbreviated address and resent as A6.
