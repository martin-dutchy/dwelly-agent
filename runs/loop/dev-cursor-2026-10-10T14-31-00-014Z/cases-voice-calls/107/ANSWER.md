# Case 107: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair approved and assigned, but the visit date is in conflict (30/08 is a Saturday; tenant says 8 Sept). I asked the provider to confirm, told the tenant it is unconfirmed and gave helplines, recorded the landlord approval and put the job on hold to 1 Sept. The safeguarding escalation was already made at event 023.

## Where the case stands
Ticket NBL-107 at visit stage, landlord approved, provider assigned. Visit date unconfirmed: system says 30/08/2025 (a Saturday labelled Monday), tenant says 8 Sept agreed with Isaac. Waiting on provider to confirm; on hold to 2025-09-01. Safeguarding P1 already escalated at event 023.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the actual visit date and not attend 30/08 unless confirmed, reply by 1 Sept | Keystone Compliance / Isaac, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit is unconfirmed, ask whether 8 Sept is acceptable with oven out of use, give Samaritans/999 and say a colleague will check in | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Hold awaiting provider date confirmation, review 2025-09-01 | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Keystone Compliance (Isaac) (contractor) via email, existing thread (event 018 email to contractor)** (verified)

> - Please confirm the actual date and time you agreed with the tenant for the oven repair at Flat 3, 3 Willowmere Road. Our records say 'Monday 30/08/2025' but 30 August 2025 is a Saturday; the tenant says she agreed Monday 8 September with Isaac and cannot do tomorrow.
> - Please do not attend on 30/08 unless you have confirmed it with the tenant. Please reply by end of Monday 1 September.
> 
> Why: Conflicting visit dates; only the provider can confirm the booking, so nothing is booked until you reply.

**A3 · send_message → Clara (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hi Clara, thanks for calling today, and sorry for the confusion over the oven visit. Our records show 30 August (which is a Saturday, so the "Monday" wording was wrong). You told us you agreed Monday 8 September with Isaac. We are asking the engineer to confirm the date now. Until he does, the visit is not confirmed, so please don't expect anyone tomorrow. We'll update you by Monday 1 September. As the oven is out of use, is 8 September acceptable? We can ask for an earlier slot if not. Also, you mentioned some difficult things on the call. If you are struggling, Samaritans are free on 116 123 any time, and in immediate danger please call 999. A colleague will also be in touch to check how you are. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or set; the date is unconfirmed
- The safeguarding escalation was made by the earlier event 023 and not repeated; I cannot confirm a human has contacted the tenant
- Landlord approval covers sending the contractor only, not any quote or cost

## Remaining work
- Provider to confirm date; then set_visit and notify tenant
- Human safeguarding follow-up with tenant (owner: safeguarding team, P1 already raised)
- Oven fault diagnosis, any quote to landlord
- Landlord not yet told about the date confusion

## Missing or unavailable information
- Provider-confirmed visit date
- Oven make/model (tenant said 'Harbour Services')
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but labelled Monday (events 017-020); tenant says 8 Sept (event 021)
- Provider named Keystone Compliance, Riverside Works, Lantern Utilities; tenant named Ruben Oakley, Clara Hedges/Hughes; treated as same job and people
- Tenant said she was joking about suicidal remark; treated as still a safeguarding concern

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Approved and assigned; visit date unconfirmed (30/08 Saturday vs tenant's 8 Sept). Provider confirmation outstanding; safeguarding P1 open with humans.

**2. What is the next action, for whom, via which channel?**

Email to Keystone Compliance to confirm the date (A2); email to tenant with status, helplines and a question about 8 Sept (A3).

**3. Does anything need a human decision?**

Only the safeguarding follow-up, already escalated P1 at event 023. Nothing else; the date conflict is routine and with the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"107","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to agency's event 004… | 1 | ❌ failed | Ticket 107 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Keystone Compliance (Isaac)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email … | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)","body":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"107","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm visit date: system says 30/08/2025… | 1 | ❌ failed | Ticket 107 not found on read-back |
| A5 | `add_note` | {"entity":"107","note":"Conflicts: visit 30/08/2025 (events 017-020) labelled Monday but is Saturday; tenant says 8 Sept agreed with Isaac (… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-107","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to event 004 aski… | 1 | ✅ verified | Ticket NBL-107 read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-107","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm visit date: system says 30/08/… | 1 | ✅ verified | Ticket NBL-107 read back after put_on_hold |

## Failed or unverified actions
- A1: Used wrong ref 107; retried as NBL-107 (A6, verified)
- A4: Wrong ref; retried as NBL-107 (A7, verified)
