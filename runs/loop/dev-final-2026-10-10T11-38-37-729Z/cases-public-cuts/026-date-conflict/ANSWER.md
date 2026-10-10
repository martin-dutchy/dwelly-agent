# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant disputes the visit date (record 30/08, tenant says 8 Sept). I told the tenant it is unconfirmed and asked the provider to confirm the date and whether they attended, with a follow-up set for 2025-09-01. No human decision needed yet.

## Where the case stands
Provider assigned (Keystone Compliance), landlord approved ("Yes go ahead"). Visit date disputed: record says 30/08/2025 10-12, tenant says 8 Sept. Awaiting provider confirmation; job not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance whether they attended today and to confirm the correct visit date | Keystone Compliance, provider | email | A5 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 8 Sept is not yet confirmed, record holds 30/08, provider being asked | Clara, tenant | sms | A1 ✅ |
| 3 | WAIT | Follow-up to check provider confirmation, then set_visit | Keystone Compliance | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via sms, existing thread (event 021 call)** (verified)

> Hello, thanks for your call. Our record shows the oven visit as 30/08/2025, 10-12, but you've said 8 September was agreed. We've asked Keystone Compliance to confirm the correct date and will update you as soon as they do. Until then 8 September isn't confirmed. Sorry for the confusion.

**A3 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (failed)

> - Did anyone attend Flat 3, 3 Willowmere Road this morning (30/08/2025, 10-12)? If not, was that because the visit was agreed for another date?
> - Please confirm the actual agreed visit date and time. The tenant says it was arranged for Monday 8 September 2025; our record holds 30/08/2025 (a Saturday, though the slot says Monday).
> 
> Why: Tenant and system record disagree on the visit date; only the provider can confirm, and we must not book on a tenant-only date.

**A5 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, the tenant at Flat 3, 3 Willowmere Road says the oven visit was agreed for Monday 8 September 2025, but our record shows 30/08/2025 (10-12). Please could you (1) tell us whether anyone attended this morning, and (2) confirm the correct visit date and time. We'll book it once you confirm. Thank you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked or changed; 8 September is unconfirmed
- Not recorded as missed appointment because it is unknown whether anyone attended
- Does not establish cause of oven fault or cost

## Remaining work
- Provider to confirm date; agency then set_visit and tell tenant
- Record work result after visit; quote/invoice if needed; landlord update; close

## Missing or unavailable information
- Whether the provider attended 30/08
- Provider-confirmed visit date
- Attachment at event 014 unavailable

## Conflicts between sources
- Visit date: 30/08/2025 (events 017-020, system) vs 8 Sept (event 021, tenant). 30/08/2025 is a Saturday though slots say Monday; 8 Sept 2025 is a Monday. Trusted the system record until the provider confirms.
- Names and providers vary (Keystone Compliance/Riverside Works/Lantern Utilities; Clara/Ruben/Grace/Harriet): treated as record noise, the same job.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned; visit date in dispute (30/08 per record vs 8 Sept per tenant). Provider confirmation outstanding, then visit, result, invoice, close.

**2. What is the next action, who is it for, and through which channel?**

Provider date confirmation request to Keystone Compliance by email (A5); tenant told by SMS (A1); follow-up 2025-09-01 (A4).

**3. Does anything need a human decision, and why?**

No. It is routine and one provider question resolves it. Escalate only if the provider stays silent after the follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"sms","contact":"existing thread (event 021 call)","body":"Hello, thanks for y… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Check Keystone Compliance has confirmed the visit date (30/08 vs 08/09); if so set_visit and update tenant… | 1 | ❌ failed | FUP-102 was returned but is not in the schedule_follow_up log |
| A3 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ❌ failed | No request_information record on read-back |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Check Keystone Compliance has confirmed the visit date (30/08 vs 08/09); if so set_visit and update tenant… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
- A2: First schedule_follow_up not applied; retried successfully as A4
- A3: request_information failed with HTTP 500; retried once via send_message as A5, which verified
