# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The window repair has stalled: the provider has ignored seven reminders and the landlord's only reply named a different property, so there is no valid approval. I asked the landlord a yes/no question, updated the tenant, and put the job on hold to 13 March. No human decision is needed yet.

## Where the case stands
Stage mp_time: provider assigned, no visit booked. Provider silent after 7 reminders. No valid landlord approval on record. On hold waiting for landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no whether we may send our contractor for the Flat 24 window, noting the earlier reply named a different property | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: no visit booked, waiting for landlord, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord answer, review 2024-03-13; then reassign provider if still silent | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, Willowbank, which is a different property, so we have not treated it as approval. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly): may we send our contractor, yes or no? Or will you arrange your own?
> 
> Options: Yes, send our contractor to assess and quote (recommended); I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we contacted hasn't yet arranged a visit with you, and we are still waiting for the landlord to confirm the go-ahead for the work. We have asked the landlord again today and will chase the contractor another way. No visit is booked yet. We will update you by 13 March. Please let us know if it gets worse or the window can't be secured.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the work or books a visit
- The landlord question does not confirm who pays
- No further provider reminders sent; provider non-response not yet resolved

## Remaining work
- Landlord to answer approval question (agency, review 13 March)
- Phone or reassign provider once approved
- Book visit confirmed by provider, then result, quote/invoice, close

## Missing or unavailable information
- Valid landlord decision for Flat 24
- Provider's response and availability
- Landlord spend limit not on file

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, not Flat 24; treated as not about this job.
- Provider was assigned (event 016) with no recorded landlord approval.
- Event 004 landlord email quoted a toilet issue the tenant later withdrew (event 006).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but never booked a visit after 7 reminders. Landlord approval is missing because event 010 referred to Flat 18, 88 Alder Lane. Both still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord yes/no approval request (email, APR-101) and tenant update by email. Then provider phone chase or reassignment after approval, review 13 March.

**3. Does anything need a human decision, and why?**

Not yet. Routine steps are in hand. Escalate (P3) if the landlord stays silent and the provider cannot be reached by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18,… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"No valid landlord approval: event 010 named Flat 18, 88 Alde… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-047-three-chases","note":"Event 010 landlord reply concerns a different address (Flat 18, 88 Alder Lane) so not approval. Pro… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
