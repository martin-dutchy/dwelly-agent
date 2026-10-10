# Maintenance report at 8 Brindlefern Walk: ANSWER

**Decision:** action_taken · **Severity:** urgent

Landlord claims he completed the smoke alarm and socket work himself on 31 Aug, with no evidence and no tenant confirmation. I asked both parties for confirmation and evidence, noted the record, and set a 10 Sep follow-up; the job stays open.

## Where the case stands
NBL-030 at init stage; landlord doing own work and claims completion 31 Aug; unverified. Waiting on tenant confirmation and landlord evidence; review 10 Sep.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant to confirm working alarm fitted, socket status and bathroom damp | Nessa Quill, tenant | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask landlord who fitted the alarm, evidence of tested alarm and electrician check of sockets, bathroom damp details, by 10 Sep | Tavian Rusk, landlord | email | A2 ✅ |
| 3 | WAIT | Follow up 10 Sep before any closure | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Nessa Quill (tenant) via email, existing thread (event 001 portal)** (verified)

> Hi Nessa, your landlord says the landing smoke alarm work was done on 31 August, and that he also tightened/secured some sockets and gave you a dehumidifier for the bathroom. We haven't confirmed this yet, so could you tell us: 1) Is a working smoke alarm now fitted on the landing, and has the ceiling hole gone? 2) Are any sockets still loose or coming away from the wall (any scorching, buzzing or warm sockets, please stop using them and tell us at once)? 3) Did you receive the dehumidifier, and is there any damp or mould in the bathroom? If there is no working alarm at the moment, please tell us today. We will review this with you by 10 September.

**A2 · send_message → Tavian Rusk (landlord) via email, agency landlord record** (verified)

> Dear Mr Rusk, thank you for the update. We have noted it, but we cannot mark the job complete until we have confirmation from the tenant, so we're checking with her. Please could you reply by 10 September with: who fitted the new smoke alarm and its type (mains/battery, and that it is tested and working), and whether a qualified electrician checked the loose sockets (including the kitchen socket after the February boiler work) - an electrical installation report or certificate would help. Also, the dehumidifier suggests damp in the bathroom; please tell us what you know so we can log it. If you'd prefer us to arrange any of this, let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm the alarm is fitted or the sockets are safe
- Not closed; landlord's claim is unverified
- No decision recorded as own_contractor formally (exact landlord quote not available in case text); route noted instead

## Remaining work
- Tenant confirmation of working alarm and sockets
- Landlord evidence of work and electrician check
- Possible bathroom damp job if tenant confirms
- Update property record only after confirmation
- If tenant says no working alarm, escalate/arrange urgent fit

## Missing or unavailable information
- Who did the work and what alarm was fitted
- Tenant's confirmation
- Electrical competence/certificate for sockets
- Bathroom damp status

## Conflicts between sources
- Landlord says tenant is aware of the dehumidifier; the tenant never reported damp and has not been heard from since event 001
- Landlord's socket dates (5 Aug, 6 Aug) predate the tenant's 20 Aug report

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord is doing the work himself and says it was done 31 Aug. Unverified: tenant has not confirmed a working alarm, sockets safe, or damp status; no evidence from landlord.

**2. What is the next action, who is it for, and through which channel?**

Confirmation requests by email to the tenant (A1) and the landlord (A2), with a follow-up on 10 Sep (A4).

**3. Does anything need a human decision, and why?**

Not yet. Escalate if the tenant reports no working alarm or unsafe sockets, or if the landlord gives no evidence by 10 Sep.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Nessa Quill","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 portal)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tavian Rusk","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-030","bod… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-030","note":"Route: landlord doing own work (events 007, 010). Completion claimed 31 Aug (event 012, 014) with no contractor … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-030","due_on":"2025-09-10","party":"Nessa Quill / Tavian Rusk","purpose":"Check tenant confirms working smoke alarm and s… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
