# Case 110: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace a broken LG washer with her own. Landlord agreed by phone and offered £10 towards removal with the tenant paying the rest. That split is a prohibited charge on the tenant, so I recorded the conditional consent, wrote to the landlord to correct it and to ask for full cover or his own removal arrangement, told the tenant she won't be charged, and set a follow-up for 30 July.

## Where the case stands
Stage init. Landlord verbally agreed (call, event 007) to tenant fitting her own machine; removal-cost split unresolved because the tenant cannot lawfully be charged. Waiting on landlord reply by 30 July.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm in writing who covers full removal of old LG (tenant cannot be charged) by 30 July | Henry Ingram, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant her own machine is agreed, stays hers, and she won't be charged for removal; next update by 30 July | Ruben, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up with landlord on 30 July | Henry Ingram, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Henry Ingram (landlord) via email, agency landlord record** (verified)

> Hi Henry, thanks for your call about the washing machine at Flat 9, 59 Alder Lane. We've noted you agree to the tenant fitting her own machine, which stays hers and will go with her when she leaves, so the flat will then have no washing machine. One point we need to correct: removing the old LG is your item, so the cost can't be passed to the tenant under the Tenant Fees Act. Please reply by 30 July to say whether you'll (a) cover the full removal cost (usually about £24-30), or (b) arrange removal yourself. We'll tell the tenant meanwhile that she won't be charged. Sorry for the confusion. (Please ignore any earlier message from us that named another address.)

**A4 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, update on the washing machine: your landlord has agreed by phone to you fitting your own machine. It stays yours and you can take it when you leave. You won't be asked to pay to remove the old LG; we're confirming with the landlord how that cost is covered. Please don't dispose of the old one yet until we confirm how it's removed. We'll update you by 30 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord's consent does not settle who pays removal of the old LG
- Does not confirm any removal date or contractor
- Ticket not closed; no work or spend authorised

## Remaining work
- Landlord to confirm removal cost cover/arrangement (owner: landlord, chase 30 July)
- Arrange removal of old LG once confirmed
- Add note on inventory: tenant's machine is hers; flat will lack a machine after she leaves
- Close without payment once done

## Missing or unavailable information
- Landlord's written confirmation of removal arrangement and full cost
- Whether landlord fully understood the flat will have no machine after tenancy (he asked, then agreed)

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row (ZZ5 9ZZ), a different property; not treated as about this job.
- Event 008 labels the decision own_contractor, but the call shows tenant supplying own appliance; recorded as conditional.
- Landlord's call answers were ambiguous (asked whether he'd end up with no machine, then agreed).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord consent to the tenant's own machine is given by phone; the removal-cost arrangement is outstanding, as the landlord's £10 plus tenant-pays-rest split cannot be charged to the tenant.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for written confirmation of removal cover by 30 July, and email to the tenant with an update. Both sent, follow-up scheduled.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord's choice, so I am not escalating.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-110","decision":"conditional","evidence_quote":"Yeah, I agree.","source":"event 007, call 27/07 (phone)","conditions":"Te… | 1 | ✅ verified | Ticket NBL-110 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-110","note":"Route: tenant self-supply of own washing machine (consent given by phone, event 007; system line event 008 label… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Henry Ingram","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-110","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-110","… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-110","due_on":"2025-07-30","party":"Henry Ingram, landlord","purpose":"Chase landlord for written answer on who pays remo… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
