# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord replied to the contractor question with only a thumbs-up, which is not usable authority. I recorded it as unclear, asked a clear yes/no question with a reply-by date, updated the tenant with a safety note, and put the job on hold until 29 March.

## Where the case stands
Intake/landlord gate. No contractor assigned. Landlord's reply was only a thumbs-up, recorded as unclear. Yes/no question sent; tenant photos requested; on hold to 2024-03-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord a yes/no question: may we instruct our contractor (or will they arrange their own)? Reply needed by 2024-03-29 | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant: waiting on the landlord, photos still wanted, safety note, next update by 29 March | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until landlord answers; review 2024-03-29 | Freya, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks for your reply, Freya. A thumbs-up doesn't tell us which option you meant. Yes or no: may we instruct our own contractor to replace the damaged, leaking shower cable at Flat 14, 44 Lantern Quay? (If you would rather arrange it yourself, please say so and send us the contractor's name and a date.) Please reply by 2024-03-29.
> 
> Options: Yes, instruct the agency's contractor; No, landlord arranges own contractor
> 
> Update: We have asked the tenant for photos. No contractor is assigned and no visit is booked until you confirm.

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting on the landlord to confirm how the repair will be arranged, so no contractor is booked yet. Photos of the damaged cable and the leak would still help. Until it's fixed, please avoid using the shower if water is reaching any sockets or electrical parts, and call us straight away if you see sparks or water near electrics. We'll update you by 29 March at the latest. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the thumbs-up as unclear does not approve any contractor or spend
- The tenant message does not promise a visit or date
- Nothing is established about the cause or who pays

## Remaining work
- Landlord to give a clear yes/no or name their own contractor
- Tenant photos outstanding
- Assign contractor after approval
- If no reply by 2024-03-29, chase by SMS or phone

## Missing or unavailable information
- Clear landlord decision
- Photos of the shower cable and the leak

## Conflicts between sources
- The hold says 'LL to approve contractor', but the landlord's only reply was a thumbs-up, which does not approve anything

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

It is at the landlord approval gate with no contractor assigned. The thumbs-up is not a valid decision, so a clear answer is outstanding, along with the tenant's photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request to the landlord by email (A2), a tenant update by email (A3), and a hold with review on 2024-03-29 (A4).

**3. Does anything need a human decision?**

No. This is routine and only needs a clear answer from the landlord. If there is still no reply after the chase, escalate P2 if the leak is still ongoing.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email, 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks for your reply, Freya. A thumbs-up doesn't tell us w… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with only a thumbs-up (unclear). Awai… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
