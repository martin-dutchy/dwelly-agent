# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection complete with two findings (dog flap, Bedroom 1 sticker marks). The landlord asked about the unapproved dog flap and a spare key after a lock change. I asked the tenant about consent, the lock change and a key, corrected our earlier 'no issues' summary to the landlord, noted the conflicts, set a follow-up and returned the job to auto.

## Where the case stands
Inspection done 15/16 Feb, report uploaded and sent to landlord. Landlord has raised an unapproved dog flap and a lock change/spare key. Waiting on tenant (consent, lock change, key by 25 Feb) and landlord (decision, identity confirmation). Follow-up 26 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant whether dog flap consent was given, who changed the lock and when, and for a spare key to the agency by 25 Feb | Tenant | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Reply to landlord: correct the 'no issues' summary, say what the record shows, ask for dog flap decision and name confirmation | Landlord | email | A2 ✅ |
| 3 | WAIT | Follow up on 26 Feb for replies and key | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hello, thank you for having us for the inspection. Two things came up that we'd like to check with you. 1) The inspector noted a dog flap fitted in the back door. Changes like this need the landlord's written consent under the alterations clause (and the pets clause) of your tenancy agreement. Did you get the landlord's consent? If so, please send us a copy or the date. 2) We've been told the front door lock may have been changed. Our records don't show this. Can you tell us who changed it and when? Please also let the agency have a copy of the new front door key by Sunday 25 February, so the landlord and agency have a spare for emergencies. Having a key does not give us a right to enter; we'll always give you 24 hours' written notice except in a genuine emergency. The inspector also noted marks from sticky strips on the Bedroom 1 wall by the window, which need to be removed and the wall made good. We'll update you by 26 February.

**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Dear Landlord, thank you for your email of 18 February. Sorry: our summary of 17 February said "no issues", but the attached report does record two things: a dog flap fitted in the back door (utility room), and sticker-type marks from adhesive strips on the Bedroom 1 wall, which the tenant should remove and make good. Our records do not show that consent was given for the dog flap, nor any lock change. We are asking the tenant today whether consent was given, who changed the lock and when, and for a copy of the new front door key to be given to the agency by 25 February. We will report back by 26 February. Please let us know whether you would consent to the dog flap, or want it removed, and whether you arranged or authorised any lock change. Also, your email is signed Felix Clarke while our record names Oliver Bennett: please confirm who you are writing as.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish whether the dog flap was consented to or who changed the lock
- No entry right is gained from holding a key
- No decision on charges or deposit deductions has been made

## Remaining work
- Tenant reply on consent, lock change and key (by 25 Feb)
- Landlord decision on dog flap and name confirmation
- Bedroom 1 marks to be made good by tenant
- Update both parties by 26 Feb

## Missing or unavailable information
- Whether dog flap consent was given
- Who changed the lock and when
- Landlord's identity: Felix Clarke vs Oliver Bennett

## Conflicts between sources
- Landlord on record Oliver Bennett vs email signed Felix Clarke
- Event 017 'no issues' vs report noting a defect and dog flap
- Visit dates 13/02 vs 15/02, report dated 16/02
- Tenant said 'Friday 15th' but 15/02/2024 is a Thursday

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection done and report sent; outstanding are dog flap consent, the lock change and spare key, the Bedroom 1 marks, and the landlord name check.

**2. What is the next action, who is it for, and through which channel?**

Emails to the tenant (asking about consent, the lock and a key by 25 Feb) and to the landlord (status, decision needed); follow-up on 26 Feb.

**3. Does anything need a human decision, and why?**

Not now. The dog flap consent is the landlord's decision. A human is needed only if the tenant or landlord replies in a way that leads to a dispute, or the name mismatch is not settled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 020 landlord email signed Felix Clarke; event 017 addressed Oliver Bennett: name misma… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-26","party":"Tenant and landlord","purpose":"Check tenant reply on dog flap co… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
