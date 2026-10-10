# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair job with Harbour Services assigned but date and warranty claims conflict. I asked the provider to confirm date and warranty evidence, asked the landlord for a decision on chargeable work (correcting an earlier wrong date), updated the tenant, and set a follow-up for 23 May.

## Where the case stands
Provider (Harbour Services) assigned, visit NOT confirmed (22 May 2:30pm per call vs 21 June per emails). Warranty claimed void by provider, unevidenced. Landlord decision on chargeable work pending (APR-102). Waiting on provider and landlord; review 23 May.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the visit date and send install date and warranty terms | Clara, Harbour Services (contractor) | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell landlord of provider's no-warranty claim, correct earlier date error, ask whether Harbour may inspect and quote chargeably | Felix, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the date is unconfirmed, ask if waiting is acceptable, next update 23 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Follow up on provider and landlord replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Which date is the visit: your call with the tenant said tomorrow (22 May 2024) at 2:30pm, but your emails say 21st June? Please confirm the exact date and time.
> - Please send the oven's purchase or install date and the manufacturer/installer warranty terms you based 'no longer under warranty' on. Warranties often run longer than 12 months. Our landlord says the oven was replaced last year, and also believes Keystone Works was involved; please confirm who fitted it.
> - Please quote before any chargeable work; do not start chargeable work without our approval.
> 
> Why: Visit date conflicts and the warranty claim is unevidenced.

**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim; we have asked for the install date and warranty terms and are checking). Apology: my earlier email gave the replacement date as March 2025, which can't be right; the tenant says last year and we are confirming. Also you mentioned Keystone Works, but the oven was recorded as fitted by Harbour Services; please confirm. Do you want Harbour Services to attend and quote for a chargeable repair if the warranty doesn't apply? No chargeable work will start without your approval of a quote.
> 
> Options: Yes, let Harbour Services inspect and quote; we come back to you for approval before any work; Wait until the warranty position is confirmed; You arrange your own contractor

**A3 · send_message → Leo Bennett (tenant) via email, tenant email on record** (verified)

> Hi Leo, Harbour Services have been in touch about your oven. Their call mentioned a visit tomorrow (22 May) at 2:30pm, but their emails say 21 June, so we are confirming the correct date with them and it is not yet confirmed. Please don't plan around a date until we confirm. We're also checking the warranty position with them and your landlord. As you're without an oven, is waiting for that date OK? If not, we can ask for a sooner slot. Could you tell us roughly when it was replaced last year if you know? We'll update you by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms a visit date, the warranty status, or who pays.
- No chargeable work is approved; the landlord's email only asked for a warranty service.
- No set_visit was made.

## Remaining work
- Provider to confirm date and warranty evidence (agency chases 23 May)
- Landlord to decide on chargeable inspection/quote
- Quote loop if warranty doesn't apply; then visit result, invoice, close

## Missing or unavailable information
- Actual visit date
- Oven install date and warranty terms
- Who fitted the oven (Harbour vs Keystone Works)

## Conflicts between sources
- Visit date: 22/05/2024 (call, event 018) vs 21/06 (emails 019/020); 'tomorrow' fits 22 May
- Install date: 'last year' (tenant) vs March 2025 (event 014, impossible)
- Fitter: Harbour Services (event 007) vs Keystone Works (landlord, event 006)
- Warranty: landlord says under warranty; provider says not

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned; visit date unconfirmed (22 May vs 21 June); provider says out of warranty but gave no evidence; landlord has not approved chargeable work.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services to confirm date and warranty details; email to landlord for approval question; email to tenant that date is unconfirmed.

**3. Does anything need a human decision, and why?**

Not at present; the landlord's decision is routine and pending. No escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `request_landlord_approval` | {"landlord":"Felix","decision_needed":"Harbour Services say the oven is no longer under warranty (their claim; we have asked for the install… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on record","body":"Hi Leo, Harbour Servi… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"due_on":"2024-05-23","purpose":"Check Harbour Services' reply on visit date and warranty evidence; chase landlord on chargeable-quote ques… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"025","note":"Conflicts: visit 22/05/2024 2:30pm (call, event 018) vs 21/06 (emails 019/020) - unconfirmed, no set_visit. Install … | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
