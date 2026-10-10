# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says the oven is out of warranty, which undercuts the landlord's charge-free request, and the visit date conflicts between sources. I recorded the landlord's conditional approval, asked the provider to confirm the date and warranty details, asked the landlord whether to proceed to a chargeable quote, and updated the tenant.

## Where the case stands
Stage mp_time, provider (Harbour Services) assigned, on hold waiting for provider. Visit date unconfirmed (22 May 2:30pm per call vs "21 June" in emails). Provider says oven out of warranty; landlord approved only a charge-free warranty service. Awaiting provider's date confirmation and landlord's decision on a chargeable diagnosis/quote.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm exact visit date/time, send replacement and warranty dates, and quote before any chargeable work | Harbour Services, contractor | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether Harbour may diagnose and quote now the oven is out of warranty, reply by 24 May | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the visit time is unconfirmed, warranty is being checked, next update by 24 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Follow-up on 22 May to check provider confirmation and landlord reply | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your emails. Two things please. 1) Your emails say the visit is "tomorrow, 21st June", but today is 21 May and your call with the tenant set it for tomorrow (22 May) at 2:30pm. Please confirm the exact date and time. 2) You say the oven is no longer under warranty. Please send the replacement date and the warranty end date you hold. The landlord only approved a charge-free warranty service, so please do not carry out chargeable work. If a repair is needed, send a quote with photos and wait for our approval. Please attend only for diagnosis and a quote.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty, so a repair would be chargeable. May they attend to diagnose and quote, with any quote sent to you for approval before work starts?
> 
> Options: Yes: Harbour Services attend to diagnose and quote only; quote comes to you for approval; No: you arrange your own contractor; No: pause while you check the warranty paperwork yourself
> 
> Update: Correction to my earlier email: it gave the replacement as March 2025, which can't be right, and the tenant says last year. Your message named Keystone Works but our record shows Harbour Services replaced it. We are checking the replacement date and warranty end date with Harbour Services. Visit date is not yet confirmed: the provider's call said 22 May 2:30pm but their emails say 21 June; I have asked them to confirm. Please reply by 24 May. Nothing chargeable will be started without your approval.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Leo, Harbour Services told us they spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails give a different date (21 June). We have asked them to confirm the right date, so please treat the time as not yet confirmed until you hear from us. They also say the oven is no longer under warranty, so we are checking with your landlord before any repair is agreed. We will update you by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- Warranty status is the provider's claim, not verified.
- Landlord approval covers only a charge-free service; no spend is approved.

## Remaining work
- Provider to confirm date and warranty details (agency chases 22 May)
- Landlord to decide on chargeable diagnosis/quote or own contractor
- Quote, if any, goes to landlord before work

## Missing or unavailable information
- Actual visit date
- Replacement date and warranty end date
- Landlord's decision on chargeable work
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: 22/05 2:30pm (call, event 018) vs 21 June (emails 019/020); trusted neither until provider confirms
- Replacement date: 'last year' vs March 2025 (event 014, impossible given today is May 2024)
- Landlord named Keystone Works; notes say Harbour Services replaced it
- Landlord says under warranty; provider says not

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned and on hold. Visit date unconfirmed and warranty status disputed. Outstanding: provider's date confirmation, warranty facts, and the landlord's decision on chargeable work.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services to confirm date and warranty details; email to the landlord requesting a decision; email to the tenant with status. All sent.

**3. Does anything need a human decision, and why?**

Not a human at the agency yet. The landlord must decide on chargeable work. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty, so a… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: visit date 22/05 2:30pm (call, event 018) vs \"tomorrow, 21st June\" (emails 019/020);… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-22","purpose":"Check provider confirmed visit date and warranty details; chase land… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
