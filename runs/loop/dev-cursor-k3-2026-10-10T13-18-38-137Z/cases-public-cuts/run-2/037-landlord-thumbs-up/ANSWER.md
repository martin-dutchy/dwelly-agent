# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord replied to the contractor question with only a 👍, which is not approval. I recorded it as unclear, asked a clear yes/no question, updated the tenant and put the job on hold to 29 March.

## Where the case stands
Provider selection, no contractor assigned. Landlord's 👍 is not usable approval. On hold waiting for landlord's explicit yes/no, review 2024-03-29. Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a yes/no question: may we send our contractor, or will they use their own, reply by 2024-03-29 | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant we're waiting on landlord, next update by 29 March, with electric-shower safety advice; photos still wanted | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until landlord answers; review 2024-03-29 | Freya, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks Freya. We can't treat a thumbs-up as approval. Yes or no: may we send our contractor to replace the leaking shower cable at Flat 14, 44 Lantern Quay? Please reply by 2024-03-29. If you'd rather use your own contractor, say so and give their name.
> 
> Options: Yes - send our contractor (recommended); No - I will arrange my own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for your landlord to confirm who will do the repair, so we can't book anyone yet. We'll chase them and update you by 29 March. If the shower is electric and water is near the cable or the unit, please switch it off at the isolator or fuse board and don't use it until it's checked. Photos of the damaged cable would still help.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the thumbs-up as unclear does not approve any contractor or spend.
- The tenant message does not promise a visit date.
- Nothing established about the cause or whether the shower is electric.

## Remaining work
- Landlord to give explicit decision; then assign contractor or record own contractor (agency)
- Tenant photos outstanding
- Chase landlord on a second channel if no answer by 2024-03-29

## Missing or unavailable information
- Explicit landlord approval
- Photos of the damaged cable
- Whether the shower is electric

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection with no contractor assigned. The landlord's decision is unclear (👍 only). Still outstanding: explicit approval and the tenant's photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request to the landlord (Freya) by email, reply by 29 March. The tenant has been updated by email. The job is on hold with a review on 29 March.

**3. Does anything need a human decision, and why?**

No. This is routine: a thumbs-up gets a clarifying question. If the landlord stays silent after the chase, escalate then.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks Freya. We can't treat a thumbs-up as approval. Yes o… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hi Eliza, a quic… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-037-landlord-thumbs-up"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after resume_auto |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with a thumbs-up only (unclear). Wait… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
