# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix quoted £640 inc VAT for a PCB and diverter valve, above Ben's £300 limit, so I could not approve it. I recorded the quote, asked Ben for a decision, told the tenant and told the contractor to hold off ordering parts. The ticket is on hold to 12 Oct.

## Where the case stands
Ticket R-4815 at result/quote stage, on hold (Waiting for Landlord) until 2026-10-12. Landlord asked to approve £640 quote; contractor told not to order parts; tenant updated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve the £640 Capital quote (or HeatRight second quote / own contractor) | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell Priya approval is pending, with gas safety advice | Priya Shah, tenant | email | A3 ✅ |
| 3 | OTHER | Tell Capital Boiler Fix not to order parts until approved | Kieran Doyle, contractor | email | A4 ✅ |
| 4 | WAIT | Hold until 2026-10-12 for landlord reply, then chase by phone | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hi Ben, the boiler at Flat 9, 3 Amhurst Road has a faulty circuit board and diverter valve; tenant has no hot water and only intermittent heating. Capital Boiler Fix quote CBF-2291 is £640 inc VAT (board £295, valve £120, labour £118.33, VAT £106.67). That is above your £300 limit, so we need your OK before ordering. You usually prefer HeatRight for boilers; we can ask them for a second quote instead. Do you approve the £640 quote? Please reply yes/no, or call us. Capital could fit it Monday if approved today. (£640)
> 
> Options: Approve Capital Boiler Fix quote £640 inc VAT (fastest, possible Monday); Ask HeatRight Ltd for a second quote (slower); Arrange your own contractor

**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, the engineer found a faulty circuit board and valve on your boiler. The repair cost is above what we can approve ourselves, so we've asked the landlord today for the go-ahead. We'll update you as soon as we hear, and we'll not promise a repair date until it's approved. Meanwhile, if you smell gas, leave the property and call 0800 111 999. Please don't try to open up or repair the boiler. Let us know if anything changes, e.g. heating stops completely.

**A4 · send_message → Kieran Doyle (contractor) via email, office@capitalboilerfix.example** (verified)

> Hi Kieran, thanks for quote CBF-2291 (£640 inc VAT). It is above the landlord's limit so we can't approve it ourselves; we've asked the landlord. Please don't order parts yet. We'll confirm as soon as we have a decision.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- No contractor visit or parts order is authorised
- Landlord approval request does not imply Monday date is bookable

## Remaining work
- Await Ben's decision; if no reply, phone him (his stated preference for >£300) and review 2026-10-12
- If approved, record decision, approve quote, book Monday visit; if he prefers HeatRight, request their quote

## Missing or unavailable information
- Landlord decision
- Quote PDF was not seen separately; figures taken from quote_CBF-2291.md, which add up

## Conflicts between sources
- Contractor said 'just approve' versus landlord limit and call-first preference: followed landlord instruction. Landlord preference for HeatRight versus assigned Capital: offered as option.

## Answers to the case questions
**1. Can you approve this quote?**

No. £640 inc VAT exceeds the £300 limit and Ben asks to be called before spend over £300. There is no emergency exemption: no hot water for a non-vulnerable tenant is urgent, not an emergency. The contractor's pressure to 'just approve' is not authority. Ben also prefers HeatRight for boilers.

**2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord) by email, with a phone call recommended: a yes/no on the £640 quote, or a HeatRight second quote, or his own contractor. The contractor was told to wait and not order parts.

**3. Is there anything the tenant needs in the meantime?**

Priya was told approval is pending, with no date promised, plus gas emergency number 0800 111 999 and a request not to touch the boiler. Target is a fix within 72h once approved. Any loss of heating should be reported, and her hot-water situation should be escalated if it persists.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Diverter valve £120",… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"R-4815","amount_gbp":640,"decision_needed":"Hi Ben, the boiler at Flat 9, 3 Amhurst Road has a fault… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"R-4815","bod… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.example","ticket_ref":"R… | 2 | ✅ verified | MSG-105 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Quote £640 exceeds £300 limit; awaiting Ben's decision (approve / HeatRigh… | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |

## Failed or unverified actions
- A4 attempt 1: Not applied; retried once and verified as attempt 2 (MSG-105)
