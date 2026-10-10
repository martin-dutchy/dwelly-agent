# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

The £640 inc VAT Capital Boiler Fix quote cannot be approved, because it is more than double the landlord's £300 limit and he asked to be called before any spend over £300. The landlord has been asked to approve it or to have HeatRight quote, the contractor has been told not to order parts yet, and the tenant has been given a 72-hour target and safety advice. The ticket is on hold until 12 October.

## Where the case stands
Ticket R-4815 (Flat 9, 3 Amhurst Road, P-203, tenant Priya Shah, landlord Ben Hartley L-01) is at the result stage. Capital Boiler Fix quote CBF-2291 for £640 inc VAT is recorded as Q-101. It is on hold, waiting for the landlord's decision. Parts must not be ordered until approval is given.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben Hartley to approve CBF-2291 at £640 inc VAT, or to have HeatRight Ltd quote instead. The approval request APR-102 is open with a 12 Oct deadline. | Ben Hartley, landlord | phone_call | A2 ✅ |
| 2 | CHASE_PROVIDER | Tell Kieran Doyle the quote is not approved yet and that he should not order parts until we confirm in writing. | Kieran Doyle, Capital Boiler Fix | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | Tell Priya Shah the repair is awaiting landlord approval, give the 72-hour target without promising a date, and give gas and heating safety advice. | Priya Shah, tenant | email | A5 ✅ |
| 4 | WAIT | Review the job on 2026-10-12 and chase Ben if there is no decision. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (L-01) (landlord)** (verified)

> Approve Capital Boiler Fix quote CBF-2291 for £640 inc VAT (PCB board £295, diverter valve £120, labour £118.33, VAT £106.67) to repair the boiler at Flat 9, 3 Amhurst Road, which has no hot water. This is above your £300 limit, so we need your decision. Alternatively, ask HeatRight Ltd (your preferred boiler contractor) to quote.
> 
> Options: Approve CBF-2291 at £640 inc VAT with Capital Boiler Fix (recommended: parts ordering is time-sensitive and Kieran can attend Monday); Ask HeatRight Ltd (your preferred boiler contractor) to attend and quote first; this may delay the repair; Decline for now and hold the job until you have decided

**A3 · send_message → Ben Hartley (landlord) via phone_call, +447700900201** (verified)

> Hi Ben, it's the lettings team about Flat 9, 3 Amhurst Road. The boiler has no hot water and the heating is intermittent. Capital Boiler Fix attended today and quoted £640 inc VAT (replacement PCB board £295, diverter valve £120, labour £118.33, VAT £106.67). That is above your £300 limit, so we need your approval before they order parts. Can you confirm by reply whether we should go ahead? Your preferred contractor is HeatRight Ltd, so if you would rather they quote, tell us and we will ask them. Thanks, Ben.

**A4 · send_message → Kieran Doyle, Capital Boiler Fix (contractor) via email, office@capitalboilerfix.example** (verified)

> Hi Kieran, thanks for attending Flat 9, 3 Amhurst Road and for quote CBF-2291 (£640 inc VAT). The quote is above the landlord's approval limit, so we cannot approve it yet. We have asked the landlord for a decision today and will come back to you as soon as we hear. Please don't order parts until you get a written approval from us. Thanks, Lettings team.

**A5 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for letting the engineer in today. The engineer has found the fault and needs to order a part before the boiler can be fixed. We have asked the landlord to approve the repair and will update you as soon as we hear. Our target is to get this fixed within 72 hours, though we cannot confirm a date until the approval comes through. In the meantime, if you smell gas, leave the flat and call the National Gas Emergency line on 0800 111 999. If the heating goes off completely and it is cold, or you have any concerns, please call us straight away. Keep a kettle handy for hot water and check your carbon monoxide alarm is working. Thanks, Lettings team.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Approval is not given. The £640 quote is above the £300 limit recorded for this landlord, so I did not approve it.
- Sending a message to Ben is not the same as a completed phone call. No call was connected, and no landlord reply has been received.
- The 2023 note allowing emergency work without asking does not cover this. The tenant is not recorded as vulnerable, and hot water loss with intermittent heating is urgent, not an emergency, so the £300 rule applies.
- Nothing here confirms the cause of the fault, who pays in the end, or a repair date.

## Remaining work
- Landlord Ben Hartley to decide: approve CBF-2291 (£640 inc VAT) or ask HeatRight Ltd to quote. Owner: lettings team. Review 2026-10-12.
- If approved, assign Capital Boiler Fix for a visit (Kieran offered Monday) and book access with the tenant.
- If declined or HeatRight is preferred, ask HeatRight for a quote and re-record it.
- Work must be completed within the urgent target of 72 hours from the report, subject to approval.
- Record the work result, invoice, and tenant confirmation before closing R-4815.

## Missing or unavailable information
- Landlord decision on the £640 quote (or a HeatRight alternative).
- Confirmed visit date and access arrangements.
- Whether the fault has been confirmed as a PCB and diverter valve fault by a second engineer; the only evidence is Kieran's email.

## Conflicts between sources
- The 2023 landlord email allows emergency work without asking, but this repair is not an emergency and costs more than £300. The 2019 instruction and the CRM spend limit (£300) govern.
- The email subject cites job R-4815 while the quote references CBF-2291. The ticket in the record is R-4815, and it matches.
- The quote says heating works intermittently, but the tenant says hot water is off. Treated as a partial fault with the boiler still running.

## Answers to the case questions
**1. 1. Can you approve this quote? Why or why not?**

No. The quote is £640 inc VAT, and the landlord's limit is £300 inc VAT. His 2019 instruction is to call before spending over £300. The 2023 emergency waiver does not apply, because this is an urgent repair, not an emergency, and the tenant is not vulnerable. Approval must come from the landlord.

**2. 2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord), by phone on +447700900201, with a written follow-up to ben.hartley@hartleyhomes.co.uk. Ask him to approve CBF-2291 at £640 inc VAT, or to have HeatRight Ltd (his preferred boiler contractor) quote first. Kieran Doyle (Capital Boiler Fix) by email: the quote is not approved and he must not order parts until we confirm in writing. Priya Shah (tenant) by email, with the repair status, the target and safety advice.

**3. 3. Is there anything the tenant needs in the meantime?**

Yes. Tell her the repair is awaiting landlord approval, with a 72-hour target and no firm date. She should leave and call 0800 111 999 if she smells gas, call us if the heating fails completely and it is cold, and check her carbon monoxide alarm. A kettle can cover hot water in the meantime.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix (Kieran Doyle), Gas Safe 558812","amount_gbp":640,"vat":"included","items":["Vaillant … | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"ticket_ref":"R-4815","landlord":"Ben Hartley (L-01)","decision_needed":"Approve Capital Boiler Fix quote CBF-2291 for £640 inc VAT (PCB bo… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"phone_call","contact":"+447700900201","ticket_ref":"R-4815","body":"H… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kieran Doyle, Capital Boiler Fix","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.exam… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"R-4815","bod… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Quote CBF-2291 £640 inc VAT exceeds £300 limit. Landlord Ben Hartley must … | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |

## Failed or unverified actions
_None._
