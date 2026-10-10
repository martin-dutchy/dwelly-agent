# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's photo was sent to the landlord, who confirmed they next need it on 15 September. I confirmed to both parties and scheduled a follow-up for 8 September. No human decision is needed.

## Where the case stands
Reading received and sent to landlord; landlord replied that next reading is needed 15 Sept. Ticket stays open as recurring, follow-up scheduled 2025-09-08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow-up 8 Sept 2025 to ask tenant for next meter photo | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REQUEST_INFORMATION | Confirmed 15 Sept to landlord and asked whether quarterly readings still apply | Ava, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Thanked tenant, said next request is early September | Miles Fletcher, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo in the week before and send it to you. Please tell us if you would still like readings every 3 months, as our original instruction was quarterly. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for sending the solar panel reading photo; it has gone to the landlord. We will be in touch again in early September to ask for the next one. Nothing else is needed from you until then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the reading value 16845 is accurate; it is only what the photo appears to show.
- Does not settle whether readings are quarterly or on the landlord's dates.

## Remaining work
- Next reading request 8 Sept 2025 (agency).
- Landlord to confirm whether quarterly cadence still applies.

## Missing or unavailable information
- Tenant's email event 012 contained only a signature; attachment not in case files beyond the PDF record.

## Conflicts between sources
- Original instruction said quarterly, next mid June; landlord now says next 15 Sept. Treated the landlord's latest statement as current and asked them to confirm cadence.
- Event 008 call summary names an Oakfield Compliance caller, while the tenant is Miles Fletcher; the photo came via the tenant thread.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: photo sent to landlord, who replied. Outstanding is the next reading, due 15 Sept 2025, and the landlord confirming the cadence.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the date (done), email to the tenant (done), and a follow-up on 8 Sept to request the next photo from the tenant by email.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord has given the date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Request solar panel meter reading photo from tenant so it can be sent to landlord (Ava) by 15 September 20… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
