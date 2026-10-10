# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix quoted £640 inc VAT for a PCB and diverter valve, double the landlord's £300 limit. I recorded the quote without approving it, asked Ben for a decision, told the contractor to wait, updated the tenant, and put the ticket on hold.

## Where the case stands
Ticket R-4815 on hold (Waiting for Landlord), review 2026-10-12. Quote Q-101 recorded, not approved. Landlord approval APR-102 requested.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve £640 inc VAT quote, or choose HeatRight / own contractor | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update Priya with interim advice and 72h target | Priya Shah, tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell contractor not to order parts or start until approved | Kieran Doyle, Capital Boiler Fix | email | A4 ✅ |
| 4 | WAIT | Hold until landlord replies; review Monday | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Quote £640 inc VAT (PCB + diverter valve + labour) from Capital Boiler Fix exceeds your £300 limit. You asked to be called before anything over £300 and prefer HeatRight for boilers. Tenant has no hot water, heating intermittent. Please approve, or tell us to get a HeatRight quote/use your own contractor. (£640)
> 
> Options: Approve Capital Boiler Fix £640 inc VAT (earliest visit Monday); Ask HeatRight Ltd to quote/attend instead; Landlord arranges own contractor

**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, the engineer found a faulty circuit board and a valve on your boiler. The repair cost needs your landlord's approval, which we've requested. We're aiming to get this sorted within 72 hours but can't promise a date until it's approved. Meanwhile, please use a kettle for hot water and electric heaters if you have them. If you ever smell gas, leave the property and call 0800 111 999. We'll update you as soon as we hear.

**A4 · send_message → Kieran Doyle (contractor) via email, office@capitalboilerfix.example** (verified)

> Hi Kieran, thanks for the quote (CBF-2291, £640 inc VAT). It's above the landlord's spend limit so we can't approve it ourselves; we've asked the landlord and will confirm once we have a decision. Please don't order parts or start work until we confirm in writing.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or commit spend
- Messages to tenant and contractor do not promise a date or cost
- Landlord approval request does not mean he has agreed; the phone-call preference is not yet fulfilled

## Remaining work
- Staff to phone Ben Hartley on +447700900201 (he asked for a call over £300) and chase APR-102
- On his decision: record_landlord_decision, then approve and book Capital Boiler Fix, or get HeatRight quote
- Chase Monday 2026-10-12 if no reply; tell tenant outcome

## Missing or unavailable information
- Landlord decision on £640 quote
- Whether HeatRight could attend sooner/cheaper

## Conflicts between sources
- Ticket says assigned contractor is Capital Boiler Fix (C-19), but landlord prefers HeatRight; flagged to landlord as an option.

## Answers to the case questions
**1. Can you approve this quote?**

No. £640 inc VAT exceeds the £300 limit and Ben asked to be called before spend over £300. He also prefers HeatRight for boilers. The 2023 'emergencies without asking' permission doesn't apply: no hot water with heating intermittent for a non-vulnerable tenant is urgent, not an emergency, and the contractor's pressure to approve today is not a reason to bypass the limit. Quote arithmetic checks out.

**2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord) by email on file (APR-102), asking him to approve £640 inc VAT, or ask HeatRight to quote, or arrange his own contractor, by Monday morning. Staff should also phone him on +447700900201. Contractor told by email to wait for written approval.

**3. Is there anything the tenant needs in the meantime?**

Yes. Priya was told the repair awaits landlord approval, given the 72h urgent target (not a promise), interim advice on kettle and electric heaters, and the gas emergency number 0800 111 999. She is not flagged vulnerable; if that changes, treat as an emergency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Diverter valve £120",… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"R-4815","amount_gbp":640,"decision_needed":"Quote £640 inc VAT (PCB + diverter valve + labour) from … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"R-4815","bod… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.example","ticket_ref":"R… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Awaiting Ben Hartley's decision on £640 quote CBF-2291 (over £300 limit)",… | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |

## Failed or unverified actions
_None._
