# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord answered our either/or question with only a 👍, which is not a usable approval. I recorded it as unclear, asked again in plain words, and put the job on hold with a review date of 2024-03-29.

## Where the case stands
Ticket at init, on hold waiting for landlord. Landlord replied only with a 👍 to an either/or question; recorded as unclear. Tenant photos requested earlier, not yet received.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm in words whether we arrange the repair or they do, and any spend cap | Freya, landlord | email | A2 ✅ |
| 2 | WAIT | Hold until 2024-03-29 for landlord reply and tenant photos, then chase | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Freya (landlord) via email, existing thread (event 007 email)** (verified)

> - Thanks for your thumbs up. Just to be sure, please can you reply in words: shall we arrange the shower cable repair through our contractor, or will you arrange it yourself?
> - If you would like us to arrange it, is there a maximum spend you are happy with?
> 
> Why: An emoji is not a clear answer to an either/or question, and we cannot instruct a contractor without clear approval.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the reply as unclear does not approve the repair or any contractor or spend.
- Nothing is booked; the cause and who pays are not established.

## Remaining work
- Landlord to give a clear decision; then assign contractor and book visit (agency)
- Tenant photos outstanding; chase if not received
- Review on 2024-03-29

## Missing or unavailable information
- Clear landlord decision and spend limit
- Photos of the damaged cable/leak
- Property record has no landlord contact, limit or contractors

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, on hold. The landlord's decision is unclear (👍 only) and the tenant photos are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Freya (landlord) on the existing thread asking for a clear written decision and spend cap; follow-up review on 2024-03-29.

**3. Does anything need a human decision, and why?**

No. This is a routine clarification, so no escalation. A human is needed only if the landlord stays silent or the leak worsens.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"Landlord email 2024-03-27 11:21 UTC (event 007): \"👍\" in… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 007 email)","questions":["Thanks f… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with a thumbs-up only; asked for a cl… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
