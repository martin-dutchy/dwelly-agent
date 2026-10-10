# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix quoted £640 inc VAT, over the landlord's £300 limit, so I could not approve it. I recorded the quote, asked Ben for approval, told the tenant and the contractor what is pending, and put the job on hold with a review on 12 Oct.

## Where the case stands
Ticket R-4815 at result/quote stage, on hold waiting for landlord Ben Hartley's decision on the £640 quote. Review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked Ben to approve the £640 inc VAT quote, or choose a HeatRight second quote or his own contractor | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told Priya approval is pending, no date promised, hot water workaround and gas safety advice | Priya Shah, tenant | email | A4 ✅ |
| 3 | OTHER | Told Capital Boiler Fix not to order parts or start until approved | Kieran Doyle, contractor | email | A5 ✅ |
| 4 | WAIT | Hold until 12 Oct, with a phone chase to Ben then | Ben Hartley, landlord | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Quote CBF-2291 from Capital Boiler Fix of £640 inc VAT (Vaillant PCB £295, diverter valve £120, labour £118.33, VAT £106.67) to fix the boiler at Flat 9, 3 Amhurst Road. It is above your £300 limit so we need your yes before ordering parts. Tenant has no hot water and intermittent heating. Contractor can attend Monday if approved today. You usually prefer HeatRight for boilers; they are available if you would rather get a second quote. (£640)
> 
> Options: Approve Capital Boiler Fix at £640 inc VAT (recommended, fastest, as hot water is off); Ask HeatRight Ltd for a second quote; Arrange your own contractor

**A4 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, the engineer has found a faulty circuit board and valve in your boiler. The repair cost is above what we can approve ourselves, so we have asked your landlord for a decision and will update you as soon as we hear. I can't give a repair date yet. Until then, please use a kettle or pan for hot water. If you ever smell gas, leave the property, don't use switches or flames, and call 0800 111 999. Please tell us if anyone in the home becomes unwell or the heating stops completely.

**A5 · send_message → Kieran Doyle (contractor) via email, office@capitalboilerfix.example** (verified)

> Hi Kieran, thanks for the quote CBF-2291 (£640 inc VAT). It is above the landlord's spend limit, so we can't approve it ourselves. We have asked the landlord and will come back to you once we have his answer. Please don't order parts or start work until we confirm in writing.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- No contractor has been authorised to order parts or start work
- No repair date has been promised to the tenant

## Remaining work
- Ben to decide; phone him (he asked for a call before spend over £300) on 12 Oct if no reply
- If approved, record the decision, approve the quote and have Kieran confirm Monday
- If he prefers HeatRight, request a second quote

## Missing or unavailable information
- Landlord decision
- Quote PDF itself not seen separately beyond the markdown copy, which sums correctly

## Conflicts between sources
- Contractor says 'can someone just approve' versus landlord limit £300 and call-first note; landlord record followed.

## Answers to the case questions
**1. Can you approve this quote?**

No. £640 inc VAT is above the £300 limit, and Ben asked to be called before any spend over £300. He also prefers HeatRight for boilers. This is not an emergency (hot water off, heating intermittent, tenant not vulnerable), so the emergency exception does not apply. The contractor's pressure to just approve is not authority.

**2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord) by approval request email, with a phone call on 12 Oct as follow-up. I asked him to approve £640 inc VAT, or ask for a HeatRight second quote, or use his own contractor. The contractor was told to wait and the tenant was updated.

**3. Is there anything the tenant needs in the meantime?**

Yes: an update that approval is pending, with no date promised and a workaround of boiling water. She also has gas safety advice (0800 111 999) and was asked to report if anyone becomes unwell or heating stops. Urgent target is 72h once approved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Diverter valve £120",… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"R-4815","decision_needed":"Quote CBF-2291 from Capital Boiler Fix of £640 inc VAT (Vaillant PCB £295… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Quote £640 inc VAT exceeds £300 limit; awaiting Ben Hartley's decision (AP… | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"R-4815","bod… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.example","ticket_ref":"R… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4815","due_on":"2026-10-12","party":"Ben Hartley","purpose":"Chase landlord by phone (+447700900201) for decision on £640 q… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
