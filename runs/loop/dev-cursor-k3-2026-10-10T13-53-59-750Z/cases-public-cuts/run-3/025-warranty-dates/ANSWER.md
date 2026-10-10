# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; provider says it is out of warranty and gave conflicting visit dates. I recorded the landlord's conditional approval, asked the provider to confirm date and warranty details (diagnose/quote only), asked the landlord how to proceed, updated the tenant and scheduled a follow-up. No human decision is needed yet.

## Where the case stands
Provider assigned (Harbour Services), ticket in mp_time, on hold waiting for provider. Visit date unconfirmed (22 May 2:30pm by phone vs "21st June" in emails). Provider says out of warranty; landlord approval covers only charge-free warranty service, so chargeable work awaits landlord decision.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm exact visit date/time, fitting date and warranty position; diagnose and quote only | Harbour Services, contractor | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell the landlord the oven is reported out of warranty and ask whether Harbour may diagnose and quote, by 24 May | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell the tenant the visit time is not yet confirmed and the warranty/approval is pending; next update by 24 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up with provider on 22 May and landlord by 24 May | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your emails. Your two emails say the visit is "tomorrow, 21st June", but the call with the tenant booked tomorrow, 22 May 2024, at 2:30pm. Please confirm the exact date and time. Please also confirm the date the oven was fitted (we have seen both "last year" and "March 2025") and why it is out of warranty. The landlord only authorised a charge-free warranty service. If the oven is out of warranty, please attend to diagnose only and send us a quote with photos. Please do not carry out chargeable work until we confirm landlord approval.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their words, still being checked: we have conflicting fitting dates, and you named Keystone Works while our note says Harbour Services fitted it). Your approval was for a charge-free service only. May Harbour Services attend to diagnose and quote (any repair cost to come back to you for approval first), or would you prefer to arrange your own contractor? Please reply by 24 May 2024.
> 
> Options: Yes, Harbour Services may attend to diagnose and quote; any repair needs your approval first (recommended); You arrange your own contractor; Please pursue the warranty with the original installer first

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Leo, Harbour Services spoke to you about visiting tomorrow (22 May) at 2:30pm, but their written confirmation gives a different date, so we are checking it with them. Please treat the time as not yet confirmed; we will let you know as soon as they confirm. They have also said the oven may not be under warranty, so we are checking with the landlord whether the repair can go ahead. We will update you by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- The warranty status is the provider's claim, not verified.
- Nothing authorises chargeable work or any spend.
- The messages do not establish the cause of the fault.

## Remaining work
- Provider to confirm date/time and warranty details
- Landlord to decide on diagnose-and-quote, own contractor, or pursuing warranty
- Quote approval if repair is needed
- Tenant update by 24 May

## Missing or unavailable information
- Confirmed visit date/time
- Actual oven fitting date and installer
- Referenced attachments (events 003, 013) unavailable
- Landlord spend limit not on file

## Conflicts between sources
- Visit date: call says 22 May 2:30pm; provider emails say 'tomorrow, 21st June'. Not booked until provider confirms.
- Fitting date: 'last year' (tenant) vs 'March 2025' (note, a future date).
- Installer: landlord says Keystone Works; agency note says Harbour Services.
- Warranty: landlord believes covered; provider says not.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider is assigned and on hold. The visit date is unconfirmed (22 May 2:30pm by call vs '21st June' in emails). The provider says the oven is out of warranty. The landlord only approved charge-free warranty service, so approval for chargeable work is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services to confirm the date and warranty details and to diagnose and quote only. Email to the landlord asking whether to proceed on a chargeable basis. Email to the tenant that the time is not confirmed.

**3. Does anything need a human decision, and why?**

No human at the agency. The decision belongs to the landlord, who has been asked. Escalate only if the landlord stays silent beyond the chase cadence or the conflicts remain unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Charge-free warranty service only; no authority for chargeable… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-22","party":"Harbour Services","purpose":"Confirm visit date/time and warranty posi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
