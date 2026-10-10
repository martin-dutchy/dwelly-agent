# Case 105: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord agreed by phone to the tenant fitting her own machine at her cost, but also asked her to pay to remove his old machine, which can't be charged to a tenant. I recorded the decision as conditional, told the landlord and tenant, and set a follow-up for 30 July.

## Where the case stands
Landlord gate: conditional consent recorded. No contractor assigned. Waiting on landlord for removal/disposal of old machine; follow-up 30 July.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose who arranges/pays removal of old LG machine (cannot be charged to tenant), reply by 30 July | Henry Ingram, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant she may fit her own machine at her own cost, won't pay for old machine removal, update by 30 July | Ruben, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up with landlord on 30 July | Henry Ingram, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Henry Ingram (landlord) via email, agency landlord record** (verified)

> Hello Mr Ingram, thanks for your call about the washing machine at Flat 9, 59 Alder Lane. We've noted you agree to Ruben fitting her own machine at her own cost, and that it stays hers and she takes it when she leaves. One point to correct: the existing LG machine is your item, so under the Tenant Fees Act we can't make the tenant pay to remove or dispose of it. Please reply by 30 July to tell us how you'd like to proceed: (1) you cover the removal cost (about £24-30), or (2) you arrange removal yourself. Please also say whether the old machine should be disposed of or kept. We'll tell Ruben she can go ahead with her own machine meanwhile, and will check in again on 30 July.

**A4 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Ruben, update on the washing machine at Flat 9, 59 Alder Lane. Your landlord is happy for you to buy and fit your own machine, at your own cost for the new one. It stays yours and you take it with you when you leave. Removal of the old LG machine belongs to the landlord, so you won't be asked to pay for that. We're agreeing with the landlord how it gets taken away, so please hold off disposing of it. We'll update you by 30 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Consent does not decide who pays for removing the landlord's old machine.
- No contractor assigned and no spend approved.
- The tenant's machine is not on the inventory and remains hers.

## Remaining work
- Landlord to decide removal route/cost and disposal of old machine
- Follow up on 30 July
- Ticket close without payment once resolved

## Missing or unavailable information
- Landlord's choice on removal of old machine
- Whether the tenant has bought a replacement and when it will be fitted

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row/Road; the landlord owns both and confirmed on the call that this job is Flat 9, 59 Alder Lane.
- Event 008 logs 'own_contractor', but the call shows the tenant fitting her own machine; I recorded it as conditional.
- Landlord asked the tenant to pay for removal of his own machine; that conflicts with the Tenant Fees Act, so I treated it as not chargeable.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord gave conditional consent by phone (event 007) for the tenant to fit her own machine. Outstanding: who pays for and arranges removal of the landlord's old machine, which cannot be charged to the tenant.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord to ask who covers removal (reply by 30 July), and email the tenant with the position. Follow-up is set for 30 July.

**3. Does anything need a human decision, and why?**

No. The landlord's removal choice is a routine question and is with the landlord, so I did not escalate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-105","decision":"conditional","evidence_quote":"It doesn't work for me, but if she covers the cost of the installation, t… | 1 | ✅ verified | Ticket NBL-105 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-105","note":"Route: tenant-supplied replacement (landlord consent conditional); no contractor assigned. Event 008 logged as o… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Henry Ingram","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-105","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-105","… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-105","due_on":"2025-07-30","party":"Henry Ingram (landlord)","purpose":"Chase landlord on who pays/arranges removal of ol… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
