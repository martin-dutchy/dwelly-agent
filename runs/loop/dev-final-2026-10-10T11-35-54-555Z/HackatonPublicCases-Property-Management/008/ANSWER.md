# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's latest reply named other properties, so it is not usable as approval. I asked them to confirm the property and give a yes/no on the £1,370 quote, noting the scope differences, and put the job on hold to 2025-05-09.

## Where the case stands
Paused, void property. Two quotes on file (£1,370.00 and £1,700.00 + VAT). No landlord approval recorded; no contractor assigned. Waiting on landlord; hold review 2025-05-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm their last reply concerned this property and give a yes/no on the £1,370.00 quote, flagging the scope differences | Langley, landlord | email | A3 ✅ |
| 2 | WAIT | Hold for landlord, review 2025-05-09 | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Langley (landlord) via email, existing thread (event 023 email)** (verified)

> Hi Langley, thanks for your last email. It referred to other properties, so I can't treat it as an answer for Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ. Could you confirm that your reply was about this property? For this flat the two quotes for the check-out works are £1,370.00 and £1,700.00 + VAT. Please note the £1,370.00 estimate leaves the burnt bedroom carpet in place and includes replacing the bathroom tap, which differs from our original request. Do you want us to go ahead with the £1,370.00 quote for this flat: yes or no? We won't instruct anyone until we have your clear answer. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The message is not approval and commits no spend
- No contractor assigned, no quote approved
- Does not settle the quote scope, the unpaid previous invoice query or which company quoted

## Remaining work
- Landlord to confirm property and decision
- Check scope of the £1,370 quote (carpet omitted, tap included) against the original request
- Clarify the previous invoice the landlord was asked about
- Chase the landlord on a second channel if no answer by review date

## Missing or unavailable information
- Landlord's clear decision for this property
- Attachment-04 invoice not seen
- Who issued the £1,370 quote (Eliza Bennett vs Alder Compliance)

## Conflicts between sources
- Events 021 and 023 name other properties than ZZ2 4ZZ
- Estimate attachment shows Alder Compliance; history names Eliza Bennett
- Inspection dated 5 Jan 2026 but signed 3 Apr 2025
- Estimate omits the carpet replacement and includes a tap replacement, unlike the request

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Paused on a void property awaiting the landlord's decision between two quotes (£1,370.00 vs £1,700.00 + VAT). Their last replies referenced other addresses, so no valid approval exists.

**2. What is the next action, for whom, via which channel?**

Email to Langley (landlord) asking them to confirm the property and give a yes/no on the £1,370 quote; hold with review on 2025-05-09.

**3. Does anything need a human decision?**

No. Routine landlord approval is pending; escalate only if the landlord stays silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord reply (event 023) names other properties, so not usable. As… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Conflicts: events 021/023 name other addresses; estimate attachment-02 issued by Alder Compliance vs event … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","ticket_ref":"NBL-00… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
