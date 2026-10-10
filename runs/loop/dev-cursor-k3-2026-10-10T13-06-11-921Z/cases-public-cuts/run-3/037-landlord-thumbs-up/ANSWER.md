# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Landlord replied with only a 👍, which isn't valid approval. I recorded it as unclear, asked for a clear yes/no, held the job to 29 March and updated the tenant.

## Where the case stands
Provider selection, no contractor assigned. Waiting on landlord for a clear answer; hold review 2024-03-29. Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord for a clear yes/no on using our contractor | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, photos still helpful, next update by 29 March | Eliza, tenant | email | A4 ✅ |
| 3 | WAIT | Hold until 2024-03-29 for landlord reply | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Freya (landlord) via email, existing thread (event 007 email)** (verified)

> - Thanks for your reply. To be sure, can you confirm yes or no: do you want us to send our contractor to repair the leaking shower cable/hose at Flat 14, 44 Lantern Quay? (Answer 'yes, send your contractor' or 'no, I will arrange my own'.)
> 
> Why: A thumbs-up emoji is not a clear approval to instruct a contractor.

**A4 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for the landlord to confirm how the repair will be arranged, so I can't give a date yet. Photos of the damaged cable and the leak would still help. Until then, please avoid using the shower if water is near any electrics. We'll update you by 29 March.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the emoji as unclear does not approve or decline anything
- No contractor assigned or visit booked
- No cost or date promised

## Remaining work
- Landlord clear decision; then assign contractor
- Tenant photos
- If still silent by 29 March, chase landlord on SMS

## Missing or unavailable information
- Clear landlord approval
- Tenant photos

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does the case stand?**

Awaiting landlord approval; the 👍 is unclear. No provider assigned. Tenant photos outstanding.

**2. Next action?**

Yes/no question to the landlord by email (done), tenant update by email (done), hold to 29 March.

**3. Human decision needed?**

No. This is routine and is waiting on the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 007 email)","questions":["Thanks f… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only; asked for a clear yes/n… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hi Eliza, a quic… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
