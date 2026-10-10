# Case 105: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord phoned approval for the tenant to fit her own machine, with a condition that she pay to remove the old one; that part is a prohibited charge to the tenant. I recorded the conditional decision, told the tenant, asked the landlord how to proceed, and put the job on hold.

## Where the case stands
NBL-105 on hold (review 30 Jul). Landlord conditionally agreed tenant fits her own machine; open question is who pays removal of the landlord's old machine.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm handling and cost of removing old machine (cannot be charged to tenant), by 30 Jul | Henry Ingram, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant her own machine is agreed in principle, she won't pay removal of the old one, update by 30 Jul | Ruben, tenant | email | A4 ✅ |
| 3 | WAIT | Hold awaiting landlord until 30 Jul | Henry Ingram, landlord | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Henry Ingram (landlord)** (verified)

> Thanks for agreeing Ruben can fit her own washing machine at Flat 9, 59 Alder Lane (not Flat 18, Meadow Row) at her cost, and take it with her when she leaves. One correction: we cannot charge the tenant for removing your old machine, as it is your item. Please confirm how you want the old machine handled and who pays (about £24.37-30).
> 
> Options: Agency arranges removal of the old machine at your cost (recommended); You arrange removal yourself; Tenant's new machine goes in and the old one is left for you to collect
> 
> Update: No contractor has been instructed. Tenant told her own machine remains hers. Please reply by 30 July 2025.

**A4 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, good news: your landlord is happy in principle for you to fit your own washing machine, which stays yours and can go with you when you leave (you would cover its installation and its removal then). You will not be charged for removing the old machine; we are agreeing with the landlord how that is handled and will update you by 30 July. Please hold off disposing of the old one until we confirm. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not authorise any contractor or spend
- Does not settle who pays removal of the old machine
- Does not confirm the tenant's machine is on or off inventory beyond a note

## Remaining work
- Landlord answer on old machine removal (agency, by 30 Jul)
- Update tenant after reply
- Close without payment once tenant has fitted her machine and removal is settled

## Missing or unavailable information
- Landlord's decision on removal of old machine and cost

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row; treated as a different property. Landlord owns both and confirmed Flat 9 in event 007.
- Event 008 says tenant pays removal of old machine; not accepted as prohibited charge for landlord's item.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Landlord has conditionally agreed to the tenant's own machine. Outstanding: landlord's decision on who pays removal of the old machine.

**2. Next action, recipient, channel?**

Landlord asked by email (A3) to confirm removal handling and cost; tenant updated by email (A4).

**3. Does anything need a human decision?**

No. The landlord's answer is awaited and no authority beyond routine is needed; review 30 Jul.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"105","decision":"conditional","evidence_quote":"It doesn't work for me, but if she covers the cost of the installation, then … | 1 | ❌ failed | Ticket 105 not found on read-back |
| A2 | `add_note` | {"entity":"105","note":"Route: tenant fits own machine (landlord conditional OK, call event 007). Tenant's machine stays hers, not on invent… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_landlord_approval` | {"landlord":"Henry Ingram","ticket_ref":"105","decision_needed":"Thanks for agreeing Ruben can fit her own washing machine at Flat 9, 59 Ald… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"105","body… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"105","reason":"Waiting for Landlord","comment":"Awaiting landlord's answer on who pays removal of old machine (cannot be char… | 1 | ❌ failed | Ticket 105 not found on read-back |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-105","decision":"conditional","evidence_quote":"It doesn't work for me, but if she covers the cost of the installation, t… | 1 | ✅ verified | Ticket NBL-105 read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-105","reason":"Waiting for Landlord","comment":"Awaiting landlord's answer on who pays removal of old machine (cannot be … | 1 | ✅ verified | Ticket NBL-105 read back after put_on_hold |

## Failed or unverified actions
- A1: Used wrong ref '105'; retried with NBL-105 as A6, verified
- A5: Used wrong ref; retried with NBL-105 as A7, verified
