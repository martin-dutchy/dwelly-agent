# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report is filed. The landlord then raised an unapproved dog flap and a spare key after a lock change. I corrected our earlier 'no issues' message and asked the tenant and landlord the open questions. I added a note, set a follow-up for 21 Feb and returned the job to auto mode.

## Where the case stands
Inspection done (report 16 Feb, uploaded 17 Feb). Landlord has replied about an unapproved dog flap and a spare key after a lock change. Waiting on the tenant and landlord; follow-up set for 2024-02-21.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap permission, lock change, spare key by 23 Feb, and to fix the Bedroom 1 marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to landlord: correct the earlier 'no issues' summary, say what the record shows, ask for dog flap decision and sender identity | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies by 2024-02-21 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (Oliver Bennett on record) (landlord) via email, existing thread (event 020 email)** (verified)

> Dear landlord, thank you for your email about Flat 12, 162 Beacon Close. Sorry: our earlier summary said no issues, but the report does note a dog flap (utility room/back door) and a small marked patch on a Bedroom 1 wall, which the tenant is to make good. Dog flap: we have no record of your consent on file. We are asking the tenant whether permission was given, and will report back. Please tell us whether you want it kept, or removed and made good. Lock change: our record shows no lock change and no spare key. We are asking the tenant who changed it and when, and to get a copy of the new key to us. Could you confirm who changed the lock, if you know? Your email is signed Felix Clarke, but our record names Oliver Bennett. Please confirm who you are. We will update you by 2024-02-21.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for having us for the inspection. Two quick questions from the landlord. 1) The report notes a dog flap. Did you get the landlord's written permission, and if so when? 2) Has the front door lock been changed? If so, who did it and when, and please could you get a spare key of the new lock to our office by 2024-02-23. Also, please remove the sticker marks on the Bedroom 1 wall and make good. We will update you by 2024-02-21.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish whether the dog flap was permitted or who changed the lock.
- Nothing here approves keeping or removing the dog flap.
- Does not confirm the landlord's identity.

## Remaining work
- Tenant answers on dog flap consent, lock change and spare key (agency)
- Landlord decides on the dog flap and confirms sender identity
- Tenant removes the Bedroom 1 sticker marks
- Chase on 2024-02-21; ticket still in init stage

## Missing or unavailable information
- Who changed the lock, and when
- Whether dog flap consent was given
- Whether Felix Clarke is the landlord (record says Oliver Bennett)
- Landlord email text is only a summary

## Conflicts between sources
- Landlord sender Felix Clarke vs record Oliver Bennett
- Event 017 'no issues' vs report defect and dog flap
- Appointment 13/02 vs 15/02; report dated 16/02; 'Friday 15th' is actually a Thursday
- Report says dog flap in utility room and in back door

## Answers to the case questions
**1. Where does this case stand?**

The inspection is complete. The report shows one Bedroom 1 defect and a dog flap. The landlord's reply (event 020) is being handled, with answers awaited from the tenant and landlord.

**2. Next action?**

Emails sent to the landlord and tenant (A1, A2). Follow-up on 2024-02-21.

**3. Human decision needed?**

No human is needed yet. The dog flap decision is the landlord's. Escalate if the lock change turns out to be unauthorised or the sender's identity cannot be confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord (Oliver Bennett on record)","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email event 020 (signed Felix Clarke; record names Oliver Bennett): dog flap not ap… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-21","purpose":"Chase tenant and landlord on dog flap consent, lock change, spa… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
