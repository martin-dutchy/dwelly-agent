# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord only authorised a charge-free warranty service; provider now says the oven is out of warranty. I recorded the conditional decision, asked the landlord whether to proceed on a paid basis or use his own contractor, asked the provider to confirm the conflicting visit date and inspect/quote only, and updated the tenant.

## Where the case stands
Provider (Harbour Services) assigned at mp_time; landlord approval was warranty-only; provider says out of warranty; visit date unconfirmed (22 May 2:30pm per call vs "21 June" per emails). Waiting on landlord decision (APR-101) and provider date confirmation; follow-up 2024-05-24.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour Services may inspect/quote for a paid repair or he will use his own contractor, reply by 24 May | Felix, landlord | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour Services to confirm the actual visit date, inspect/quote only, and the fitting date/installer | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is unconfirmed, warranty claim failed, costs need landlord approval; next update by 24 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up with landlord and provider on 24 May | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services has told us the oven is no longer under warranty (their claim, not yet checked against paperwork). Your earlier request was for a charge-free service only. Do you want Harbour Services to inspect and quote for a paid repair (we would send you the quote before any work), or will you arrange your own contractor? Please reply by 24 May 2024. Note: records differ on who fitted the oven (you named Keystone Works; our notes say Harbour Services) and when.
> 
> Options: Yes, Harbour Services may inspect and quote; quote comes to you for approval before any work; I will arrange my own contractor; Do not proceed

**A3 · send_message → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your updates. Two points. 1) Your emails say the visit is "tomorrow, 21st June", but the call with the tenant was for tomorrow, 22 May 2024 at 2:30pm. Please confirm the exact date and time. 2) The landlord only authorised a charge-free warranty service. As you say the oven is out of warranty, please attend only to inspect and diagnose; do not carry out chargeable work. Send a quote with photos and we will get the landlord's approval first. Please also confirm the date the oven was fitted and by whom, as our records differ. Thank you.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services told you on the phone about a visit tomorrow (22 May) at 2:30pm, but their emails give a different date (21 June). We are asking them to confirm the right date, so please treat the visit as not yet confirmed until you hear from us. They say the oven is no longer under warranty, so we are checking with the landlord how to proceed; any repair cost would need the landlord's approval first. We will update you by 24 May at the latest. Thanks for your patience.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed
- Landlord has not approved any paid work
- Warranty status is the provider's claim, not verified against paperwork
- Asking for a quote does not approve spend

## Remaining work
- Landlord decision on paid repair vs own contractor (agency, by 24 May)
- Provider to confirm visit date and installer/fit date
- Quote, if any, to landlord for approval

## Missing or unavailable information
- Actual confirmed visit date
- Who fitted the oven and when
- Warranty paperwork
- Landlord spend limit (not on file)

## Conflicts between sources
- Installer: Keystone Works (landlord) vs Harbour Services (note); fit date 'last year' vs March 2025 in event 014
- Visit date 22/05 (call) vs 21/06 (emails); trusted neither until provider confirms
- Event 009 'landlord approval confirmed' vs landlord's words being warranty-only; treated as conditional

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but the landlord's approval covered only a free warranty service, which the provider says is unavailable. Visit date is unconfirmed (22 May 2:30pm vs '21 June'). Outstanding: landlord decision, date confirmation, installer/date conflict.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, landlord), provider date/scope confirmation (email), tenant update (email); follow-up 24 May.

**3. Does anything need a human decision, and why?**

No escalation now; the decision belongs to the landlord and is requested. Escalate only if he is silent past the follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Only for a charge-free warranty service by the original instal… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","decision_needed":"Harbour Services has told us the oven is no longer under warranty (their claim, not yet checked again… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord says oven fitted by Keystone Works last year; note event 007 says Harbour Ser… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-24","party":"Landlord and Harbour Services","purpose":"Chase landlord decision on p… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
