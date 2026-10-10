# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix quoted £640 inc VAT for a PCB and diverter valve replacement at Flat 9, which is above the landlord's £300 limit, so I did not approve it. I recorded the quote, asked Ben Hartley to approve or decline it and to choose between Capital Boiler Fix and HeatRight, told Kieran not to order parts yet, and told Priya what happens next with safety advice. The ticket is on hold until the landlord replies, with a review on 2026-10-12.

## Where the case stands
Ticket R-4815 (Flat 9, 3 Amhurst Road, P-203) is at the result/quote stage. Capital Boiler Fix quote CBF-2291 for £640 inc VAT is recorded as Q-101. It is above the landlord's £300 limit, so it is not approved. The landlord decision is on hold until Monday 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked Ben Hartley (landlord) to approve or decline the £640 inc VAT quote and to say whether he wants Capital Boiler Fix or HeatRight Ltd. Call script sent on the phone_call channel; a phone call to him is still needed, so follow up by phone. | Ben Hartley, landlord | phone_call | A2 ✅ |
| 2 | CHASE_LANDLORD | Sent landlord the call message with the quote details and the decision needed. | Ben Hartley, landlord | phone_call | A3 ✅ |
| 3 | CHASE_PROVIDER | Told Kieran Doyle (Capital Boiler Fix) not to order parts until the landlord approves. | Kieran Doyle, Capital Boiler Fix | email | A4 ✅ |
| 4 | REPLY_TO_TENANT | Told Priya Shah the quote is with the landlord, that no date is promised yet, and gave gas and no-heat safety advice. | Priya Shah, tenant | email | A5 ✅ |
| 5 | WAIT | Hold R-4815 until the landlord replies, with a review on 2026-10-12. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Benjamin (Ben) Hartley (landlord)** (verified)

> Approve Capital Boiler Fix quote CBF-2291 for £640 inc VAT (replacement PCB and diverter valve, Vaillant boiler, Flat 9, 3 Amhurst Road). This is above your £300 limit. Also confirm whether you want Capital Boiler Fix or HeatRight Ltd (your preferred boiler contractor).
> 
> Options: Approve £640 inc VAT with Capital Boiler Fix (recommended: hot water is off and the quote is valid 14 days); Ask HeatRight Ltd to quote instead (will add delay while hot water is off); Decline and handle another way

**A3 · send_message → Ben Hartley (landlord) via phone_call, +447700900201** (verified)

> Hi Ben, it's the lettings team about Flat 9, 3 Amhurst Road. Priya has had no hot water since 9 October and the heating is intermittent. Capital Boiler Fix attended today and found a faulty PCB board; they need to replace the board and diverter valve. Their quote is £640 including VAT. That is above your £300 limit, so we need your decision before any parts are ordered. Can you reply yes or no to approve £640, and tell us whether you are happy with Capital Boiler Fix or would prefer HeatRight to quote?

**A4 · send_message → Kieran Doyle, Capital Boiler Fix (contractor) via email, office@capitalboilerfix.example** (verified)

> Hi Kieran, thanks for attending Flat 9, 3 Amhurst Road today and for quote CBF-2291 (£640 inc VAT). The amount is above the landlord's approval limit, so we have asked him for a decision. Please do not order parts yet. We will confirm as soon as he replies. Thanks, lettings team.

**A5 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, thanks for letting Capital Boiler Fix in today. They found a faulty board in the boiler and have sent a quote for the repair. The cost is above the landlord's usual limit, so we have asked Ben to approve it. We will let you know as soon as he replies. We cannot promise a date until the repair is approved. If you smell gas, turn off the gas at the meter, leave the property and call the National Gas Emergency line on 0800 111 999. If you have no heating in cold weather, or anyone in the home becomes unwell, please contact us straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not approved: £640 inc VAT is above the £300 inc VAT limit in the CRM and the 2019 landlord email. The 2023 'sort emergencies without asking' email does not cover this. Hot water is off, but the tenant is not vulnerable and the case is urgent, not an emergency.
- No contractor is assigned, and no parts are to be ordered until the landlord decides.
- The landlord's phone call has not been made by me. Message A3 was recorded on the phone_call channel as a call script; the phone call itself still needs doing.
- The fault cause and the Monday start are Kieran's claims, not verified facts.

## Remaining work
- Ben Hartley to decide on the £640 quote and the contractor choice (owner: landlord). Phone him on Monday 2026-10-12 if no reply.
- If approved, assign Capital Boiler Fix or HeatRight, record the decision with his exact words, and book the visit.
- If declined or HeatRight is chosen, ask HeatRight for a quote and tell Kieran and Priya.
- Review R-4815 on 2026-10-12.

## Missing or unavailable information
- Landlord's decision on the £640 quote
- Whether the landlord wants Capital Boiler Fix or HeatRight Ltd
- The fault and parts claim has not been checked by a second contractor

## Conflicts between sources
- The quote email cites job R-4815 and says the work is booked for Monday, while the ticket shows assigned contractor C-19 (Capital Boiler Fix). The contractor is consistent, but no visit was booked by the landlord.
- The landlord's CRM notes say to use HeatRight for boilers if possible, but the attending contractor is Capital Boiler Fix. I did not assume HeatRight is preferred over the quote. I asked the landlord to decide.
- The 2023 emergency-approval email does not cover this case: the tenant is not vulnerable and this is not a gas or no-heat emergency.

## Answers to the case questions
**1. 1. Can you approve this quote? Why or why not?**

No. The quote is £640 inc VAT, and the landlord's limit is £300 inc VAT (CRM and his 2019 email). He asked to be called before anything over £300. The 2023 email allowing emergencies without asking does not apply, because the tenant is not vulnerable and the no-hot-water fault is urgent, not an emergency. The arithmetic on the quote is consistent (£533.33 + £106.67 VAT = £640).

**2. 2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord), by phone on +447700900201 (call-script message A3 recorded, call still to be made) and approval request APR-102: approve or decline the £640 inc VAT quote CBF-2291, and say whether he wants Capital Boiler Fix or HeatRight Ltd. Kieran Doyle (Capital Boiler Fix): told not to order parts until the landlord decides. Priya Shah (tenant): told the quote is with the landlord and no date is promised.

**3. 3. Is there anything the tenant needs in the meantime?**

Yes. Priya has been told the status, given no promised date, and given gas safety advice: if she smells gas, turn the gas off at the meter, leave, and call 0800 111 999. She should also contact us straight away if she has no heating in cold weather or anyone becomes unwell.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix (Gas Safe 558812)","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Div… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"ticket_ref":"R-4815","landlord":"Benjamin (Ben) Hartley","decision_needed":"Approve Capital Boiler Fix quote CBF-2291 for £640 inc VAT (re… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"phone_call","contact":"+447700900201","body":"Hi Ben, it's the lettin… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kieran Doyle, Capital Boiler Fix","recipient_role":"contractor","channel":"email","contact":"office@capitalboilerfix.exam… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Landlord approval needed for £640 inc VAT quote CBF-2291 (above £300 limit… | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |

## Failed or unverified actions
_None._
