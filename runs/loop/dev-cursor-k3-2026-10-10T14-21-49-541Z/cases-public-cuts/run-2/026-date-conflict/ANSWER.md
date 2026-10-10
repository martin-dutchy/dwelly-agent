# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The visit date is disputed: the system says Monday 30/08/2025, which is a Saturday, while the tenant says 8 September was arranged. I asked the provider to confirm the date and whether they attended, told the tenant that nothing is confirmed, noted the conflict and set a follow-up for 1 Sept.

## Where the case stands
Provider assigned; visit date disputed (30/08 per system vs 08/09 per tenant). Waiting on provider to confirm the date and whether they attended; tenant asked if 8 Sept acceptable. No work result recorded.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider to confirm the actual visit date and whether anyone attended on 30/08 | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the date is unconfirmed, ask if 8 Sept is acceptable given oven out of use, next update by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up 1 Sept on provider confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our record shows a visit of "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday. The tenant has now called to say she arranged 8 September 2025 with you. Please reply today to confirm: 1) the actual agreed date and time, and 2) whether anyone attended this morning. Please don't attend on any date the tenant hasn't agreed. Please also send the attachment from our first email if you couldn't open it, and tell us if you need anything else.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for calling. Sorry for the confusion. Our record holds Monday 10-12 "30/08/2025", but that date is a Saturday, so it doesn't add up. You've told us 8 September was arranged. I've asked the contractor to confirm the correct date today, and 8 September is not yet confirmed, so please don't rely on either date until you hear from us. Please also let us know if anyone turned up this morning. As the oven is out of use, is 8 September OK for you, or would you like us to ask for an earlier slot? We'll update you by Monday 1 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is booked: neither 30/08 nor 08/09 is confirmed by the provider.
- Does not establish whether a visit happened this morning, the cause of the fault, or cost.
- Landlord approval 'Yes go ahead' carries no spend cap; any quote still goes to the landlord.

## Remaining work
- Provider to confirm date and attendance (agency ops, follow-up 1 Sept)
- Set visit once provider confirms
- Tenant to say whether 8 Sept is acceptable; chase an earlier slot if not
- Record result, quote or invoice after the visit

## Missing or unavailable information
- Provider confirmation of visit date
- Whether anyone attended on 30/08
- Unavailable attachment from event 014

## Conflicts between sources
- 30/08/2025 is a Saturday but is described as Monday in events 018-020; the tenant says 8 Sept (a Monday) was arranged. Neither is confirmed by the provider.
- Provider and tenant names vary across events (Keystone Compliance, Riverside Works, Lantern Utilities, Keystone Utilities; Clara, Ruben, Grace, Harriet). Treated as the same parties because the address and job match.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved, provider assigned, visit date in conflict (30/08 vs 08/09) and unconfirmed by the provider. Outstanding: the provider's confirmation, whether the visit happened, and the work result.

**2. What is the next action, who is it for, and through which channel?**

Email to the provider to confirm the date and attendance, and email to the tenant saying it is unconfirmed and asking if 8 Sept is acceptable. Both are sent.

**3. Does anything need a human decision, and why?**

No. This is routine and handled by a confirmation request and a dated follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"ca… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"case-026","note":"Date conflict: events 017-020 say 30/08/2025 (a Saturday) described as 'Monday'; tenant call event 021 says 8 S… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Check provider confirmed the oven visit date (30/08 vs 08/09); if no reply, chase on another channel and u… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
