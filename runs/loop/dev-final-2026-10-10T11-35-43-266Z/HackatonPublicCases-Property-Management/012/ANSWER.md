# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's checks failed and the engineer was instructed. A visit is recorded for 29/04 8-12. I confirmed it with the tenant and asked the provider to confirm its identity, as the call named a different company. Follow-up set for 30/04.

## Where the case stands
Provider assigned (Riverside Compliance); visit recorded for Wed 29/04/2026 8am-12pm. Waiting on the visit and on the provider confirming its identity. No quote yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the visit is recorded for 29/04 8-12 and what happens next | Leo Turner, tenant | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked provider to confirm the engineer is from Riverside Compliance (call said Cedar Utilities) and the slot | Riverside Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Review after the visit on 2026-04-30 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for running the checks. The engineer visit for the dishwasher door is down in our record for Wednesday 29 April, between 8am and 12pm. Please make sure someone is home to let them in. This first visit is to inspect and repair if possible; if parts or a quote are needed we'll agree that with the landlord first and keep you posted. If the time doesn't suit, let us know. We are also confirming the engineer's company details with the provider.

**A2 · request_information → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> - Please confirm that the engineer attending Flat 9, 89 Juniper Mews on Wed 29/04/2026, 8am-12pm is from Riverside Compliance. Our record shows a call from 'Grant from Cedar Utilities' about this visit.
> - Please confirm the 29/04 8-12 slot, and send any quote with photos before doing work beyond inspection.
> 
> Why: Company name on the call differs from the assigned provider; need to confirm before the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm the repair, cost or who pays.
- Landlord earlier agreed to an engineer attending; any quote still needs landlord approval.
- Provider identity not yet confirmed.

## Remaining work
- Visit 29/04, then record result
- Provider reply on company identity
- Quote to landlord if needed (agency, after visit)

## Missing or unavailable information
- Confirmation that Cedar Utilities/Grant is Riverside Compliance

## Conflicts between sources
- Call note names Cedar Utilities but the assigned provider is Riverside Compliance.
- Call note calls the tenant Leo Kendall; records say Leo Turner. Treated as a typo.
- Event 004 says the original request may relate to a Sept 2025 email; treated as the same dishwasher issue since the tenant confirmed the checks.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Troubleshooting failed, Riverside Compliance assigned, visit recorded 29/04/2026 8-12. Outstanding: the visit, the result, any quote and landlord approval, and the provider identity check.

**2. What is the next action, who is it for, and through which channel?**

Tenant email confirming the visit (A1) and provider email asking it to confirm identity and slot (A2), with a follow-up on 30/04 (A3).

**3. Does anything need a human decision, and why?**

No. It's routine, and the identity mismatch can be settled by asking the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"012",… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ques… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `schedule_follow_up` | {"ticket_ref":"012","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check visit on 29/04 happened; record result, q… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
