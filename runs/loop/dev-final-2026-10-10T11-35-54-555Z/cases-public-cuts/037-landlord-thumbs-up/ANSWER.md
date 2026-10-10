# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied to the contractor question with only a thumbs-up. I recorded it as unclear and asked a single yes/no question. I updated the tenant and put the job on hold until 2024-03-29.

## Where the case stands
Intake/landlord gate. No provider assigned. Landlord replied only with a thumbs-up, which is not authority. Waiting on landlord's clear answer; tenant photos outstanding. Hold review 2024-03-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Freya a yes/no question: may we instruct our contractor (or give own contractor's name) | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update Eliza that landlord confirmation is pending; photos still wanted | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-03-29 for landlord answer, then chase on a second channel | Freya, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya (landlord) via email, existing thread (event 007 email)** (verified)

> Hi Freya, thanks for your reply. We got a thumbs-up but want to be sure what you mean for the leaking shower cable at Flat 14, 44 Lantern Quay. Can you confirm yes or no: should we arrange the repair with our contractor? If you would rather use your own contractor, please tell us their name. Kind regards, Northbridge Lettings

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We are waiting for your landlord to confirm how the repair will be arranged, and we have asked them again for a clear answer. Photos of the damaged cable and the leak would still help. Until then, please keep water off that fitting if you can. We will update you once it is confirmed. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the thumbs-up as unclear does not approve or decline anything
- No contractor assigned and no visit booked
- No timescale promised to tenant as work is not approved

## Remaining work
- Landlord clear decision (agency chases 2024-03-29)
- Tenant photos
- Assign contractor and book visit after approval

## Missing or unavailable information
- Landlord's explicit decision
- Photos of damage and leak

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval stage with no provider assigned. The thumbs-up is not valid approval, so the landlord's clear decision and the tenant's photos are outstanding.

**2. What is the next action, who is it for, and through which channel?**

A yes/no clarification email to Freya (landlord), sent. The tenant was also updated by email, and the job is on hold to 2024-03-29.

**3. Does anything need a human decision, and why?**

No. This is routine chasing. If the landlord stays silent after the review date, chase on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-037-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with only a thumbs-up; asked yes/no w… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
