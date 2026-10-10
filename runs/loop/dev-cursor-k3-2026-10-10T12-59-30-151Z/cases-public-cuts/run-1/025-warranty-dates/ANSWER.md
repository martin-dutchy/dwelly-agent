# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating. Landlord only authorised a charge-free warranty service; provider says no longer under warranty and visit dates conflict. I recorded the conditional decision, asked landlord for approval for chargeable work, asked provider to confirm date and warranty basis, updated tenant, and held to 23 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold to 2024-05-23. Landlord's approval was only for a charge-free warranty visit; provider now says out of warranty, so landlord approval for chargeable work requested (APR-101). Visit date unconfirmed (22 May per call vs 21 June per emails); clarification requested from provider (REQ-102).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour Services may inspect/repair at his cost now the oven is reported out of warranty, and to confirm who fitted it and when | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to confirm the visit date (22 May vs 21 June), warranty basis, and to quote before chargeable work | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is not confirmed yet and warranty is being checked; next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold and follow up on 2024-05-23 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet checked with paperwork). Your request was for a charge-free service only. May Harbour Services inspect and repair it at your cost? They would send a quote before any work beyond the inspection. Note: we have 'March 2025' for the replacement in our earlier email, which cannot be right as the tenant says last year, and you named Keystone Works while Harbour Services say they fitted it. Please confirm who fitted it and when, if you have the invoice.
> 
> Options: Yes, Harbour Services may inspect and quote/repair at my cost (please give any spend limit); I will arrange my own contractor; Do not proceed; I will check the warranty paperwork first

**A3 · request_information → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> - Please confirm the exact visit date and time: your phone call with the tenant was for tomorrow (22 May 2024, 2:30pm) but your emails say 21 June. Which is correct?
> - What is the basis for the oven being out of warranty (install date and warranty term)? Please send the paperwork if you have it.
> - Please do not carry out any chargeable work: send a quote and photos first, as the landlord has only approved a charge-free warranty visit so far.
> 
> Why: Visit date conflicts and warranty status changes who pays.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file (event 012)** (verified)

> Dear Leo, thanks for your patience. Harbour Services say they spoke to you about a visit tomorrow at 2:30pm, but their emails give a different date (21 June), so we are confirming the right date with them and will let you know. Please treat it as not yet confirmed. They have also said the oven is no longer under warranty, so we are checking with the landlord about the repair. We will update you by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- The out-of-warranty claim is the provider's and is unverified.
- Landlord has not approved any chargeable spend.
- No contractor decision on who pays is made.

## Remaining work
- Landlord reply to APR-101 (agency, chase 23 May)
- Provider confirmation of visit date and warranty evidence (agency)
- Book visit via set_visit once provider confirms
- Quote loop if repair needed

## Missing or unavailable information
- Confirmed visit date
- Warranty/installation paperwork
- Landlord approval and any spend limit
- Landlord spend limit not on property record

## Conflicts between sources
- Visit date: 22 May 2024 2:30pm (call, event 018) vs 21 June (emails 019/020); treated as unconfirmed.
- Warranty: landlord says should be under warranty (event 006) vs provider says not (event 020); provider's claim unverified.
- Installer: landlord names Keystone Works, notes say Harbour Services.
- Replacement date: event 014 says March 2025, which is in the future; tenant says last year.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, on hold. Outstanding: landlord approval for chargeable work, confirmed visit date, warranty evidence.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email to Felix (A2); date/warranty clarification email to Harbour Services (A3); tenant update email (A4).

**3. Does anything need a human decision, and why?**

No human escalation; the decision on cost belongs to the landlord and is requested. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 012)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord approval for chargeable repair (warranty… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-23","purpose":"Chase landlord approval and provider visit date confirmation; update… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
