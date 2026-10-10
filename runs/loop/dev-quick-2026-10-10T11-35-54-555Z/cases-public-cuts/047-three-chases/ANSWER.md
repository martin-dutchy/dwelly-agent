# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The bedroom window repair has stalled for about 17 days because the landlord never approved it for Flat 24: their only reply concerns a different property, and the provider has had 7 reminders with no visit booked. I chased the landlord by email, told the tenant no visit is booked yet, told the provider to hold and stop reminding, and put the job on hold until 13 March.

## Where the case stands
Provider (Meadow Solutions, Oscar Turner) assigned on 1 Mar but no visit booked. Landlord has never approved this job for Flat 24: the only landlord reply (event 010) concerns Flat 18, 88 Alder Lane. Ticket is on hold, waiting for landlord, review 13 Mar. Provider has had 7 reminders and has now been told to hold.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord whether they approve our contractor (Meadow Solutions, Oscar Turner) for the Flat 24 window, or will use their own, and whether event 010 meant Flat 18 or Flat 24. | Isaac Oakley, landlord | email | A5 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the window is awaiting the landlord's decision and no visit is booked yet. | Eliza Jenkins, tenant | email | A1 ✅ |
| 3 | CHASE_PROVIDER | Tell the provider not to book or send further reminders until the landlord approves. | Oscar Turner, Meadow Solutions, contractor | email | A2 ✅ |
| 4 | WAIT | Hold the job for the landlord's reply, review 13 Mar; if still silent, chase by SMS or phone and escalate P2. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello,
> 
> Thank you for letting us know the toilet is working again. For the bedroom window, we are still waiting for the landlord to confirm whether we can send a contractor. We have chased them today. No visit has been booked yet. We will contact you as soon as we have their answer.
> 
> Kind regards,
> Ashford

**A2 · send_message → Oscar Turner, Meadow Solutions (contractor) via email, existing thread (event 018 email)** (verified)

> Dear Oscar,
> 
> Thank you for your patience with the window repair at Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Please do not book a visit with the tenant yet. The landlord has not yet confirmed that we can instruct you, and we are chasing them now. We will confirm as soon as we have their decision. You do not need to send further reminders.
> 
> Kind regards,
> Ashford

**A5 · send_message → Isaac Oakley (landlord) via email, existing thread (event 010 email)** (verified)

> Hello Isaac,
> 
> Thank you for your email of 22 February. We are following up on the bedroom window at Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. The window does not close properly. We have not yet had your decision on it, and we asked on 22 February whether you would like our contractor or your own to attend.
> 
> Your email mentioned a plumber visit at a different property. Could you confirm whether you meant that property or Flat 24?
> 
> Please reply with:
> 1. Yes, send our contractor (Meadow Solutions, Oscar Turner) to look at the bedroom window at Flat 24, or
> 2. You will arrange your own contractor. If so, please send their name and a date.
> 
> Kind regards,
> Ashford

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the tenant and provider messages does not establish landlord approval or any spend.
- No contractor has been instructed for this property; the earlier 'provider assigned' step is not backed by a landlord decision.
- The toilet issue is resolved by the tenant's own fix (event 006), not by the agency.
- The property record has no landlord, spend limit or contractor details, so none of those are confirmed.

## Remaining work
- Landlord to confirm approval for this property and the contractor choice (owner: landlord, review 13 Mar).
- If approved: assign Meadow Solutions with a visit window and tell the tenant.
- If the landlord is silent on 13 Mar: chase by SMS or phone, then escalate P2 (maintenance).
- Check whether the Flat 18 mention in event 010 needs its own ticket or a wrong-property note.

## Missing or unavailable information
- Landlord approval for the Flat 24 window repair
- Landlord's answer on whether event 010 meant Flat 18 or Flat 24
- Landlord phone number for an SMS or call chase (not in records)
- Tenant's direct contact details (only the provider's copy is on file)

## Conflicts between sources
- Event 010 landlord email refers to Flat 18, 88 Alder Lane, Willowbank, not this property. Treated it as not an approval for this job.
- Event 016 says a provider was assigned on 1 Mar, but no landlord decision for Flat 24 is on record, so the assignment is not backed by approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned on 1 Mar but no visit booked. Landlord approval for this property is outstanding; the only landlord reply (event 010) concerns Flat 18, 88 Alder Lane. The job is on hold for the landlord, review 13 Mar. The toilet issue was fixed by the tenant's mother (event 006).

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Isaac Oakley (A5) asking for approval of our contractor or their own, and to confirm Flat 18 vs Flat 24. Email to tenant Eliza Jenkins (A1) with status. Email to provider Oscar Turner (A2) to hold and stop reminders. Follow-up for 13 Mar (A4).

**3. Does anything need a human decision, and why?**

Not yet. The landlord has been silent for 16 days but has not yet had a second-channel chase, so the P2 escalation rule is not triggered. Escalate if there is no reply by 13 Mar after an SMS or phone chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Oscar Turner, Meadow Solutions","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 ema… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord has not approved the window repair for Flat 24. Eve… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-047-three-chases","due_on":"2024-03-13","party":"Isaac Oakley, landlord","purpose":"Check for landlord reply on window re… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
- landlord message attempt 1: Blocked by policy because the draft named Flat 18's address. Removed the address and resent as A5, which verified.
