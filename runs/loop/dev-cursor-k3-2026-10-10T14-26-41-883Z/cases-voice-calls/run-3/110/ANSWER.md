# Case 110: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord agreed by phone that the tenant can fit her own washing machine and take it when she leaves, offering only £10 towards removing the old LG. The tenant can't lawfully be charged for removing the landlord's item. I recorded the conditional consent, asked the landlord how to proceed, told the tenant and set a follow-up for 30 July.

## Where the case stands
Landlord consented by phone to the tenant fitting her own machine. Waiting on the landlord to say how the old LG's removal is handled and paid for. Tenant told. No contractor involved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord how to handle old LG removal, since the tenant cannot be charged for the landlord's item (reply by 30 July) | Henry Ingram, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant her own machine is agreed, she won't be charged for removal of the old one, and we'll update her by 30 July | Ruben, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up with landlord on 30 July | Henry Ingram, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Henry Ingram (landlord)** (verified)

> Thanks for agreeing today that the tenant at Flat 9, 59 Alder Lane can fit her own washing machine and take it when she leaves. One point: the old LG is your item, so by law the tenant can't be made to pay any of its removal cost. How would you like to proceed with the old LG?
> 
> Options: You cover the full removal cost (about £24.37-£30), recommended; You arrange removal or storage of the old LG yourself; Leave the old LG in place for now, tenant's machine fitted alongside if space allows
> 
> Update: No contractor is being sent. The flat will have no landlord-supplied washing machine once she leaves. Please reply by 2025-07-30.

**A4 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, the landlord has agreed by phone that you can fit your own washing machine. It stays yours and you can take it when you leave. Removal of the old LG is the landlord's responsibility, so you will not be asked to pay for it. We're confirming with him how he'd like it handled, so please hold off removing it until we confirm. You'll hear from us by 30 July. Sorry for any confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Consent to the tenant's own machine does not settle who pays removal of the old LG.
- No repair or replacement by the agency is arranged.
- The landlord's £10 offer is not accepted as a charge to the tenant.

## Remaining work
- Landlord to decide on the old LG removal and cost (agency, by 30 July)
- Update the tenant after that
- Confirm the tenant's machine is installed, then close without payment

## Missing or unavailable information
- Landlord's answer on removal cost and how the old LG is handled
- Date the new machine is fitted

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row (ZZ5 9ZZ), a different property; treated as not about this job.
- Event 008 labels the decision own_contractor but no contractor is involved; it is really consent to the tenant's own appliance.
- Landlord offered £10 with the tenant paying the rest, which conflicts with the Tenant Fees Act.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has consented to the tenant's own machine. Outstanding: the removal and cost of the old LG, and the fitting of the tenant's machine.

**2. What is the next action, who is it for, and through which channel?**

The landlord has been asked by email to decide how the old LG removal is handled, by 30 July. The tenant has been updated by email.

**3. Does anything need a human decision, and why?**

No. The landlord's choice on the removal cost is routine and is being asked of him. Escalate only if he stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-110","decision":"conditional","evidence_quote":"Yeah, I agree.","source":"event 007, call 27/07 (landlord agreed tenant f… | 1 | ✅ verified | Ticket NBL-110 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-110","note":"Route: tenant's own replacement machine, with landlord consent by phone (event 007). Tenant's machine stays hers… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_landlord_approval` | {"landlord":"Henry Ingram","ticket_ref":"NBL-110","decision_needed":"Thanks for agreeing today that the tenant at Flat 9, 59 Alder Lane can … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-110","… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-110","due_on":"2025-07-30","party":"Henry Ingram, landlord","purpose":"Chase landlord for decision on who pays/arranges r… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
