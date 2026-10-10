# Case 105: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord agreed by phone that the tenant can fit her own washing machine if she pays installation and removal of the old one, and removes hers when she leaves. I recorded the decision, told the tenant (she had earlier been told the landlord might pay removal), confirmed the terms to the landlord and held the ticket for the tenant's reply.

## Where the case stands
Landlord conditionally approved tenant fitting her own washing machine (call, event 007). Ticket NBL-105 on hold awaiting tenant's agreement to the conditions; review 2025-07-30.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_TENANT | Told tenant the landlord's conditions and asked her to confirm before buying or arranging removal | Ruben, tenant | email | A2 ✅ |
| 2 | OTHER | Confirmed the agreed terms to the landlord in writing, for Flat 9 only | Henry Ingram, landlord | email | A5 ✅ |
| 3 | WAIT | Hold until tenant confirms; review 30 July | Ruben, tenant | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, I'm sorry for the earlier message: I said we'd ask the landlord to cover removal, but he has now replied by phone. He is happy for you to buy and fit your own washing machine at Flat 9, 59 Alder Lane, on these conditions: you pay for installing it and for removing the old LG machine, and you remove your own machine, at your cost, when you leave. Your machine stays yours and isn't part of the property. Please reply to confirm you're happy with this before you buy or arrange removal. If you'd rather not, tell us and we'll look at other options with the landlord. We'll check back with you by 30 July.

**A5 · send_message → Henry Ingram (landlord) via email, agency landlord record** (verified)

> Dear Mr Ingram, thanks for your call. To confirm in writing, for Flat 9, 59 Alder Lane, Eastmere only: you agreed the tenant may fit her own washing machine, paying for installation and removal of the old LG, and removing her own machine at her cost when she leaves (so the flat will have no machine afterwards). We are asking her to accept these terms. Your other property is a separate matter and is not covered by this. Please reply if any of this is wrong; otherwise no action is needed. We will update you once the tenant confirms.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the tenant accepts the costs
- Does not make the new machine landlord property or the agency responsible for it
- Does not cover Flat 18, 128 Meadow Row

## Remaining work
- Tenant to confirm the conditions (agency)
- Close without payment once the tenant has fitted her machine and the old one is removed
- Keep a note that the flat has no landlord machine after she leaves

## Missing or unavailable information
- Tenant's acceptance of conditions

## Conflicts between sources
- Events 004/005 name Flat 18, 128 Meadow Row (and give removal cost £24.37) while the job is Flat 9, 59 Alder Lane; the landlord owns both and confirmed Flat 9 on the call, so event 007 is trusted for this job.
- Event 005 asked the landlord to cover removal; the landlord decided the tenant pays.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Landlord approval is conditional and recorded. The tenant has not yet accepted the conditions, and the machine swap and removal are outstanding.

**2. What is the next action, who for, which channel?**

Email to tenant Ruben (sent) asking her to confirm the conditions, then wait to 30 July. The landlord was also emailed.

**3. Does anything need a human decision?**

No. The landlord's decision is made. Escalate only if the tenant refuses the costs or the landlord disputes the terms.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"105","decision":"conditional","conditions":"Tenant pays for installation of her own machine and removal of the old one; tenan… | 1 | ❌ failed | Ticket 105 not found on read-back |
| A2 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"105","body… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"105","reason":"Waiting for Tenant","comment":"Awaiting tenant Ruben's agreement to landlord's conditions (tenant pays install… | 1 | ❌ failed | Ticket 105 not found on read-back |
| A4 | `add_note` | {"entity":"105","note":"Event 004 call/event 005 email reference Flat 18, 128 Meadow Row (ZZ5 9ZZ) - different property, same landlord; not … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A5 | `send_message` | {"recipient_name":"Henry Ingram","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Dear Mr Ingram, th… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-105","decision":"conditional","conditions":"Tenant pays for installation of her own machine and removal of the old one; t… | 1 | ✅ verified | Ticket NBL-105 read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-105","reason":"Waiting for Tenant","comment":"Awaiting tenant Ruben's agreement to landlord's conditions (tenant pays ins… | 1 | ✅ verified | Ticket NBL-105 read back after put_on_hold |

## Failed or unverified actions
- A1: Used the wrong ref (105); retried with NBL-105 and it verified as A6
- A3: Used the wrong ref (105); retried with NBL-105 and it verified as A7
