# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says the oven is out of warranty and gave conflicting visit dates. I asked the provider to confirm the date and the warranty basis, asked the landlord to decide on chargeable work, and told the tenant the visit is unconfirmed. A follow-up is set for 24 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket at mp_time, on hold waiting for provider. Visit date unconfirmed (22 May 2:30pm by call vs 21 June by emails). Provider says oven not under warranty. Landlord's approval covered only a charge-free warranty service; a decision on chargeable work is pending.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the exact visit date/time, the fitting date and warranty basis, and to quote before any paid work | Clara, Harbour Services, contractor | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell Felix the oven is reported out of warranty and ask whether Harbour inspect and quote, or he arranges his own, by 24 May | Felix, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the visit date is unconfirmed and what is being checked, next update by 24 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Follow up on provider date/warranty evidence and landlord decision on 24 May | Harbour Services / Felix | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June', but 'tomorrow' is 22 May and your call with the tenant set 2:30pm on 22 May. Please confirm the exact date and time of the visit.
> - Please confirm in writing when you fitted the oven (our note says March 2025, which cannot be right) and the basis on which you say it is no longer under warranty.
> - Please attend only to diagnose and send a quote with photos before any chargeable repair; do not start paid work until we confirm landlord approval.
> 
> Why: Visit date conflicts between sources and warranty position needs evidence; landlord only approved a charge-free warranty service.

**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty. Do you want them to inspect and quote for a chargeable repair, or will you arrange your own contractor?
> 
> Options: Harbour Services inspect and send a quote for your approval (recommended); You arrange your own contractor; Ask Harbour Services to evidence the warranty position first
> 
> Update: Your request was for a charge-free warranty service. Harbour Services (not Keystone Works, who we have no record of on this job) told us by email on 21 May that the oven is not under warranty; we have asked them for the fitting date and the basis. Visit: they told the tenant 2:30pm on 22 May, but their emails say 21 June, so it is unconfirmed and we have asked them to confirm. No repair work starts without your approval of any quote. Please reply by 24 May. We will next update you on 24 May.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Leo, Harbour Services have spoken to you about a visit at 2:30pm tomorrow (22 May), but their emails to us give the date as 21 June. We are asking them to confirm the right date, so please don't treat it as definite yet; we'll tell you as soon as it's confirmed. They have also said the oven isn't under warranty, so we are checking with the landlord about the next step. We'll update you by 24 May. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked; set_visit not used because the provider's date is ambiguous.
- The warranty status is the provider's claim, not verified.
- No spend or repair approved; the landlord has not approved chargeable work.
- Nothing here establishes the cause of the oven fault.

## Remaining work
- Provider to confirm visit date and warranty evidence (agency, 24 May)
- Landlord to decide on chargeable inspection/quote or own contractor
- Book visit with set_visit once confirmed
- Record any quote and seek landlord approval; then result, invoice, close

## Missing or unavailable information
- Actual confirmed visit date
- Fitting date and warranty terms for the oven
- Whether Harbour or Keystone Works installed it
- Landlord spend limit (none on file)

## Conflicts between sources
- Landlord names Keystone Works as installer; record shows Harbour Services (trusted the record).
- Replacement date 'March 2025' is later than today and contradicts the tenant's 'last year'.
- Visit date: call says 22 May 2:30pm; emails say 'tomorrow, 21st June'.
- Landlord expected warranty; provider says out of warranty.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned and on hold. The visit date is unconfirmed (22 May vs 21 June). The provider says there is no warranty. The landlord only approved a charge-free warranty service, so a decision on chargeable work is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services to confirm the date and warranty evidence; email to the landlord asking for a decision; email to the tenant explaining the date is unconfirmed. All sent.

**3. Does anything need a human decision, and why?**

No escalation. The landlord decides on spend, and the provider's answers are being sought routinely. Escalate only if the landlord stays silent past the follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty. Do y… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord named Keystone Works as the oven installer; record says Harbour Services (tru… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-24","purpose":"Check provider's confirmed visit date and warranty evidence; chase l… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
