# Case 105: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord agreed by phone to tenant fitting her own machine at her cost, but asked the tenant to pay removal of his old machine, which is prohibited. I recorded the decision as conditional, asked the landlord how to proceed, told the tenant to wait, and set a follow-up for 30 July.

## Where the case stands
Landlord gave phone approval (event 007) for tenant to fit her own machine, but wanted tenant to pay removal of the old landlord machine, which can't be charged to tenant. Waiting on landlord's choice for removal; tenant told to hold off.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord how to handle removal of old machine at landlord's cost; reply by 30 July | Henry Ingram, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant own machine is agreed in principle, she won't pay old machine removal, hold off until written confirmation | Ruben, tenant | email | A3 ✅ |
| 3 | WAIT | Chase landlord 30 July | Henry Ingram, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Henry Ingram (landlord)** (verified)

> Thanks for your call about Flat 9, 59 Alder Lane. We have noted you agree to Ruben fitting her own washing machine (hers, not on the inventory, taken with her when she leaves, at her cost). However, the cost of removing your old LG machine cannot be charged to the tenant, as it is the landlord's own item. How would you like to deal with the old machine?
> 
> Options: Agency arranges removal of the old machine at your cost (about £24.37-30), recommended; You arrange removal/disposal yourself; Our contractor inspects whether it can be repaired instead
> 
> Update: Please reply by 2025-07-30. Earlier address confusion with Flat 18, 128 Meadow Row was cleared on the call; this message concerns Flat 9, 59 Alder Lane only. Nothing is booked yet; we will tell Ruben once you answer.

**A3 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, an update on the washing machine. Your landlord is happy in principle for you to fit your own machine. It stays yours and you take it with you when you leave, at your own cost. You pay for buying and fitting your new machine. The old machine belongs to the landlord, so you won't be asked to pay to remove it. We're agreeing with the landlord how it will be removed. Please hold off buying or fitting until we confirm that in writing. We'll update you by 30 July. Sorry for any confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the decision does not give final written consent to the tenant
- Does not decide who pays removal; landlord must choose
- No contractor assigned or visit booked

## Remaining work
- Landlord answer on old machine removal (agency ops, by 30 July)
- Written consent to tenant, then removal arrangement
- Close without payment when done

## Missing or unavailable information
- Landlord's choice on old machine removal and cost

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row; the case property is Flat 9, 59 Alder Lane. Landlord owns both and confirmed Flat 9 on the call.
- System line says own_contractor but the route is tenant-supplied machine; recorded as conditional.
- Landlord condition that tenant pays removal conflicts with Tenant Fees Act.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved tenant's own machine by phone; the removal cost of the old machine is unresolved as it can't be charged to the tenant. Landlord reply outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord asked by email to choose the removal route; tenant updated by email; follow-up 30 July.

**3. Does anything need a human decision, and why?**

No escalation needed now; the landlord's choice is the decision. Escalate only if he insists the tenant pays or stays silent past 30 July.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-105","decision":"conditional","evidence_quote":"It doesn't work for me, but if she covers the cost of the installation, t… | 1 | ✅ verified | Ticket NBL-105 read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"ticket_ref":"NBL-105","landlord":"Henry Ingram","decision_needed":"Thanks for your call about Flat 9, 59 Alder Lane. We have noted you agr… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-105","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-105","note":"Route: landlord phone approval (event 007) for tenant's own machine; system line labelled it own_contractor but … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-105","due_on":"2025-07-30","party":"Henry Ingram","purpose":"Chase landlord on removal of old washing machine at landlord… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
