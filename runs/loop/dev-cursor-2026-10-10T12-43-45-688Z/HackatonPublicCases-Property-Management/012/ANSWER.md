# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's checks failed and an engineer was instructed. A visit is recorded for 29/04 8-12. I told the tenant, asked the provider to resolve the company-name mismatch, set a follow-up for 28/04, noted the conflicts and returned the job to auto.

## Where the case stands
Stage: visit. Inspection recorded for 29/04/2026 08:00-12:00. Tenant's troubleshooting failed. Waiting on the provider to confirm which company is attending. No quote or landlord spend approval yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the visit is recorded for 29 April 8-12, a quote would need landlord approval, and we are checking the provider name. | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Riverside Compliance to confirm they are attending, given the call from Cedar Utilities, and to quote before any repair. | Riverside Compliance, provider | email | A2 ✅ |
| 3 | WAIT | Follow up on the provider's confirmation before the visit. | Riverside Compliance | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for running the checks. An engineer visit to look at the dishwasher door is recorded for Wednesday 29 April, between 8am and 12pm. Please make sure someone is home to let them in. The engineer will assess it first, and if a repair needs a quote we will take it to the landlord for approval before any work starts. We are also double-checking the engineer's company name with the provider, as the call you received named a different firm from the one we instructed. If anything changes we will email you; otherwise you will next hear from us by Tuesday 28 April.

**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, a quick check on the dishwasher job at Flat 9, 89 Juniper Mews. A call logged on 26 April was from "Grant from Cedar Utilities", but we instructed Riverside Compliance. Please confirm by reply that Riverside Compliance is attending on Wednesday 29/04/2026 between 8am and 12pm, and who the engineer will be. Please quote before doing any repair work, and do not proceed until we confirm approval.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messaging does not confirm the provider's identity or that the engineer will attend.
- Nothing here approves spend or a repair.
- The visit is not confirmed as fixing the fault.

## Remaining work
- Provider to confirm company and slot (follow-up 28/04).
- Record the result of the visit on or after 29/04.
- If a quote arrives, send it to the landlord for approval.
- Tenant to be updated by 28/04.

## Missing or unavailable information
- Which company is actually attending (Riverside Compliance or Cedar Utilities).
- Tenant surname discrepancy in the call note (Kendall vs Turner).

## Conflicts between sources
- Provider Riverside Compliance (assigned) vs Cedar Utilities (call). I trusted the system assignment and asked the provider to confirm.
- Tenant Leo Turner vs 'Leo Kendall' in the call note. I treated the system record as correct.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is booked for 29/04/2026 8-12. Outstanding: the provider's confirmation of which company attends, the visit result, and any quote with landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the tenant (visit update) and to Riverside Compliance (confirm identity and slot, quote first). Follow-up set for 28/04.

**3. Does anything need a human decision, and why?**

No. This is routine and a provider question can resolve it. Escalate only if the provider does not clarify the identity mismatch.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","tick… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2026-04-28","party":"Riverside Compliance","purpose":"Confirm attending company (Riverside vs Cedar Utilit… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-012","note":"Conflicts: assigned provider Riverside Compliance (events 013-015) vs call from \"Cedar Utilities\" (event 016);… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-012"} | 1 | ✅ verified | Ticket NBL-012 read back after resume_auto |

## Failed or unverified actions
_None._
