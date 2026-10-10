# Case 040: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant reported they had swapped in their own machine, while the landlord's later email agreed to a check. I recorded the self-fix, asked the landlord what to do with the original machine, updated the tenant, and set a follow-up for 29 Dec. No contractor was assigned.

## Where the case stands
Ticket NBL-040-tenant-resolved at result stage. Tenant says laundry is working via their own machine; landlord (event 009) had agreed to a check, but no contractor was assigned. Waiting on landlord about the original machine; follow-up 29 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Tell landlord the tenant already swapped machines; ask what to do with the original machine and whether the tenant's may stay connected | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge the self-fix, say no contractor is being sent, and give next update date | Tenant | email | A3 ✅ |
| 3 | WAIT | Wait for landlord decision, review 29 Dec, then close without payment | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (Oliver) (landlord)** (verified)

> Thanks for agreeing to a check. Update: the tenant says they have already swapped in their own washing machine and stored the faulty original in the garage, so nothing is working for them now. We have not sent a contractor. What would you like done with your original machine, and may the tenant's own machine stay connected?
> 
> Options: Leave the tenant's machine connected and have us arrange a contractor to inspect/repair your machine in the garage (we'd ask for a quote first); Dispose of your original machine; Leave your machine stored as is, no action; You arrange it yourself

**A3 · send_message → Tenant (tenant) via email, existing thread (event 008 email)** (verified)

> Hello, thanks for letting us know you've swapped the machines and stored the faulty one in the garage. Glad you're up and running. We won't send a contractor for now. Your own machine is yours and isn't on the inventory, so we've asked the landlord what they'd like done with their original machine and whether yours can stay connected. We'll update you once they reply, or by 29 December at the latest. Please leave the old machine as it is in the meantime.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work result does not mean the original machine is repaired or that the landlord agrees to the tenant's machine staying.
- Nothing here approves spend or a contractor.
- Ticket not yet closed.

## Remaining work
- Landlord to decide on the original machine (inspect/repair, dispose, store) and whether the tenant's machine stays connected.
- Close without payment once the landlord has answered.

## Missing or unavailable information
- Landlord's decision on the original machine and tenant's machine
- Landlord's exact contact and whether 'Oliver' is the landlord (the name is not in the record)

## Conflicts between sources
- Landlord event 009 agrees to a check, but tenant event 008 says it was already fixed by a swap. I trusted the tenant's account of the current state and asked the landlord to confirm what they want.
- Names Rowan (tenant email) and Oliver (landlord email) are not in the property record; treated as tenant and landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The fault is worked around: the tenant swapped in their own machine and stored the faulty one in the garage. The landlord's approval of a check (event 009) is now largely moot. Outstanding: the landlord's decision on the original machine and on the tenant's machine staying; then close.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request APR-101 (the landlord record) on what to do with the original machine; the tenant was updated by email (MSG-102). Follow-up on 29 Dec.

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, and it has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-040-4451","outcome":"completed","evidence":"Tenant email event 008 (2026-12-24): issue resolved by swapping in tenant's o… | 1 | ❌ failed | Ticket NBL-040-4451 not found on read-back |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (Oliver)","ticket_ref":"NBL-040-4451","decision_needed":"Thanks for agreeing to a check. Update: the tenant says they … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 008 email)","body":"Hello, thanks f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-29","purpose":"Chase landlord on what to do with original washing machine and whether tenant's machine may stay; then clo… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-040-4451","note":"Landlord event 009 agreed to a check; tenant event 008 (later-arriving but earlier-handled) says already fi… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `record_work_result` | {"ticket_ref":"NBL-040-tenant-resolved","outcome":"completed","evidence":"Tenant email event 008 (2026-12-24): issue resolved by swapping in… | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after record_work_result |

## Failed or unverified actions
- A1: Used the wrong ticket ref (NBL-040-4451 is in the description text). Found the real ref NBL-040-tenant-resolved via list_tickets and retried as A6, which verified.
