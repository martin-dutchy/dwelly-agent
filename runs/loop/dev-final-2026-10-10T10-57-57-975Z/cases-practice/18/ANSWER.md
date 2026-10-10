# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant gave one month's notice, which is not valid under the Renters' Rights Act (2 months needed). Earliest end is 10 Dec 2026. I replied to the tenant and asked the landlord whether he will agree a shorter period in writing.

## Where the case stands
Tenant told notice is short; landlord asked about early end; waiting on landlord. Tenancy continues to at least 10 Dec 2026 unless landlord agrees in writing.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Explained 2 months' notice rule, earliest end 10 Dec 2026, keys to be held for now, deposit process | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben whether he agrees in writing to an earlier end date | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord on 17 Oct | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. Since 1 May 2026 the notice a tenant must give is 2 months in writing, so one month's notice unfortunately can't end the tenancy on 10 November. Counting from your email today (10 October), the earliest end date is 10 December 2026. Rent stays due up to the end date.
> 
> If you need to leave sooner, your landlord can agree a shorter period in writing. We're asking him now and will come back to you. Please don't treat 10 November as agreed until you hear from us in writing. If you'd like, you can also confirm in writing that you want 10 December as your end date.
> 
> Keys: please hold on to them for now and don't drop them off yet. We'll confirm the handover date and place once the end date is settled.
> 
> Deposit: it's protected with mydeposits. After the tenancy ends and keys are returned, we do a check-out and agree any deductions with you, then return the rest. We can't give you a date until then.
> 
> Thanks,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave only 1 month's notice on 10 Oct 2026 to leave 10 Nov. Valid notice needs 2 months, so earliest end is 10 Dec 2026. Do you agree in writing to an earlier end date of 10 Nov?
> 
> Options: Hold to 10 December 2026 (legal default, recommended unless you have a new tenant lined up); Agree in writing to an earlier end date of 10 November 2026 (surrender by agreement); Agree another date between 10 Nov and 10 Dec

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not agree any end date earlier than 10 Dec
- Does not promise a deposit return date or amount
- Does not set key handover arrangements

## Remaining work
- Landlord decision on early surrender (agency/landlord)
- Confirm end date in writing with tenant
- Arrange check-out, key return, deposit return via mydeposits after end

## Missing or unavailable information
- Landlord's decision on shorter notice
- Whether tenant confirms 10 Dec

## Conflicts between sources
- Tenant says one month's notice to 10 Nov; law requires 2 months. Law applied.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

No. Tenants must give 2 months' written notice; one month is not enough. Earliest end date is 10 December 2026 (2 months from the 10 Oct email).

**2. What options exist to end sooner?**

Only with the landlord's written agreement to a shorter period (surrender by agreement), e.g. 10 Nov. Landlord could also find a replacement tenant, but that does not itself end the tenancy; the tenant stays liable for rent to the end date.

**3. What do you reply and what do you start?**

Replied explaining the rule, the 10 Dec date, that keys should be held for now and the deposit process without dates. Started a landlord request (APR-102) about an earlier date and a follow-up on 17 Oct (FUP-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave only 1 month's notice on 10 Oct 2026 to le… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-17","purpose":"Chase Ben Hartley for decision on early end date for Tom Achterberg's tenancy (P-250); then update tenant.… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
