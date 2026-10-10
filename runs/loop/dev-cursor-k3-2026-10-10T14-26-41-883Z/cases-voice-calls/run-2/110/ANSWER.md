# Case 110: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord agreed by phone that the tenant may fit her own washing machine and offered £10 towards removing the old LG. I recorded the decision, noted the route, and told the tenant and landlord. The tenant cannot be charged for removing the landlord's item, so I asked the landlord to say who covers the balance, and set a follow-up for 30 July.

## Where the case stands
NBL-110 at intake stage. Landlord agreed by phone (event 007) to tenant fitting her own machine, with £10 towards removal of the old LG. Open: who pays the removal balance, and the landlord's reply on that.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask landlord who covers the removal balance (tenant cannot be charged), reply by 30 July | Henry Ingram, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant her own machine is agreed, removal balance being checked, next update by 30 July | Ruben, tenant | email | A3 ✅ |
| 3 | WAIT | Follow-up on 30 July for landlord answer | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, thanks for your patience. Your landlord has agreed by phone that you can fit your own washing machine. It stays yours and you can take it with you when you leave. He has offered £10 towards removing the old LG. You can't be required to pay for removing the landlord's machine, so we are checking with him how the rest will be handled and will confirm. Please hold off on removing the old machine until we do. We will update you by 30 July. Sorry for any confusion.

**A4 · send_message → Henry Ingram (landlord) via email, agency landlord record** (verified)

> Hi Henry, thanks for your call about Flat 9, 59 Alder Lane. We have recorded that you agree the tenant may fit her own washing machine, which stays hers and leaves with her, so the flat will have no machine afterwards. You will contribute £10 towards removing the old LG. One point: the LG is your item, so the tenant cannot lawfully be made to pay the rest of its removal cost. Please reply by 30 July to say whether you will cover the remainder (about £24-30 in total) or arrange removal yourself. The tenant will be told the outcome.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord consent does not decide who pays the removal balance beyond £10.
- Does not make the tenant's machine part of the property or inventory.
- No repair or contractor assigned; no spend approved beyond the £10 contribution.

## Remaining work
- Landlord to say who pays the removal balance; agency to update tenant (due 30 July)
- Arrange removal of old LG
- Close ticket without payment once the new machine is fitted and the old one removed

## Missing or unavailable information
- Landlord's answer on the removal balance
- Confirmation the old LG has been removed

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row (ZZ5 9ZZ), a different property; ignored as not about this job.
- Event 008 labels the decision own_contractor, but it is a tenant-supplied appliance with landlord consent; I recorded it as conditional.
- The landlord call transcript is garbled; he confirmed 'Yeah, I agree' after a read-back.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has consented by phone. The balance of the removal cost and the arrangement to remove the old LG are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord to confirm who covers the removal balance by 30 July, and email the tenant with an update. Both are sent.

**3. Does anything need a human decision?**

No. The landlord can settle the removal balance, and a human is not needed unless he refuses or the tenant is pressed to pay.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-110","decision":"conditional","evidence_quote":"No, no, no. I would not cover, I would not cover the cost. I will contrib… | 1 | ✅ verified | Ticket NBL-110 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-110","note":"Route: tenant supplies own machine (tenant's property, not on inventory, taken when she leaves). Landlord agreed… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-110","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry Ingram","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-110","bo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-110","due_on":"2025-07-30","purpose":"Chase landlord on who pays the removal balance of the old LG; update tenant","party… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
