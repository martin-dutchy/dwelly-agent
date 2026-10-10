# Case 110: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant wants to replace the broken LG with her own machine. The landlord agreed by phone, but offered only £10 towards removal with the tenant paying the rest, which cannot be charged to her. I recorded the conditional consent, asked the landlord to settle removal and disposal, updated the tenant, and set a follow-up for 30 July.

## Where the case stands
NBL-110 at intake stage. Landlord consented by phone to the tenant fitting her own machine. Outstanding: who pays removal of the old LG (the landlord's offer of £10 with the tenant paying the rest is not allowed), what happens to the LG, and whether the tenant's machine can stay connected. Waiting on the landlord, follow-up 30 July.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord who covers full LG removal and disposal, and whether tenant's machine can be connected, by 30 July | Henry Ingram, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is given in principle, she won't pay for removing the landlord's machine, and we'll update her by 31 July | Ruben, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up with landlord 30 July | Henry Ingram, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Henry Ingram (landlord) via email, agency landlord record** (verified)

> Hi Henry, thanks for speaking with us today about Flat 9, 59 Alder Lane. We have noted you agree to Ruben fitting her own washing machine, which stays hers and leaves with her, so the flat will have no machine after she goes. One correction: the old LG machine is yours, so under the Tenant Fees Act we cannot ask Ruben to pay any part of its removal. Could you tell us by Wednesday 30 July: (1) will you cover the full removal cost (usually about £24-30), or would you like the LG removed another way; and (2) is it fine for her machine to be connected in its place? We have not arranged any removal yet. Thanks, Northbridge Lettings

**A4 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, update on the washing machine: your landlord has agreed in principle to you fitting your own machine, which stays yours and can go with you when you leave. Please hold off removing the old LG until we confirm. The landlord's offer to part-pay its removal needs correcting: you will not be asked to pay for removing his machine, and we are confirming how that will be covered. We'll be back in touch by Thursday 31 July. Many thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Consent does not settle who pays removal of the old LG.
- No contractor or removal has been arranged.
- Landlord's phone words were muddled, so the consent is recorded as conditional and re-confirmed in writing.

## Remaining work
- Landlord reply on removal cost, LG disposal and connection of tenant's machine (agency, by 30 July)
- Update tenant by 31 July
- Close without payment once settled

## Missing or unavailable information
- Landlord's answer on full removal cost and disposal of the LG

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row, a different property; ignored for this job.
- Event 008 says own_contractor, but the tenant is fitting her own machine and no contractor is involved; treated as conditional tenant self-fit consent.
- Landlord's phone replies were inconsistent (said he would not cover the cost, then agreed); the £10 contribution is the latest statement.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Landlord consented in principle by phone. The removal cost split, disposal of the LG and connection of the tenant's machine are still open.

**2. What is the next action, who for, which channel?**

Email to the landlord asking how the removal will be paid and handled, with a reply date of 30 July. Tenant updated by email.

**3. Does anything need a human decision?**

No. The landlord's choice on removal is routine, and I am chasing it. Escalate only if he does not answer.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"110","decision":"conditional","conditions":"Tenant may fit her own machine and take it when she leaves (flat left without one… | 1 | ❌ failed | Ticket 110 not found on read-back |
| A2 | `add_note` | {"entity":"110","note":"Route: tenant self-fit of own machine with landlord consent (phone, event 007). Event 008 labels it own_contractor, … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Henry Ingram","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"110","body":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"110","body… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"110","due_on":"2025-07-30","party":"Henry Ingram, landlord","purpose":"Chase landlord for who pays LG removal, LG disposal, a… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-110","decision":"conditional","conditions":"Tenant may fit her own machine and take it when she leaves (flat left without… | 1 | ✅ verified | Ticket NBL-110 read back after record_landlord_decision |

## Failed or unverified actions
- A1: First attempt used the wrong ref (110); retried with NBL-110 and it verified as A6.
