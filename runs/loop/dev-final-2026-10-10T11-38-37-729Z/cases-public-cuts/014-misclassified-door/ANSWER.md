# Case 014: Front Door Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Intake wrongly tagged the door complaint as a fridge appliance issue. I noted the correction on the ticket and asked the tenant for door/glass details. The landlord approval request failed twice, so I escalated it.

## Where the case stands
Intake stage, no landlord decision, no contractor. Misclassified as Appliances; actually a door repair. Waiting on tenant answers; landlord request failed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant to confirm door security, glass condition, photo, access | Tenant, Flat 12 | email | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | Escalate failed landlord approval request so it is sent another way | internal, maintenance | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant, Flat 12 (tenant) via email, existing thread (event 001 note)** (verified)

> - Sorry, our system wrongly treated this as a fridge problem; ignore the fridge questions. Does the front door still lock and secure properly when closed?
> - Is any glass in the door cracked or loose? If so, please keep clear of it and tell us straight away.
> - Could you send a photo of the door and where it catches or sticks, and let us know good access times and whether there are any pets?
> 
> Why: Need to scope the door repair and check whether it is a security or glass safety issue.

**A3 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (failed)

> Tenant reports the front door (and back door) must be slammed to shut; a visiting engineer warned the glass could shatter. Shall we send our contractor to inspect and adjust/repair, or will you arrange your own?
> 
> Options: Use our contractor (recommended); Landlord arranges own contractor

**A4 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (failed)

> Tenant reports the front door (and back door) must be slammed to shut; a visiting engineer warned the glass could shatter. Shall we send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Use our contractor (recommended); Landlord arranges own contractor

## Escalation
- **P3 → maintenance** (verified): Landlord approval request failed twice (HTTP 500); no landlord contact on property record
  - Known: Ticket NBL-014-misclassified-door at intake, wrongly tagged Appliances; real issue is front/back door needing slamming, glass shatter risk per fridge engineer. Ticket noted as reclassified (A1). Tenant asked for photos, security/glass status, access (REQ-101, A2).
  - Missing: Landlord contact, spend limit, preferred contractor; tenant answers; glass condition.
  - Options: Send landlord the our-contractor/own-contractor question manually; Recategorise ticket to locks/doors
  - Recommendation: Send landlord approval request by another route, then assign a contractor once approved; upgrade to urgent if tenant reports cracked glass or door not securing.

## What this does not establish
- The note does not change the system category field or approve any work
- No contractor assigned and no visit booked
- Nothing has been sent to the landlord

## Remaining work
- Landlord decision (our/own contractor) - human to send
- Tenant reply on glass/security/photos/access
- Assign contractor after approval and book visit

## Missing or unavailable information
- Landlord contact and spend limit
- Door/glass condition
- Access details and pets

## Conflicts between sources
- Intake classified as Appliances (fridge) but the tenant's words describe a door fault; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as Appliances. Outstanding: landlord decision, tenant details, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Tenant info request by email (sent, REQ-101); landlord approval request needs sending by a human since the tool failed.

**3. Does anything need a human decision, and why?**

Not a decision, but a human must route the landlord request because the tool failed (ESC-102). Upgrade to urgent if glass is cracked or door will not secure.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake tagged this as Appliances (fridge Q&A) but the issue is the front door (and… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["S… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (a… | 1 | ❌ failed | No request_landlord_approval record on read-back |
| A4 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (a… | 1 | ❌ failed | No request_landlord_approval record on read-back |
| A5 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Landlord approval request failed twice (HTTP 500); no landlord contact on property record","… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
- A3: Retried once (A4), failed; escalated as ESC-102
- A4: Retry failed with HTTP 500; escalated as ESC-102
