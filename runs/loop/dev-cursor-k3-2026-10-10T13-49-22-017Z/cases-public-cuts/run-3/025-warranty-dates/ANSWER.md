# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; provider says out of warranty, which undercuts the landlord's charge-free request. Visit date conflicts. I asked the landlord for a decision, asked the provider to confirm the date and warranty evidence, updated the tenant, and put the ticket on hold until 24 May.

## Where the case stands
Provider (Harbour Services) assigned; visit NOT confirmed (date conflict 22 May vs 21 June). Provider says out of warranty (unverified). Landlord has not approved paid work; on hold waiting for landlord, review 2024-05-24.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour may inspect/quote at landlord's cost or landlord uses own contractor; clarify Keystone vs Harbour | Felix, landlord | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider for the correct visit date and warranty evidence; no chargeable work without approval | Harbour Services, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit is unconfirmed and next update by 24 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold for landlord decision, review 2024-05-24 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their statement, not yet checked). You asked for a charge-free warranty service, so please confirm whether Harbour Services may attend to inspect and quote at your cost (any repair quote would come to you for approval first), or whether you will arrange your own contractor. Also, you named Keystone Works as the installer but our notes show Harbour Services fitted the oven; please confirm which firm you mean and send any warranty paperwork you hold.
> 
> Options: Yes, Harbour Services may inspect and quote; quote comes back to you for approval; I will arrange my own contractor (please send name and date); Check warranty with Keystone Works first (please send their details and paperwork)

**A2 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say tomorrow, 21st June, but your call with the tenant set tomorrow 22 May at 2:30pm. Which exact date and time is correct?
> - Please confirm the oven install date, the warranty end date and what you based 'no longer under warranty' on.
> - Please do not carry out chargeable work: send a quote with photos for approval first.
> 
> Why: Visit date conflicts and warranty status needs evidence; landlord has not yet approved paid work.

**A3 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Dear Leo, thanks for your patience. Harbour Services say they spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails to us give a different date, so we are confirming the exact date with them. Please don't treat it as booked until we confirm. We are also checking with the landlord about warranty and who covers the cost. We will update you by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked or confirmed
- Warranty status is the provider's claim, not verified
- No spend approved; landlord's reply asked only for a charge-free service
- Does not decide who pays

## Remaining work
- Landlord decision (owner: landlord, by 24 May)
- Provider to confirm visit date and warranty evidence
- Then set_visit once confirmed, quote loop if needed

## Missing or unavailable information
- Actual visit date
- Install date and warranty terms
- Which firm installed the oven (Keystone vs Harbour)
- Landlord spend limit

## Conflicts between sources
- Keystone Works (landlord) vs Harbour Services (agency note) as installer
- Install date March 2025 in event 014 is in the future; the tenant says last year
- Visit 22 May (call) vs 21 June (provider emails); 'tomorrow' fits 22 May
- Event 009 'landlord approval confirmed' vs landlord's actual words asking only for warranty service

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Harbour Services is assigned. The visit date is unconfirmed (22 May 2:30pm on the call, 21 June in the emails). The provider says the oven is out of warranty. Landlord approval for paid work and the installer identity are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email to Felix, a date confirmation request by email to Harbour Services, and a tenant update by email. All three are sent.

**3. Does anything need a human decision, and why?**

No. The decision on spend belongs to the landlord and has been requested. Escalate only if the landlord stays silent beyond the chase cadence.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-025-warranty-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord (ev006) names Keystone Works as installer, agency note (ev007) says Harbour S… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on paid inspection/quote vs own… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
