# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The bedroom window repair at Flat 24 has stalled. The landlord never approved work for this property (the only reply concerns Flat 18), and the provider has not answered three or more reminders. The landlord and tenant were messaged, the job is on hold to 2024-03-12, and the maintenance team has been asked to chase the provider or reassign.

## Where the case stands
Stage: provider assigned (event 016) but no visit booked. The provider has not replied to three or more reminders (events 020-025), and event 026 prompts a manual check. The landlord has never approved work on this property. The only landlord reply (event 010) is for Flat 18, 88 Alder Lane, a different address. The job is on hold, waiting for the landlord, with review on 2024-03-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord for a yes/no on sending Meadow Solutions (Oscar Turner) to inspect and quote the bedroom window at Flat 24, or whether they will use their own contractor. The message does not name the other address. | Isaac Oakley, landlord | email | A6 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant that the landlord is being asked and the provider is being chased. No date promised. | Eliza Jenkins, tenant | email | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalate P3 to the maintenance team to phone the provider or reassign, because three reminders have had no reply. | Maintenance team | internal | A8 ✅ |
| 4 | WAIT | Review the landlord reply and the provider status on 2024-03-12; phone the landlord if there is no reply. | Isaac Oakley, landlord | email | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email from tenant)** (verified)

> Hello Eliza,
> 
> Thank you for letting us know the toilet is sorted. We are still waiting for the landlord to confirm that we can send a contractor to look at the bedroom window. We have also chased our maintenance provider for a visit date. We will contact you as soon as we have an update.
> 
> Kind Regards
> Ashford

**A6 · send_message → Isaac Oakley (landlord) via email, existing thread (event 004 email to landlord)** (verified)

> Hello,
> 
> Thank you for your earlier email. That plumber visit was for a different property, not the one this request is about.
> 
> This request is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. The tenant reports the bedroom window does not close properly. Can we send our contractor, Meadow Solutions, to inspect and quote for the repair? Or would you prefer to arrange your own contractor? Please reply with yes or no, or the name of your contractor.
> 
> Kind Regards
> Ashford

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner (Meadow Solutions) has not replied to three or more reminders (events 020-025) about booking a visit for the bedroom window at Flat 24, 150 Copperfield Walk. No provider reply is on file.
  - Known: Request: bedroom window does not close properly (routine). Landlord asked 2024-02-22 (event 004). Landlord's only reply (event 010) concerns Flat 18, 88 Alder Lane, a different property, so no approval exists for this property. Provider assigned 2024-03-01 (event 016) without a recorded landlord decision. Reminders 2024-03-04, 03-06, 03-08 unanswered. Landlord re-asked 2024-03-10 (MSG-104). Tenant informed (MSG-101). Toilet fixed by tenant's mother (event 006), so no separate job.
  - Missing: Landlord yes/no for this property. Provider reply or availability. No phone call has been made to the provider yet.
  - Options: Ask the provider by phone whether they still hold the job; if no reply, reassign to another contractor once the landlord approves; Wait for the landlord's yes/no, then reassign if the provider stays silent; Landlord uses their own contractor
  - Recommendation: Phone the provider today. Ask the landlord to confirm on this property. If the provider does not respond, reassign after landlord approval.

## What this does not establish
- Sending the landlord and tenant messages does not establish that the landlord has approved any work.
- The 'provider assigned' event (016) is not evidence of landlord approval, so no visit has been booked or confirmed.
- The toilet issue is closed by the tenant's own fix. It does not show the window is fixed.
- The provider's status is unknown. No phone call was made in this run.

## Remaining work
- Landlord yes/no on Flat 24 (review 2024-03-12, phone chase if silent). Owner: operations.
- Provider: phone or reassign (ESC-106, maintenance team).
- Visit booking, work result, invoice and closing are all still open.

## Missing or unavailable information
- Landlord decision for Flat 24 (only a reply about Flat 18 exists).
- Provider's reply or availability.
- Landlord's contact for Flat 24 beyond the existing thread.

## Conflicts between sources
- Event 010 landlord email refers to Flat 18, 88 Alder Lane, ZZ3 5ZZ; the case property is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. Treated as not approval for this job.
- Event 017 'provider assigned' (2024-03-01) has no landlord approval behind it. Trusted the absence of approval.
- Reminder SMS from event 019 onwards is signed 'Meadow Solutions', 'Northbridge Lettings' in some events. The sender name is inconsistent.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Provider assigned on 2024-03-01 but no visit booked. The provider has not replied to reminders on 03-04, 03-06 or 03-08. The landlord has not approved work on Flat 24. Outstanding: landlord yes/no, provider contact or reassignment, visit, work, invoice and closing.

**2. 2. What is the next action, who is it for, and through which channel?**

Landlord Isaac Oakley by email (A6) for a yes/no on our contractor or his own. Tenant Eliza Jenkins by email (A3) with a status update. Maintenance team by escalation (A8) to phone the provider or reassign. Review on 2024-03-12 (A7).

**3. 3. Does anything need a human decision, and why?**

Yes, a P3 maintenance decision on the provider: keep waiting, phone, or swap, since three reminders have had no reply. Landlord approval for Flat 24 is also needed before any contractor is instructed. Nothing is urgent or a safety issue.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-047-three-chases","decision":"unclear","evidence_quote":"I have arranged plumber to visit Flat 18, 88 Alder Lane, Willowb… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after record_landlord_decision |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"No landlord decision for Flat 24, 150 Copperfield Walk (ZZ3 … | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email from tenant)","tic… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `log_call` | {"party_name":"Oscar Turner (Meadow Solutions)","party_role":"contractor","direction":"outbound","outcome":"failed","summary":"Not yet attem… | 1 | ✅ verified | CALL-102 found in the log_call log |
| A5 | `add_note` | {"entity":"NBL-047-three-chases","note":"Correction: log entry CALL-102 (ledger A4) is wrong. No call was placed to Oscar Turner (Meadow Sol… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A6 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 004 email to landlord)","ti… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"NBL-047-three-chases","due_on":"2024-03-12","party":"Isaac Oakley (landlord)","purpose":"Check whether the landlord has answe… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A8 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner (Meadow Solutions) has not replied to three or more reminders (events … | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Failed or unverified actions
- A3-first-attempt: The landlord email naming Flat 18 was blocked by policy. Resent without the other address as A6.
- A4: CALL-102 was logged in error; no call was placed. Not claimed as an action. Corrected by note A5.
