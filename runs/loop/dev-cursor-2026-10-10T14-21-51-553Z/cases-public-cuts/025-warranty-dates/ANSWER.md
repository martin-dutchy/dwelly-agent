# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair with Harbour Services assigned. The provider's visit date conflicts and it claims the oven is out of warranty without evidence. I asked the provider for dates and terms, updated the landlord and tenant, recorded the conditional landlord decision and kept the hold with a 22 May review.

## Where the case stands
Provider (Harbour Services) assigned; visit NOT confirmed (22 May 2:30pm per call vs 21 June per emails). Warranty status unverified. On hold waiting for provider, review 2024-05-22.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services for the correct visit date, oven install date and warranty terms; warranty call-out at no charge, quote first if any charge | Clara, Harbour Services, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit is unconfirmed, ask if tomorrow is acceptable and when the oven was fitted | Leo Bennett, tenant | email | A4 ✅ |
| 3 | CHASE_LANDLORD | Update landlord: out-of-warranty claim is the provider's and being checked; correct the March 2025 error; no charge without approval | Felix, landlord | email | A3 ✅ |
| 4 | WAIT | Hold for provider reply, review 22 May | Harbour Services | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June', but your call with the tenant set it for tomorrow 22 May 2024 at 2:30pm. Which date is correct?
> - Please send the purchase/install date of the oven and the manufacturer's warranty terms you checked, as warranties often run longer than 12 months. Our notes show the oven was fitted last year but one note says March 2025, which cannot be right.
> - Please attend as a warranty call-out at no charge to the landlord if cover applies. If any charge would apply, send a quote first and do not proceed without our approval.
> 
> Why: Warranty status is unverified and the visit date conflicts between your call and emails.

**A3 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Dear Felix, an update on the oven at Flat 2, 176 Lantern Quay. Harbour Services say the oven is no longer under warranty. That is their claim and we are checking it: manufacturer warranties often run longer than 12 months, so I have asked them for the install date and the warranty terms. I also need to correct my earlier email, which said the oven was replaced in March 2025. That date cannot be right, so we are confirming the real one. Your email named Keystone Works as the fitter, while our notes say Harbour Services; please tell us if that is wrong. A visit is pencilled for 22 May at 2:30pm but the provider's emails give a different date, so it is not confirmed yet. No chargeable work will go ahead without your approval first. We will update you by 22 May. Kind regards

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Dear Leo, thanks for your patience. Harbour Services phoned you about a visit tomorrow (22 May) at 2:30pm, but their emails to us give a different date, so we are confirming it with them now. Please don't treat the time as definite until we confirm. Is tomorrow afternoon OK for you, as you have no oven? We can ask for an earlier slot if not. Could you also tell us roughly when the oven was fitted? We will update you by 22 May. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed
- The provider's out-of-warranty statement is not accepted as fact
- Landlord has not approved any chargeable work

## Remaining work
- Harbour Services to confirm the visit date, install date and warranty terms (agency ops, review 22 May)
- If a charge applies, get a quote and landlord approval
- Record the visit result after attendance

## Missing or unavailable information
- Oven install/purchase date and warranty terms
- Confirmed visit date
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: 22/05/2024 2:30pm (call, event 018) vs 'tomorrow, 21st June' (events 019, 020)
- Oven fitted 'last year' (tenant) vs March 2025 (event 014, a future date)
- Fitter named as Keystone Works (landlord, event 006) vs Harbour Services (notes)
- Landlord expects warranty cover vs provider says out of warranty

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, landlord approved a charge-free warranty route. The visit date is unconfirmed (22 May 2:30pm per call vs 21 June per emails) and warranty status is unverified (the provider says out of warranty).

**2. What is the next action, who is it for, and through which channel?**

Email Harbour Services for the visit date, install date and warranty terms; updates sent by email to the landlord and tenant; hold review 22 May.

**3. Does anything need a human decision, and why?**

No. Nothing needs a human yet. If the oven is confirmed out of warranty, a quote goes to the landlord for approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"025","decision":"conditional","conditions":"Contact the contractor who fitted the oven for a charge-free warranty service. An… | 1 | ❌ failed | Ticket 025 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"025","body":"Dear F… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"025","body":"Dear… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"025","reason":"Waiting for Provider","comment":"Awaiting provider: correct visit date (22 May 2:30pm per call vs 21 June per … | 1 | ❌ failed | Ticket 025 not found on read-back |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Contact the contractor who fitted the oven for a charge-free w… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting provider: correct visit date (22 May 2:30pm per c… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: Used wrong ticket ref '025'; retried with NBL-025-warranty-dates, verified as A6
- A5: Same wrong ref; retried, verified as A7
