# Bathroom and kitchen maintenance: ANSWER

**Decision:** action_taken · **Severity:** urgent

Plumber attended 12 Sep and invoiced tap work, but the invoice names a different property, shows no amount and ignores the vent leak and damp. I recorded the landlord approval, held payment, asked the plumber for corrections and a report, and updated tenant and landlord.

## Where the case stands
NBL-003 at init stage in system. Landlord approved 4 Sep. Plumber attended 12 Sep; invoice received 14 Sep with wrong property address, no amount, taps only. Payment held. Vent leak and bedroom damp unaddressed; landlord's insurance/roof-history requests never actioned. Waiting on plumber, tenant and landlord; review 17 Sep.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask plumber to confirm property attended, reissue invoice with correct address and total, and report on vent/damp, by 17 Sep | Gareth Lune, plumber | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Ask tenant to confirm the taps are fixed, give interim safety advice, say vent/damp still open | Elian Voss, tenant | email | A6 ✅ |
| 3 | OTHER | Update landlord on visit, invoice hold, open vent/damp, and apologise for unactioned insurance/history requests | Owen Vale, landlord | email | A5 ✅ |
| 4 | WAIT | Review on 17 Sep for plumber reply and tenant feedback | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A4 · request_information → Gareth Lune (contractor) via email, existing thread (event 022 document / event 020)** (verified)

> - Your invoice NBL-003-INV-14 of 14 Sep shows a property address that does not match this job (Flat 4, 8-12 Juniper Mews, Vellumford, ZZ1 1ZZ). Please confirm which property you attended and reissue the invoice with the correct address and the total amount.
> - Please send a short visit report with photos: did you check the bathroom vent water ingress and the smaller bedroom ceiling/wall damp, and what did you find? Is the bathroom hot tap fully fixed?
> - Please confirm the date and time you attended.
> 
> Why: Invoice address mismatch and no amount; it covers taps only. Payment is on hold until resolved. Please reply by 17 Sep.

**A5 · send_message → Owen Vale (landlord) via email, agency landlord record** (verified)

> Hello Owen. Update on Flat 4, 8-12 Juniper Mews: the plumber attended on 12 September. His invoice (emailed 14 September) says he fitted a new kitchen mixer tap and new parts on the bathroom basin hot tap. However, it shows a different property address and no amount, so we have put payment on hold and asked him to correct it. It also says nothing about the bathroom vent leak or the bedroom damp, so we've asked for a report on those; they may still be open. Sorry, we also haven't yet progressed your requests on building insurance cover and the flat's roof-leak history. We'll start on those. If you have past roof-leak records or an insurer contact, please send them by 19 September. We'll update you by 17 September.

**A6 · send_message → Elian Voss (tenant) via email, existing thread (event 007 email)** (verified)

> Hello Elian. Thanks for letting the plumber in on Friday. His invoice says the kitchen tap was replaced and the bathroom hot tap was repaired. Could you tell us whether both taps now stop dripping and shut off properly? He hasn't yet told us anything about the bathroom vent leak or the bedroom damp, so we're asking him and treating those as still open. Meanwhile, please keep a bowl under the vent in rain, and keep electrics away from the leak. Tell us straight away if water reaches lights or sockets. New photos of the bedroom damp would help if it has changed. We'll update you by 17 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Invoice on file does not prove which property was attended or what it costs
- Tap work is unconfirmed by tenant; vent leak and bedroom damp are not shown as investigated or fixed
- Payment hold does not decide whether the invoice is valid
- No insurance claim or roof-history review has been made

## Remaining work
- Corrected invoice and visit report from plumber (agency/ops)
- Tenant confirmation of tap fix
- Roof/vent/damp investigation, likely a separate roof job needing landlord approval once scoped
- Insurance and flat history review requested by landlord
- Escalate to accounts (P2) if plumber's answer doesn't settle the invoice address

## Missing or unavailable information
- Invoice amount
- Property actually attended
- Findings on vent and bedroom damp
- Visit report and photos

## Conflicts between sources
- Invoice address differs from the job property; trusted the system record
- Plumber's 11 Sep 'job done today' vs later correction; 12 Sep visit confirmed by tenant call
- Plumber gave address as 8-10 Juniper Mews on call vs 8-12 on record

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Visit done 12 Sep; taps reportedly fixed per invoice but unconfirmed by tenant. Invoice has wrong address and no amount (payment held). Vent leak and bedroom damp uninvestigated; landlord's insurance and history requests outstanding.

**2. What is the next action, for whom, via which channel?**

Email to Gareth Lune for corrected invoice and report (by 17 Sep); emails to tenant and landlord with updates; follow-up 17 Sep.

**3. Does anything need a human decision?**

Not yet. Escalate to accounts if the plumber's reply doesn't settle the invoice mismatch; roof work will need landlord approval once scoped.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-003","decision":"approved","evidence_quote":"Yes, please proceed.","source":"event 004, email 04/09/2025"} | 1 | ✅ verified | Ticket NBL-003 read back after record_landlord_decision |
| A2 | `hold_payment` | {"payee":"Copper Finch Plumbing","reason":"Invoice NBL-003-INV-14 (14 Sep 2025) names a different property (28 Larkspur Quay, Brindlewick) f… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-003","due_on":"2025-09-17","party":"Copper Finch Plumbing","purpose":"Chase corrected invoice, visit report on vent/damp;… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A4 | `request_information` | {"recipient_name":"Gareth Lune","recipient_role":"contractor","channel":"email","contact":"existing thread (event 022 document / event 020)"… | 1 | ✅ verified | REQ-103 found in the request_information log |
| A5 | `send_message` | {"recipient_name":"Owen Vale","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-003","body"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Elian Voss","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
_None._
