# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant chased a dishwasher repair that already has a visit booked for 29/04 8am-12pm, so this is a duplicate. I told the tenant about the existing booking, asked the provider to confirm it, noted the record inconsistencies and set a follow-up. No new ticket was opened.

## Where the case stands
Stage: visit. Visit recorded for 29/04/2026 08:00-12:00 (system line event 017). Tenant's latest email (021) duplicates the open job. Waiting on provider confirmation and the visit itself.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told the tenant the visit is already booked for 29 April 8am-12pm, no second job opened, and when to call to rearrange | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Asked the provider to confirm attendance and which company is attending | Riverside Compliance, contractor | email | A4 ✅ |
| 3 | WAIT | Follow-up 29/04 to check the visit result with the provider and tenant | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. An engineer is already booked to look at the dishwasher door: our records show tomorrow, Wednesday 29 April, between 8am and 12pm. You don't need to do anything else, and we haven't opened a second job. We're also confirming the booking with the provider. If the time doesn't suit, call 07700 900410 to rearrange. We'll update you after the visit.

**A4 · send_message → Riverside Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please confirm you are attending Flat 9, 89 Juniper Mews for the dishwasher door inspection on Wednesday 29/04/2026, 8am-12pm. The tenant has chased today, so please reply to confirm. Our records also mention Cedar Utilities (Grant) on the booking call, so please tell us which company is attending. Quote only for any repair, with photos, and wait for our approval before starting.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the provider has accepted the slot or that the repair is approved.
- No cause, cost or landlord approval for any repair is established.
- The 29/04 date is the system record, not yet confirmed in writing by the provider.

## Remaining work
- Provider to confirm the visit and report the result or quote (provider/agency).
- If a quote is needed, send it to the landlord for approval.
- Record the work result after 29/04.

## Missing or unavailable information
- Provider confirmation of the 29/04 slot and which company is attending.
- Tenant's correct direct phone number.

## Conflicts between sources
- Provider named as Riverside Compliance, Cedar Utilities and Harbour Homes across events.
- Tenant named Leo Turner vs Leo Kendall (event 016).
- Tenant contact numbers differ (07700 900763 vs 07700 900410, which is the provider's number in event 019).
- Event 008 says the landlord agreed for a go-ahead, while the quote loop says approval is needed. I treated landlord approval for any quote as still required.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stage is visit. The visit is booked for 29/04/2026 8am-12pm. The provider's written confirmation, the visit result and any quote and landlord approval are still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email that the visit is already booked (done), and ask the provider to confirm by email (done). Follow up on 29/04.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate chase. The name and provider inconsistencies are noted and the provider has been asked to clarify.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email event 021 chases the same dishwasher fault; duplicate of open job, visit 29/04/202… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |
| A4 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","tick… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-29","party":"Riverside Compliance","purpose":"Confirm provider attended or will a… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
