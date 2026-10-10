# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says the oven is out of warranty, while the landlord only authorised a charge-free service. I recorded the approval as conditional, asked the provider to confirm the conflicting visit date and to quote before any paid work, asked the landlord how to proceed, updated the tenant, and held to 23 May.

## Where the case stands
Provider assigned (Harbour Services), ticket on hold to 2024-05-23. Visit date unconfirmed (22 May per call vs 21 June per emails). Warranty denied by provider; landlord approval was only for a charge-free service. Waiting on provider (date) and landlord (proceed/quote route).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Ask Harbour Services to confirm the exact visit date/time (22 May vs 21 June) and to diagnose and quote only, no paid work before approval | Harbour Services, contractor | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell landlord warranty is reported void; ask whether Harbour Services may diagnose and quote, and confirm who fitted the oven and when | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant date is being confirmed, paid work needs landlord approval, next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 2024-05-23 for provider date confirmation and landlord reply | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Thanks for your updates. Two points: 1) Your emails say the visit is "tomorrow, 21st June", but the call with the tenant was for tomorrow, 22 May 2024 at 2:30pm. Please confirm the exact date and time. 2) You say the oven is no longer under warranty. The landlord only asked for a charge-free service, so please attend to diagnose only and send us a quote (with photos and the oven's age/install date) before any chargeable work. Please do not proceed with paid work until we confirm landlord approval.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services says the oven is no longer under warranty (their claim, not yet checked). Our earlier note said they fitted it in March 2025, which can't be right as it is now May 2024, and you mentioned Keystone Works, so please could you confirm who fitted it and when. Do you want Harbour Services to attend, diagnose and quote, with any paid work coming back to you for approval first?
> 
> Options: Yes: Harbour Services diagnoses and quotes; no paid work without your approval (recommended); You arrange your own contractor; Do not proceed

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services have been in touch about a visit, but their emails give two different dates, so we're confirming the exact date and time with them and will let you know. They'll look at the oven first; any paid repair needs the landlord's approval, which we're asking for. We'll update you by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit: the date is unconfirmed
- Landlord has not approved any chargeable work
- Warranty status is the provider's claim, not verified
- Nothing here decides who pays

## Remaining work
- Provider to confirm visit date (agency, review 23 May)
- Landlord to answer APR-102 (agency chases if silent)
- Quote to landlord if the oven needs paid repair
- Record visit result after attendance

## Missing or unavailable information
- Exact visit date/time
- Who fitted the oven (Harbour vs Keystone Works) and when; 'March 2025' is impossible
- Landlord spend limit (none on file)
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: call says 22 May 2024 2:30pm; emails say 'tomorrow, 21st June'. Unresolved, asked provider.
- Oven installer: landlord says Keystone Works contractor; note says Harbour Services; event 014 says March 2025 (after today) while tenant says last year.
- Landlord expected warranty cover; provider says none.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit date unconfirmed (22 May vs 21 June), warranty reported void, landlord approval only covers a charge-free service. Outstanding: date confirmation and landlord decision on chargeable work.

**2. What is the next action, who is it for, and through which channel?**

Email Harbour Services to confirm the date and quote before paid work; email landlord Felix for a decision; email tenant Leo an update.

**3. Does anything need a human decision, and why?**

No escalation. The landlord decides on any paid work, and that request has been sent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","body":"T… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services says the oven is no longer under warranty (the… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting provider confirmation of visit date (22 May vs 21… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
