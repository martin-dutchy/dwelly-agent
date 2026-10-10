# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's only reply named a different flat, so it isn't approval, yet a provider was assigned and has ignored 7 reminders. I asked the landlord a clear yes/no, updated the tenant, and put the job on hold to 13 March. No further provider reminders sent.

## Where the case stands
Stage mp_time: provider assigned (Oscar Turner) but no visit booked and no provider reply after 7 reminders. No valid landlord approval on record. On hold waiting for landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a yes/no question: may we send our contractor to Flat 24 (his earlier reply named Flat 18, 88 Alder Lane) | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: visit not yet booked, landlord confirmation requested, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-03-13; then if no answer chase landlord by SMS/phone and, once approved, reassign provider | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly), may we send our contractor? Yes or no please.
> 
> Options: Yes, send your contractor; No, I will arrange my own contractor

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked has not yet booked a visit with you, and we have also asked your landlord to confirm they are happy for us to go ahead. We will update you by 13 March at the latest. If the window will not close or lock and you feel unsafe, please tell us straight away. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking the landlord does not authorise work or a contractor
- Tenant message does not promise a visit date
- Nothing establishes the window is a safety risk

## Remaining work
- Landlord yes/no on our contractor (agency, by 13 Mar)
- Get a booked, provider-confirmed visit or reassign since Oscar Turner has not replied to 7 reminders
- Visit, result, invoice, close

## Missing or unavailable information
- Valid landlord approval for this property
- Provider response/visit date

## Conflicts between sources
- Landlord reply (event 010) concerns Flat 18, 88 Alder Lane, not this property; treated as not about this job.
- Provider assigned (event 016) with no recorded landlord decision.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent, no visit booked, landlord approval not validly given (reply named Flat 18, 88 Alder Lane). Outstanding: landlord approval, provider confirmation or swap, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord yes/no approval request by email (A1); tenant update by email (A2); hold to 13 March (A3).

**3. Does anything need a human decision, and why?**

Not yet. The landlord question and a provider swap are routine. Escalate if the landlord stays silent after a second-channel chase and the provider remains unresponsive.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Ald… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named a different property (Flat … | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
_None._
