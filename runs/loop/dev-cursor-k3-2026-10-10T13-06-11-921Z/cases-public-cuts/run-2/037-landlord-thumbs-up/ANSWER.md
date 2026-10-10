# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord answered the approval request with only a 👍. I recorded it as unclear and asked a yes/no question by SMS. I told the tenant what is pending and kept the job on hold with a review on 29 March.

## Where the case stands
Provider selection; no contractor assigned. Landlord replied with only a 👍, which is not a usable approval. Waiting on the landlord's yes/no. Tenant photos outstanding. Hold review 2024-03-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Freya a yes/no question by SMS: send our contractor or arrange her own? | Freya, landlord | sms | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update Eliza: waiting on landlord, photos still helpful, safety note, next update by 29 March | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold and follow-up to chase landlord on 2024-03-29 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya (landlord) via sms, agency landlord record** (verified)

> Hi Freya, thanks for your 👍 on the shower repair at Flat 14, 44 Lantern Quay. To be sure we act correctly: do you want us to send our own contractor to replace the leaking shower cable/hose? Please reply YES (ours) or NO (you'll arrange your own).

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for your landlord to confirm clearly how they'd like the repair arranged; we've asked again today. Photos of the damaged cable and the leak would still help. Until then, please avoid using the shower if water is escaping near any electrics. We'll update you by 2024-03-29.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the 👍 as unclear does not approve or decline anything
- No contractor assigned and no visit booked
- Cause of the leak and who pays are not established

## Remaining work
- Landlord clear decision (agency chases 2024-03-29)
- Tenant photos
- Assign contractor and book visit once approved

## Missing or unavailable information
- Clear landlord approval
- Photos of damage

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection with no contractor assigned. The landlord's 👍 is not valid approval. Outstanding: a clear landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval question to the landlord by SMS (A2), and a status update to the tenant by email (A3). The chase is set for 2024-03-29.

**3. Does anything need a human decision, and why?**

No. Asking again and waiting is routine. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-037-landlord-thum… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only (not a usable approval).… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-037-landlord-thumbs-up","due_on":"2024-03-29","purpose":"Chase landlord for clear yes/no; update tenant","party":"Landlor… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
