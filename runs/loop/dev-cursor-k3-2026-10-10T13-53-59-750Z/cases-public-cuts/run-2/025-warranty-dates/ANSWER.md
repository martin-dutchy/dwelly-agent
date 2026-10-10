# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord only approved a charge-free warranty visit; provider now says out of warranty and gave conflicting visit dates. I recorded the conditional decision, asked the landlord for approval to diagnose and quote, asked the provider to confirm date and warranty, updated the tenant, and set a follow-up.

## Where the case stands
Provider (Harbour Services) assigned, ticket in mp_time, on hold waiting for provider. Visit date unconfirmed (22/05 vs 21/06). Landlord approval covers charge-free warranty service only; provider says out of warranty. Waiting on provider (date, warranty evidence) and landlord (chargeable diagnosis/quote decision).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour Services may diagnose and quote now the oven is reportedly out of warranty, reply by 24 May | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to confirm visit date (22 May 2:30pm vs 21 June), warranty/install date, and not to start chargeable work | Clara, Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant visit is not yet confirmed, warranty being checked, next update by 24 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up with provider 22 May and landlord by 24 May | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say (by email, not yet verified by us) that the oven is no longer under warranty. You only approved a charge-free warranty visit. Do you approve Harbour Services attending for a diagnosis and quoting for any repair or replacement, with any quote coming back to you for approval before work starts? Please note our earlier email gave the replacement as March 2025, which was a mistake; we are confirming the actual date and warranty terms with Harbour Services. Your records mention Keystone Works, ours show Harbour Services. Please reply by 24 May 2024.
> 
> Options: Yes: Harbour Services attend to diagnose and quote; quote comes to you for approval (recommended); No: you arrange your own contractor; Hold until warranty status is confirmed in writing

**A3 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is tomorrow, 21st June, but your call with the tenant set it for tomorrow 22 May 2024 at 2:30pm. Which date and time is correct?
> - Please confirm in writing the oven installation date and why it is no longer under warranty (our records are unclear on the date).
> - Please do not start any chargeable work: send a quote with photos and we will get landlord approval first.
> 
> Why: Conflicting visit dates and warranty status; landlord only approved charge-free warranty work.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file (reply to event 012 thread)** (verified)

> Dear Leo, thanks for your patience. Harbour Services have spoken to you about visiting, but their emails give two different dates (22 May at 2:30pm from the call, and 21 June in writing). We have asked them to confirm which is right, so please don't treat the visit as booked until we confirm. Harbour Services have also said the oven may not be under warranty, so we are checking with your landlord what happens next; any repair cost needs their approval first. We will update you by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit: the date is unconfirmed.
- Warranty status is the provider's unverified claim.
- Nothing approves chargeable work or spend.

## Remaining work
- Provider confirms visit date and warranty evidence (agency, 22 May)
- Landlord decides on chargeable diagnosis/quote or own contractor (by 24 May)
- Visit, result, quote/invoice and closure

## Missing or unavailable information
- Confirmed visit date
- Actual install date and installer (Keystone Works vs Harbour Services)
- Warranty terms/evidence
- Landlord spend limit (none on file)
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Installer: landlord says Keystone Works, agency note says Harbour Services; trusted agency note pending confirmation.
- Install date March 2025 in event 014 is impossible; tenant says last year.
- Visit date 22/05 (call event 018) vs 21/06 (events 019/020, which also say tomorrow).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit date unconfirmed (22/05 by call vs 21/06 in emails), warranty reportedly void, landlord approval covers only warranty work. Outstanding: date confirmation, warranty evidence, landlord decision on chargeable work.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email) to Felix; information request (email) to Harbour Services; update (email) to tenant Leo Bennett.

**3. Does anything need a human decision, and why?**

Not yet. The landlord is the decision-maker and has been asked; no escalation needed unless they stay silent past the chase date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say (by email, not yet verified by us) that th… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file (reply to event 012 thread)","ti… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord names Keystone Works as installer, agency note says Harbour Services; event 0… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-22","party":"Harbour Services","purpose":"Confirm visit date and warranty evidence;… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
