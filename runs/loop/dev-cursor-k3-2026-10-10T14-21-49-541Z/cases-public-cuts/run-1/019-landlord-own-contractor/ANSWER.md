# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request stuck at landlord gate for two months; landlord never answered in writing and records conflict on approval. Sent landlord a clear route question with deadline, updated tenant, noted conflict and held to 18 March.

## Where the case stands
Landlord approval gate; landlord has never replied in writing. Held waiting for landlord, review 2025-03-18. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm route (our contractor £500+VAT or own contractor) by 18 March | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, nothing booked, next update by 19 March; ask for photos | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 18 March review | Jenkins, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Please confirm in writing which route you want for the back garden work (clearing rubbish, levelling, gravel): (a) we instruct our contractor on the £500 + VAT quote noted on 31 Jan, or (b) you arrange your own contractor (Oakley's contractor), in which case please give the contractor's name and a date.
> 
> Options: Approve our contractor at £500 + VAT (please state any cap); Landlord arranges own contractor: send name and visit date; Decline the works
> 
> Update: Our records conflict: a 31 Jan note says you approved £500+VAT, but we hold no written approval from you and calls have gone unanswered (email 8 Feb). No contractor will be instructed until you confirm. The tenant chased today. Please reply by 18 March 2025.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing, and sorry for the wait on the garden. We are still waiting for the landlord to confirm in writing how they want the work done (through us or their own contractor). We have just written to them again and asked for a reply by 18 March. Nothing is booked yet, so please don't expect anyone until we confirm. We will update you by 19 March. Could you also resend the garden photos, as we can't see the originals?

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval or contractor instruction established
- The £500+VAT figure is from an internal note, not a seen quote
- Does not decide who pays or whether the garden is the landlord's responsibility

## Remaining work
- Landlord answer on route/approval (owner: landlord, chase by 18 March on a second channel; escalate P2 if still silent)
- Tenant photos
- Harbour Compliance quote document not seen

## Missing or unavailable information
- Written landlord decision
- Garden photos
- Original quote document
- Whether Oakley's contractor attended

## Conflicts between sources
- Event 009 says landlord approved £500+VAT with Harbour Compliance vs holds 010-017 showing no approval and Oakley's contractor; treated as unapproved.

## Answers to the case questions
**1. Where does this case stand?**

Unapproved at landlord gate; the 31 Jan note claims approval of £500+VAT but there is no written landlord decision, and later holds suggest Oakley's own-contractor route. Tenant chased 13 March.

**2. Next action?**

Landlord asked by email (agency landlord record) to confirm route by 18 March; tenant emailed an update; held to 18 March.

**3. Human decision needed?**

Not yet. Escalate P2 if the landlord stays silent after the 18 March chase on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Please confirm in writing which route you want for t… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hello, thank yo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance; events 010-… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting written landlord route decision (our con… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
