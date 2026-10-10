# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's email duplicates open job R-4801 (dripping kitchen tap, visit 15 Oct). No new job; noted the worsening on the ticket, replied to the tenant and informed the contractor.

## Where the case stands
R-4801 at visit stage, Swift Plumbing & Heating booked 15 Oct 08:00-12:00, confirmed with tenant. Waiting on the visit.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the job is already booked for 15 Oct 8-12 and gave interim advice | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Told contractor the drip has worsened, asked if they can come sooner | Swift Plumbing & Heating, contractor | sms | A3 ✅ |
| 3 | OTHER | Added note to R-4801 about worsening | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hello Amelia, thanks for letting us know. Your kitchen tap is already booked under job R-4801: Swift Plumbing & Heating are due on Thursday 15 October, 8am-12pm. I've added a note that the drip is getting worse so the plumber knows. In the meantime, if you can, turn off the isolation valve under the sink to stop the drip, and put a bowl underneath. If water starts to leak elsewhere or you see any sign of flooding, call us straight away. Kind regards, Mare & Co

**A3 · send_message → Swift Plumbing & Heating (contractor) via sms, +447700900312** (verified)

> R-4801 Flat 4, 12 Mare Street: tenant reports the kitchen tap is now dripping constantly even when fully closed. Visit stands for 15 Oct 08:00-12:00; please bring a spare cartridge/washers. Tell us if you can attend sooner.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new job created; the note does not change the visit date or severity
- Asking the contractor to attend sooner does not guarantee an earlier visit

## Remaining work
- Swift attends 15 Oct; ops to follow up on contractor reply about an earlier slot

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. It is the same issue as open job R-4801, which is already assigned and booked. Creating one would duplicate it.

**2. What do you reply to the tenant?**

Said it is already booked under R-4801 for 15 Oct 8am-12pm, that the worsening is noted for the plumber, and gave interim advice (isolation valve, bowl, call if leaking elsewhere).

**3. What do you change on existing records?**

Added a note to R-4801 recording the worsening drip. Nothing else changed: the stage, visit and severity are unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"10 Oct: tenant emailed again – tap now drips constantly even when fully closed (worsening). Treated as duplicate,… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"R-4801","… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
