# Case 103: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's washing machine fills but won't run. The landlord was emailed at 10:02 and hasn't replied. I linked the phone report as a duplicate, sent the landlord a follow-up covering the own-machine swap, updated the tenant, and put the job on hold until 29 Dec.

## Where the case stands
Intake/landlord approval gate; ticket NBL-103 on hold waiting for the landlord, review 2026-12-29. No provider assigned, no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose our contractor/own contractor and consent to tenant's own machine swap | Landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant one job is open, awaiting landlord, no visit booked, next update by 29 Dec | Rowan Price, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 29 Dec | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord, Flat 15, 55 Alder Lane (landlord)** (verified)

> Follow-up to our email of 24 Dec: please choose how to proceed with the washing machine that fills but won't start a cycle (no display, in the garage; tenant phoned today to ask for a visit as soon as possible). Is it a yes to us sending our contractor to inspect, or will you arrange your own?
> 
> Options: Yes, send our contractor to inspect (recommended); I will arrange my own contractor (please give name and date); Tenant may fix it themselves
> 
> Update: No visit is booked. The tenant also offered to install their own washing machine if yours can't be repaired, and says there are no isolation valves. That needs your consent as an alteration, and we need to know who pays to remove your machine and fit theirs; their machine would stay theirs and off the inventory. Please reply by 29 Dec; we will chase then.

**A2 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for calling today. Your phone report is linked to the same job as your email, so there's only one repair open. We're waiting for your landlord to decide how to proceed, so no visit is booked yet and I can't promise tomorrow, sorry. I've also asked them about swapping in your own machine and who covers the plumbing, as that needs their consent. Please don't swap it until we confirm. I'll update you by 29 December at the latest, sooner if they reply. Please send a photo of the model label if you can.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing approved or booked; the cause of the fault and who pays are not established
- Tenant's own-machine swap is not consented
- Phone ticket R-4902 treated as a duplicate of NBL-103

## Remaining work
- Landlord decision (agency awaiting); then assign contractor and book a provider-confirmed visit
- Chase landlord on a second channel if no reply by 29 Dec

## Missing or unavailable information
- Landlord decision
- Model label photo

## Conflicts between sources
- Tenant gave two different dates of birth on the call (28 Sep, then 30 Sep per passport); the call summary says verified, nothing disclosed.
- The call logged ticket R-4902, but the system lists only NBL-103; treated as a duplicate.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Waiting at the landlord approval gate. Outstanding: landlord decision, contractor, visit, and consent for the tenant's own machine.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent by email (A1) and tenant update by email (A2). Chase the landlord on 29 Dec.

**3. Does anything need a human decision?**

No escalation needed. The decision is the landlord's and is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord, Flat 15, 55 Alder Lane","ticket_ref":"NBL-103","decision_needed":"Follow-up to our email of 24 Dec: please choose how… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-103","reason":"Waiting for Landlord","comment":"Awaiting landlord decision: our contractor / own contractor, plus consent… | 1 | ✅ verified | Ticket NBL-103 read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-103","note":"Phone report (event 007, ref R-4902) duplicates this job; linked, no new ticket. Call ID check: tenant gave DOB … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
