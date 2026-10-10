# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says the oven is out of warranty, and the landlord only approved a charge-free warranty service. I recorded that as conditional, asked the landlord about paid work, asked the provider to confirm the conflicting visit date and to quote only, and updated the tenant. The ticket is on hold to 23 May.

## Where the case stands
Provider assigned (Harbour Services), ticket held. Warranty route ruled out by provider. Landlord approval covers warranty (charge-free) work only; paid repair approval requested. Visit date unconfirmed (22 May vs 21 June).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to proceed with a paid inspect-and-quote or use their own contractor, now warranty is ruled out | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask Harbour Services to confirm the correct visit date, the oven replacement date/warranty basis, and to inspect and quote only | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is not yet confirmed and the warranty route has fallen through | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 2024-05-23 for landlord decision and provider date confirmation | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty. Do you want us to have them attend and quote for a paid repair, or will you arrange your own contractor? Nothing will be spent without your approval.
> 
> Options: Our contractor Harbour Services attends and quotes; we come back to you with the quote before any work; You arrange your own contractor

**A3 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June' but your call with the tenant set it for 22 May at 2:30pm. Which date is correct?
> - Please confirm the date the oven was replaced and the basis for it being out of warranty.
> - Please attend only to inspect and quote. Do not start any chargeable work until we confirm landlord approval.
> 
> Why: Visit date conflicts and no landlord approval for paid work yet.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for your patience. Harbour Services have told us they plan to visit you about the oven, but their messages give two different dates (22 May at 2:30pm and 21 June), so please treat the visit as not yet confirmed. We are checking the date with them now and will confirm. They have also said the oven is no longer under warranty, so we are asking your landlord how they would like to proceed with any repair. We will update you as soon as we hear back.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked by us; the date is unconfirmed
- The landlord has not approved paid work; the warranty request does not authorise spend
- Provider's no-warranty statement is not yet verified with a document

## Remaining work
- Landlord decision on paid repair or own contractor (agency, chase after 3 days)
- Provider to confirm visit date and warranty details (agency)
- Quote loop if needed; invoice and close afterwards

## Missing or unavailable information
- Correct visit date
- Actual oven replacement date and warranty terms
- Which contractor replaced it (Keystone Works per landlord vs Harbour Services per notes)
- Attachments unavailable at events 003 and 013

## Conflicts between sources
- Visit date: 22/05/2024 2:30pm (call, event 018) vs 21/06 (emails 019/020, both say 'tomorrow'); unresolved, asked provider
- Replacement contractor: Keystone Works (landlord) vs Harbour Services (notes); replacement date 'last year' vs 'March 2025' in event 014, which is after today
- System says landlord approval confirmed (event 009) but the landlord's words only cover a warranty service

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, ticket on hold. Warranty route has failed per provider. Landlord approval for paid work and a confirmed visit date are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email (A2); date and warranty confirmation request to Harbour Services by email (A3); tenant update by email (A4).

**3. Does anything need a human decision, and why?**

Not at present. The landlord, not a human at the agency, must decide on paid repair. Escalate only if the landlord stays silent after the chase cadence.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"Flat 2, 176 Lantern Quay","decision":"conditional","conditions":"Authorises contacting the previous oven contractor for a cha… | 1 | ❌ failed | Ticket Flat 2, 176 Lantern Quay not found on read-back |
| A2 | `request_landlord_approval` | {"landlord":"Felix","decision_needed":"Harbour Services say the oven is no longer under warranty. Do you want us to have them attend and quo… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Authorises contacting the previous oven contractor for a charg… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Warranty ruled out by provider. Awaiting landlord decision… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: First record_landlord_decision used the address instead of the ticket ref; retried with NBL-025-warranty-dates as A5, which verified.
