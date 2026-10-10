# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Landlord replied to the contractor question with only a 👍, which is not usable approval. I recorded it as unclear, re-asked a yes/no question, held the job with a review date and updated the tenant. No human decision is needed yet.

## Where the case stands
Provider selection stage, no contractor assigned. On hold waiting for landlord's clear answer (review 2024-03-28). Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord for a clear yes/no to instruct our contractor (or say they'll use their own) | Freya, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Updated tenant that approval is pending, asked again for photos, gave next update date | Eliza, tenant | email | A5 ✅ |
| 3 | WAIT | Hold until 2024-03-28 for landlord answer | Freya, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Freya (landlord) via email, agency landlord record** (failed)

> - Thanks for your reply. A thumbs-up doesn't tell us which option you mean, so please can you confirm with a yes or no: shall we instruct our contractor to repair the leaking shower cable at Flat 14, 44 Lantern Quay? (If you'd rather arrange your own contractor, just say so.)
> 
> Why: Landlord's reply was an emoji only, not usable approval.

**A3 · send_message → Freya (landlord) via email, agency landlord record** (verified)

> Hi Freya, thanks for your reply. A thumbs-up doesn't tell us which option you mean, so could you confirm with a yes or no: shall we instruct our contractor to repair the leaking shower cable at Flat 14, 44 Lantern Quay? If you'd rather arrange your own contractor, just let us know. Kind regards, Northbridge Lettings

**A5 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower: we're waiting for the landlord to confirm how the repair will be arranged, and we've asked them again for a clear answer. Photos of the cable and the leak would still help. Until then, please avoid using the shower if water is near any electrics. We'll update you by 28 March. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is recorded as unclear and does not authorise instructing a contractor or any spend.
- No visit, cost or date is confirmed.

## Remaining work
- Await landlord's clear decision, then assign contractor (agency, owner of the follow-up)
- Obtain tenant photos
- If the landlord stays silent past 3 days, chase on a second channel

## Missing or unavailable information
- Clear landlord approval
- Tenant photos of the damaged cable and leak

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection with no contractor. The landlord's 👍 is not valid approval. Outstanding: clear landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no confirmation request to the landlord by email (MSG-101), plus a tenant update by email (MSG-102). The job is on hold until 28 March.

**3. Does anything need a human decision, and why?**

No. The landlord clarification is routine. Escalate only if they stay silent past 3 days after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Thanks for your rep… | 1 | ❌ failed | No request_information record on read-back |
| A3 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-037-landlord-th… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only; asked for a clear yes/n… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |
| A5 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
- A2: request_information returned HTTP 500; retried the same request via send_message, which verified as A3.
