# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider reports the oven is out of warranty and gave conflicting visit dates. I asked the landlord to approve diagnosis and quote or choose his own contractor, asked the provider to confirm the date and warranty details, told the tenant the visit is unconfirmed, and held to 24 May.

## Where the case stands
Provider assigned, held (Waiting for Landlord, review 2024-05-24). Visit date unconfirmed: call says 22 May 2:30pm, provider emails say 21 June. Provider says oven out of warranty (their claim). Landlord approval only covered a charge-free warranty service.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether Harbour Services may attend to diagnose and quote now the oven is reported out of warranty, or whether he will use his own contractor; reply by 24 May | Felix, landlord | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask Harbour Services to confirm the visit date (22 May vs 21 June), give the replacement and warranty dates, and quote before any chargeable work | Harbour Services, provider | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the visit is not yet confirmed, warranty is being checked, next update by 24 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold until 24 May for landlord and provider replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim; we are asking them for the replacement date and basis). Your earlier approval covered a charge-free warranty service only. Do you approve Harbour Services attending to diagnose and quote, with any quote coming back to you for approval before work starts, or would you prefer your own contractor? Please reply by 24 May.
> 
> Options: Yes, Harbour Services may attend and quote; no work without my approval of the quote; I will arrange my own contractor; Ask Harbour Services to re-check the warranty first

**A2 · request_information → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June' but your call with the tenant set it for tomorrow 22 May at 2:30pm. Which date and time is correct?
> - What is the oven's replacement date and the warranty end date you checked? Our records conflict (landlord says Keystone Works, our notes say Harbour Services).
> - Please do not carry out chargeable work: send a quote with photos for landlord approval first.
> 
> Why: Visit date is inconsistent and cannot be booked until confirmed; warranty position needs evidence; landlord has only approved a charge-free service.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for your patience. Harbour Services say they spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails give a different date (21 June), so we are asking them to confirm which is right. Please don't treat the visit as booked until we confirm. They have also told us the oven may no longer be under warranty, so we are checking with your landlord about next steps. We will update you by 24 May at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit: date not confirmed consistently by provider
- Warranty status is the provider's claim, not verified
- Nothing approves any spend or quote

## Remaining work
- Provider to confirm date and warranty evidence
- Landlord to decide on chargeable route
- Record visit via set_visit once confirmed
- Quote approval if needed

## Missing or unavailable information
- Confirmed visit date
- Oven replacement date and warranty end date
- Who installed the oven (Keystone Works vs Harbour Services)
- Landlord spend limit not on file
- Referenced attachments unavailable

## Conflicts between sources
- Visit date: 22 May 2:30pm (call, event 018) vs 21 June (emails, events 019 and 020); treated as unconfirmed
- Installer: landlord says Keystone Works (event 006) vs Harbour Services (event 007)
- Replacement date: 'last year' (tenant) vs March 2025 (event 014, after today's date)
- Warranty: landlord believes covered; provider says not

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned and on hold. Outstanding: confirmed visit date, warranty evidence, and landlord approval for a chargeable route.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email; date and warranty query to Harbour Services by email; update to tenant by email.

**3. Does anything need a human decision, and why?**

No human escalation; the decision belongs to the landlord, and it has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `request_information` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Provider says oven out of warranty; waiting for landlord d… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
