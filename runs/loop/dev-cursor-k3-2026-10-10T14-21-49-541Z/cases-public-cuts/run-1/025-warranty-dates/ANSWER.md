# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair with provider assigned. Provider emails conflict on the visit date (22 May vs 21 June) and claim the oven is out of warranty without evidence. I asked the provider for the confirmed date and warranty details, updated the landlord and tenant, recorded the conditional landlord decision and kept the hold.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold (Waiting for Provider, review 22 May). Visit date unconfirmed; warranty status unevidenced; landlord approval covers only a charge-free warranty service.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm the true visit date and send install date and warranty terms; diagnose and quote only | Clara, Harbour Services, contractor | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell landlord of the unverified out-of-warranty claim, conflicts, and ask how to proceed if out of warranty | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is unconfirmed, ask if tomorrow suits, next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until provider replies; review 22 May | Harbour Services | internal | A8 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Which date is the visit: tomorrow 22 May 2024 at 2:30pm (as discussed on your call with the tenant) or 21 June (as in your emails)? Please confirm the exact date and time.
> - You say the oven is no longer under warranty: please send the purchase/install date and the warranty terms (length and what is covered). Manufacturer warranties often run longer than 12 months.
> - Please attend only to diagnose and send a quote; do not start chargeable work until we confirm landlord approval.
> 
> Why: Visit date conflicts between your call and emails, and the warranty claim needs evidence before the landlord is told it is out of warranty.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty. Please confirm whether you want us to proceed with a quote if it is genuinely out of warranty.
> 
> Options: Wait for Harbour Services' install date and warranty terms, then decide (recommended); Approve a diagnosis and quote from Harbour Services, to come back to you before any work; Arrange your own contractor
> 
> Update: That is the provider's claim, not yet checked: warranties often last longer than 12 months, so we have asked for the install date and terms. Our records also conflict on the fitter (you mention Keystone Works; our notes say Harbour Services) and on the install date (an earlier message said March 2025, which cannot be right; the tenant says last year). Please confirm who fitted it and when, if you know. The visit date is unconfirmed (22 May 2:30pm per call vs 21 June per emails); we are confirming with the provider. No chargeable work will happen without your approval. We will update you by 23 May.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Hi Leo, thanks for your patience. Harbour Services spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails to us say 21 June, so we are asking them to confirm the right date. Please treat the time as not yet confirmed; we will let you know once they confirm. As the oven is out of use, is tomorrow afternoon OK for you if it is confirmed? We can ask for a sooner slot if not. We are also checking whether the oven is still under warranty. You will hear from us by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed
- The out-of-warranty claim is not verified and not accepted
- No spend approved; no quote exists
- Landlord decision recorded does not authorise chargeable work

## Remaining work
- Provider to confirm visit date and warranty evidence (agency, review 22 May)
- Landlord to answer approval request and confirm fitter/install date
- Record visit result after attendance

## Missing or unavailable information
- Confirmed visit date
- Oven install/purchase date and warranty terms
- Which firm fitted the oven (Keystone Works vs Harbour Services)

## Conflicts between sources
- Visit date 22/05 (call, event 018) vs 21/06 (emails 019/020); neither booked
- Fitter Keystone Works (landlord) vs Harbour Services (notes)
- Install March 2025 (event 014, impossible) vs last year per tenant
- Warranty: landlord says should be covered; provider says not, no evidence

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned and on hold; visit date unconfirmed (22 May 2:30pm per call vs 21 June per emails); warranty status is only the provider's unevidenced claim; landlord approval covers charge-free service only.

**2. What is the next action, who is it for, and through which channel?**

Email Harbour Services to confirm the date and supply install date and warranty terms; email landlord with the claim and conflicts; email tenant that the date is unconfirmed.

**3. Does anything need a human decision, and why?**

No escalation. The landlord decides on any chargeable work if the oven is confirmed out of warranty.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"R-025","decision":"conditional","conditions":"Contact the contractor who fitted the oven for a charge-free warranty service. … | 1 | ❌ failed | Ticket R-025 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"R-025","decision_needed":"Harbour Services say the oven is no longer under warranty. Please confirm whethe… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","body":"Hi Leo, thanks for your… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"R-025","reason":"Waiting for Provider","comment":"Awaiting Harbour Services: confirmed visit date (22 May 2:30pm per call vs … | 1 | ❌ failed | Ticket R-025 not found on read-back |
| A6 | `add_note` | {"entity":"R-025","note":"Conflicts: visit 22/05 2:30pm (event 018 call) vs 21/06 (events 019/020); fitter Keystone Works (landlord, event 0… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A7 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Contact the contractor who fitted the oven for a charge-free w… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A8 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services: confirmed visit date (22 May 2:… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: Used wrong ticket ref; retried with NBL-025-warranty-dates as A7
- A5: Same wrong ref; retried as A8
