# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Landlord replied to the approval request with only a thumbs-up, which is not usable authority. I recorded it as unclear, asked for a clear yes/no, held the job with a review date, and updated the tenant.

## Where the case stands
Intake/landlord gate; no provider assigned. Landlord replied with only 👍 to an either/or question; on hold awaiting a clear answer, review 2024-03-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord for a clear yes/no on using our contractor | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on the pending decision, ask again for photos, give safety advice, next update 28 March | Eliza, tenant | email | A4 ✅ |
| 3 | WAIT | Hold until landlord answers; review 2024-03-28 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Freya (landlord) via email, agency landlord record** (verified)

> - Thanks for your reply. A thumbs-up doesn't tell us which option you mean, so could you confirm with a yes or no: do you want us to arrange the shower cable repair with our contractor? (If you would rather use your own contractor, please say so.)
> 
> Why: Landlord reply was an emoji only, which is not usable approval.

**A4 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for your landlord to confirm how they'd like the repair arranged, and we've asked them again for a clear answer. Photos of the damaged cable and the leak would still help. In the meantime, please avoid using the shower if water is reaching any electrics or sockets. We'll be back in touch by tomorrow, 28 March.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the 👍 as unclear does not approve any contractor or spend.
- No contractor assigned and no visit booked.
- The tenant message does not promise a repair date.

## Remaining work
- Landlord to confirm approach; then assign contractor or record own contractor
- Tenant photos outstanding
- Chase landlord on second channel if no reply by review date

## Missing or unavailable information
- Clear landlord decision
- Photos of the damaged cable and leak

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval, with no provider assigned. The 👍 is ambiguous. Outstanding: a clear landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no question to the landlord by email (A2), a tenant update by email (A4), and a hold until 2024-03-28 (A3).

**3. Does anything need a human decision, and why?**

No. This is a routine wait. If the landlord stays silent after the chase, escalate then.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Thanks for your rep… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only; asked for a clear yes/n… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hi Eliza, a quic… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
