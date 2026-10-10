# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix quoted £640 inc VAT for PCB and diverter valve, above Ben's £300 limit. I recorded the quote, asked Ben for approval (with the HeatRight preference noted), told the contractor not to order parts, and updated Priya with interim advice.

## Where the case stands
Ticket R-4815 at result/quote stage. Quote £640 recorded; waiting on Ben Hartley's approval (APR-102). Contractor told not to order parts. Follow-up set for 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve the £640 inc VAT Capital Boiler Fix quote (or choose HeatRight/own contractor); phone call also due per his standing instruction | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told Priya the quote awaits landlord approval, interim advice, next update by 12 Oct | Priya Shah, tenant | email | A3 ✅ |
| 3 | WAIT | Wait for landlord decision; chase by phone/SMS on 12 Oct | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hi Ben, the boiler at Flat 9, 3 Amhurst Road has no hot water (heating intermittent). Capital Boiler Fix diagnosed a faulty circuit board and diverter valve and quote £640 inc VAT (quote CBF-2291), above your £300 limit. They could fit on Monday if approved today. Do you approve this quote? We will also try to phone you as you asked. Alternatively, would you prefer HeatRight, your preferred boiler firm, to quote? (£640)
> 
> Options: Approve Capital Boiler Fix quote of £640 inc VAT (recommended given tenant has no hot water); Ask HeatRight Ltd to quote instead (likely to delay the repair); Arrange your own contractor

**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, the engineer found a faulty circuit board and valve on your boiler. The repair cost needs the landlord's approval, which we have requested today. We can't promise a date until he replies, but we are treating this as urgent. Meanwhile, please use a kettle for hot water and keep an electric heater safe if the heating cuts out. If you smell gas, leave the property and call 0800 111 999. We'll update you by Monday 12 October at the latest.

**A4 · send_message → Kieran Doyle (contractor) via email, office@capitalboilerfix.example** (verified)

> Hi Kieran, thanks for quote CBF-2291 (£640 inc VAT). It is above the landlord's spend limit so we have sent it to him for approval. Please don't order parts until we confirm in writing. We'll come back to you as soon as we hear.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Quote recorded, not approved; no spend committed
- No visit booked: Monday is the contractor's offer only
- Phone call to Ben not made by this agent (no call tool used); email sent and chase scheduled

## Remaining work
- Ben to decide on quote
- Phone Ben before spend over £300 (his standing instruction)
- If approved: record decision, approve quote, book Monday visit with Kieran and tell Priya
- If HeatRight preferred: request their quote

## Missing or unavailable information
- Landlord decision
- Whether the attached quote was reviewed by Ben

## Conflicts between sources
- Contractor says tenant has hot water off but heating intermittent; consistent with ticket. Quote lines sum correctly to £640.

## Answers to the case questions
**1. Can you approve this quote?**

No. £640 inc VAT exceeds the £300 spend limit and Ben asked to be called before anything over £300. The contractor's request to just approve is not authority. No emergency applies: tenant not vulnerable, no gas/safety issue reported. He also prefers HeatRight for boilers.

**2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord) by email, with a phone call per his standing instruction: approve the £640 quote, or choose HeatRight or his own contractor. Kieran told to hold on ordering parts.

**3. Is there anything the tenant needs in the meantime?**

Yes: Priya was told approval is pending, advised kettle for hot water and safe supplementary heating, given the gas emergency number, and promised an update by 12 Oct. Hot water is off so the job stays urgent (target 72h once approved).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Diverter valve £120",… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"R-4815","amount_gbp":640,"decision_needed":"Hi Ben, the boiler at Flat 9, 3 Amhurst Road has no hot … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"R-4815","bod… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.example","ticket_ref":"R… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"R-4815","due_on":"2026-10-12","party":"Ben Hartley","purpose":"Chase landlord on £640 quote approval by phone/SMS if no reply… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
