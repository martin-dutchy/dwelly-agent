# Case 107: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair job approved and assigned, but the booked date is wrong/conflicting. I asked the provider to confirm the true date, told the tenant it is unconfirmed (with Samaritans details), and set a follow-up for 1 Sept. Safeguarding was already escalated P1, so I did not duplicate it.

## Where the case stands
Landlord approved Keystone Compliance (26 Aug). Visit recorded as 30/08/2025 10:00 (a Saturday, labelled Monday); tenant cannot attend and says she agreed Mon 8 Sept with Isaac. No provider-confirmed date. Awaiting Keystone's confirmation. A P1 safeguarding escalation is already open (event 023).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm the real visit date by 1 Sept and not to attend 30/08 unconfirmed | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant date is unconfirmed, nobody expected 30/08, ask if 8 Sept is acceptable given no oven, give Samaritans/999, say we update by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on 1 Sept for provider's confirmed date, then set_visit | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please confirm the actual visit date for the oven repair at Flat 3, 3 Willowmere Road. Our booking says "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday. The tenant says she cannot do that and agreed Monday 8 September with Isaac by phone (the call note names Riverside Works). Please reply by end of Monday 1 September with the date and time you have actually agreed, and confirm whether that was you. Please do not attend on 30/08 unless you confirm it with the tenant. The main oven element is not heating (grill works).

**A2 · send_message → Clara (tenant) via email, existing thread (event 019 email)** (verified)

> Hi Clara, thanks for calling. Our booking (30/08, labelled "Monday") doesn't fit with the calendar, and you've told us you agreed Monday 8 September with Isaac. That date is not confirmed yet. We have asked the engineer to confirm the right date, and nobody should be expected on 30 August. We will update you by Monday 1 September. As you are without a working main oven until then, please tell us if 8 September is acceptable or if you'd like us to ask for a sooner slot. Also, you said some worrying things on the call. If you are struggling, Samaritans are free on 116 123 any time, and in immediate danger call 999. A colleague will be in touch to check in.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or confirmed; 8 Sept is only the tenant's claim
- Does not resolve the safeguarding concern, which sits with the human escalation already raised
- Does not establish the oven fault cause or cost

## Remaining work
- Keystone to confirm the date; then set_visit and tell tenant
- Safeguarding colleague to contact the tenant (event 023)
- Record result after visit; quote to landlord if needed

## Missing or unavailable information
- Provider-confirmed visit date
- Oven make/model and attachment on event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but labelled Monday; tenant says 8 Sept; provider not confirmed
- Provider named as Keystone, Riverside Works, Lantern Utilities
- Tenant named Ruben Oakley, Clara Hedges, Clara Hughes, Grace Mercer, Harriet Fletcher; trusted the case thread as identifying the tenant

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned to Keystone; visit date conflicting (30/08 Saturday vs tenant's 8 Sept) and unconfirmed by provider. Safeguarding escalation open.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance to confirm the date, and email to tenant explaining it is unconfirmed; follow-up 1 Sept.

**3. Does anything need a human decision, and why?**

Only the safeguarding matter (suicidal statement, later said joking), already escalated P1 at event 023. The date conflict is routine and handled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","body":"Hi Clara, thanks… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Check Keystone has confirmed the real visit date (30/08 Saturday vs 8 Sept per tenant); then set_visit and… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"107","note":"Date conflict: system visit 30/08/2025 10:00 (event 017) labelled Monday but is a Saturday; tenant says Mon 8 Sept a… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
