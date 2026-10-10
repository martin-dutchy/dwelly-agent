# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report contradicts our earlier 'no issues' email: it records a dog flap and sticker marks in Bedroom 1. I corrected this with the landlord, asked for their dog flap decision, and asked the tenant about the lock change, spare key and consent. A follow-up is set for 22 Feb and the ticket is back in auto mode.

## Where the case stands
Inspection done and report uploaded (stage: result received). Landlord raised dog flap (no consent) and spare key after a lock change. Waiting on landlord's dog flap decision and tenant's answers; review 22 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about lock change, spare key, dog flap consent, and to remove sticker marks | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to landlord correcting the 'no issues' email, asking for dog flap decision and name confirmation | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies on 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email (event 020). Firstly, a correction: our email of 17 Feb said no issues were found. The attached inspection report in fact records two points: (1) a dog flap has been installed in the back door/utility room, and (2) sticker-type marks (apparently from command strips) on the Bedroom 1 wall by the window, which the tenant is to remove and make good. Everything else was rated Good, and smoke and CO alarms worked. Sorry for the confusion. On the dog flap: we have no record of consent, so please tell us how you would like to proceed (for example, ask the tenant to remove it and make good, or give consent in writing, with any conditions). On the spare front door key after the lock change: we are checking with the tenant who changed the lock and where the spare key is, and will come back to you by 22 Feb. Please also confirm the name you want us to use for you, as your email is signed Felix Clarke and our records show Oliver Bennett.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Was the front door lock changed, and if so when and by whom?
> - Where is the spare front door key now, and can it be returned to us?
> - Did you get the landlord's written permission to fit the dog flap?
> - The inspection noted marks on the Bedroom 1 wall from sticker strips; please remove them and make good.
> 
> Why: Inspection noted a dog flap and the landlord has asked about a lock change and spare key; we have no record of either being agreed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not establish that the dog flap was unauthorised or that a lock was changed by the tenant
- Does not decide who pays or whether the flap stays
- Nothing closed

## Remaining work
- Landlord decision on dog flap (agency/landlord)
- Tenant answers on lock change, spare key, consent
- Sticker marks made good by tenant
- Confirm landlord identity (Felix Clarke vs Oliver Bennett)

## Missing or unavailable information
- Who changed the lock and where the spare key is
- Whether the dog flap had consent
- Landlord's name confirmation
- Inspection report has zero photos

## Conflicts between sources
- Event 017 said no issues but the report lists the dog flap and a defect; trusted the report
- Visit booked 15 Feb (events 012 and 014) but the report is dated 16 Feb
- Landlord record name Oliver Bennett vs email naming Felix Clarke
- Event 006 says Friday 15th, but 15 Feb 2024 was a Thursday
- The first booking for 13 Feb was superseded by the 15 Feb reschedule

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report is filed. Outstanding: the landlord's decision on the dog flap, the tenant's answers on the lock change and spare key, the tenant making good the Bedroom 1 marks, and confirming the landlord's name.

**2. What is the next action, who is it for, and through which channel?**

Done now: a correcting email with the dog flap question to the landlord (A1), and an information request to the tenant by email (A2). Next, review both on 22 Feb (A4).

**3. Does anything need a human decision, and why?**

Not yet. The dog flap consent is the landlord's decision, which we have asked for. Escalate only if the tenant or landlord replies in a way that needs authority, for example a dispute over deposit deductions.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","why":"Inspection noted… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 017 email said no issues, but the report lists dog flap and Bedroom 1 sticker marks (t… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","purpose":"Review tenant answers on lock/spare key/dog flap and landlord d… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
