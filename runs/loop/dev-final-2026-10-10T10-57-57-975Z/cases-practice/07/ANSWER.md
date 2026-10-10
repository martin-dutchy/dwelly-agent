# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Amelia's email reports the same dripping kitchen tap already covered by R-4801, which is booked for 15 Oct. I created no duplicate job, added her worsening update to R-4801 and replied with the booking and interim advice.

## Where the case stands
R-4801 at visit stage, Swift Plumbing & Heating booked 15 Oct 08:00-12:00, confirmed with tenant. Nothing outstanding from us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the tap is covered by R-4801, visit 15 Oct 8-12, with interim advice | Amelia Clarke, tenant | email | A2 ✅ |
| 2 | OTHER | Added the worsening-drip note to R-4801 | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hello Amelia, thanks for letting us know. Your tap is already booked in under job R-4801, with Swift Plumbing & Heating coming on Thursday 15 October, 8am-12pm. We haven't opened a second job, but I've added your update (that it's worse and now drips constantly) to the existing one so the plumber knows. In the meantime, you can turn off the small isolation valves under the sink if it gets worse, and put a bowl under the drip. If water starts to leak out anywhere else or you can't control it, please call us straight away. Kind regards, Mare & Co

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new job created; the existing job covers this issue.
- Note does not change urgency or the visit date.
- Nothing here decides who pays or the cause.

## Remaining work
- Swift Plumbing & Heating attends 15 Oct; the team can bring the visit forward if a slot opens.

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Should a new repair job be created?**

No. It is the same issue as open job R-4801, which is already assigned and booked. A second job would be a duplicate. A constant drip is not a flood, so it stays routine.

**2. What do you reply to the tenant?**

I confirmed the existing job and the 15 Oct 8am-12pm visit, and said her update was added. I suggested a bowl under the drip and the under-sink isolation valve if it worsens. I asked her to call us if water escapes elsewhere.

**3. What, if anything, do you change on existing records?**

I added a note to R-4801 that the leak is worse. The stage, contractor and visit are unchanged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4801","note":"10 Oct 2026: tenant emailed that tap is getting worse, now drips constantly even when fully closed. Duplicate report… | 1 | ✅ verified | Ticket R-4801 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-101 found in the send_message log |

## Failed or unverified actions
_None._
