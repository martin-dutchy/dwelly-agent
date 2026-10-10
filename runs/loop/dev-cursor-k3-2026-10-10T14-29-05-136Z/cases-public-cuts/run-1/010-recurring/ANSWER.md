# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's reading photo was sent to the landlord, who asked for the next one on 15 September. I scheduled a recurring follow-up from that date, confirmed it with the landlord, thanked the tenant and noted the record.

## Where the case stands
Current reading delivered to landlord; landlord gave next date 15 Sept. Follow-up scheduled; ticket stays open as a recurring job. Nobody is waiting on us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow-up on 15 Sept 2025 to request next photo from tenant, then every 3 months | Miles Fletcher, tenant / Ava, landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant, say next request is mid-September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Confirm 15 Sept date and 3-monthly pattern with landlord | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Dear Ava, thank you. We have noted that you next need the solar panel reading on 15 September, and we will ask the tenant for the photo ahead of that date and send it to you. Our original instruction was for readings every 3 months, so unless you tell us otherwise we will keep asking every 3 months after that (mid December, and so on). Please reply if you would prefer a different pattern. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for the solar panel reading photo. We have passed it to the landlord and nothing more is needed now. We will email you again around mid-September to ask for the next photo, and then every 3 months. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reading was recorded as seen in the photo (16845); not independently verified.
- Scheduling does not confirm landlord wants 3-monthly after 15 Sept; we asked them to say if not.
- Not closed: recurring job.

## Remaining work
- Request photo from tenant around 15 Sept 2025 and forward to landlord, then repeat every 3 months (agency ops).

## Missing or unavailable information
_None._

## Conflicts between sources
- Earlier holds said 'mid June'; landlord's latest statement says 15 September, which I treated as current.
- Event 008 names 'Oakfield Compliance' as the caller, but the call was with the tenant; treated as the tenant.
- Event 013 references 'attachment-80-document' not in the files; the PDF attached matches the described reading.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading is delivered and the landlord has acknowledged it. Only the next recurring request remains, due 15 September 2025 and then every 3 months.

**2. What is the next action, who is it for, and through which channel?**

The follow-up FUP-101 for 15 Sept to email the tenant for a photo. Landlord and tenant were both emailed today.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord's instruction is clear.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-15","purpose":"Request clear photo of solar panel meter reading from tenant and send to landlord (landlord Ava confirmed … | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Dear Ava, thank … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"ticket 010-recurring","note":"Reading (display 16845) sent to landlord 2025-01-17; landlord asked for next on 15 Sept (event 015)… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
