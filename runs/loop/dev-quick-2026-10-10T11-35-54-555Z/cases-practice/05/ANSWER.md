# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix's £640 inc VAT quote for the PCB and diverter valve is above Ben Hartley's £300 limit, so it is not approved. I recorded the quote, asked Ben by SMS for a yes/no call and offered HeatRight as an alternative, told Kieran not to order parts, updated Priya, and put the job on hold until 2026-10-12.

## Where the case stands
Ticket R-4815 (Flat 9, 3 Amhurst Road, P-203; tenant Priya Shah). Diagnosis visit done by Capital Boiler Fix (C-19) on Sat 10 Oct. Quote Q-101 for £640 inc VAT is recorded. On hold, waiting for landlord Ben Hartley's decision; review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord Ben Hartley to approve or decline the £640 inc VAT quote (or have HeatRight quote instead) by SMS, requesting a call today. | Ben Hartley, landlord | sms | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Formal approval request APR-102 logged for the £640 quote, with options. | Ben Hartley, landlord | internal | A2 ✅ |
| 3 | CHASE_PROVIDER | Tell Kieran Doyle not to order parts until the landlord decides. | Kieran Doyle, Capital Boiler Fix | email | A4 ✅ |
| 4 | REPLY_TO_TENANT | Tell tenant Priya Shah the quote is awaiting landlord decision, with gas-safety advice. | Priya Shah, tenant | email | A5 ✅ |
| 5 | WAIT | Hold the job until the landlord decides; review on 2026-10-12. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (L-01) (landlord)** (verified)

> Approve Capital Boiler Fix quote CBF-2291 for £640 inc VAT (replacement PCB and diverter valve, Vaillant boiler, Flat 9, 3 Amhurst Road). This is above your £300 inc VAT limit, so we need your decision before any parts are ordered. Please also say whether you would rather HeatRight Ltd (your preferred boiler contractor) do the work.
> 
> Options: Approve £640 inc VAT with Capital Boiler Fix (recommended: attended today, parts can be ordered for Monday); Ask HeatRight Ltd (C-11) to quote for the same repair instead; Decline and arrange your own contractor

**A3 · send_message → Ben Hartley (landlord) via sms, +447700900201** (verified)

> Hi Ben, Mare & Co here about Flat 9, 3 Amhurst Road (no hot water). Capital Boiler Fix attended today: the boiler's PCB board and diverter valve need replacing. Their quote is £640 inc VAT, which is above your £300 limit, so I need your OK before they order parts. Could you call me today or reply YES / NO? Would you prefer HeatRight to quote instead? Thanks.

**A4 · send_message → Kieran Doyle, Capital Boiler Fix (contractor) via email, office@capitalboilerfix.example** (verified)

> Hi Kieran, thanks for attending Flat 9, 3 Amhurst Road and for quote CBF-2291 (£640 inc VAT). The cost is above the landlord's approval limit, so I have asked him for a decision. Please do not order parts yet. We will confirm as soon as he replies.

**A5 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for letting the engineer in today. The engineer has found the fault: the boiler's control board and a valve need replacing. The cost is above the amount our landlord has pre-approved, so we are waiting for his decision before the parts are ordered. We have asked him to reply as quickly as possible and will update you as soon as we hear. In the meantime, if the boiler stops working completely or you smell gas, please turn the boiler off, leave the property if you smell gas, and call the National Gas Emergency line on 0800 111 999. Sorry for the wait.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Quote is NOT approved. £640 exceeds the landlord's £300 inc VAT limit on file, and the 2023 note allowing emergencies without asking does not cover this (no gas smell, not a vulnerable occupant, heating partly working).
- Recording the quote does not commit spend; no parts ordered and no contractor assigned.
- The landlord's 2019 email asks for a call before any spend over £300.

## Remaining work
- Landlord decision on Q-101 (owner: Ben Hartley). If approved, record his exact words, then approve or assign and book the visit. If he picks HeatRight, request their quote.
- Review on 2026-10-12: phone Ben if no reply, then escalate to maintenance P2 if he stays silent.

## Missing or unavailable information
- Landlord's decision on the £640 quote
- Whether landlord wants HeatRight (preferred) to quote instead

## Conflicts between sources
- Kieran's email refers to job R-4815 and the work is at Flat 9; the ticket record shows C-19 (Capital Boiler Fix) as assigned. Both match.
- The 2023 note allows emergency work without asking. This is not an emergency under policy (no gas smell, no vulnerable occupant), so the £300 limit and the 2019 instruction apply.
- The landlord's standing HeatRight preference conflicts with the Capital Boiler Fix quote. Landlord was asked whether he wants HeatRight to quote.

## Answers to the case questions
**1. 1. Can you approve this quote?**

No. £640 inc VAT is over the landlord's £300 inc VAT limit, and his standing instruction is to call before any spend over £300. The 2023 'sort emergencies without asking' note does not cover this: there is no gas smell or vulnerable occupant, and heating still works intermittently. Approval needs Ben's recorded decision.

**2. 2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord), by SMS to +447700900201 with a call requested. Asked: approve £640 inc VAT with Capital Boiler Fix for the replacement PCB and diverter valve, or have HeatRight quote instead, or arrange his own contractor. Kieran Doyle (Capital Boiler Fix), by email: do not order parts until the landlord decides. Priya Shah (tenant), by email: quote is awaiting landlord decision, with gas-safety advice.

**3. 3. Is there anything the tenant needs in the meantime?**

Yes. She was told the decision is pending and what happens next, with no date promised. She was given the gas emergency line (0800 111 999) and told to turn the boiler off and leave if she smells gas. Hot water is off, so she should contact us if the heating also fails.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix (Gas Safe 558812)","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Div… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"ticket_ref":"R-4815","landlord":"Ben Hartley (L-01)","decision_needed":"Approve Capital Boiler Fix quote CBF-2291 for £640 inc VAT (replac… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"sms","contact":"+447700900201","body":"Hi Ben, Mare & Co here about F… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kieran Doyle, Capital Boiler Fix","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.exam… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Quote Q-101 (Capital Boiler Fix, £640 inc VAT) is above the landlord's £30… | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |

## Failed or unverified actions
_None._
