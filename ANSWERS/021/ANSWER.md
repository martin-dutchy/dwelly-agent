# Hot-water service report: ANSWER

**Decision:** action_taken · **Severity:** urgent

Hot water has been out since 6 May on a landlord-arranged route. The landlord says his plumber fixed it on 14 May, with no evidence, and the tenant has not confirmed. I logged the letterbox report as its own job, wrote to the tenant by letter, texted the landlord for details and consent to send our contractor if needed, and put the job on hold to 19 May.

## Where the case stands
Open, on hold to 2025-05-19. Landlord's own-contractor route; landlord claims fixed 14 May (unevidenced); tenant's last statement (13 May) is no hot water, and she has not answered since.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_TENANT | Letter asking the tenant to confirm whether hot water works and to describe the letterbox fault | Iris Vale, tenant | letter | A3 ✅ |
| 2 | CHASE_LANDLORD | SMS asking for plumber details, work done and consent to send our contractor, reply by 19 May | Ravi Sethi, landlord | sms | A4 ✅ |
| 3 | SPLIT_NEW_REQUEST | Logged the letterbox fault as a separate job | internal | internal | A1 ✅ |
| 4 | WAIT | Hold until 19 May for tenant and landlord replies | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Iris Vale (tenant) via letter, 17 Wrenfold Quay, Larkhollow, ZZ1 1ZZ** (verified)

> Dear Iris, we are sorry about the long wait for hot water. Your landlord says his plumber attended on 14 May and fixed it, but we have not heard from you since, so we are not treating it as fixed. Please tell us: is hot water working now, and does the boiler have power? If not, reply and we will press the landlord today and arrange our own contractor as a back-up. If anyone at home feels unwell or is struggling, tell us. We have also logged your letterbox problem as a separate job (JOB-101); please tell us what is wrong with it. We will contact you again on Monday 19 May. A reply by email, portal or phone to us is fine.

**A4 · send_message → Ravi Sethi (landlord) via sms, agency landlord record** (verified)

> Hi Ravi, re 17 Wrenfold Quay hot water (NBL-021). The tenant has not confirmed it is fixed and last told us (13 May) there was no hot water. Please reply by Monday 19 May with: your plumber's name, what was found/done on 14 May (boiler power fault?), and any invoice or report. If the tenant still has no hot water we would like to send our own contractor straight away, as you offered on 12 May. Please confirm yes/no.

## Escalations
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Iris Vale / Ravi Sethi | Check tenant confirmation and landlord's plumber details; escalate if unresolved | 2025-05-19 | A5 ✅ verified |

## What this does not establish
- The landlord's claim of a fix is unverified and does not show the problem is resolved
- Nothing here establishes the cause of the boiler power loss
- The letterbox job is logged only; its fault is unassessed
- The letter does not confirm any appointment

## Remaining work
- Confirm with tenant whether hot water is restored (agency, 19 May)
- Obtain plumber details and report from landlord
- Send agency contractor and escalate P2 if still no hot water
- Triage JOB-101 letterbox
- Gas Safe/electrical check if the boiler fault is unexplained

## Missing or unavailable information
- Tenant confirmation of current hot-water status
- Plumber name, work done, invoice
- Boiler make/model
- Letterbox fault details

## Unknowns
- Whether hot water has actually been restored
- What the plumber did

## Conflicts between sources
- Landlord says fixed 14 May; tenant's latest statement (13 May) says no hot water. Treating as unresolved until the tenant confirms.
- Ticket categorised Electrical and moved to a landlord-managed route while the hint says the approval gate is still open; the landlord's calls give no formal written decision.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Open and unverified. Landlord says fixed on 14 May via his plumber (no name, report or invoice); tenant's latest word is no hot water and she has not replied to the voicemail or email of 15 May. Outstanding: tenant confirmation, plumber details, cause of the power fault, and the letterbox (now JOB-101).

**2. What is the next action, who for, which channel?**

Letter to tenant Iris Vale asking her to confirm status (A3), as email and a call went unanswered. SMS to landlord Ravi Sethi asking for plumber details and consent to send our contractor (A4). Hold with review on 19 May (A5).

**3. Does anything need a human decision?**

Not yet. If the tenant says there is still no hot water on 19 May, or the landlord does not reply, escalate P2 maintenance and send our contractor.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"17 Wrenfold Quay, Larkhollow, ZZ1 1ZZ","category":"locks","severity":"routine","description":"Tenant Iris Vale reported on a ca… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `add_note` | {"entity":"NBL-021","note":"Route: landlord (Ravi Sethi) arranging his own plumber (calls 6, 12 and 15 May). No contractor name, report or i… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Iris Vale","recipient_role":"tenant","channel":"letter","contact":"17 Wrenfold Quay, Larkhollow, ZZ1 1ZZ","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ravi Sethi","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-021","body":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-021","reason":"Waiting for Tenant","comment":"Awaiting tenant confirmation that hot water works, and landlord's plumber d… | 1 | ✅ verified | Ticket NBL-021 read back after put_on_hold |

## Failed or unverified actions
_None._
