# Solar generation readings: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's request for solar readings is an information request, not a repair. The tenant says his wife already phoned and emailed the readings about two weeks ago, but nothing is visible on NBL-006. I asked the office to check the mailbox and call notes, updated the tenant and landlord, and put the ticket on hold until 22 Sept.

## Where the case stands
NBL-006 at init, on hold, review 2025-09-22. The agency is checking its own mailbox and call notes for the readings. The landlord has not yet received a figure.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Ask Maya Chen to find the tenant's wife's email/call, link it to NBL-006 and pass the figure to the landlord, reply by 19 Sept | Maya Chen, internal | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Apologise, say we are checking for the earlier readings, no action needed, next contact not before 22 Sept | Ivo Mercer, tenant | email | A2 ✅ |
| 3 | OTHER | Update the landlord on status; update promised by 22 Sept | Edwin Vale, landlord | email | A3 ✅ |
| 4 | WAIT | Hold until 22 Sept for the internal check | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Maya Chen (internal) via email, existing thread (event 017 email)** (verified)

> Ivo Mercer (tenant, 14 Brindlefern Walk) says on 18 Sept that his wife already phoned the office and emailed the solar readings about two weeks ago (around 4 Sept). Nothing is visible against NBL-006. Please check the office mailbox and call notes for that email/call, link it to NBL-006, and pass the kWh figure and date to Edwin Vale. If nothing is found, tell me and we will ask the tenant for a fresh reading. Please reply by 2025-09-19.

**A2 · send_message → Ivo Mercer (tenant) via email, existing thread (event 017 email)** (verified)

> Hi Ivo, thank you for replying, and sorry for the repeated requests. We couldn't see your wife's call or email against this request, so we're checking our mailbox and call notes now. You don't need to do anything for the moment. If we can't find it we'll come back to you, but not before Monday 22 September.

**A3 · send_message → Edwin Vale (landlord) via email, agency landlord record** (verified)

> Hi Edwin, an update on your request for the solar generation readings. We asked the tenant several times; on 18 Sept he replied that the readings were already sent about two weeks ago by his wife (phone and email), but we can't yet see them on your request. We're checking our mailbox and call notes and will send you the figure once found, or ask for a fresh reading if not. We'll update you by 2025-09-22. No repair or visit is needed for this.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Maya Chen / tenant / landlord | Review mailbox check result, relay figure or re-ask tenant | 2025-09-22 | A4 ✅ verified |

## What this does not establish
- Nothing here confirms the readings were actually sent, or what they are.
- No figure has been given to the landlord.
- No contractor or visit was arranged.

## Remaining work
- Maya Chen to locate the earlier email/call and relay the figure to Edwin
- If it is not found, re-ask the tenant (a different route, e.g. a letter or phone, as three emails got no reply) after 22 Sept
- Close the ticket without payment once the landlord has the figure

## Missing or unavailable information
- The kWh reading itself
- Whether the wife's email/call exists in the agency mailbox

## Conflicts between sources
- The tenant says the readings were supplied about two weeks ago. The request history shows no reply. I treated the history as the record but did not dismiss the tenant's claim.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has not received the readings. The tenant says they were already sent about two weeks ago by his wife, but nothing is visible on this request. Locating that message is outstanding.

**2. What is the next action, who is it for, and through which channel?**

An internal email to Maya Chen to check the mailbox and call notes. Updates also went to the tenant and the landlord by email.

**3. Does anything need a human decision, and why?**

No. A colleague checking the mailbox is routine work and no decision or authority is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Maya Chen","recipient_role":"internal","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ivo Mercer","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Edwin Vale","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-006","body… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006","reason":"Other","comment":"Internal check of mailbox/call notes for readings tenant says were sent ~4 Sept by his w… | 1 | ✅ verified | Ticket NBL-006 read back after put_on_hold |

## Failed or unverified actions
_None._
