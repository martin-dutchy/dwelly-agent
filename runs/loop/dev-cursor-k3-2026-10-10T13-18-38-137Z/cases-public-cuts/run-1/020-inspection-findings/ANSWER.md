# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report shows a dog flap and Bedroom 1 marks, although the summary email said no issues. I replied to the landlord, asked the tenant about consent and the lock change, noted the record, set a 23 Feb follow-up and returned the job to auto mode.

## Where the case stands
Inspection done and report sent to landlord (17 Feb). Landlord has now raised an unapproved dog flap and a spare front door key after a lock change. Agency is waiting on the tenant's answers and the landlord's preference; review 23 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant whether the dog flap had consent and whether the front lock was changed and who holds a spare key | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to landlord: dog flap is in the report, tenant is being asked, ask for their preference by 23 Feb and confirm the landlord's name | Landlord | email | A1 ✅ |
| 3 | WAIT | Review tenant and landlord replies on 23 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email about the dog flap and the front door key. The inspection report we sent on 17 Feb does record a dog flap fitted in the back door (utility room). Our summary said "no issues" and should have mentioned it, sorry. We are asking the tenant whether consent was requested, and whether the front door lock has been changed and who holds a spare key. We will not ask the tenant to do anything about the flap until you have told us what you want (keep with conditions, or have it removed and the door made good). Could you let us know your preference by 23 Feb? We will update you once the tenant replies. Please also confirm the name of the landlord on the tenancy, as your email is signed Felix Clarke and our records show a different name.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> Hi, thank you for having us in for the inspection. Two quick questions from the landlord: 1) We noticed a dog flap has been fitted in the back door. Did you ask for the landlord's permission first? Nothing is needed from you yet; the landlord will decide next steps. 2) Has the front door lock been changed, and if so, when, and who has a spare key? Please reply by 23 Feb. We will be in touch again by then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish that the dog flap was unauthorised, or that the lock was changed or by whom
- No consent decision, removal request or deposit deduction is made
- Nothing says who holds the spare key

## Remaining work
- Tenant to answer on dog flap consent and lock change (agency chases 23 Feb)
- Landlord to decide on dog flap and confirm name
- Bedroom 1 command-strip marks to be followed up with tenant
- Correct the 'no issues' summary of event 017 if the landlord wants it reissued

## Missing or unavailable information
- Whether the tenant had consent for the dog flap
- Whether and when the front lock was changed and who holds the spare key
- Which landlord name is correct (Felix Clarke vs Oliver Bennett)

## Conflicts between sources
- Event 017 says no issues, but the report records a dog flap and one defect
- Landlord name: Oliver Bennett (event 017) vs Felix Clarke (event 020)
- Inspection dates: 13 Feb, 15 Feb and report date 16 Feb; also event 006 calls 15 Feb a Friday

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report was sent. Outstanding: the landlord's dog flap and spare key query, the tenant's answers, and the Bedroom 1 marks.

**2. What is the next action, who is it for, and through which channel?**

Emails sent: the landlord was told what the report shows and asked for a preference; the tenant was asked about consent and the lock change. Follow-up is set for 23 Feb.

**3. Does anything need a human decision, and why?**

Not now. The dog flap decision is the landlord's. Escalate if the tenant disputes it or the sender identity stays unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 017 summary said no issues but report (att-01) records dog flap in back door and Bedro… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-23","purpose":"Review tenant answers (dog flap consent, lock change/spare key)… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
