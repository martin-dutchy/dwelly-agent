# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Landlord's 👍 was recorded as unclear, not approval. Asked landlord for a clear yes/no by 29 March, updated the tenant with safety advice, and held the ticket for review on 29 March.

## Where the case stands
Provider selection, no contractor assigned. Landlord replied only 👍 (unclear). On hold until 2024-03-29 awaiting a clear yes/no. Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear yes/no on using our contractor, reply by 2024-03-29 | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant, safety advice, ask again for photos, next update by 29 March | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-03-29 for landlord reply | Freya, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks Freya, we received your 👍 but can't treat it as approval. Please reply with a clear yes or no: may we send our contractor to repair the damaged, leaking shower cable at Flat 14, 44 Lantern Quay? (Or tell us if you'll arrange your own.) Please reply by 2024-03-29.
> 
> Options: Yes, send your contractor; No, I will arrange my own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update: we're waiting on the landlord's clear go-ahead for the shower repair, and we've asked them to reply by 29 March. We'll update you by then. Please still send photos of the cable and the leak if you can. For safety, if the shower is electric and water is reaching the cable or any electrics, please switch it off at the isolator and don't use it until it's checked. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- A 👍 does not authorise a contractor or spend; none assigned.
- Cause and who pays are not established.
- No visit booked.

## Remaining work
- Landlord yes/no (or own contractor) – owner: agency, review 2024-03-29
- Tenant photos
- Assign contractor after approval

## Missing or unavailable information
- Clear landlord approval
- Tenant photos; whether shower is electric

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection with no contractor assigned. The landlord's 👍 is not usable approval. Outstanding: clear landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request to the landlord by email (A2). The tenant was updated by email (A3). Ticket on hold to 2024-03-29 (A4).

**3. Does anything need a human decision, and why?**

No. This is routine: ask again and wait. Escalate only if the landlord stays silent past the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks Freya, we received your 👍 but can't treat it as app… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied only with 👍; clear yes/no on using o… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
