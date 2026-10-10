# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked only for a free warranty service; the provider says the warranty has lapsed. I recorded the landlord's reply as conditional, asked the landlord how to proceed, asked the provider to confirm the conflicting visit dates and keep to diagnosis only, updated the tenant, and put the job on hold to 23 May.

## Where the case stands
Provider assigned (Harbour Services), on hold waiting for landlord. Landlord only authorised a charge-free warranty service; provider says the oven is out of warranty, so no paid work is approved. Visit date unconfirmed (22 May per call vs "21 June" in emails).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour Services may diagnose and quote now that the oven is reported out of warranty, or whether they will use their own contractor | Felix, landlord | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour Services to confirm the exact visit date/time and warranty/replacement dates, diagnosis only, quote before any repair | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is not yet confirmed and that we are checking costs with the landlord; next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 2024-05-23 for landlord reply and provider date confirmation | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet checked). Do you want them to attend and diagnose, with any repair quote coming back to you for approval before work starts, or would you prefer to arrange your own contractor?
> 
> Options: Yes: Harbour Services attend to diagnose and quote; no repair work without your written approval (recommended); You arrange your own contractor; Other instruction

**A3 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for the update. Two things please. 1) Your emails say the visit is "tomorrow, 21st June", but today is 21 May and the call notes suggest tomorrow 22 May at 2:30pm. Please confirm the exact date and time. 2) As the oven is out of warranty, the landlord has not yet approved paid work. Please treat tomorrow's visit as diagnosis only, and send us a quote (with photos) before any repair. We will confirm once the landlord replies. Please also confirm the date the oven was replaced and the warranty period, as our records are unclear.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Leo, Harbour Services tell us they have spoken to you about a visit, but their emails give conflicting dates (22 May vs 21 June), so we are confirming the exact date and time with them and will let you know. Please treat it as not yet confirmed. They say the oven is out of warranty, so we are checking with the landlord how to proceed on any repair costs. You'll hear from us again by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit was booked via set_visit: the date is only ambiguously stated by the provider.
- Nothing here confirms the oven is out of warranty; that is the provider's claim.
- No spend or paid work is approved.

## Remaining work
- Landlord to answer APR-101 (agency, review 2024-05-23)
- Provider to confirm visit date and warranty details (agency chasing)
- Quote to landlord if repair needed
- Result, invoice and closing checks

## Missing or unavailable information
- Confirmed visit date
- Actual oven replacement date and warranty terms
- Landlord's decision on paid work
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date 22/05 (call, event 018) vs 21/06 (emails 019/020); 'tomorrow' fits 22 May.
- Landlord named Keystone Works; records say Harbour Services replaced the oven.
- Replacement date March 2025 (event 014) is later than today and conflicts with 'last year'.
- System 'landlord approval confirmed' vs landlord's warranty-only request; trusted the landlord's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but visit date unconfirmed (22 May vs 21 June). Warranty route reportedly failed. Landlord decision on paid work outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email, plus an email to Harbour Services to confirm the date, and an email to the tenant.

**3. Does anything need a human decision, and why?**

No escalation. The landlord decides on paid work, and I have asked them. Escalate if there is no reply by the 23 May review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Approved only as a charge-free warranty service. Provider says… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","decision_needed":"Harbour Services say the oven is no longer under warranty (their claim, not yet checked). Do you want… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Warranty claim failed per provider; awaiting landlord deci… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A6 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord named Keystone Works, records say Harbour Services; replacement date March 20… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
