# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven repair is with Harbour Services, but the visit date is inconsistent and the provider says the oven is out of warranty. I asked the landlord for a decision on a chargeable repair, asked the provider to confirm the date and warranty evidence, and updated the tenant. No human decision is needed yet.

## Where the case stands
Provider assigned (Harbour Services); visit date unconfirmed (22/05 per tenant call vs "21st June" in provider emails). Provider says oven out of warranty (unverified). Landlord approval covered only a charge-free warranty service, so a chargeable repair needs landlord approval. Waiting on landlord (reply by 2024-05-24) and provider.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour Services may inspect and quote, or whether they will use their own contractor, now the warranty is claimed void | Felix, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour Services to confirm the visit date/time and send warranty evidence; quote only, no chargeable work | Harbour Services, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the date is being confirmed, warranty/cost is with the landlord, and next update by 24 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Follow up on provider confirmation and landlord reply | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say (their claim, not yet verified) the oven is no longer under warranty, so a repair would be chargeable. Your earlier reply only asked for a charge-free warranty service. Do you want us to have Harbour Services inspect and quote (no work until you approve the quote), or will you arrange your own contractor? Also, you named Keystone Works but our records show Harbour Services fitted the oven; please confirm the fitting date/warranty paperwork if you have it. Reply by 2024-05-24.
> 
> Options: Harbour Services inspect and quote; no work until you approve; You arrange your own contractor; Send us the warranty paperwork so we can challenge the warranty position

**A2 · send_message → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> Thanks for your emails. Two points please: 1) Your emails say the visit is "tomorrow, 21st June", but the call with the tenant booked tomorrow, 22 May 2024 at 2:30pm. Please confirm the exact date and time. 2) You say the oven is out of warranty. Please send the warranty/installation date and terms you checked (our notes show it was fitted last year). As it would be chargeable, please inspect and send a quote only; do not start any chargeable work until we confirm landlord approval in writing.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for your patience with the oven. Harbour Services have told us they spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails give a different date, so we're confirming it with them and will let you know. Please don't treat it as fixed until we do. They've also said the oven may be out of warranty; we're checking that with the landlord, who will decide on any repair costs. We'll update you by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked with set_visit; the date is unconfirmed by the provider.
- The warranty position is the provider's claim, not verified.
- Nothing approves any spend or confirms the cause of the fault.

## Remaining work
- Provider to confirm date and send warranty evidence (agency, follow-up 2024-05-22)
- Landlord decision on chargeable repair or own contractor (by 2024-05-24)
- Record the landlord decision when received, then quote loop or own-contractor route

## Missing or unavailable information
- Confirmed visit date
- Warranty paperwork and fitting date
- Landlord spend limit/decision on chargeable repair
- Unavailable attachments at events 003 and 013

## Conflicts between sources
- Fitter: landlord says Keystone Works; agency note says Harbour Services. Treated Harbour as the fitter pending evidence.
- Replacement date 'March 2025' in event 014 is in the future; the request says last year.
- Visit date: 22/05/2024 (call, event 018) vs '21st June' (events 019/020); not booked until the provider confirms.
- Warranty: landlord believes it is under warranty; Harbour says it is not (unverified).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned. The visit date is unconfirmed (22/05 at 2:30pm per the tenant call, vs '21st June' in the provider emails). Harbour says the oven is out of warranty. The landlord only approved a charge-free warranty service, so a chargeable repair needs landlord approval. Outstanding: date confirmation, warranty evidence, landlord decision.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (A1), provider confirmation request by email (A2), tenant update by email (A3), follow-up scheduled for 2024-05-22 (A5).

**3. Does anything need a human decision, and why?**

Not at present. The landlord holds the spend decision and the rest is routine chasing. Escalate only if the landlord stays silent past 2024-05-24 or the dates and warranty cannot be reconciled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"Flat 2, 176 Lantern Quay","decision_needed":"Harbour Services say (their claim, not yet verified) the oven… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"Flat 2, 176 Lantern Quay","note":"Conflicts: landlord names Keystone Works as oven fitter, agency note says Harbour Services; eve… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"Flat 2, 176 Lantern Quay","due_on":"2024-05-22","party":"Harbour Services","purpose":"Confirm visit date/time and warranty ev… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
