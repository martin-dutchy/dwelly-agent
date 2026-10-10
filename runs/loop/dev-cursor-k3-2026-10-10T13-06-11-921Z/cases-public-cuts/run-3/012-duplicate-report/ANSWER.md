# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's new email duplicates the open dishwasher job, which already has a visit booked for tomorrow 8-12. I linked it rather than opening a new job, replied to the tenant with the booked slot, noted the record conflicts and set a follow-up for 29/04.

## Where the case stands
Stage: visit. Engineer visit booked Wed 29/04/2026 8-12 (system event 017, provider call event 016). Tenant's latest email is a duplicate chase of the same fault. Waiting on the visit and result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the existing visit is tomorrow 8-12, no new job opened, and that we'll update after the visit | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up 29/04 after the visit for the result/quote and to confirm provider identity | Riverside Compliance / tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting in touch. We already have an engineer booked for your dishwasher door: tomorrow, Wednesday 29 April, between 8am and 12 noon. You don't need to do anything further. If that time no longer works, please call the provider on 07700 900410. We have not opened a second job as this one covers it. We'll check in after the visit and update you tomorrow.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Replying does not confirm the provider's identity or that they will attend
- Does not establish the cause of the fault, a quote or who pays
- No landlord approval needed yet: spend only arises if a quote follows

## Remaining work
- Record the visit result after 29/04; if a quote is needed, record it and send to landlord
- Agency to resolve the provider name discrepancy

## Missing or unavailable information
- Which company is actually attending (Riverside Compliance, Cedar Utilities or Harbour Homes)
- Tenant surname (Turner vs Kendall)

## Conflicts between sources
- Provider named Riverside Compliance (events 014-019), Cedar Utilities (016) and Harbour Homes (SMS 020); I trusted the system booking and assignment (Riverside).
- Tenant named Leo Turner vs Leo Kendall (event 016); treated as a typo.
- Event 008 says the landlord already agreed GS to go out; no formal decision is recorded and no spend is involved yet.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit stage. The engineer visit is booked for 29/04/2026 8-12. The result and any quote are outstanding after that. The tenant's email is a duplicate chase.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email confirming the existing visit (done, MSG-101). Follow up with the provider and tenant after the visit on 29/04.

**3. Does anything need a human decision, and why?**

No. It is a routine duplicate and the visit is already booked. The provider-name mismatch is noted and will be checked at follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email event 021 duplicates this open job; linked, no new ticket. Record conflicts: provi… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-29","party":"Riverside Compliance / tenant","purpose":"After the 29/04 8-12 visit… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
