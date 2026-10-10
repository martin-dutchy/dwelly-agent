# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection complete; landlord raised dog flap and spare key. I asked the tenant the facts, replied to the landlord asking for their dog flap decision and identity confirmation, noted the record, set a follow-up and returned to auto mode.

## Where the case stands
Inspection done 15/16 Feb and report uploaded; landlord (event 020) queries the unapproved dog flap and a spare key after a lock change. Waiting on tenant and landlord answers; follow-up 2024-02-21.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap permission, lock change/spare key, and Bedroom 1 marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to landlord: dog flap noted in report, decision wanted on removal or consent, key query being checked, confirm identity | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies and update landlord | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. On the dog flap: the inspection report notes the tenants have fitted one in the back door (utility room). We have no record of it being approved, so we are asking the tenant when and why it was fitted. Please tell us whether you would like it removed and the door made good, or whether you are willing to consent to it staying. On the spare front door key: we are checking with the tenant whether the lock was changed and who holds keys, and will report back. Your email was signed Felix Clarke but our record addresses Oliver Bennett, so could you confirm who you are writing as? We will update you once we have the tenant's answer.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Did you get the landlord's permission before fitting the dog flap in the back door, and when was it fitted?
> - Has the front door lock been changed? If so, when, and who has the spare key?
> - Please remove the sticker marks beside the Bedroom 1 window and make good, as noted at the inspection.
> 
> Why: Landlord has queried an unapproved dog flap and a possible lock change; the inspection report also notes marks in Bedroom 1.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish that the dog flap was unapproved or that the lock was changed; both are claims awaiting checks.
- Does not decide whether the dog flap stays or who pays.
- Does not confirm the sender's identity.

## Remaining work
- Tenant answers on dog flap, lock and key
- Landlord decision on dog flap and name confirmation
- Bedroom 1 marks to be made good by tenant
- Close ticket once resolved

## Missing or unavailable information
- Whether the dog flap was consented
- Whether the lock was changed and who holds the spare key
- Landlord identity (Felix Clarke vs Oliver Bennett)

## Conflicts between sources
- Event 017 said no issues, but the report records a dog flap and one Bedroom 1 defect.
- Landlord addressed as Oliver Bennett, but event 020 names Felix Clarke.
- Visit dates 13/02 vs 15/02 (later reschedule trusted); report dated 16/02; 'Friday 15th' was a Thursday.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection finished and report filed. Outstanding: dog flap consent, lock change/spare key query, Bedroom 1 marks, landlord identity check.

**2. What is the next action, who is it for, and through which channel?**

Tenant emailed for facts and landlord emailed with next steps; review on 2024-02-21.

**3. Does anything need a human decision, and why?**

Not yet. The dog flap decision is the landlord's; escalate only if the tenant disputes it or the lock change turns out to be a lockout or access issue.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","why":"Landlord has que… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Report says \"No issues\" in landlord email (event 017) but report itself records a dog flap… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-21","purpose":"Review tenant answers on dog flap and lock change; update landl… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
