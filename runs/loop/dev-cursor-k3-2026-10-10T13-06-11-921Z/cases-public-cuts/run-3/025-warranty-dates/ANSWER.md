# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked only for a free warranty service; the provider now says the oven is out of warranty and the visit date is inconsistent. I recorded the conditional decision, asked the landlord for approval of chargeable diagnosis or own contractor, asked the provider to confirm date and warranty basis and to diagnose only, updated the tenant, and held until 23 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold (Waiting for Landlord, review 2024-05-23). Visit date unconfirmed (22/05 call vs 21/06 emails). Provider says oven out of warranty; landlord only authorised a free warranty service.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether Harbour Services may diagnose/quote at his cost, or he arranges his own contractor | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask Harbour Services to confirm correct visit date, warranty basis, and diagnose/quote only | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the date is unconfirmed, warranty claim being checked, next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 2024-05-23 for landlord and provider replies | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services has told us the oven is no longer under warranty (their statement, not yet verified; we hold no warranty paperwork). Do you want Harbour Services to attend and diagnose/quote at your cost (any quote will come back to you for approval before work), or will you arrange your own contractor?
> 
> Options: Harbour Services attends to diagnose and quote; quote returned to you for approval (recommended); You arrange your own contractor; You send us warranty paperwork so we can challenge the provider's position

**A3 · request_information → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June' but your call with the tenant booked 2:30 PM on 22 May 2024. Which date is correct?
> - On what basis is the oven out of warranty (installation date, warranty term)? Please send any paperwork.
> - Please do not carry out chargeable work yet: attend to diagnose only and send a quote for landlord approval.
> 
> Why: Visit date conflicts and warranty status is the provider's claim only; landlord has only authorised a free warranty service.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file (event 012)** (verified)

> Hello Leo, Harbour Services say they spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails give a different date, so we are confirming it with them and it isn't confirmed by us yet. Please don't rearrange your day until we confirm. They have also told us the oven may not be under warranty, so we are checking with the landlord about next steps. We will update you by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms a visit date, the warranty status, or approves any spend.
- The provider's 'no longer under warranty' is their claim, unverified; no warranty paperwork seen.
- Recorded landlord decision is conditional: free warranty service only.

## Remaining work
- Landlord decision on chargeable work/own contractor (agency, by 23 May)
- Provider to confirm visit date and warranty basis
- If quote comes in, send to landlord for approval before work
- Result, invoice, tenant confirmation, close

## Missing or unavailable information
- Correct visit date
- Warranty paperwork/installation date
- Landlord spend limit (none on file)
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: 22/05/2024 2:30pm (call, event 018) vs 21/06 (emails 019, 020); neither treated as booked.
- Installer: landlord says Keystone Works, notes say Harbour Services; Harbour confirmed it replaced the oven.
- Replacement date: event 014 says March 2025, which is after today (2024); tenant says last year. Treated as unreliable.
- Warranty: landlord believes covered; provider says not; unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit date unconfirmed, warranty disputed (provider says expired), landlord has not authorised chargeable work. Outstanding: landlord decision, provider date confirmation, warranty evidence.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email (A2); information request to Harbour Services by email (A3); tenant update by email (A4); hold to 23 May (A5).

**3. Does anything need a human decision, and why?**

No escalation now. The decision on paying is the landlord's and has been requested; a human is needed only if the landlord stays silent past the review date or the warranty position stays disputed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Authorises only contacting the original installer for a charge… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"ticket_ref":"NBL-025-warranty-dates","landlord":"Felix","decision_needed":"Harbour Services has told us the oven is no longer under warran… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 012)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable diagnosis/own con… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
