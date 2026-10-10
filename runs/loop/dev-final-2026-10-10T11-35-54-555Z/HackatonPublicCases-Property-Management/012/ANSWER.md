# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's troubleshooting failed, the property manager instructed an engineer, and the system recorded a visit for 29/04 8-12. The call log has name discrepancies (Cedar Utilities, Leo Kendall), so I asked the provider to confirm and updated the tenant. No human decision is needed yet.

## Where the case stands
NBL-012 at visit stage. Provider Riverside Compliance assigned 25/04; visit recorded by system for 29/04/2026 8am-12pm. Awaiting provider confirmation of company and visit, then result or quote.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Riverside Compliance to confirm company, date and slot (call log names Cedar Utilities), and quote before any work | Riverside Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the recorded visit slot and that we are confirming with the provider; quote first if needed | Leo Turner, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider confirmation before the visit | Riverside Compliance | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, our record shows your visit to Flat 9, 89 Juniper Mews for the dishwasher door on Wednesday 29/04/2026, 8am-12pm. The call log names the caller as Grant from Cedar Utilities. Please confirm by reply that this visit is yours, that the date and slot are correct, and which company is attending. If the dishwasher needs more than a simple repair, please send a quote with photos and wait for our approval before starting work. Thank you.

**A2 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for running the checks. Our record shows an engineer visit to look at the dishwasher door on Wednesday 29 April, between 8am and 12pm. Please let us know if that doesn't suit. We are also confirming the visit details with the engineer's company. If it needs a repair beyond a quick fix, they will quote first and we will get that approved before any work starts.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm the provider's identity or that the visit will happen
- No spend or quote approved; repair cost and who pays are undecided
- Landlord approval is only indicated by an internal note ('LL already agreed for GS to go out'), not a recorded decision on spend

## Remaining work
- Provider to confirm visit and company
- After visit: record result; if quote, send to landlord for approval
- Invoice and final checks, tenant confirmation, landlord informed before closing

## Missing or unavailable information
- Which company is attending (Riverside Compliance vs Cedar Utilities)
- Clear landlord approval or spend limit for repair

## Conflicts between sources
- Call log names Grant from Cedar Utilities and tenant 'Leo Kendall'; the assigned provider is Riverside Compliance and tenant is Leo Turner. Trusted the system record; asked the provider to confirm.
- Event 001 refers to an email from 16 Sept 2025 and event 004 doubts the request relates to the dishwasher; the tenant's later reply and the manager's note confirm the dishwasher.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit stage: engineer visit recorded for 29/04/2026 8am-12pm. Outstanding: provider confirmation, the visit result, and any quote needing landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Email to Riverside Compliance to confirm company and visit (A1); email to tenant Leo Turner with the recorded slot (A2); follow-up on 28/04 (A3).

**3. Does anything need a human decision, and why?**

No. The name mismatch can be settled by asking the provider. Escalate only if unresolved by the follow-up, or if a quote exceeds authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","tick… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2026-04-28","party":"Riverside Compliance","purpose":"Check provider confirmed company and 29/04 8-12 visi… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
