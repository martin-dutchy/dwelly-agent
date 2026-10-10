# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved only a charge-free warranty service; the provider now says the oven is out of warranty and gave conflicting visit dates. I recorded the conditional decision, asked the provider to confirm the date and quote only, asked the landlord about a chargeable repair, updated the tenant and set a follow-up.

## Where the case stands
Provider assigned, on hold (waiting for provider). Visit NOT booked in system: provider gave conflicting dates (22 May 2:30pm by call vs "21 June" in emails). Provider says oven is out of warranty; landlord only approved a charge-free warranty route, so a chargeable repair needs landlord approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm the exact visit date/time and warranty/installation details in writing, and to inspect and quote only | Clara, Harbour Services (contractor) | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether to approve a chargeable inspect-and-quote repair now the warranty route has failed, reply by 24 May | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the date is unconfirmed, the warranty claim is being checked, and when he will next hear | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up 22 May on provider's date confirmation; landlord reply due 24 May | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June', but your call with the tenant set it for tomorrow, 22 May 2024 at 2:30pm. Which date is correct? Please confirm the exact date and time.
> - Please confirm the oven installation date (our notes conflict) and what the warranty check showed, in writing.
> - As the oven is not under warranty, please attend only to diagnose and send a quote with photos; do not start any chargeable work until we confirm landlord approval.
> 
> Why: Visit date conflicts and the landlord only approved a charge-free warranty service.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, which we are confirming in writing). Do you approve a chargeable repair? We would ask them to inspect and quote first, and nothing would be spent without your approval of the quote. We are sorry for the earlier note, which gave the replacement as March 2025; the date is being checked.
> 
> Options: Yes, Harbour Services may inspect and quote, and we send you the quote to approve (recommended); You arrange your own contractor; Tenant not to be provided with repair

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Leo, Harbour Services say they have agreed a visit with you for tomorrow, Wednesday 22 May at 2:30pm, but their emails to us name 21 June, so we are confirming the date with them. Please treat it as not confirmed until you hear from us. They also say the oven is no longer under warranty, so we are asking the landlord about the repair cost. Nothing chargeable to you. We will update you by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- The out-of-warranty statement is the provider's claim, not verified.
- Nothing authorises chargeable work or quote approval yet.
- Does not decide who pays.

## Remaining work
- Provider to confirm visit date and warranty position in writing (agency, 22 May)
- Landlord decision on chargeable repair (due 24 May)
- Quote approval, visit result, invoice, close

## Missing or unavailable information
- Confirmed visit date
- Written warranty/installation date evidence
- Attachments at events 003 and 013 unavailable
- Landlord spend limit not on file

## Conflicts between sources
- Visit date: call says 22 May 2:30pm; emails say 'tomorrow, 21st June'. Treated as unconfirmed.
- Event 014 says oven replaced March 2025, which is after today's date and conflicts with the tenant's 'last year'. Landlord was told, and the date is being checked.
- Landlord named Keystone Works as installer; the agency note says Harbour Services.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned and on hold. Warranty route reported failed by the provider. Visit date unconfirmed (22 May vs 21 June). Landlord approval for chargeable work outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Harbour Services to confirm the date and inspect and quote only; email the landlord for approval of a chargeable repair; email the tenant that the date is unconfirmed.

**3. Does anything need a human decision, and why?**

No escalation now. The landlord decides on chargeable spend; if they stay silent past 24 May, chase on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Only a charge-free warranty service by the original installer.… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello Leo,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-22","party":"Harbour Services","purpose":"Confirm visit date (22 May 2:30pm vs 21 J… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
