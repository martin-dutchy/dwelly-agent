# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The window repair has stalled. The provider never answered 7 reminders, and the landlord's only reply named a different property, so there is no valid approval. I asked the landlord a yes/no question, told the tenant, told the provider to hold, and put the job on hold with a review on 13 March.

## Where the case stands
Provider assigned (mp_time) but no visit booked; provider silent after 7 reminders. No valid landlord approval: the landlord's only reply named a different property. Ticket on hold, waiting for landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord a yes/no question: may we send our contractor to Flat 24, since his earlier reply named Flat 18, 88 Alder Lane | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant nothing is booked, what we're waiting on, and next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | CHASE_PROVIDER | Stop reminders; tell provider not to attend until approval confirmed and to reply whether they can take the job | Oscar Turner, contractor | email | A3 ✅ |
| 4 | WAIT | Hold until 13 March, then chase landlord by SMS/phone and reassign provider if still silent | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, which is a different property, so we have not treated it as approval. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly; the toilet issue is already fixed by the tenant): may we send our contractor to assess and quote? Yes or no please.
> 
> Options: Yes, send your contractor to assess and quote (we will come back to you with any quote before work starts); No, I will arrange my own contractor for the window

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the wait on your bedroom window. The contractor we contacted hasn't replied to book a visit, and we're still waiting for the landlord to confirm which property they approved work for, so we've asked them again today. Nothing is booked yet. We'll update you by 13 March at the latest. If the window can't be shut at all and you feel unsafe or can't secure the flat, please tell us straight away.

**A3 · send_message → Oscar Turner (contractor) via email, existing thread (event 018 email)** (verified)

> Dear Oscar, we've had no reply to our earlier messages about the Window Repair Request at Flat 24, 150 Copperfield Walk. Please do not attend or start any work yet: we are confirming landlord approval. Please reply to say whether you can take this job, and we'll confirm once approval is in. We'll stop the automatic reminders meanwhile.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking for approval does not authorise the contractor or any spend
- No visit is booked and no cause or cost is established
- The provider's availability is unconfirmed

## Remaining work
- Landlord to answer yes/no (record decision on reply)
- Provider to respond or be reassigned by 13 March
- Book visit once the provider confirms a date, then result and quote loop

## Missing or unavailable information
- Valid landlord approval for Flat 24
- Provider response
- Whether the window is a security risk for the tenant

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not Flat 24, 150 Copperfield Walk; treated as not about this job and not as approval.
- Provider was assigned (event 016) with no recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent after 7 reminders and no visit booked. The landlord's reply of 22 Feb referred to Flat 18, 88 Alder Lane, so approval for Flat 24 is outstanding. The toilet issue was resolved by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (A1), tenant update by email (A2), provider told to hold and reply by email (A3). Hold with review 13 March (A4).

**3. Does anything need a human decision, and why?**

Not yet. Routine chasing and reassignment are within my remit. If both landlord and provider stay silent by 13 March, escalate or reassign.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18,… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Oscar Turner","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticket_ref":… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord's 22 Feb reply named Flat 18, 88 Alder Lane (differ… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-047-three-chases","note":"Event 010 landlord reply refers to Flat 18, 88 Alder Lane, not this property: not approval. Provide… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-047-three-chases","due_on":"2024-03-13","party":"Landlord and provider","purpose":"Chase landlord on second channel for a… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
