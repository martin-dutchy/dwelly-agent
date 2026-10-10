# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider was assigned without valid landlord approval (landlord's only reply concerned a different property) and has ignored all reminders. I asked the landlord for a clear decision, paused the provider, updated the tenant and put the job on hold with a 13 March review.

## Where the case stands
Stage mp_time: provider assigned (Oscar Turner) but silent after 7 reminders over 4 rounds; no visit booked; no valid landlord approval for this property. On hold waiting for the landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to confirm approval (or his own contractor) for Flat 24, noting his earlier reply named Flat 18, 88 Alder Lane | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask the provider to pause and reply with any agreed date, on the email thread | Oscar Turner, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant no appointment yet, awaiting landlord, next update by 13 March | Eliza Jenkins, tenant | email | A4 ✅ |
| 4 | WAIT | Hold and review on 2024-03-13; chase landlord by SMS/phone, reassign provider if still silent | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property, so we have not treated it as an answer. For Flat 24, 150 Copperfield Walk: the tenant reports a bedroom window that won't close properly (the toilet issue is sorted). May we send our contractor Oscar Turner to assess and quote, or will you use your own contractor? A yes/no answer is all we need.
> 
> Options: Yes, send your contractor to Flat 24, 150 Copperfield Walk; I will arrange my own contractor for Flat 24 (please give name and date)

**A3 · send_message → Oscar Turner (contractor) via email, existing thread (event 018 email)** (verified)

> Dear Oscar, we haven't had a reply to our reminders about the window repair at Flat 24, 150 Copperfield Walk. Please pause for now: we are confirming the landlord's approval and will come back to you. If you have already spoken to the tenant, please reply with any date agreed. Please do not start work before we confirm. Thank you.

**A4 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Eliza, sorry for the delay with your bedroom window. Our contractor hasn't yet booked a visit with you, and we're still waiting on the landlord to confirm approval, so there is no appointment yet. We've chased the landlord and will update you by 13 March. If the window can't be closed or locked and you feel unsafe, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord approval request does not authorise spend or our contractor.
- The provider pause message does not cancel the assignment.
- No visit is booked.

## Remaining work
- Landlord to answer the which-property/approval question
- Provider to respond or be replaced (agency, 13 March review)
- Visit, result, invoice, close

## Missing or unavailable information
- Valid landlord decision for Flat 24
- Provider response
- Property spend limit not on record

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, not this property: not treated as approval.
- Provider was assigned (event 016) with no recorded landlord decision.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but unresponsive after 3+ reminder rounds, no visit booked, landlord approval for this property never validly given. Outstanding: landlord decision, provider contact or swap, visit, result.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval/clarification request by email to Isaac Oakley; provider pause email to Oscar Turner; tenant update email; hold and follow-up on 13 March.

**3. Does anything need a human decision, and why?**

Not yet. A routine landlord question and dated hold suffice; escalate or swap provider if there is no response by 13 March.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Ald… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"No valid landlord approval for Flat 24 (event 010 named Flat… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Oscar Turner","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body":"Dear … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi Eliza… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-047-three-chases","due_on":"2024-03-13","purpose":"Review landlord reply; if none, chase by SMS/phone; if still no provid… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
