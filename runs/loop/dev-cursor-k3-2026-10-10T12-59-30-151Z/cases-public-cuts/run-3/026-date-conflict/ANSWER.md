# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The visit date conflicts: the record says Saturday 30/08, and the tenant says 8 September. I asked the provider to confirm and told the tenant it is unconfirmed. I set a follow-up for 2 September and added a note on the conflict.

## Where the case stands
Stage: visit. Landlord approved ("Yes go ahead"); Keystone assigned. Recorded visit 30/08/2025 10-12 (a Saturday, labelled Monday) has passed with no result; the tenant says 8 September was arranged. Waiting on provider to confirm the date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm the booked date/slot and whether anyone attended today | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant record holds 30/08, 8 Sept unconfirmed, checking with provider, update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up with provider on 2025-09-02 | Keystone Compliance | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please confirm the date for the oven repair at Flat 3, 3 Willowmere Road. Our record holds Monday 30/08/2025 10-12 (30/08/2025 is actually a Saturday). The tenant says she arranged 8 September 2025 with you and nobody has attended today. Please reply with the date and time slot you have booked, and whether anyone attended today. Please do not rely on the earlier date until confirmed.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for letting us know. Our record shows 30/08/2025, 10-12, but we have only your word for 8 September so far, so we are checking with the contractor now. Please don't treat 8 September as confirmed until we write back. We will update you by Tuesday 2 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked or changed: 8 September is only the tenant's claim.
- Does not establish whether the provider attended or missed today.
- Does not record a work result.

## Remaining work
- Provider to confirm date; then set_visit if future date confirmed by provider, or record missed appointment if they failed to attend
- Visit, result, invoice, closing checks

## Missing or unavailable information
- Provider-confirmed visit date
- Whether anyone attended on 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 (events 017-020) vs 08/09/2025 (tenant, event 021); trusted the system record until the provider confirms.
- 30/08/2025 is a Saturday but is described as Monday.
- Provider and tenant names are inconsistent across events (Keystone, Riverside Works, Lantern Utilities; Clara, Grace, Ruben).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Keystone is assigned. The recorded visit of 30/08 10-12 has passed with no result, and the tenant says 8 September was arranged. The provider has to confirm which date is right.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance to confirm the date and attendance (A1). Email the tenant that the date is being checked (A2). Follow up on 2 September (A3).

**3. Does anything need a human decision, and why?**

No. This is a routine date confirmation with the provider, so I have not escalated. If the provider stays silent after the follow-up, consider escalating for a provider swap.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"NBL-026-dat… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-09-02","purpose":"Chase Keystone Compliance for confirmed visit date (30/08 vs 08/09); update tenant","ticket_ref":"NBL-026-… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Date conflict: system/events 017-020 say 30/08/2025 (a Saturday, described as \"Monday\"); tenant … | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
