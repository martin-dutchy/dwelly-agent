# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The window repair was assigned to Oscar Turner on 1 March without valid landlord approval. The landlord's only reply named a different flat. The provider has ignored 7 reminders. I stopped chasing the provider and asked the landlord by email and SMS to confirm for Flat 24. I updated the tenant and put the job on hold until 13 March.

## Where the case stands
Stage mp_time, provider assigned but no visit booked. On hold waiting for the landlord, review 2024-03-13. The provider has not responded to any reminder.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord which property he meant and whether we may send our contractor to Flat 24 | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | CHASE_LANDLORD | SMS the same yes/no question on a second channel | Isaac Oakley, landlord | sms | A5 ✅ |
| 3 | REPLY_TO_TENANT | Tell the tenant what is pending and that she will hear from us by 14 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 4 | WAIT | Hold for the landlord's answer, review 13 March | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, which is not this property, so we have not treated it as approval. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly; the toilet is already fixed), may we send our contractor to assess and quote, or will you arrange your own? Please reply yes or no.
> 
> Options: Yes, send our contractor (Oscar Turner) to assess and quote; I will arrange my own contractor

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we contacted hasn't replied, and we still need the landlord's clear go-ahead for your flat, so we've asked him again today. Please don't worry about contacting the contractor yourself for now. Once we have the landlord's answer we'll confirm next steps; we'll update you by 14 March at the latest. If the window can't be closed and you feel unsafe or it's a security concern, let us know.

**A5 · send_message → Isaac Oakley (landlord) via sms, agency landlord record** (verified)

> Northbridge Lettings: we've emailed about the bedroom window at Flat 24, 150 Copperfield Walk, Kingshaven. Your last reply was about a different property, so please reply YES to let us send our contractor to Flat 24, or tell us if you'll arrange your own.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms landlord approval, a visit date or the provider's availability.
- The provider has not been told to stand down or been reassigned.

## Remaining work
- Landlord answer (agency to chase on 13 March, by phone if still silent)
- Confirm or reassign provider, then book the visit once the provider confirms a date
- Quote, invoice and close

## Missing or unavailable information
- Landlord approval for Flat 24
- Provider response and visit date
- Whether the landlord's plumber visit on 23 Feb belongs to another property

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property, so I did not treat it as approval. The provider was assigned at event 016 regardless.
- Event 004 to the landlord included a toilet issue that the tenant had already fixed (event 006); the toilet is out of scope.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent after 7 reminders over email and SMS. No valid landlord approval is on record, because the only landlord reply (event 010) refers to Flat 18, 88 Alder Lane. No visit is booked. Outstanding: landlord confirmation for Flat 24, then provider confirmation or reassignment, then visit, result, invoice and close.

**2. What is the next action, who is it for, and through which channel?**

Ask the landlord, Isaac Oakley, a yes/no question on which property he meant and whether we may send our contractor. This went by email (APR-101) and SMS (MSG-104). The tenant was updated by email (MSG-102). No fourth reminder was sent to the provider.

**3. Does anything need a human decision, and why?**

Not yet. This is a routine job waiting on the landlord's answer. If the landlord stays silent after the 13 March follow-up, phone him. If the provider remains unresponsive after approval, reassign.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18,… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane, not… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-047-three-chases","note":"Event 010 names a different property so is not approval; provider was assigned at event 016 without… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-047-three-… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-047-three-chases","due_on":"2024-03-13","party":"Isaac Oakley, landlord","purpose":"Check landlord answer on Flat 24 wind… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
- (unledgered): First SMS to the landlord was blocked because it named the other address. I resent it without that address (A5).
