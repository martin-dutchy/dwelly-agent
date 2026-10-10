# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair with provider assigned, but visit date and warranty facts conflict. I asked the provider to clarify, updated landlord (asking for inspect/quote decision) and tenant, and set a follow-up for 23 May. No human needed yet.

## Where the case stands
Provider (Harbour Services) assigned; visit not booked because the date conflicts (22 May 2:30pm by call vs "21 June" in emails). Provider says oven out of warranty. Landlord approved only a charge-free warranty service, not paid work. Waiting on provider and landlord, review 2024-05-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the visit date, fitting date and warranty position, and to quote before any chargeable work | Clara, Harbour Services (contractor) | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell landlord warranty is reportedly void, correct the earlier date error, and ask whether Harbour should inspect and quote or he will use his own contractor | Felix, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is being confirmed and when they will next hear | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Follow up on provider date confirmation and landlord answer | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June', but your call with the tenant booked tomorrow, 22 May 2024 at 2:30pm. Which date is correct?
> - Please confirm the date Harbour Services fitted the oven and why it is no longer under warranty (the landlord mentions Keystone Works, so please confirm it was you).
> - Please do not carry out any chargeable work: if repair is needed, send a quote and photos for landlord approval first.
> 
> Why: Visit date conflicts and warranty position must be confirmed before booking or any spend.

**A2 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Good afternoon Felix, an update on the oven. Harbour Services say the oven is no longer under warranty (their claim, which we are asking them to confirm). Please also disregard the "March 2025" date in my earlier email – that was an error and we are checking the fitting date with them. Your note named Keystone Works, whereas our records show Harbour Services fitted it. Harbour Services have a visit pencilled in for the tenant, date being confirmed. Any repair cost would come to you as a quote for approval first; nothing chargeable will be done without your yes. Could you confirm: are you happy for Harbour Services to inspect and quote, or would you prefer your own contractor? We will check back with you in 2 working days.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services tell us they have spoken to you about a visit tomorrow (22 May) at 2:30pm, but their emails to us give a different date, so we are confirming it with them and will let you know as soon as it is settled. Please keep the oven switched off meanwhile. Any repair cost needs the landlord's approval first. You'll hear from us again by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the appointment is unconfirmed.
- Warranty status is the provider's claim, not verified.
- No spend is approved; landlord's reply only requested a charge-free warranty service.

## Remaining work
- Provider to confirm date and warranty details
- Landlord to decide on inspection/quote or own contractor
- Record visit once confirmed; quote loop if repair needed

## Missing or unavailable information
- Confirmed visit date
- Who installed the oven and when
- Warranty evidence
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Installer: Keystone Works (landlord) vs Harbour Services (agency note)
- Fitting date: March 2025 in agency email vs 'last year' per tenant
- Visit: 22 May 2:30pm (call, event 018) vs 21 June (emails 019/020); trusted neither until provider confirms

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned; visit date unconfirmed (22 May vs 21 June); provider says out of warranty; landlord decision on paid inspection/quote outstanding.

**2. What is the next action, who is it for, and through which channel?**

Provider asked to confirm date and warranty (email); landlord asked to decide on inspect/quote (email); tenant told date is being confirmed (email).

**3. Does anything need a human decision, and why?**

No. Routine; the spend decision sits with the landlord, and a human is needed only if the conflicts stay unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"025","body":"Good a… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"025"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"025","due_on":"2024-05-23","purpose":"Check provider's confirmed visit date, warranty answer and landlord reply"} | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"025","note":"Conflicts: landlord names Keystone Works vs note Harbour Services as installer; agency email said March 2025 (imposs… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
