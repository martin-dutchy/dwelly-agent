# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's latest email duplicates an open job with a visit already booked for 29/04 8am–12pm. I told the tenant, asked the provider to confirm the booking and its company name, set a follow-up for 30/04 and returned the ticket to auto mode.

## Where the case stands
Stage: visit booked for 29/04/2026 (8am–12pm), recorded by system (event 017) after the provider phoned the tenant (event 016). The tenant's latest email chases a visit that is already booked, so it is a duplicate. No second job was opened. Waiting for the visit; follow-up set for 30/04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the visit is already booked for 29/04 8-12 and that no new job was opened | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask the provider to confirm the booking and its company name | Riverside Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Wait for the visit, then check the result and provider identity on 30/04 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. Someone is already booked to look at the dishwasher door: our records show Wednesday 29/04/2026, between 8am and 12pm, with Riverside Compliance (to rearrange, call 07700 900410). You don't need to do anything else, and we haven't opened a second job. We're also double-checking the booking with the engineer and will be in touch if anything changes. If the visit doesn't go ahead, let us know.

**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please could you confirm you are attending Flat 9, 89 Juniper Mews on Wednesday 29/04/2026 between 8 and 12 for the dishwasher door inspection? Our call note mentions "Grant from Cedar Utilities", so please confirm the company name too. The tenant has chased today. If a quote is needed, please send it to us before any work starts.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not establish the cause of the fault or who pays.
- The visit is an inspection only; any repair needs a quote and landlord approval, or the spend limit.
- The provider has not yet confirmed the company name.

## Remaining work
- Visit on 29/04, then record the work result
- Quote and landlord approval if a repair is needed
- Resolve the provider name mismatch
- Follow-up due 30/04 (agency)

## Missing or unavailable information
- Provider's confirmation of the booking and company name

## Conflicts between sources
- Provider named as Riverside Compliance (events 014–019) but Cedar Utilities in the call note (event 016); the SMS was branded Harbour Homes (event 020).
- The call note says 'Leo Kendall' while the records say Leo Turner.
- Event 004 notes confusion with an earlier sink email; the event 011 tenant reply confirms the checks failed. I trusted the system record of the visit.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit booked for 29/04/2026 8am–12pm. The tenant's chase is a duplicate. Outstanding: the visit itself, the result, and a quote and landlord approval if a repair is needed.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant to say the visit is already booked. Email Riverside Compliance to confirm the booking and its company name. Both are done.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate and the record mismatches can be settled by asking the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","tick… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","purpose":"Check visit on 29/04 happened and record result; confirm provider … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
