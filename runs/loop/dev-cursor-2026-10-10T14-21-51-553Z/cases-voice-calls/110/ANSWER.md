# Case 110: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord agreed by phone that the tenant can fit her own washing machine, with £10 from him towards removing the old LG. I recorded the decision as tenant self-fix, noted the mislabelled own_contractor entry and the wrong-address call note, and told both tenant and landlord. A follow-up is set for 30 July.

## Where the case stands
NBL-110 still at init stage. Landlord agreed by phone (event 007) to the tenant fitting her own machine; landlord pays £10 towards removing the old LG, tenant pays the rest. Waiting on landlord written confirmation and on the tenant to fit the machine and remove the old one.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell Ruben the landlord agreed, the machine stays hers, the £10/remainder split, and when she will next hear from us | Ruben, tenant | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask the landlord to confirm the summary in writing by 30 July | Henry Ingram, landlord | email | A4 ✅ |
| 3 | WAIT | Follow up 30 July: landlord confirmation, new machine fitted, old LG removed, then close without payment | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, good news: your landlord has agreed by phone that you can fit your own washing machine. It stays yours and you can take it when you leave, which means the flat will have no machine afterwards. For removing the old LG, the landlord will contribute £10 and you would cover the rest. Please let us know once the new machine is in and how the old one is being removed. We're sending the landlord a written summary to confirm, and will update you by 1 August at the latest. Sorry for any confusion.

**A4 · send_message → Henry Ingram (landlord) via email, agency landlord record** (verified)

> Hi Henry, thanks for your call about Flat 9, 59 Alder Lane. To confirm what we noted: Ruben fits her own washing machine (hers, not on the inventory, taken with her when she leaves, so the flat will then have no machine). You contribute £10 towards removing the old LG; Ruben pays the rest. Please reply "yes" if that is right, or tell us if not, by 30 July. Apologies, an earlier call note mentioned a different address in error; please ignore it.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord consent does not mean the new machine is fitted or the old LG removed.
- The £10 contribution is not a payment made; no invoice exists.
- No contractor was assigned and no repair is being done.

## Remaining work
- Landlord written confirmation (landlord, by 30 July)
- Tenant to fit machine and arrange removal of old LG (tenant)
- Agency to close without payment after confirmation (agency, review 30 July)

## Missing or unavailable information
- Who removes the old LG and when
- Landlord's clear written confirmation, since the call transcript was muddled

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row, a different property; not used for this job.
- Event 008 recorded own_contractor, but the call shows tenant self-fix; treated as tenant_self_fix.
- Landlord first said he would not cover removal, then agreed to £10; I used the latest statement. The £24.37-30 cost is an estimate.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has consented by phone. Outstanding: written confirmation, the tenant fitting the new machine, removal of the old LG, then closing without payment.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the tenant (update) and to the landlord (confirmation request), plus a follow-up on 30 July.

**3. Does anything need a human decision, and why?**

No. The landlord has decided and the rest is routine. If he disputes the summary, review it again.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-110","decision":"tenant_self_fix","evidence_quote":"I will contribute 10 pounds, the cost.","source":"event 007, phone ca… | 1 | ✅ verified | Ticket NBL-110 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-110","note":"Route: tenant self-fix/replacement with landlord consent (phone, event 007). Event 008 labelled it own_contracto… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-110","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry Ingram","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-110","bo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-110","due_on":"2025-07-30","party":"Henry Ingram / Ruben","purpose":"Check landlord written confirmation; check tenant fi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
