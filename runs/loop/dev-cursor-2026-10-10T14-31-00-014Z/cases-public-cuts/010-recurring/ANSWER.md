# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant-supplied meter photo was sent to the landlord, who replied that they next need it on 15 September. I scheduled a recurring follow-up, confirmed with the landlord and asked them to clarify the cycle, and told the tenant when to expect the next request.

## Where the case stands
Reading (16845) sent to landlord 17 Jan 2025; landlord replied that the next one is needed 15 Sept. Follow-up scheduled; waiting on landlord to clarify whether 3-monthly cycle continues and whether mid June still applies.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow-up for 15 Sept 2025 to request next reading from tenant, recurring every 3 months pending landlord clarification | internal | internal | A1 ✅ |
| 2 | REQUEST_INFORMATION | Confirm noted date 15 Sept and ask whether 3-monthly cycle and mid June reading still apply, reply by 24 Jan | Ava, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Thank tenant, say nothing needed now, we will email before 15 Sept | Miles Fletcher, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September, and we will ask the tenant for the photo ahead of that date. One quick question: our original instruction was readings every 3 months with the next due in mid June. Should we still collect them every 3 months after 15 September, and do you still want the mid June one? Please reply by 24 January so we keep the schedule right. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for getting back to us. We have the reading we need for now, so nothing more is needed at the moment. The landlord will next need a photo of the solar panel meter display around 15 September, so we will email you a few days before to ask. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the 3-monthly cycle or that mid June is cancelled
- Does not verify who supplied the photo or that the reading is correct
- Reminder scheduled is not a tenant request yet

## Remaining work
- Ask tenant for photo before 15 Sept and forward to landlord (agency)
- Update schedule when landlord answers the cycle question (agency)

## Missing or unavailable information
- Whether landlord wants 3-monthly readings after 15 Sept and the mid June one
- How the photo reached the agency: tenant email event 012 shows no attachment

## Conflicts between sources
- Original request: every 3 months, next mid June; landlord's latest says 15 Sept. Treated landlord's latest as the next date, asked to clarify.
- Event 008 names an Oakfield Compliance caller, and event 012 tenant email shows no photo; provenance of the attached photo is unclear. Carried on as it is the same property.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The reading was delivered to the landlord and the current request is complete. Outstanding: the next reading on 15 Sept, and landlord clarification of the 3-monthly cycle versus mid June.

**2. What is the next action, who is it for, and through which channel?**

Follow-up FUP-101 for 15 Sept (internal); email to landlord asking about the cycle; email to tenant saying we will ask before 15 Sept.

**3. Does anything need a human decision, and why?**

No. It is routine and the only open point is a question to the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-15","purpose":"Landlord (Ava) needs the solar panel reading photo by 15 September (event 015). Ask tenant a few days befo… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading job: reading 16845 sent to landlord 17 Jan 2025. Landlord says… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
