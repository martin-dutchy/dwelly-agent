# Case 113: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Washing machine repair awaiting landlord approval. I sent the landlord the tenant's 27 Dec deadline and the own-machine question, told the tenant the 25 Dec slot is unconfirmed, and put the ticket on hold to 26 Dec.

## Where the case stands
Intake/landlord approval gate; no contractor assigned; landlord asked 24 Dec 10:02 and reminded with the tenant's deadline; on hold to 26 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose route, consent to tenant's own machine, reply by 26 Dec, with tenant's 27 Dec deadline | Landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 25 Dec pm is a preference only, approval pending, next update by 26 Dec | Rowan Price, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 26 Dec | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> Washing machine (in the garage) fills but won't start. Do you want us to send our contractor to inspect, will you arrange your own, or is the tenant to fix it? Please reply by 2026-12-26.
> 
> Options: Send our contractor to inspect (recommended); Landlord arranges own contractor; Tenant self-fix
> 
> Update: Follows our email of 24 Dec. The tenant flies out on 27 Dec for two weeks and asked for a visit before then; they suggested the afternoon of 25 Dec, which is only a preference and not booked, as no contractor is assigned. The tenant also has their own washing machine and asks if it can be fitted if yours can't be repaired. That needs your consent; there are no isolation valves, so please say who pays for any plumbing and removal of your machine. Nothing will be instructed until you reply.

**A2 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for your call. We've noted you need this looked at before you fly out on 27 December, and that the afternoon of 25 December suits you. We're still waiting for the landlord to approve an engineer, so that afternoon is your preference, not a booked visit yet. We've told the landlord about your deadline and asked for a reply by 26 December. Your own machine can only be swapped in with the landlord's consent, so we've asked them about that too. Please don't fit it until we confirm. We'll update you by 26 December at the latest, sooner if the landlord replies.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked and no contractor assigned
- Nothing approved by the landlord
- Tenant's own machine swap not consented

## Remaining work
- Landlord decision (agency, by 26 Dec)
- Then assign contractor and get provider-confirmed date before 27 Dec
- Confirm with tenant whether machine fills or is completely dead

## Missing or unavailable information
- Landlord decision
- Provider availability
- Tenant's description inconsistent (fills with water vs completely dead)

## Conflicts between sources
- Hint dates 24/25/27 Dec are the tenant's call remarks: 25 Dec is the preferred slot, 27 Dec the departure date; none is provider-confirmed
- Tenant said machine fills with water, then 'completely dead'

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

At the landlord approval gate. The landlord has not replied (asked only today). No contractor is assigned and no visit is booked. The tenant wants a visit before 27 Dec.

**2. What is the next action, for whom, which channel?**

Landlord approval request with the deadline, by email, to the landlord. Tenant update by email. Hold until 26 Dec.

**3. Does anything need a human decision?**

No escalation now. The decision belongs to the landlord. If there is no reply by 26 Dec, escalate P2/P3 for the pre-holiday deadline.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-113","decision_needed":"Washing machine (in the garage) fills but won't start. Do you want us to se… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","body":"Hello Rowa… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-113","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on route (our contractor/own/tenant fix) and c… | 1 | ✅ verified | Ticket NBL-113 read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-113","note":"Tenant call event 007: preferred visit 25 Dec pm, machine in garage, away from 27 Dec. Not a booking (no provide… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
