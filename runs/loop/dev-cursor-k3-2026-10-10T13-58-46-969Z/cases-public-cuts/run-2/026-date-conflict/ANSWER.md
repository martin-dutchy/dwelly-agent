# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Visit date is in conflict: the record says Monday 30/08/2025, which is a Saturday, and the tenant says 8 Sept. I asked the provider to confirm, told the tenant that 8 Sept is unconfirmed, updated the landlord, and set a follow-up for 2 Sept.

## Where the case stands
Stage: visit. Landlord approved (event 009). Keystone Compliance assigned. Visit date conflicting (30/08 vs tenant's 8 Sept); waiting on provider to confirm; follow-up 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to confirm the real visit date and whether anyone attended today | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30/08 (a Saturday), 8 Sept is unconfirmed, we are checking, next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Wait for provider confirmation, chase 2 Sept | Keystone Compliance, contractor | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Please confirm the actual date and time of your oven repair visit at Flat 3, 3 Willowmere Road: our record says Monday 30/08/2025 10-12, but 30/08/2025 is a Saturday, and the tenant says she arranged Monday 8 September 2025.
> - Did anyone attend this morning (30/08/2025)? If not, please confirm the tenant was not expected.
> 
> Why: Appointment dates conflict (30/08 vs 08/09); only the provider can confirm a booking. Please reply by end of Monday 1 September.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for letting us know, and sorry for the confusion. Our record holds Monday morning 10-12 "30/08/2025", but that date is a Saturday, so the details don't fit. We have asked Keystone Compliance to confirm the real date. Your 8 September date is not confirmed yet, so please don't treat it as booked until we say so. We'll update you by Tuesday 2 September at the latest.

**A3 · send_message → Palmer (landlord) via email, agency landlord record** (verified)

> Hi, a quick update on the oven repair at Flat 3, 3 Willowmere Road. Keystone Compliance was assigned following your approval, but the visit date is unclear: our record says 30/08 (a Saturday, though the notice said Monday) and the tenant says 8 September. We've asked the contractor to confirm and will update you once we know. No quote or cost has been raised so far.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked; 8 September is not confirmed
- Does not establish whether the provider attended today or the oven fault cause or cost
- Landlord approval 'Yes go ahead' covers sending the contractor only, not any quote

## Remaining work
- Provider to confirm date; then set_visit and update tenant and landlord (agency)
- Record a missed or no-access result if the provider reports it
- Quote loop if repair needs parts

## Missing or unavailable information
- Provider-confirmed visit date
- Whether anyone attended on 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but described as Monday
- Tenant says 8 Sept vs record 30/08; trusted the record until the provider confirms
- Names and provider names inconsistent (Ruben/Clara/Grace; Keystone/Riverside Works/Lantern Utilities)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and provider assigned; visit date disputed (30/08 Saturday vs 8 Sept). Provider confirmation outstanding.

**2. What is the next action, who is it for, and through which channel?**

Provider date confirmation request to Keystone Compliance by email; tenant and landlord updated by email.

**3. Does anything need a human decision, and why?**

No. This is a routine date confirmation; the follow-up is dated.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","body":"Hi Clara, thanks … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Palmer","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi, a quick update on th… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Chase provider for confirmed visit date… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Date conflict: events 017-020 say Monday 30/08/2025 (a Saturday); tenant call (event 021) says arr… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
