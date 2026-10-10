# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The meter photo was sent to the landlord, who asked for the next one by 15 September. I set a recurring 3-monthly follow-up starting 8 September and told the landlord and tenant. Nothing needs a human.

## Where the case stands
Current reading sent to landlord (event 013); landlord replied (event 015) that the next reading is needed 15 September. Recurring job stays open; next tenant request scheduled 8 Sept 2025, repeating every 3 months.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Recurring follow-up FUP-101: ask tenant for meter photo on 2025-09-08, repeating every 3 months | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant and told them when we will next ask for a photo | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Confirmed to landlord that 15 September is noted and the 3-monthly routine continues | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo shortly before then and send it on, and we will keep asking every 3 months after that unless you tell us a different date. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your reply. The reading has gone to the landlord, so nothing more is needed now. We will ask you for a clear photo of the solar panel meter again in early September, and then every 3 months. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reading (16845 as shown in the attachment) is recorded only as a photo; it does not verify generation figures or the meter's accuracy.
- Scheduling does not confirm the tenant will comply or that the landlord's date stays unchanged.

## Remaining work
- Agency: send the tenant request on 2025-09-08 and forward the photo to the landlord by 15 September; repeat quarterly
- Confirm the ongoing cadence with the landlord if she wants a different pattern

## Missing or unavailable information
- Tenant's email (event 012) contained no visible attachment; the source of the photo sent in event 013 is not shown
- The ticket reference is not in the case, so resume_auto/hold changes were not made

## Conflicts between sources
- Original request said next due mid June; landlord's latest statement says 15 September; I trusted the landlord's latest. Call event 008 names 'Oakfield Compliance' as the caller/agent, which differs from the tenant on record; treated as a naming mismatch.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading has been delivered to the landlord, who replied with the next date (15 September). Outstanding: the recurring future requests.

**2. What is the next action, who is it for, and through which channel?**

Ask the tenant (Miles Fletcher) for a meter photo by email on 2025-09-08 (FUP-101, recurring every 3 months), then forward it to the landlord. Landlord and tenant have been updated by email now.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord has given a clear date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for a clear photo of the solar panel meter reading, due to landlord by 15 September 2025 (landl… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
