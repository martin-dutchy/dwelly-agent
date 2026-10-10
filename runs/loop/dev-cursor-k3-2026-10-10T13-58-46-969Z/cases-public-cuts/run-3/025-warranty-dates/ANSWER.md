# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair with conflicting visit dates and warranty information. I asked the provider to confirm the date and warranty facts, asked the landlord whether to proceed at cost, told the tenant the visit is unconfirmed, and put the job on hold to 23 May.

## Where the case stands
Provider assigned (stage mp_time), visit NOT booked: date conflicting. Provider says oven out of warranty. Landlord asked whether to proceed at cost. Held, review 2024-05-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour Services may diagnose/quote now warranty is reported lapsed, or arrange own contractor; reply by 24 May | Felix, landlord | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour Services to confirm the actual visit date/time, warranty dates and who fitted the oven; quote before chargeable work | Harbour Services, contractor | email | A1 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant visit is unconfirmed pending provider date, next update by 23 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold until 23 May for landlord and provider replies | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your updates. Two points please: 1) Your emails say the visit is "tomorrow, 21st June", but they were sent on 21 May, and the call with the tenant suggests tomorrow 22 May at 2:30pm. Please confirm the exact date and time. 2) You say the oven is no longer under warranty. Please tell us the install date and warranty end date you hold, and who fitted the oven (the landlord mentions Keystone Works; our note says Harbour Services). Please attend only to diagnose and send us a quote with photos before any chargeable work; we need landlord approval first.

**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, which we are checking, including the install date and who fitted it: you mentioned Keystone Works). Do you approve their attending to diagnose and quote, with any chargeable work coming back to you for approval first, or would you prefer to arrange your own contractor? Please reply by 24 May.
> 
> Options: Yes, Harbour Services may attend to diagnose and quote; no work until you approve the quote; I will arrange my own contractor; Pursue the warranty with Keystone Works first

**A3 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Hello Leo, Harbour Services have been in touch about your oven. Their emails give conflicting dates (22 May and 21 June), so please treat the visit as not yet confirmed until we confirm the date with them; we will message you as soon as we have it. Any repair cost still needs the landlord's approval, which we are asking for. You will next hear from us by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- Landlord's message asked for a warranty service; it is not approval for chargeable work and no decision was recorded.
- Warranty status is the provider's claim, not verified.

## Remaining work
- Provider to confirm visit date and warranty details
- Landlord decision on chargeable repair/own contractor
- Quote, approval, visit, result, invoice, close

## Missing or unavailable information
- Actual visit date (22 May vs 21 June)
- Oven install date (March 2025 in note is after today's date) and who fitted it (Keystone Works vs Harbour Services)
- Landlord spend limit not on file
- Attachments unavailable

## Conflicts between sources
- Visit date: 22/05 (call, event 018) vs 21 June (emails 019/020) described as 'tomorrow'.
- Oven fitter: Keystone Works's contractor (landlord) vs Harbour Services (note); install 'last year' vs March 2025 in event 014.
- System says landlord approval confirmed, but the landlord only asked for a warranty service.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Harbour Services assigned; visit date unconfirmed (22 May vs 21 June); provider says no warranty; landlord has not approved chargeable work; contractor identity and install date conflict.

**2. What is the next action, who is it for, and through which channel?**

Emails to Harbour Services (confirm date/warranty), landlord (approval question) and tenant (status), then hold to 23 May.

**3. Does anything need a human decision, and why?**

No human escalation; the decision on chargeable work belongs to the landlord, who has been asked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","body":"H… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Felix","decision_needed":"Harbour Services say the oven is no longer under warranty (their claim, which we are checking, includ… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","body":"Hello Leo, Harbour Serv… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"Flat 2, 176 Lantern Quay","reason":"Waiting for Landlord","comment":"Awaiting provider confirmation of visit date (22 May vs … | 1 | ❌ failed | Ticket Flat 2, 176 Lantern Quay not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting provider confirmation of visit date (22 May vs 21… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A4: First hold used the address as ref; retried with correct ref NBL-025-warranty-dates (A5).
