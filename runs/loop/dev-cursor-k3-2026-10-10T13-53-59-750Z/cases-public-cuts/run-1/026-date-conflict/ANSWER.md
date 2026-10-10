# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant disputes the visit date. I asked the provider to confirm attendance and 8 Sept, told the tenant 8 Sept is unconfirmed, noted the conflicts and set a follow-up for 1 Sept.

## Where the case stands
Visit stage. Record holds 30/08/2025 10-12 (a Saturday, mislabelled Monday) which has passed with no result recorded. Tenant says 8 Sept was agreed; provider has not confirmed. Waiting on provider; review 2025-09-01.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider whether they attended on 30/08 and whether 8 Sept is confirmed, reply by 1 Sept | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30/08, 8 Sept is unconfirmed, we are checking, update by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider reply 1 Sept | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit on 30/08/2025, 10-12 (that is a Saturday, though our messages said Monday). The tenant says she agreed 8 September 2025 with you instead. Please reply by end of Monday 1 September to tell us: (1) did you attend this morning, and (2) is 8 September confirmed by you, and what time window? Until you confirm, we will not treat any new date as booked. Please also confirm which company name you are attending under, as messages have used different names.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call)** (verified)

> Hello, thanks for calling, and sorry for the confusing reminder. Our record holds the visit as 30 August, 10-12 (our messages wrongly called it Monday; it was a Saturday). You told us you arranged 8 September with the engineer. We have asked the engineer to confirm that date and whether anyone came this morning. Until they confirm, 8 September is not booked, so please don't count on it yet. We will update you by Monday 1 September. If an engineer did turn up or call this morning, please tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked for 8 Sept: only the tenant has stated it
- Does not establish whether the engineer attended on 30/08
- Landlord 'Yes go ahead' approves attendance only, not any quote

## Remaining work
- Provider to confirm date; then set_visit and tell tenant
- Record work result after the visit
- Any quote goes to the landlord
- Landlord not yet told about the date confusion (minor)

## Missing or unavailable information
- Provider confirmation of date and attendance
- Attachment at event 014 unseen

## Conflicts between sources
- 30/08 (Saturday) labelled Monday
- 30/08 in record vs 8 Sept per tenant
- Tenant and provider names vary across events
- Provider names vary: Keystone, Riverside Works, Lantern Utilities

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved; provider assigned; recorded visit 30/08 has passed with no result; tenant says 8 Sept; provider confirmation outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance to confirm attendance and the 8 Sept date; email to tenant with the true status; follow-up 1 Sept.

**3. Does anything need a human decision, and why?**

No. It is a routine date confirmation that a message and a dated follow-up can move forward.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"NBL-026-dat… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-01","party":"Keystone Compliance","purpose":"Check provider confirmed 8 Sept visit a… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Conflicts: 30/08/2025 is a Saturday but labelled Monday (events 018-020); tenant says 8 Sept agree… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
