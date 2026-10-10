# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord answered our our-contractor-or-yours question with only a thumbs-up. I recorded it as unclear and asked a single yes/no question. I updated the tenant and put the job on hold to 2024-03-29.

## Where the case stands
Provider selection stage, no contractor assigned. Landlord's reply was only a thumbs-up, which is not usable authority. Waiting on landlord for a yes/no (hold to 2024-03-29) and on tenant for photos.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord one yes/no question: may we instruct our contractor, or will they arrange their own | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting on landlord, update by 2024-03-29, photos still wanted, electric-shower safety advice | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-03-29, then chase landlord on a second channel | Freya, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks Freya, we received your thumbs-up but it doesn't tell us which option you want. Yes or no: may we instruct our own contractor to replace the leaking shower cable/hose at Flat 14, 44 Lantern Quay? (If you'd rather arrange it yourself, just say so.)
> 
> Options: Yes, instruct our contractor (recommended); No, I will arrange my own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We are waiting on the landlord to confirm who will carry out the repair, and we will update you by 2024-03-29. Photos of the damaged cable and the leak would still help. Please also tell us if this is an electric shower. If so, please switch it off at the wall and avoid using it until it's checked. If you see sparks or water reaching sockets, call us straight away. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing approves a contractor or spend
- The thumbs-up is recorded as unclear, not as approval
- Tenant message does not promise a visit date

## Remaining work
- Landlord to answer yes/no (agency chases 2024-03-29)
- Tenant photos and whether the shower is electric
- Assign contractor once approved

## Missing or unavailable information
- Clear landlord decision
- Photos
- Whether the shower is electric

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection with no contractor. The landlord decision is unclear, and tenant photos are outstanding.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request to the landlord by email (A2), and a tenant update by email (A3). The job is on hold to 2024-03-29.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord has simply not given a clear answer yet. If they stay silent after the chase on 2024-03-29, review again.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"R-4815","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ❌ failed | Ticket R-4815 not found on read-back |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"R-4815","decision_needed":"Thanks Freya, we received your thumbs-up but it doesn't tell us which option yo… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"R-4815","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied only with a thumbs-up; asked yes/no w… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
- A1: I used a wrong ticket ref, so it was not applied. I looked up the correct ref and re-recorded the decision as A4.
