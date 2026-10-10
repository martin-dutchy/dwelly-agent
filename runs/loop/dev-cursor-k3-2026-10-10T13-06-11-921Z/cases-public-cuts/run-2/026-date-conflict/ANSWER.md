# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Visit date conflict (30/08 Saturday labelled Monday vs tenant's 8 Sept). Asked provider to confirm, told tenant that 8 Sept is not yet booked, noted the conflict and set follow-up for 2 Sept.

## Where the case stands
Stage: visit. Landlord approved (event 009 "Yes go ahead"); provider assigned. Visit date disputed: record says 30/08/2025 10-12 (a Saturday, labelled "Monday"), tenant says 8 Sept. Waiting on provider to confirm the date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider to confirm whether they attended today and which visit date is correct | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30/08, 8 Sept is unconfirmed, provider being asked, update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up with provider on 2 Sept for confirmed date | Keystone Compliance | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our record shows a visit on 30/08/2025, 10-12, but that date is a Saturday and our message called it "Monday". The tenant says she agreed 8 September 2025 with you instead. Did you attend today? If not, please confirm by reply which date and time you have for this visit (8 September, or another). We will not treat any date as booked until you confirm it. Please also confirm which company name you are visiting under, as earlier messages used different names.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hello, thanks for letting us know. Our record holds 30 August, 10-12, but we have not yet had the engineer confirm that or your 8 September date. We have asked them to confirm today which date is right, and we will not treat 8 September as booked until they do. Please don't expect anyone on a date they haven't confirmed. We'll update you by Tuesday 2 September at the latest. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked: 8 Sept is only the tenant's statement.
- Does not establish whether anyone attended on 30/08 or the oven cause/cost.

## Remaining work
- Provider to confirm date; then set_visit and tell tenant
- After visit: record result, quote/invoice, landlord update, close
- If no attendance on 30/08, record missed appointment once confirmed

## Missing or unavailable information
- Provider's confirmed date
- Attachment at event 014 unavailable
- Consistent tenant and provider names

## Conflicts between sources
- 30/08/2025 is a Saturday but is called Monday in events 018-020
- Tenant says 8 Sept (event 021) vs record 30/08; trusted the record until the provider confirms
- Tenant and provider names vary across events (Clara/Ruben Oakley/Grace Mercer; Keystone/Riverside Works/Lantern Utilities)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned, visit stage; the date is disputed (30/08 per record vs 8 Sept per tenant) and the provider's confirmation is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance asking them to confirm the date (done); email to the tenant explaining the position (done); follow-up 2 Sept.

**3. Does anything need a human decision, and why?**

No. This is a routine date confirmation that the provider can settle.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Date conflict: system/SMS say \"Monday 30/08/2025\" (a Saturday); tenant (event 021) says arranged… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Chase provider for confirmed visit date… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
