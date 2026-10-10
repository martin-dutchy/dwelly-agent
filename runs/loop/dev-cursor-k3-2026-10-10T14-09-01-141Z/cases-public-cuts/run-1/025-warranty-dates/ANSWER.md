# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; landlord only approved a charge-free warranty service. Harbour Services says no warranty and gave conflicting visit dates. I recorded the conditional approval, asked the provider to clarify dates, updated the tenant, asked the landlord whether to proceed at cost, and kept the hold with a review date.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold (Waiting for Provider, review 22 May). Visit not confirmed: date conflict. Provider says oven out of warranty; landlord approval only covered charge-free service; landlord asked whether to proceed at cost.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm exact visit date/time and the replacement/warranty dates; no chargeable work without quote and approval | Harbour Services, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant visit is unconfirmed pending provider confirmation; next update by 23 May | Leo Bennett, tenant | email | A3 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Ask whether to proceed with inspection/quote at cost now warranty is denied; reply by 24 May | Felix, landlord | email | A4 ✅ |
| 4 | WAIT | Hold until provider confirms date and warranty position; review 22 May | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your emails. Two things please. 1) Your emails say the visit is "tomorrow, 21st June", but tomorrow is 22 May, and your call with the tenant set 22 May at 2:30pm. Please confirm the exact date and time. 2) You say the oven is no longer under warranty. Please confirm the date you hold for the oven replacement (our records say last year; one note says March 2025) and what the warranty cover ended on. Please do not carry out chargeable work: if the oven needs a repair, send a quote with photos and wait for our approval first. Thank you.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Leo, Harbour Services have told us they spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails give a different date (21 June). I'm checking the right date with them, so please treat the visit as not yet confirmed; I'll let you know once they confirm. If they find the oven needs a paid repair, we'll need the landlord's approval first. You'll hear from us again by 23 May at the latest.

**A4 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty. Do you want them to inspect and quote for a chargeable repair (we'll bring the quote back to you before any work)?
> 
> Options: Yes, let Harbour Services inspect and quote; no work until you approve the quote; No, you will arrange your own contractor; Query the warranty first: do you have the purchase date/paperwork, and was it Harbour Services or Keystone Works who fitted it?
> 
> Update: Your note mentioned Keystone Works, but our record shows Harbour Services replaced the oven; we're confirming the date and warranty terms with them (my earlier email said March 2025, which looks wrong against 'last year'). A visit is not yet confirmed: the provider's date is 22 May 2:30pm by phone but 21 June in their emails; we've asked them to clarify. Please reply by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit; the date is unconfirmed.
- Warranty status is the provider's claim, not verified.
- Landlord approval covers charge-free work only; no spend approved.
- No human decision needed yet.

## Remaining work
- Harbour Services to confirm visit date and warranty/replacement date
- Landlord to decide on chargeable inspection/quote or own contractor
- Record visit once provider confirms; result, quote and invoice to follow

## Missing or unavailable information
- Actual visit date (22 May 14:30 vs 21 June)
- Oven replacement date and warranty terms
- Which contractor fitted the oven (Keystone Works vs Harbour Services)

## Conflicts between sources
- Visit date: 22 May 14:30 (call, event 018) vs 21 June (emails 019/020) described as 'tomorrow'.
- Oven replacement: 'last year' (tenant) vs March 2025 (event 014, a future date).
- Landlord names Keystone Works; record says Harbour Services replaced the oven.
- Warranty: landlord believes covered; provider says not.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit unconfirmed (22 May 2:30pm by call vs 21 June in emails). Provider says out of warranty. Landlord approval was charge-free only; the decision on chargeable work is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Harbour Services to confirm the date and warranty details; email tenant that the visit is unconfirmed; email landlord for a decision on proceeding at cost. All sent.

**3. Does anything need a human decision, and why?**

No. The landlord decides on spend; escalation only if no reply by the follow-up date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Charge-free warranty service only; no authority for any charge… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty. Do y… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services to confirm visit date (22 May 14… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
