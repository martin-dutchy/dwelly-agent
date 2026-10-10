# Case 105: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord agreed by phone that the tenant may fit her own washing machine. His condition that she pays removal of his old machine can't be charged to a tenant, so I recorded a conditional decision, told the tenant, asked the landlord how to proceed, and set a follow-up for 30 July.

## Where the case stands
Landlord approved by phone (event 007) the tenant fitting her own machine; one condition (tenant pays removal of landlord's old machine) cannot lawfully apply. Waiting on landlord for removal arrangement; follow-up 30 July.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose who arranges/pays removal of the old machine, reply by 30 July | Henry Ingram, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant she may fit her own machine, it stays hers, and that we are checking removal cost of the old one | Ruben, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up 30 July on landlord reply | Henry Ingram, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Ruben, good news: your landlord has agreed you can fit your own washing machine. It stays yours and you take it with you when you leave (you would arrange and pay for its removal then). The landlord also asked that you pay to remove the old machine; we are checking this with them, as that is the landlord's item and you should not be charged for it. Please hold off arranging its removal until we confirm. You can go ahead and buy your machine. We will update you by 30 July.

**A4 · send_message → Henry Ingram (landlord) via email, agency landlord record** (verified)

> Hello Henry, thanks for your call about Flat 9, 59 Alder Lane. We have recorded that Ruben may fit her own washing machine at her cost, and take it when she leaves (removal then at her cost). One point: the existing LG machine is yours, so by law we cannot charge the tenant for its removal (about £24-30). How would you like to proceed: (a) you cover the removal, or (b) you arrange it yourself? Please reply by 30 July. The tenant's machine will not be on the inventory.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Approval does not settle who pays removal of the old machine
- Nothing booked; no contractor assigned
- Tenant's machine is not on inventory and landlord's old one remains landlord's until disposal agreed

## Remaining work
- Landlord to decide removal of old machine and payer (agency, 30 July)
- Update tenant by 30 July
- Close without payment once tenant confirms new machine fitted and old one dealt with

## Missing or unavailable information
- Landlord's answer on removal cost
- Confirmation tenant's machine installed

## Conflicts between sources
- Event 004 call summary names Flat 18, 128 Meadow Row; the case and event 007 confirm Flat 9, 59 Alder Lane (landlord owns both). Trusted the ticket and event 007.
- Landlord's condition (tenant pays removal of his machine) conflicts with Tenant Fees Act; the system's event 008 recorded it unconditionally.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved the tenant's own machine (route: own appliance, no contractor). Outstanding: who arranges and pays removal of the landlord's old machine, and confirmation of installation.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Henry Ingram asking how to handle removal (reply by 30 July); email to tenant Ruben with the position; follow-up on 30 July.

**3. Does anything need a human decision, and why?**

No. The Tenant Fees Act point was handled by asking the landlord; escalate only if he insists the tenant pays.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-105","decision":"conditional","conditions":"Tenant may fit her own machine at her cost; she takes it when she leaves. Lan… | 1 | ✅ verified | Ticket NBL-105 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-105","note":"Route: tenant's own replacement machine (alteration/own appliance), landlord's machine stays landlord's. Event 0… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-105","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry Ingram","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-105","bo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-105","due_on":"2025-07-30","party":"Henry Ingram, landlord","purpose":"Chase landlord on who pays/arranges removal of old… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
